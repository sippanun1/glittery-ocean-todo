import { useState, lazy, Suspense } from 'react'
import { format, parseISO } from 'date-fns'
import { GripVertical, Calendar } from 'lucide-react'
import { clsx } from 'clsx'
import { useTaskStore } from '../../store/taskStore'
import { useUIStore } from '../../store/uiStore'
import { PriorityBadge, LabelBadge } from '../ui/Badge'
import type { Task } from '../../types/task'

const TaskCompletionBurst = lazy(() => import('./TaskCompletionBurst'))

const glowClass: Record<number, string> = {
  1: 'shadow-glow-p1 border-ocean-p1/30',
  2: 'shadow-glow-p2 border-ocean-p2/30',
  3: 'shadow-glow-p3 border-ocean-p3/20',
  4: 'border-ocean-border',
}

interface Props {
  task: Task
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>
  isDragging?: boolean
  onEdit?: (task: Task) => void
}

export default function TaskCard({ task, dragHandleProps, isDragging, onEdit }: Props) {
  const toggleComplete = useTaskStore((s) => s.toggleComplete)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const setLastAction = useUIStore((s) => s.setLastAction)
  const [showBurst, setShowBurst] = useState(false)

  function handleCheck() {
    if (!task.completed) setShowBurst(true)
    toggleComplete(task.id)
    setLastAction({
      type: task.completed ? 'uncomplete' : 'complete',
      task,
      timestamp: Date.now(),
    })
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    deleteTask(task.id)
    setLastAction({ type: 'delete', task, timestamp: Date.now() })
  }

  return (
    <div
      className={clsx(
        'group relative flex items-start gap-3 px-3 py-3 rounded-xl border',
        'bg-ocean-surface transition-all duration-150',
        'hover:border-ocean-accent/30 hover:bg-ocean-elevated',
        glowClass[task.priority],
        isDragging && 'opacity-50 scale-[0.98]',
        task.completed && 'opacity-50'
      )}
    >
      <Suspense fallback={null}>
        <TaskCompletionBurst show={showBurst} onDone={() => setShowBurst(false)} />
      </Suspense>

      {/* Drag handle */}
      <button
        {...dragHandleProps}
        className="mt-0.5 text-ocean-text-disabled opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing touch-none shrink-0"
        tabIndex={-1}
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </button>

      {/* Checkbox */}
      <button
        onClick={handleCheck}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        className={clsx(
          'mt-0.5 w-4 h-4 rounded border-2 shrink-0 transition-all duration-200 flex items-center justify-center',
          task.completed
            ? 'bg-ocean-seafoam border-ocean-seafoam'
            : 'border-ocean-border hover:border-ocean-accent'
        )}
      >
        {task.completed && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path
              d="M1 3l2 2 4-4"
              stroke="#0a0e1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit?.(task)}>
        <p
          className={clsx(
            'text-sm leading-snug break-words',
            task.completed ? 'line-through text-ocean-text-disabled' : 'text-ocean-text-primary'
          )}
        >
          {task.title}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <PriorityBadge priority={task.priority} />

          {task.dueDate && (
            <span
              className={clsx(
                'inline-flex items-center gap-1 text-[11px]',
                new Date(task.dueDate) < new Date() && !task.completed
                  ? 'text-ocean-p1'
                  : 'text-ocean-text-disabled'
              )}
            >
              <Calendar size={10} />
              {format(parseISO(task.dueDate), 'MMM d')}
              {task.dueTime && ` · ${task.dueTime}`}
            </span>
          )}

          {task.labels.map((label) => (
            <LabelBadge key={label} label={label} />
          ))}
        </div>
      </div>

      {/* Delete — visible on hover */}
      <button
        onClick={handleDelete}
        className="mt-0.5 text-ocean-text-disabled opacity-0 group-hover:opacity-100 hover:text-ocean-p1 transition-all shrink-0 text-sm leading-none"
        aria-label="Delete task"
        title="Delete"
      >
        ×
      </button>
    </div>
  )
}
