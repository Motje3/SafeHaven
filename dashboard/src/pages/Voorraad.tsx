import { Minus, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge, Button, Card, Field, Input, Select } from '@/components/ui';
import { inventoryStore, kastenStore, useStore } from '@/data/store';
import { PageHeader } from '@/layout/PageHeader';
import type { InventoryItem } from '@/types';

const CATEGORIES: { key: InventoryItem['category']; label: string }[] = [
  { key: 'voedsel', label: 'Voedsel' },
  { key: 'water', label: 'Water' },
  { key: 'verlichting', label: 'Verlichting' },
  { key: 'elektronica', label: 'Elektronica' },
  { key: 'ehbo', label: 'EHBO' },
];

function statusFor(count: number): InventoryItem['status'] {
  if (count <= 0) return 'critical';
  if (count <= 3) return 'warning';
  return 'ok';
}

function statusTone(status: InventoryItem['status']) {
  return status === 'critical' ? 'red' : status === 'warning' ? 'yellow' : 'green';
}

export function Voorraad() {
  const kasten = useStore(kastenStore);
  const inventory = useStore(inventoryStore);

  const [selectedKastId, setSelectedKastId] = useState(kasten[0]?.id ?? '');
  const [newItemCategory, setNewItemCategory] = useState<InventoryItem['category']>('voedsel');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('x');

  const items = useMemo(
    () => inventory.filter((i) => i.kastId === selectedKastId),
    [inventory, selectedKastId],
  );

  function updateCount(id: string, next: number) {
    const safe = Math.max(0, next);
    inventoryStore.set((curr) =>
      curr.map((i) => (i.id === id ? { ...i, count: safe, status: statusFor(safe) } : i)),
    );
  }

  function removeItem(id: string) {
    inventoryStore.set((curr) => curr.filter((i) => i.id !== id));
  }

  function addItem() {
    if (!newItemName.trim() || !selectedKastId) return;
    const count = Math.max(0, parseInt(newItemCount, 10) || 0);
    inventoryStore.set((curr) => [
      ...curr,
      {
        id: crypto.randomUUID(),
        kastId: selectedKastId,
        category: newItemCategory,
        name: newItemName.trim(),
        count,
        unit: newItemUnit.trim() || 'x',
        status: statusFor(count),
      },
    ]);
    setNewItemName('');
    setNewItemCount('1');
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Voorraad"
        description="Werk aantallen bij na een inspectie. Wijzigingen zijn direct zichtbaar in de app."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {kasten.map((k) => {
          const isActive = k.id === selectedKastId;
          return (
            <button
              key={k.id}
              onClick={() => setSelectedKastId(k.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#14342B] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>{k.name}</div>
              <div className={`text-xs font-normal ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                {k.fillPercent}% gevuld
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const catItems = items.filter((i) => i.category === cat.key);
            return (
              <Card key={cat.key}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#0F172A]">{cat.label}</h3>
                  <span className="text-xs text-gray-400">{catItems.length} items</span>
                </div>

                {catItems.length === 0 ? (
                  <p className="text-sm text-gray-400">Nog geen items in deze categorie.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {catItems.map((item) => (
                      <div key={item.id} className="py-3 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            <Badge tone={statusTone(item.status)}>{item.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateCount(item.id, item.count - 1)}
                            className="w-7 h-7 rounded border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-14 text-center text-sm font-bold">
                            {item.count} {item.unit}
                          </div>
                          <button
                            onClick={() => updateCount(item.id, item.count + 1)}
                            className="w-7 h-7 rounded border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          aria-label="Verwijder"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="h-fit">
          <h3 className="font-bold text-[#0F172A] mb-4">Nieuw item</h3>
          <div className="space-y-3">
            <Field label="Categorie">
              <Select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as InventoryItem['category'])}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Naam">
              <Input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Bv. Drinkwater" />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Aantal">
                <Input
                  type="number"
                  min={0}
                  value={newItemCount}
                  onChange={(e) => setNewItemCount(e.target.value)}
                />
              </Field>
              <Field label="Eenheid">
                <Input value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} placeholder="x of L" />
              </Field>
            </div>
            <Button onClick={addItem} disabled={!newItemName.trim()} className="w-full">
              <Plus className="w-4 h-4" />
              Toevoegen
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
