import { Send, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge, Button, Card, Field, Input, Select, Textarea } from '@/components/ui';
import { kastenStore, messagesStore, useStore } from '@/data/store';
import { PageHeader } from '@/layout/PageHeader';
import type { MessageTarget } from '@/types';

export function Berichten() {
  const messages = useStore(messagesStore);
  const kasten = useStore(kastenStore);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState<MessageTarget>('all');
  const [targetKastId, setTargetKastId] = useState(kasten[0]?.id ?? '');
  const [responseType, setResponseType] = useState<'none' | 'ja-nee'>('none');

  function send() {
    if (!title.trim() || !body.trim()) return;
    messagesStore.set((curr) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        body: body.trim(),
        target,
        targetId: target === 'kast' ? targetKastId : undefined,
        responseType,
        sentAt: new Date().toISOString(),
      },
      ...curr,
    ]);
    setTitle('');
    setBody('');
  }

  function remove(id: string) {
    messagesStore.set((curr) => curr.filter((m) => m.id !== id));
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Berichten"
        description="Stuur meldingen die in de Community-feed van bewoners verschijnen."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
        <Card className="h-fit">
          <h3 className="font-bold text-[#0F172A] mb-4">Nieuw bericht</h3>
          <div className="space-y-4">
            <Field label="Titel">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bv. Update stroomstoring" />
            </Field>
            <Field label="Bericht">
              <Textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            </Field>
            <Field label="Doelgroep">
              <Select value={target} onChange={(e) => setTarget(e.target.value as MessageTarget)}>
                <option value="all">Alle bewoners</option>
                <option value="kast">Eén specifieke kast</option>
                <option value="wijk">Specifieke wijk</option>
              </Select>
            </Field>
            {target === 'kast' && (
              <Field label="Kast">
                <Select value={targetKastId} onChange={(e) => setTargetKastId(e.target.value)}>
                  {kasten.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
            <Field label="Reactietype">
              <Select value={responseType} onChange={(e) => setResponseType(e.target.value as 'none' | 'ja-nee')}>
                <option value="none">Geen reactie</option>
                <option value="ja-nee">Ja / Nee knoppen</option>
              </Select>
            </Field>
            <Button onClick={send} disabled={!title.trim() || !body.trim()} className="w-full">
              <Send className="w-4 h-4" />
              Versturen
            </Button>
          </div>
        </Card>

        <div>
          <h3 className="font-bold text-[#0F172A] mb-3">Verzonden ({messages.length})</h3>
          <div className="space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-gray-400">Nog geen berichten verstuurd.</p>
            )}
            {messages.map((m) => {
              const kastName = m.targetId ? kasten.find((k) => k.id === m.targetId)?.name : null;
              return (
                <Card key={m.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold">{m.title}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(m.sentAt).toLocaleString('nl-NL')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">{m.body}</div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge tone="gray">
                          {m.target === 'all' ? 'Alle bewoners' : kastName ?? m.target}
                        </Badge>
                        {m.responseType === 'ja-nee' && <Badge tone="green">Ja/Nee</Badge>}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(m.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      aria-label="Verwijder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
