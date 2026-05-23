import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button, Card, Field, Input, Textarea } from '@/components/ui';
import { contentStore, useStore } from '@/data/store';
import { PageHeader } from '@/layout/PageHeader';
import type { ContentItem } from '@/types';

const TABS: { key: ContentItem['type']; label: string }[] = [
  { key: 'video', label: "Video's" },
  { key: 'update', label: 'Overheidsupdates' },
  { key: 'rule', label: 'Gedragsregels' },
  { key: 'contact', label: 'Contacten' },
  { key: 'tip', label: 'Tips' },
];

export function Content() {
  const content = useStore(contentStore);
  const [tab, setTab] = useState<ContentItem['type']>('video');

  const items = content.filter((c) => c.type === tab).sort((a, b) => a.order - b.order);

  function remove(id: string) {
    contentStore.set((curr) => curr.filter((c) => c.id !== id));
  }

  function updateField(id: string, key: keyof ContentItem, value: string | number) {
    contentStore.set((curr) => curr.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  }

  function addItem(title: string, body: string) {
    const maxOrder = items.reduce((m, i) => Math.max(m, i.order), 0);
    contentStore.set((curr) => [
      ...curr,
      {
        id: crypto.randomUUID(),
        type: tab,
        title,
        body,
        order: maxOrder + 1,
        publishedAt: new Date().toISOString().slice(0, 10),
      },
    ]);
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Content beheer"
        description="Beheer wat er in de Informatie- en Noodupdates-tab van de app verschijnt."
      />

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key
                ? 'border-[#14342B] text-[#14342B]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-3">
          {items.length === 0 && (
            <Card>
              <p className="text-sm text-gray-400">Nog geen items in deze categorie.</p>
            </Card>
          )}
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-start gap-3">
                <div className="w-12 pt-2">
                  <Input
                    type="number"
                    value={item.order}
                    onChange={(e) => updateField(item.id, 'order', parseInt(e.target.value, 10) || 0)}
                    className="text-center"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    value={item.title}
                    onChange={(e) => updateField(item.id, 'title', e.target.value)}
                    className="font-semibold"
                  />
                  <Textarea
                    rows={2}
                    value={item.body}
                    onChange={(e) => updateField(item.id, 'body', e.target.value)}
                  />
                  <div className="text-xs text-gray-400">Gepubliceerd: {item.publishedAt}</div>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  aria-label="Verwijder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <NewItemCard onAdd={addItem} />
      </div>
    </div>
  );
}

function NewItemCard({ onAdd }: { onAdd: (title: string, body: string) => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function submit() {
    if (!title.trim()) return;
    onAdd(title.trim(), body.trim());
    setTitle('');
    setBody('');
  }

  return (
    <Card className="h-fit">
      <h3 className="font-bold text-[#0F172A] mb-4">Nieuw item</h3>
      <div className="space-y-3">
        <Field label="Titel">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label="Tekst">
          <Textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        </Field>
        <Button onClick={submit} disabled={!title.trim()} className="w-full">
          <Plus className="w-4 h-4" />
          Toevoegen
        </Button>
      </div>
    </Card>
  );
}
