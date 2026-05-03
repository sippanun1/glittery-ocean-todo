import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { isToday, isPast, parseISO, isWithinInterval, addDays } from 'date-fns'
import { useTaskStore } from '../store/taskStore'
import { useUIStore } from '../store/uiStore'
import type { Task } from '../types/task'

function isDueToday(task: Task): boolean {
  if (!task.dueDate) return false
  return isToday(parseISO(task.dueDate))
}

function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false
  return isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))
}

function isDueUpcoming(task: Task): boolean {
  if (!task.dueDate) return false
  const date = parseISO(task.dueDate)
  return isWithinInterval(date, { start: addDays(new Date(), 1), end: addDays(new Date(), 7) })
}

export function useTasks() {
  const tasks = useTaskStore((s) => s.tasks)
  const searchQuery = useUIStore((s) => s.searchQuery)
  const activeView = useUIStore((s) => s.activeView)

  const todayTasks = useMemo(
    () => tasks.filter((t) => !t.completed && (isDueToday(t) || isOverdue(t))),
    [tasks]
  )

  const inboxTasks = useMemo(() => tasks.filter((t) => !t.completed), [tasks])

  const upcomingTasks = useMemo(
    () => tasks.filter((t) => !t.completed && isDueUpcoming(t)),
    [tasks]
  )

  // Counts for sidebar badges
  const counts = useMemo(
    () => ({
      today: todayTasks.length,
      inbox: inboxTasks.length,
      upcoming: upcomingTasks.length,
    }),
    [todayTasks, inboxTasks, upcomingTasks]
  )

  // Base list for current view
  const baseTasks = useMemo(() => {
    if (activeView === 'today') return todayTasks
    if (activeView === 'upcoming') return upcomingTasks
    return inboxTasks
  }, [activeView, todayTasks, inboxTasks, upcomingTasks])

  // Fuzzy search when query is active
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return baseTasks
    const fuse = new Fuse(baseTasks, {
      keys: ['title', 'description'],
      threshold: 0.35,
    })
    return fuse.search(searchQuery).map((r) => r.item)
  }, [baseTasks, searchQuery])

  // Sort: incomplete first, then by priority (1→4), then by dueDate asc
  const sortedTasks = useMemo(
    () =>
      [...filteredTasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        if (a.priority !== b.priority) return a.priority - b.priority
        if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        return a.position - b.position
      }),
    [filteredTasks]
  )

  return { tasks: sortedTasks, counts, isOverdue }
}

export function useAllTasks() {
  return useTaskStore((s) => s.tasks)
}
