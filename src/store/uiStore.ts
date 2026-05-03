import { create } from 'zustand'
import type { ViewMode, SidebarView, ModalType, LastAction } from '../types/task'

interface UIStore {
  viewMode: ViewMode
  activeView: SidebarView
  sidebarOpen: boolean
  searchQuery: string
  openModal: ModalType
  editingTaskId: string | null
  lastAction: LastAction | null
  undoTimeoutId: ReturnType<typeof setTimeout> | null

  setViewMode: (mode: ViewMode) => void
  setActiveView: (view: SidebarView) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSearchQuery: (query: string) => void
  setOpenModal: (modal: ModalType) => void
  setEditingTaskId: (id: string | null) => void
  setLastAction: (action: LastAction | null) => void
  clearLastAction: () => void
}

export const useUIStore = create<UIStore>()((set, get) => ({
  viewMode: 'list',
  activeView: 'today',
  sidebarOpen: true,
  searchQuery: '',
  openModal: null,
  editingTaskId: null,
  lastAction: null,
  undoTimeoutId: null,

  setViewMode: (mode) => set({ viewMode: mode }),

  setActiveView: (view) => set({ activeView: view }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setOpenModal: (modal) => set({ openModal: modal }),

  setEditingTaskId: (id) => set({ editingTaskId: id }),

  setLastAction: (action) => {
    const { undoTimeoutId } = get()
    if (undoTimeoutId) clearTimeout(undoTimeoutId)

    if (!action) {
      set({ lastAction: null, undoTimeoutId: null })
      return
    }

    // Auto-dismiss undo toast after 5 seconds
    const id = setTimeout(() => {
      set({ lastAction: null, undoTimeoutId: null })
    }, 5000)

    set({ lastAction: action, undoTimeoutId: id })
  },

  clearLastAction: () => {
    const { undoTimeoutId } = get()
    if (undoTimeoutId) clearTimeout(undoTimeoutId)
    set({ lastAction: null, undoTimeoutId: null })
  },
}))
