# SafeHaven — Data-Free Communication (LoRa + BLE) — Project Status

**Last updated:** 2026-05-31
**This same file lives in both project folders** (`SafeHaven/` and the sibling `lora-chat/`).

---

## What this is
SafeHaven gets a **"data-free" chat**: messages travel over **LoRa radio** with no internet, Wi-Fi, or cellular. A phone talks to a LoRa board over **Bluetooth (BLE)**; the board relays the text over **LoRa** to another board; that board can hand it to its own phone. Built for a school demo.

```
Phone --BLE--> Board(0x01) --LoRa--> Board(0x02) --BLE--> Phone
```

## STATUS: WORKING END-TO-END ✅
All three milestones done and **verified on 2026-05-31**:
- **M1** — LoRa board-to-board link. ✅ DONE
- **M2a** — Board-side BLE↔LoRa bridge. ✅ DONE
- **M3** — App connects over BLE and drives the link. ✅ DONE & VERIFIED

**Proof:** the app (EAS dev build on a real phone) connected over BLE to board `0x01`, sent `"Safsgjsgsg"`; board `0x02`'s serial monitor showed:
```
LoRa] RX from 0x01: Safsgjsgsg (rssi -36)
```
Full chain confirmed: app → BLE → board → LoRa → board. rssi −36 = strong (boards on a desk).

---

## Hardware
- **2× LilyGO TTGO LoRa32 T3 v1.6.1** (ESP32 + SX1276 radio), EU868 (868 MHz).
- Each flashed with a **distinct ID**: one board `MY_ID = 0x01`, the other `MY_ID = 0x02`.
  - ⚠️ Different IDs are **required** — the firmware drops any packet whose sender ID equals its own (treats it as an echo). Same ID on both = receiver silently ignores everything.
- Both enumerate as `USB-Enhanced-SERIAL CH9102`. Last session: **COM3 = board 0x01**, **COM4 = board 0x02**. Ports can change between sessions.

## The two codebases (kept separate on purpose)
- **App:** `c:\Users\moham\Desktop\School\3\SafeHaven` — Expo / React Native (SDK 54, expo-router, TypeScript).
- **Firmware:** `c:\Users\moham\Desktop\School\3\lora-chat` — PlatformIO (ESP32). Sibling of the app, **not** inside it (mixing the toolchains causes friction).

---

## BLE contract — source of truth is the firmware `src/main.cpp`. Do NOT change one side without the other.
| Thing | Value |
|---|---|
| Device name | `LoRaChat-1` / `LoRaChat-2` |
| Service UUID | `6e400001-b5a3-f393-e0a9-e50e24dcca9e` |
| Write char (phone → board) | `6e400002-b5a3-f393-e0a9-e50e24dcca9e` — writeWithResponse, plain UTF-8 |
| Notify char (board → phone) | `6e400003-b5a3-f393-e0a9-e50e24dcca9e` — subscribe, plain UTF-8 |

Over BLE it's **plain text both ways**. The `[fromID][toID][text]` framing exists **only on the LoRa hop** (`toID 0xFF` = broadcast).

## App side — what was built
- `lib/ble/lora-chat.ts` — `useLoraChat()` hook wrapping **react-native-ble-plx**. Lazy-required (so Expo Go degrades to a notice instead of crashing), Android runtime permissions, **Bluetooth power-state check**, scan by service UUID → connect → `requestMTU(247)` → discover → subscribe notify → write. Dependency-free UTF-8↔base64 (so Dutch é/ë survive).
- `app/lora-chat.tsx` — chat screen, route `/lora-chat`. Status pill, message bubbles, composer. Purple `#7C6FE0` theme, Dutch strings.
- `app/_layout.tsx` — registered the `/lora-chat` route.
- `components/menu-drawer.tsx` — **"Data-vrij gesprek"** entry (radio-tower icon) opens the screen. ⚠️ This is a **temporary test entry point**.
- `app.json` — react-native-ble-plx plugin (central mode) + iOS Bluetooth permission string. `extra.eas.projectId` set.
- `eas.json` — `development` profile (developmentClient + internal + apk).
- `expo-dev-client` installed.

---

## How to RUN the app — requires a dev build, NOT Expo Go
`react-native-ble-plx` is native code; it **does not run in Expo Go**. We use an **EAS cloud build**:
1. `eas login`
2. `eas build -p android --profile development` — cloud builds an APK (~10–15 min). (EAS CLI is installed globally.)
3. Open the build link → **download the APK** → install on the phone (allow "unknown sources").
4. `npx expo start --dev-client` — keep phone + PC on the **same Wi-Fi**.
5. Open the installed **SafeHaven dev app** (not Expo Go). Connect it to the dev server: tap the listed server, or **scan the terminal's QR** (the `expo start` one — NOT the EAS build QR). Don't use the `localhost` URL from the phone.

## How to TEST the link
1. Power both boards (antennas on).
2. Watch the **receiving** board's serial — open a **PlatformIO Core CLI** terminal and run (use the receiver's port):
   ```
   pio device monitor -p COM3 -b 115200
   ```
3. In the app: burger menu → **Data-vrij gesprek** → **Verbinden** → allow the Bluetooth popups.
4. The status pill shows which board you connected to (`LoRaChat-1` / `-2`).
5. Type a message, send. Watch the **other** board's serial for:
   ```
   LoRa] RX from 0x0X: <your message> (rssi ...)
   ```

---

## NEXT STEPS (not done yet — choose before/at the demo)
1. **Two-way chat in the app UI.** Right now the *send* path is proven (app → other board's serial). To see **incoming** messages as bubbles *in the app*, the **receiving** board also needs a phone connected (firmware only notifies when `phoneConnected`). A real two-way demo = **two phones, one per board**. The code already supports both directions.
2. **Standalone APK** (runs without the PC). Switch EAS to the `preview` profile (no `developmentClient`) so the app runs untethered — good for the demo and range testing.
3. **Promote into SafeHaven properly.** Move the test screen into a real "data-free mode" (e.g. under *noodupdates*) instead of the temporary menu-drawer entry.
4. **Range test.** Set `TX_POWER` back to `14` in the firmware (currently low `2` for desk testing) and walk the boards apart. EU868 has a 1% duty-cycle rule — typing by hand is nowhere near it, fine for the demo.

## Gotchas already hit (so a fresh chat doesn't relearn them)
- **Expo Go can't load BLE** — must use a dev build.
- **Emulators have no Bluetooth** — must test on a real phone.
- **Two different QR codes:** EAS build QR = download the APK; `expo start` QR = connect the dev client to your code. Don't confuse them.
- **Board IDs must differ** (`0x01` vs `0x02`) or the receiver silently drops messages.
- `app.json` `android.permissions` lists BLUETOOTH / ADMIN / CONNECT but **not** `BLUETOOTH_SCAN`; the ble-plx plugin injects SCAN itself and connecting worked — but if a future rebuild fails to scan, add `android.permission.BLUETOOTH_SCAN` there and rebuild.
- **Firmware platform:** must use the community **pioarduino** platform (official `espressif32` is stuck on Arduino core 2.x and won't build the modern libs).

## Workflow note
The user prototypes firmware/app guidance with **web Claude**, then has **Claude Code** implement it in the repo. The **firmware is the source of truth** for the BLE contract.
