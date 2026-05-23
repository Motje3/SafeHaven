import type { BroadcastMessage, ContentItem, Emergency, InventoryItem, Kast } from '@/types';

export const KASTEN: Kast[] = [
  {
    id: 'k1',
    name: 'Noodkast Katendrecht',
    address: 'Waterleliekade 5',
    city: 'Rotterdam',
    residents: 142,
    fillPercent: 75,
    doorLocked: true,
    lastActivity: '2026-05-23T15:54:00',
  },
  {
    id: 'k2',
    name: 'Noodkast Beursplein',
    address: 'Beursplein 8',
    city: 'Rotterdam',
    residents: 88,
    fillPercent: 62,
    doorLocked: true,
    lastActivity: '2026-05-23T14:20:00',
  },
  {
    id: 'k3',
    name: 'Noodkast Centrum',
    address: 'Stadhuisplein 1',
    city: 'Den Haag',
    residents: 210,
    fillPercent: 90,
    doorLocked: true,
    lastActivity: '2026-05-23T16:01:00',
  },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'i1', kastId: 'k1', category: 'water', name: 'Drinkwater', count: 24, unit: 'L', status: 'ok' },
  { id: 'i2', kastId: 'k1', category: 'voedsel', name: 'Soep in blik', count: 0, unit: 'x', status: 'critical' },
  { id: 'i3', kastId: 'k1', category: 'voedsel', name: 'Noten', count: 4, unit: 'x', status: 'warning' },
  { id: 'i4', kastId: 'k1', category: 'voedsel', name: 'Volkoren Crackers', count: 4, unit: 'x', status: 'ok' },
  { id: 'i5', kastId: 'k1', category: 'verlichting', name: 'Zaklampen', count: 6, unit: 'x', status: 'ok' },
  { id: 'i6', kastId: 'k1', category: 'verlichting', name: 'Batterijen', count: 12, unit: 'x', status: 'ok' },
  { id: 'i7', kastId: 'k1', category: 'elektronica', name: 'Noodradio', count: 1, unit: 'x', status: 'warning' },
  { id: 'i8', kastId: 'k1', category: 'ehbo', name: 'Verbandtrommel', count: 2, unit: 'x', status: 'ok' },
];

export const EMERGENCIES: Emergency[] = [
  {
    id: 'e1',
    type: 'stroomstoring',
    title: 'Waarschuwing',
    bannerTitle: 'Status: Stroomstoring',
    bannerSubtitle: 'Er is momenteel een storing. U krijgt zo snel mogelijk meer informatie...',
    message: 'De stroom is uitgevallen in meerdere wijken van Rotterdam. Onbekend hoe lang het gaat duren. Controleer of buren hulp nodig hebben en houdt de app in de gate voor meer informatie.',
    timestamp: '21-05-2026 11:11',
    startedAt: '2026-05-21T11:11:00',
    active: true,
  },
];

export const MESSAGES: BroadcastMessage[] = [
  {
    id: 'm1',
    title: 'Update stroomstoring',
    body: 'De storing wordt momenteel onderzocht door Stedin. Verwachte hersteltijd: 2 uur.',
    target: 'all',
    sentAt: '2026-05-23T12:30:00',
  },
  {
    id: 'm2',
    title: 'Vrijwilligers gevraagd',
    body: 'We zoeken vrijwilligers om kwetsbare buren te ondersteunen.',
    target: 'kast',
    targetId: 'k1',
    responseType: 'ja-nee',
    sentAt: '2026-05-23T11:00:00',
  },
];

export const CONTENT: ContentItem[] = [
  { id: 'c1', type: 'video', title: 'Wat als er geen stroom is?', body: 'Uitleg over wat te doen bij een stroomstoring.', order: 1, publishedAt: '2026-04-10' },
  { id: 'c2', type: 'video', title: 'Zo werkt het stroomnet', body: 'Educatieve video over het Nederlandse stroomnet.', order: 2, publishedAt: '2026-04-12' },
  { id: 'c3', type: 'rule', title: 'Gedraag je netjes met de spullen van een ander', body: 'Respecteer de noodkast en de mensen om je heen.', order: 1, publishedAt: '2026-03-01' },
  { id: 'c4', type: 'rule', title: 'Deel eerlijk met elkaar', body: 'Neem alleen wat je nodig hebt.', order: 2, publishedAt: '2026-03-01' },
  { id: 'c5', type: 'contact', title: 'Jolijn — Voorraadbeheer', body: '06-12345678', order: 1, publishedAt: '2026-03-01' },
  { id: 'c6', type: 'tip', title: 'Tips voor meer stroomgeneratie', body: 'Schakel apparaten uit die je niet gebruikt.', order: 1, publishedAt: '2026-04-20' },
  { id: 'c7', type: 'update', title: 'Nederlandse overheid', body: 'Nederland is getroffen door een cyber aanval...', order: 1, publishedAt: '2026-04-16' },
];
