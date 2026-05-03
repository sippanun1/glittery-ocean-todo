import { Sun, Inbox, Calendar, List, LayoutGrid } from 'lucide-react'
import { clsx } from 'clsx'
import { useUIStore } from '../../store/uiStore'
import { useTasks } from '../../hooks/useTasks'
import type { SidebarView, ViewMode } from '../../types/task'

interface NavItem {
  id: SidebarView
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'today', label: 'Today', icon: <Sun size={16} /> },
  { id: 'inbox', label: 'Inbox', icon: <Inbox size={16} /> },
  { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={16} /> },
]

interface Props {
  collapsed?: boolean
}

export default function Sidebar({ collapsed = false }: Props) {
  const activeView = useUIStore((s) => s.activeView)
  const viewMode = useUIStore((s) => s.viewMode)
  const setActiveView = useUIStore((s) => s.setActiveView)
  const setViewMode = useUIStore((s) => s.setViewMode)
  const { counts } = useTasks()

  const countMap: Record<SidebarView, number> = {
    today: counts.today,
    inbox: counts.inbox,
    upcoming: counts.upcoming,
  }

  return (
    <aside
      className={clsx(
        'flex flex-col h-full bg-ocean-surface border-r border-ocean-border transition-all duration-250',
        collapsed ? 'w-12' : 'w-60'
      )}
    >
      {/* Logo */}
      <div
        className={clsx(
          'flex items-center gap-2.5 px-4 py-5 border-b border-ocean-border',
          collapsed && 'justify-center px-0'
        )}
      >
        <span className="text-xl">🌊</span>
        {!collapsed && (
          <span className="text-sm font-semibold text-ocean-accent tracking-wide">
            Glittery Ocean
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map(({ id, label, icon }) => {
          const count = countMap[id]
          const active = activeView === id
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-ocean-accent/15 text-ocean-accent'
                  : 'text-ocean-text-muted hover:bg-ocean-elevated hover:text-ocean-text-primary',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? label : undefined}
            >
              <span className={clsx(active && 'text-ocean-accent')}>{icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{label}</span>
                  {count > 0 && (
                    <span
                      className={clsx(
                        'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                        active
                          ? 'bg-ocean-accent/20 text-ocean-accent'
                          : 'bg-ocean-elevated text-ocean-text-disabled'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* View mode toggle */}
      <div
        className={clsx(
          'p-2 border-t border-ocean-border',
          collapsed ? 'flex flex-col gap-1' : 'flex gap-1'
        )}
      >
        {(['list', 'kanban'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            title={mode === 'list' ? 'List view' : 'Board view'}
            className={clsx(
              'flex items-center justify-center p-2 rounded-lg transition-all duration-150',
              viewMode === mode
                ? 'bg-ocean-accent/15 text-ocean-accent'
                : 'text-ocean-text-disabled hover:text-ocean-text-muted hover:bg-ocean-elevated',
              !collapsed && 'flex-1'
            )}
          >
            {mode === 'list' ? <List size={15} /> : <LayoutGrid size={15} />}
          </button>
        ))}
      </div>
    </aside>
  )
}
