import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { Task, Priority, KanbanColumn, SubTask, RecurringPattern } from '../types/task'

const SCHEMA_VERSION = 1

interface TaskStore {
  tasks: Task[]
  labels: string[]

  addTask: (input: {
    title: string
    description?: string
    priority?: Priority
    dueDate?: string | null
    dueTime?: string | null
    labels?: string[]
    columnId?: KanbanColumn
    subtasks?: SubTask[]
    recurring?: RecurringPattern
  }) => Task

  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  deleteTask: (id: string) => void
  toggleComplete: (id: string) => void

  // Restores a previously deleted or un-completed task (used by undo)
  restoreTask: (task: Task) => void

  reorderTasks: (activeId: string, overId: string) => void
  moveToColumn: (taskId: string, columnId: KanbanColumn) => void

  addLabel: (label: string) => void
  removeLabel: (label: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      labels: [],

      addTask: (input) => {
        const now = new Date().toISOString()
        const maxPosition = get().tasks.reduce((max, t) => Math.max(max, t.position), -1)
        const task: Task = {
          id: nanoid(),
          title: input.title,
          description: input.description,
          priority: input.priority ?? 4,
          dueDate: input.dueDate ?? null,
          dueTime: input.dueTime ?? null,
          completed: false,
          completedAt: null,
          labels: input.labels ?? [],
          subtasks: input.subtasks ?? [],
          recurring: input.recurring,
          columnId: input.columnId ?? 'todo',
          position: maxPosition + 1,
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ tasks: [...state.tasks, task] }))
        return task
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }))
      },

      toggleComplete: (id) => {
        const now = new Date().toISOString()
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id !== id) return t
            const completed = !t.completed
            return {
              ...t,
              completed,
              completedAt: completed ? now : null,
              columnId: completed ? 'done' : 'todo',
              updatedAt: now,
            }
          }),
        }))
      },

      restoreTask: (task) => {
        set((state) => {
          const exists = state.tasks.some((t) => t.id === task.id)
          if (exists) return state
          return { tasks: [...state.tasks, task] }
        })
      },

      reorderTasks: (activeId, overId) => {
        set((state) => {
          const tasks = [...state.tasks]
          const activeIndex = tasks.findIndex((t) => t.id === activeId)
          const overIndex = tasks.findIndex((t) => t.id === overId)
          if (activeIndex === -1 || overIndex === -1) return state

          const [moved] = tasks.splice(activeIndex, 1)
          tasks.splice(overIndex, 0, moved)

          // Re-assign positions to preserve order
          return {
            tasks: tasks.map((t, i) => ({ ...t, position: i })),
          }
        })
      },

      moveToColumn: (taskId, columnId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, columnId, updatedAt: new Date().toISOString() } : t
          ),
        }))
      },

      addLabel: (label) => {
        set((state) => {
          if (state.labels.includes(label)) return state
          return { labels: [...state.labels, label] }
        })
      },

      removeLabel: (label) => {
        set((state) => ({
          labels: state.labels.filter((l) => l !== label),
          tasks: state.tasks.map((t) => ({
            ...t,
            labels: t.labels.filter((l) => l !== label),
          })),
        }))
      },
    }),
    {
      name: 'glittery-ocean-tasks',
      version: SCHEMA_VERSION,
      migrate: (persistedState, version) => {
        // v0 → v1: no-op, first version
        if (version === 0) {
          return persistedState as TaskStore
        }
        return persistedState as TaskStore
      },
    }
  )
)
