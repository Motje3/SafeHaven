export interface Kast {
  id: string;
  name: string;
  address: string;
  city: string;
  residents: number;
  fillPercent: number;
  doorLocked: boolean;
  lastActivity: string;
}

export interface InventoryItem {
  id: string;
  kastId: string;
  category: 'voedsel' | 'water' | 'verlichting' | 'elektronica' | 'ehbo';
  name: string;
  count: number;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
}

export type EmergencyType = 'stroomstoring' | 'cyberaanval' | 'overstroming' | 'evacuatie' | 'overig';

export interface Emergency {
  id: string;
  type: EmergencyType;
  title: string;
  bannerTitle: string;
  bannerSubtitle: string;
  message: string;
  timestamp: string;
  startedAt: string;
  active: boolean;
}

export type MessageTarget = 'all' | 'kast' | 'wijk';

export interface BroadcastMessage {
  id: string;
  title: string;
  body: string;
  target: MessageTarget;
  targetId?: string;
  responseType?: 'none' | 'ja-nee';
  sentAt: string;
}

export interface ContentItem {
  id: string;
  type: 'video' | 'update' | 'rule' | 'contact' | 'tip';
  title: string;
  body: string;
  order: number;
  publishedAt: string;
}
