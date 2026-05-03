import { useState, useRef, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { Calendar, Flag } from 'lucide-react'
import { clsx } from 'clsx'
import { useTaskStore } from '../../store/taskStore'
import { parseTaskInput } from '../../utils/naturalLanguageParser'

interface Props {
  onClose?: () => void
  autoFocus?: boolean
}

const PRIORITY_COLORS: Record<number, string> = {
  1: 'text-ocean-p1',
  2: 'text-ocean-p2',
  3: 'text-ocean-p3',
  4: 'text-ocean-text-disabled',
}

export default function TaskForm({ onClose, autoFocus = true }: Props) {
  const [value, setValue] = useState('')
  const addTask = useTaskStore((s) => s.addTask)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const parsed = value.trim() ? parseTaskInput(value) : null

  function handleSubmit() {
    if (!parsed?.title) return
    addTask({
      title: parsed.title,
      priority: parsed.priority,
      dueDate: parsed.dueDate,
      dueTime: parsed.dueTime,
      labels: parsed.labels,
    })
    setValue('')
    onClose?.()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === 'Escape') {
      setValue('')
      onClose?.()
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Add a task… try "Call dentist tomorrow at 3pm !2 #health"'
        className={clsx(
          'w-full bg-ocean-elevated border border-ocean-border rounded-xl',
          'px-4 py-3 text-sm text-ocean-text-primary placeholder:text-ocean-text-disabled',
          'outline-none focus:border-ocean-accent focus:shadow-glow-cyan transition-all duration-150'
        )}
      />

      {/* Live preview of parsed meta */}
      {parsed && parsed.title && (
        <div className="flex items-center gap-3 px-4 text-[11px]">
          {parsed.dueDate && (
            <span className="inline-flex items-center gap-1 text-ocean-text-muted">
              <Calendar size={10} />
              {format(parseISO(parsed.dueDate), 'MMM d')}
              {parsed.dueTime && ` · ${parsed.dueTime}`}
            </span>
          )}
          {parsed.priority < 4 && (
            <span
              className={clsx('inline-flex items-center gap-1', PRIORITY_COLORS[parsed.priority])}
            >
              <Flag size={10} />P{parsed.priority}
            </span>
          )}
          {parsed.labels.map((l) => (
            <span key={l} className="text-ocean-violet">
              #{l}
            </span>
          ))}
          <span className="ml-auto text-ocean-text-disabled">Enter ↵ to add · Esc to cancel</span>
        </div>
      )}
    </div>
  )
}
