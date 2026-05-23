import { AlertTriangle, Power } from 'lucide-react';
import { useState } from 'react';

import { Badge, Button, Card, Field, Input, Select, Textarea } from '@/components/ui';
import { emergencyStore, useStore } from '@/data/store';
import { PageHeader } from '@/layout/PageHeader';
import type { Emergency, EmergencyType } from '@/types';

const TYPE_PRESETS: Record<EmergencyType, { bannerTitle: string; bannerSubtitle: string }> = {
  stroomstoring: {
    bannerTitle: 'Status: Stroomstoring',
    bannerSubtitle: 'Er is momenteel een storing. U krijgt zo snel mogelijk meer informatie...',
  },
  cyberaanval: {
    bannerTitle: 'Status: Cyberaanval',
    bannerSubtitle: 'Er is een cyberincident gemeld. Volg de aanwijzingen in de app.',
  },
  overstroming: {
    bannerTitle: 'Status: Overstroming',
    bannerSubtitle: 'Er is sprake van wateroverlast. Houd updates in de gaten.',
  },
  evacuatie: {
    bannerTitle: 'Status: Evacuatie',
    bannerSubtitle: 'Er geldt een evacuatie-advies voor uw wijk.',
  },
  overig: {
    bannerTitle: 'Status: Waarschuwing',
    bannerSubtitle: 'Er is een melding voor uw gebied.',
  },
};

function nowStamp() {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function Noodstaat() {
  const emergencies = useStore(emergencyStore);
  const active = emergencies.find((e) => e.active);
  const history = emergencies.filter((e) => !e.active);

  const [type, setType] = useState<EmergencyType>('stroomstoring');
  const [title, setTitle] = useState('Waarschuwing');
  const [message, setMessage] = useState('');
  const [bannerTitle, setBannerTitle] = useState(TYPE_PRESETS.stroomstoring.bannerTitle);
  const [bannerSubtitle, setBannerSubtitle] = useState(TYPE_PRESETS.stroomstoring.bannerSubtitle);

  function handleTypeChange(next: EmergencyType) {
    setType(next);
    setBannerTitle(TYPE_PRESETS[next].bannerTitle);
    setBannerSubtitle(TYPE_PRESETS[next].bannerSubtitle);
  }

  function activate() {
    if (!message.trim()) return;
    const fresh: Emergency = {
      id: crypto.randomUUID(),
      type,
      title,
      bannerTitle,
      bannerSubtitle,
      message,
      timestamp: nowStamp(),
      startedAt: new Date().toISOString(),
      active: true,
    };
    emergencyStore.set((curr) => [
      fresh,
      ...curr.map((e) => (e.active ? { ...e, active: false } : e)),
    ]);
    setMessage('');
  }

  function endEmergency(id: string) {
    emergencyStore.set((curr) => curr.map((e) => (e.id === id ? { ...e, active: false } : e)));
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Noodstaat"
        description="Activeer een noodtoestand. Alle bewoners zien direct het waarschuwingsscherm in de app."
      />

      {active ? (
        <ActiveBanner emergency={active} onEnd={() => endEmergency(active.id)} />
      ) : (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          Geen actieve noodtoestand. Alle bewoners zien het normale dashboard.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <Card>
          <h2 className="font-bold text-[#0F172A] mb-4">
            {active ? 'Vervang actieve melding' : 'Nieuwe noodtoestand'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Type">
                <Select value={type} onChange={(e) => handleTypeChange(e.target.value as EmergencyType)}>
                  <option value="stroomstoring">Stroomstoring</option>
                  <option value="cyberaanval">Cyberaanval</option>
                  <option value="overstroming">Overstroming</option>
                  <option value="evacuatie">Evacuatie</option>
                  <option value="overig">Overig</option>
                </Select>
              </Field>
              <Field label="Modaal-titel">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>
            </div>

            <Field label="Banner-titel" hint="Verschijnt bovenaan elke pagina in de app.">
              <Input value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} />
            </Field>

            <Field label="Banner-ondertekst">
              <Input value={bannerSubtitle} onChange={(e) => setBannerSubtitle(e.target.value)} />
            </Field>

            <Field label="Bericht" hint="De volledige uitleg in het waarschuwingsmodaal.">
              <Textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bv. De stroom is uitgevallen in meerdere wijken. Controleer of buren hulp nodig hebben..."
              />
            </Field>

            <div className="pt-2">
              <Button tone="danger" onClick={activate} disabled={!message.trim()}>
                <Power className="w-4 h-4" />
                {active ? 'Vervang noodtoestand' : 'Activeer noodtoestand'}
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Voorbeeld
            </div>
            <Preview
              bannerTitle={bannerTitle}
              bannerSubtitle={bannerSubtitle}
              title={title}
              message={message || '(bericht verschijnt hier)'}
              timestamp={nowStamp()}
            />
          </Card>
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold text-[#0F172A] mb-3">Geschiedenis</h2>
          <div className="space-y-2">
            {history.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-lg px-4 py-3 border border-gray-100 flex items-baseline justify-between"
              >
                <div>
                  <span className="font-semibold text-sm">{e.bannerTitle}</span>
                  <span className="text-xs text-gray-500 ml-3">{e.timestamp}</span>
                </div>
                <Badge tone="gray">beëindigd</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveBanner({ emergency, onEnd }: { emergency: Emergency; onEnd: () => void }) {
  return (
    <div className="mb-6 bg-[#14342B] text-white rounded-xl p-5 flex items-start gap-4">
      <div className="p-2 bg-red-600 rounded-lg">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold">{emergency.bannerTitle}</span>
          <Badge tone="red">ACTIEF</Badge>
        </div>
        <div className="text-sm text-white/80">{emergency.bannerSubtitle}</div>
        <div className="text-xs text-white/50 mt-2">Sinds {emergency.timestamp}</div>
      </div>
      <Button tone="subtle" onClick={onEnd}>
        Beëindig
      </Button>
    </div>
  );
}

interface PreviewProps {
  bannerTitle: string;
  bannerSubtitle: string;
  title: string;
  message: string;
  timestamp: string;
}

function Preview({ bannerTitle, bannerSubtitle, title, message, timestamp }: PreviewProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-3">
      <div className="bg-[#14342B] rounded-lg p-3 mb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <div className="font-bold text-white text-sm">{bannerTitle}</div>
        </div>
        <div className="text-xs text-gray-300 mt-1.5 italic">{bannerSubtitle}</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <div className="font-bold text-sm">{title}</div>
        </div>
        <div className="border-t border-gray-200 my-2" />
        <div className="text-xs font-bold">{timestamp}</div>
        <div className="text-xs text-gray-700 mt-1 leading-relaxed">{message}</div>
        <div className="bg-[#14342B] text-white text-xs font-bold text-center py-2 rounded mt-3">
          Begrepen
        </div>
      </div>
    </div>
  );
}
