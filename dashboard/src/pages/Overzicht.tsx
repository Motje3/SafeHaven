import { AlertTriangle, Package, RotateCcw, Users, Warehouse } from 'lucide-react';

import { Badge, Button, Card } from '@/components/ui';
import { emergencyStore, inventoryStore, kastenStore, messagesStore, resetAll, useStore } from '@/data/store';
import { PageHeader } from '@/layout/PageHeader';

export function Overzicht() {
  const kasten = useStore(kastenStore);
  const inventory = useStore(inventoryStore);
  const emergencies = useStore(emergencyStore);
  const messages = useStore(messagesStore);

  const totalResidents = kasten.reduce((sum, k) => sum + k.residents, 0);
  const avgFill = kasten.length
    ? Math.round(kasten.reduce((sum, k) => sum + k.fillPercent, 0) / kasten.length)
    : 0;
  const active = emergencies.find((e) => e.active);
  const critical = inventory.filter((i) => i.status === 'critical').length;

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Overzicht"
        description="Status van alle noodkasten en bewoners op één plek."
        actions={
          <Button
            tone="ghost"
            onClick={() => {
              if (confirm('Demo-data herstellen? Alle wijzigingen gaan verloren.')) resetAll();
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset demo-data
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Noodkasten" value={kasten.length} icon={Warehouse} />
        <Kpi label="Bewoners" value={totalResidents} icon={Users} />
        <Kpi label="Gem. voorraad" value={`${avgFill}%`} icon={Package} />
        <Kpi
          label="Noodtoestand"
          value={active ? 'ACTIEF' : 'Inactief'}
          icon={AlertTriangle}
          tone={active ? 'alert' : 'default'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h3 className="font-bold text-[#0F172A] mb-3">Noodkasten</h3>
          <div className="divide-y divide-gray-100">
            {kasten.map((k) => (
              <div key={k.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{k.name}</div>
                  <div className="text-xs text-gray-500">{k.address} · {k.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{k.fillPercent}%</div>
                  <div className="text-xs text-gray-500">{k.residents} bewoners</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#0F172A] mb-3">Aandacht</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Items in kritieke staat</span>
              <Badge tone={critical > 0 ? 'red' : 'green'}>{critical}</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Actieve noodtoestand</span>
              <Badge tone={active ? 'red' : 'green'}>{active ? 'ja' : 'nee'}</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Verzonden berichten</span>
              <Badge tone="gray">{messages.length}</Badge>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

interface KpiProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: 'default' | 'alert';
}

function Kpi({ label, value, icon: Icon, tone = 'default' }: KpiProps) {
  const isAlert = tone === 'alert';
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            {label}
          </div>
          <div
            className={`text-3xl font-bold mt-2 ${isAlert ? 'text-red-600' : 'text-[#0F172A]'}`}
          >
            {value}
          </div>
        </div>
        <div
          className={`p-2 rounded-lg ${isAlert ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
