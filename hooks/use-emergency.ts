import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

export interface Emergency {
  title: string;
  timestamp: string;
  message: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

const SYNC_PORT = 3001;
const POLL_INTERVAL_MS = 3000;

function resolveSyncUrl(): string {
  const hostUri =
    Constants.expoConfig?.hostUri ?? (Constants as unknown as { expoGoConfig?: { debuggerHost?: string } }).expoGoConfig?.debuggerHost ?? '';
  const host = hostUri.split(':')[0];
  if (host) return `http://${host}:${SYNC_PORT}/api/emergency`;
  return `http://localhost:${SYNC_PORT}/api/emergency`;
}

const SYNC_URL = resolveSyncUrl();

export function useEmergency() {
  const [emergency, setEmergency] = useState<Emergency | null>(null);
  const [acknowledgedId, setAcknowledgedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchState() {
      try {
        const res = await fetch(SYNC_URL);
        if (!res.ok) return;
        const data = (await res.json()) as { emergency: Emergency | null };
        if (cancelled) return;
        setEmergency(data.emergency);
      } catch {
        // server offline — leave current state as-is
      }
    }

    fetchState();
    const id = setInterval(fetchState, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const emergencyKey = emergency
    ? `${emergency.bannerTitle}|${emergency.timestamp}`
    : null;

  return {
    emergency,
    showModal: emergency !== null && acknowledgedId !== emergencyKey,
    acknowledge: () => setAcknowledgedId(emergencyKey),
    clear: () => setEmergency(null),
  };
}
