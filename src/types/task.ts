export type Priority = 1 | 2 | 3 | 4

export type KanbanColumn = 'todo' | 'inprogress' | 'done'

export type SidebarView = 'today' | 'inbox' | 'upcoming'

export type ViewMode = 'list' | 'kanban'

export type ModalType = 'task-form' | 'task-detail' | 'keyboard-help' | null

export interface SubTask {
  id: string
  title: string
  completed: boolean
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  daysOfWeek?: number[]
  dayOfMonth?: number
  skipWeekends?: boolean
  endDate?: string // UTC ISO string
}

export interface Task {
  id: string // nanoid(), UUID-compatible
  title: string
  description?: string
  priority: Priority
  dueDate: string | null // UTC ISO string — convert to local time at render only
  dueTime: string | null // "HH:MM" 24h
  completed: boolean
  completedAt: string | null // UTC ISO string
  labels: string[]
  subtasks: SubTask[]
  recurring?: RecurringPattern
  columnId: KanbanColumn // drives Kanban placement, independent of priority
  position: number // manual sort order within a view/column
  createdAt: string // UTC ISO string
  updatedAt: string // UTC ISO string
}

export interface LastAction {
  type: 'delete' | 'complete' | 'uncomplete'
  task: Task
  timestamp: number
}
