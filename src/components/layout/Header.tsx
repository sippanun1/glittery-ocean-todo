import { Search, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import Input from '../ui/Input'

const VIEW_TITLES: Record<string, string> = {
  today: 'Today',
  inbox: 'Inbox',
  upcoming: 'Upcoming',
}

export default function Header() {
  const activeView = useUIStore((s) => s.activeView)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const searchQuery = useUIStore((s) => s.searchQuery)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const setSearchQuery = useUIStore((s) => s.setSearchQuery)

  return (
    <header className="flex items-center gap-3 px-4 h-14 border-b border-ocean-border bg-ocean-surface/80 backdrop-blur-sm shrink-0">
      {/* Sidebar toggle — hidden on mobile (bottom nav handles it) */}
      <button
        onClick={toggleSidebar}
        className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-ocean-text-disabled hover:text-ocean-text-muted hover:bg-ocean-elevated transition-colors"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
      </button>

      <h1 className="text-base font-semibold text-ocean-text-primary min-w-0 truncate">
        {VIEW_TITLES[activeView] ?? activeView}
      </h1>

      {/* Search */}
      <div className="flex-1 max-w-xs ml-auto">
        <Input
          placeholder="Search tasks…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={14} />}
          aria-label="Search tasks"
        />
      </div>
    </header>
  )
}
