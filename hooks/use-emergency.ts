import { useState } from 'react';

export interface Emergency {
  title: string;
  timestamp: string;
  message: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

// Placeholder until the dashboard / backend feed is wired up.
const ACTIVE_EMERGENCY: Emergency | null = {
  title: 'Waarschuwing',
  timestamp: '21-05-2026 11:11',
  message:
    'De stroom is uitgevallen in meerdere wijken van Rotterdam. Onbekend hoe lang het gaat duren. Controleer of buren hulp nodig hebben en houdt de app in de gate voor meer informatie.',
  bannerTitle: 'Status: Stroomstoring',
  bannerSubtitle:
    'Er is momenteel een storing. U krijgt zo snel mogelijk meer informatie...',
};

export function useEmergency() {
  const [emergency, setEmergency] = useState<Emergency | null>(ACTIVE_EMERGENCY);
  const [acknowledged, setAcknowledged] = useState(false);

  return {
    emergency,
    showModal: emergency !== null && !acknowledged,
    acknowledge: () => setAcknowledged(true),
    clear: () => setEmergency(null),
  };
}
