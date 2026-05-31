import { useSyncExternalStore } from 'react';

// Tiny global flag so full-screen overlays (e.g. the voorraad tutorial) can
// tell the global MenuDrawer to hide its burger button while they're active.
let active = false;
const listeners = new Set<() => void>();

export function setTutorialOverlayActive(value: boolean) {
  if (active === value) return;
  active = value;
  listeners.forEach((l) => l());
}

export function useTutorialOverlayActive() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => active,
    () => active,
  );
}
