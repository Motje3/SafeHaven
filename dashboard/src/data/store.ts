import { useSyncExternalStore } from 'react';

import type { BroadcastMessage, ContentItem, Emergency, InventoryItem, Kast } from '@/types';
import { CONTENT, EMERGENCIES, INVENTORY, KASTEN, MESSAGES } from './mock';

type Listener = () => void;

interface Store<T> {
  get: () => T;
  set: (next: T | ((s: T) => T)) => void;
  subscribe: (l: Listener) => () => void;
}

function createStore<T>(key: string, initial: T, onChange?: (state: T) => void): Store<T> {
  let state: T = load(key, initial);
  const listeners = new Set<Listener>();

  function persist() {
    localStorage.setItem(key, JSON.stringify(state));
  }

  return {
    get: () => state,
    set: (next) => {
      state = typeof next === 'function' ? (next as (s: T) => T)(state) : next;
      persist();
      listeners.forEach((l) => l());
      onChange?.(state);
    },
    subscribe: (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
  };
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

// Sync server runs at /server/index.js — start with `npm run server` from repo root.
const SYNC_URL = `${window.location.protocol}//${window.location.hostname}:3001/api/emergency`;

function syncEmergencyToServer(emergencies: Emergency[]) {
  const active = emergencies.find((e) => e.active) ?? null;
  const payload = active
    ? {
        emergency: {
          title: active.title,
          timestamp: active.timestamp,
          message: active.message,
          bannerTitle: active.bannerTitle,
          bannerSubtitle: active.bannerSubtitle,
        },
      }
    : { emergency: null };

  fetch(SYNC_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // server offline — local state still updates, just won't reach the app
  });
}

export const kastenStore = createStore<Kast[]>('sh.kasten', KASTEN);
export const inventoryStore = createStore<InventoryItem[]>('sh.inventory', INVENTORY);
export const emergencyStore = createStore<Emergency[]>('sh.emergencies', EMERGENCIES, syncEmergencyToServer);
export const messagesStore = createStore<BroadcastMessage[]>('sh.messages', MESSAGES);
export const contentStore = createStore<ContentItem[]>('sh.content', CONTENT);

// Push initial seed state to the server on first load so the app has something to poll.
syncEmergencyToServer(emergencyStore.get());

export function resetAll() {
  kastenStore.set(KASTEN);
  inventoryStore.set(INVENTORY);
  emergencyStore.set(EMERGENCIES);
  messagesStore.set(MESSAGES);
  contentStore.set(CONTENT);
}
