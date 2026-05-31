/**
 * BLE client for the LoRa chat bridge.
 *
 * Talks to the TTGO LoRa32 firmware (lora-chat/src/main.cpp). The board is a
 * BLE peripheral exposing a Nordic-UART-style service:
 *   - we WRITE plain UTF-8 text to RX_CHAR  -> board broadcasts it over LoRa
 *   - we SUBSCRIBE to TX_CHAR (notify)      -> board pushes incoming LoRa text
 *
 * Over BLE it is just text both ways; the [from][to] framing only exists on the
 * LoRa hop, so this side stays simple.
 *
 * NOTE: react-native-ble-plx is a NATIVE module. It does NOT exist in Expo Go.
 * The screen must run in a dev build (npx expo prebuild && npx expo run:android).
 * We guard every native call so opening this in Expo Go shows a notice instead
 * of crashing the whole app.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

// ---- BLE contract — must match the firmware byte-for-byte ----
export const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
export const RX_CHAR_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // phone -> board
export const TX_CHAR_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // board -> phone

// react-native-ble-plx is imported lazily so a missing native module (Expo Go)
// degrades to "unavailable" instead of throwing at import time.
let BleManagerCtor: any = null;
let bleImportError = false;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  BleManagerCtor = require('react-native-ble-plx').BleManager;
} catch {
  bleImportError = true;
}

export const isBleAvailable = !!BleManagerCtor && !bleImportError;

export type ConnState =
  | 'idle'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface ChatMessage {
  id: string;
  text: string;
  direction: 'in' | 'out';
  at: number;
}

// ---------------------------------------------------------------------------
// UTF-8 <-> base64 (ble-plx sends/receives characteristic values as base64).
// Dependency-free so Dutch characters (é, ë, ...) survive the round trip.
// ---------------------------------------------------------------------------
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function utf8ToBytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 0x80) {
      bytes.push(c);
    } else if (c < 0x800) {
      bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // surrogate pair
      const c2 = str.charCodeAt(++i);
      c = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
      bytes.push(
        0xf0 | (c >> 18),
        0x80 | ((c >> 12) & 0x3f),
        0x80 | ((c >> 6) & 0x3f),
        0x80 | (c & 0x3f),
      );
    } else {
      bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return bytes;
}

function bytesToUtf8(bytes: number[]): string {
  let out = '';
  for (let i = 0; i < bytes.length; ) {
    const b = bytes[i++];
    if (b < 0x80) {
      out += String.fromCharCode(b);
    } else if (b < 0xe0) {
      out += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i++] & 0x3f));
    } else if (b < 0xf0) {
      out += String.fromCharCode(
        ((b & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f),
      );
    } else {
      let cp =
        ((b & 0x07) << 18) |
        ((bytes[i++] & 0x3f) << 12) |
        ((bytes[i++] & 0x3f) << 6) |
        (bytes[i++] & 0x3f);
      cp -= 0x10000;
      out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
    }
  }
  return out;
}

function bytesToBase64(bytes: number[]): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += B64[b0 >> 2];
    out += B64[((b0 & 0x03) << 4) | (b1 >> 4)];
    out += i + 1 < bytes.length ? B64[((b1 & 0x0f) << 2) | (b2 >> 6)] : '=';
    out += i + 2 < bytes.length ? B64[b2 & 0x3f] : '=';
  }
  return out;
}

function base64ToBytes(b64: string): number[] {
  const clean = b64.replace(/[^A-Za-z0-9+/]/g, '');
  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    const n0 = B64.indexOf(clean[i]);
    const n1 = B64.indexOf(clean[i + 1]);
    const n2 = B64.indexOf(clean[i + 2]);
    const n3 = B64.indexOf(clean[i + 3]);
    bytes.push((n0 << 2) | (n1 >> 4));
    if (n2 >= 0 && i + 2 < clean.length) bytes.push(((n1 & 0x0f) << 4) | (n2 >> 2));
    if (n3 >= 0 && i + 3 < clean.length) bytes.push(((n2 & 0x03) << 6) | n3);
  }
  return bytes;
}

export const encodeText = (s: string) => bytesToBase64(utf8ToBytes(s));
export const decodeText = (b64: string) => bytesToUtf8(base64ToBytes(b64));

// ---------------------------------------------------------------------------
// Android runtime permissions. Android 12+ (API 31) uses the new BLUETOOTH_*
// permissions; older versions need fine location to scan. The config plugin
// declares them in the manifest; we still must request them at runtime.
// ---------------------------------------------------------------------------
async function requestPermissions(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  const api = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);

  if (api >= 31) {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
    return (
      res[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === 'granted' &&
      res[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === 'granted'
    );
  }
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted === 'granted';
}

let idCounter = 0;
const nextId = () => `${Date.now()}-${idCounter++}`;

/**
 * Hook that owns the BLE manager, connection lifecycle and the message log.
 */
