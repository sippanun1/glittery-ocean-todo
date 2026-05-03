import { type ReactNode } from 'react'
import { Sun, Inbox, Calendar } from 'lucide-react'
import { clsx } from 'clsx'
import { useUIStore } from '../../store/uiStore'
import OceanBackground from '../ui/OceanBackground'
import GlitterParticle from '../ui/GlitterParticle'
import Sidebar from './Sidebar'
import Header from './Header'
import type { SidebarView } from '../../types/task'

const mobileNavItems: { id: SidebarView; label: string; icon: React.ReactNode }[] = [
  { id: 'today', label: 'Today', icon: <Sun size={20} /> },
  { id: 'inbox', label: 'Inbox', icon: <Inbox size={20} /> },
  { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={20} /> },
]

interface Props {
  children: ReactNode
}

export default function AppShell({ children }: Props) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const activeView = useUIStore((s) => s.activeView)
  const setActiveView = useUIStore((s) => s.setActiveView)

  return (
    <div className="flex h-screen overflow-hidden text-ocean-text-primary">
      <OceanBackground />
      <GlitterParticle />

      {/* Sidebar — hidden on mobile, icon-only on tablet, full on desktop */}
      <div className="hidden sm:flex shrink-0">
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-ocean-border bg-ocean-surface/90 backdrop-blur-sm">
        {mobileNavItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={clsx(
              'flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors',
              activeView === id
                ? 'text-ocean-accent'
                : 'text-ocean-text-disabled hover:text-ocean-text-muted'
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
