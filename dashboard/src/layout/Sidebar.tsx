import { NavLink } from 'react-router-dom';
import {
  AlertTriangle,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Shield,
} from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Overzicht', icon: LayoutDashboard, end: true },
  { to: '/noodstaat', label: 'Noodstaat', icon: AlertTriangle },
  { to: '/voorraad', label: 'Voorraad', icon: Package },
  { to: '/berichten', label: 'Berichten', icon: MessageSquare },
  { to: '/content', label: 'Content', icon: FileText },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full w-64 bg-[#14342B] text-white">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <Shield className="w-6 h-6 text-[#F5C842]" />
        <div>
          <div className="font-bold tracking-tight">SafeHaven</div>
          <div className="text-xs text-white/60">Beheerportaal</div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className="w-4.5 h-4.5" strokeWidth={2} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 text-xs text-white/50">
        v0.1 · MVP
      </div>
    </aside>
  );
}