export function useLoraChat() {
  const managerRef = useRef<any>(null);
  const deviceRef = useRef<any>(null);

  const [state, setState] = useState<ConnState>('idle');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [poweredOn, setPoweredOn] = useState(false);
  const stateSubRef = useRef<any>(null);

  // Create the manager once (only when the native module is present).
  useEffect(() => {
    if (!isBleAvailable) return;
    managerRef.current = new BleManagerCtor();
    // Track the Bluetooth adapter; passing `true` emits the current state now.
    stateSubRef.current = managerRef.current.onStateChange((s: string) => {
      setPoweredOn(s === 'PoweredOn');
    }, true);
    return () => {
      try {
        stateSubRef.current?.remove?.();
        deviceRef.current?.cancelConnection?.();
        managerRef.current?.stopDeviceScan?.();
        managerRef.current?.destroy?.();
      } catch {
        // already gone
      }
    };
  }, []);

  const addMessage = useCallback((text: string, direction: 'in' | 'out') => {
    setMessages((prev) => [...prev, { id: nextId(), text, direction, at: Date.now() }]);
  }, []);

  const subscribe = useCallback(
    (device: any) => {
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        TX_CHAR_UUID,
        (err: any, characteristic: any) => {
          if (err) {
            // monitor stops on disconnect; that path is handled separately
            return;
          }
          if (characteristic?.value) {
            addMessage(decodeText(characteristic.value), 'in');
          }
        },
      );
    },
    [addMessage],
  );

  const connect = useCallback(async () => {
    if (!isBleAvailable || !managerRef.current) {
      setError('Bluetooth is niet beschikbaar (open de app via een dev build, niet Expo Go).');
      setState('error');
      return;
    }
    setError(null);

    const ok = await requestPermissions();
    if (!ok) {
      setError('Bluetooth-toestemming geweigerd.');
      setState('error');
      return;
    }

    const manager = managerRef.current;

    // Make sure Bluetooth is actually on before scanning — otherwise "off"
    // looks like "broken". manager.state() reflects the live adapter state.
    const adapter = await manager.state();
    if (adapter !== 'PoweredOn') {
      setError('Bluetooth staat uit. Zet Bluetooth aan en probeer opnieuw.');
      setState('error');
      return;
    }

    setState('scanning');

    manager.startDeviceScan([SERVICE_UUID], null, async (scanErr: any, device: any) => {
      if (scanErr) {
        setError(scanErr.message ?? 'Scannen mislukt.');
        setState('error');
        manager.stopDeviceScan();
        return;
      }
      if (!device) return;

      // Found a board advertising our service — stop scanning and connect.
      manager.stopDeviceScan();
      setState('connecting');
      try {
        const connected = await device.connect();
        if (Platform.OS === 'android') {
          await connected.requestMTU(247).catch(() => {}); // allow longer messages
        }
        await connected.discoverAllServicesAndCharacteristics();

        deviceRef.current = connected;
        setDeviceName(connected.name ?? connected.localName ?? 'LoRaChat');

        connected.onDisconnected(() => {
          deviceRef.current = null;
          setState('disconnected');
          setDeviceName(null);
        });

        subscribe(connected);
        setState('connected');
      } catch (e: any) {
        setError(e?.message ?? 'Verbinden mislukt.');
        setState('error');
      }
    });
  }, [subscribe]);

  const send = useCallback(async (text: string) => {
    const device = deviceRef.current;
    const trimmed = text.trim();
    if (!device || !trimmed) return;
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        RX_CHAR_UUID,
        encodeText(trimmed),
      );
      addMessage(trimmed, 'out');
    } catch (e: any) {
      setError(e?.message ?? 'Versturen mislukt.');
    }
  }, [addMessage]);

  const disconnect = useCallback(async () => {
    try {
      await deviceRef.current?.cancelConnection();
    } catch {
      // ignore
    }
    deviceRef.current = null;
    setState('idle');
    setDeviceName(null);
  }, []);

  return {
    isBleAvailable,
    poweredOn,
    state,
    deviceName,
    error,
    messages,
    connect,
    disconnect,
    send,
  };
}
