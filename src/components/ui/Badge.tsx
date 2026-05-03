import { clsx } from 'clsx'
import type { Priority } from '../../types/task'

// ── Priority badge ──────────────────────────────────────────────────────────

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

const priorityConfig: Record<Priority, { label: string; classes: string }> = {
  1: { label: 'P1', classes: 'bg-ocean-p1/20 text-ocean-p1 border-ocean-p1/40' },
  2: { label: 'P2', classes: 'bg-ocean-p2/20 text-ocean-p2 border-ocean-p2/40' },
  3: { label: 'P3', classes: 'bg-ocean-p3/20 text-ocean-p3 border-ocean-p3/40' },
  4: { label: 'P4', classes: 'bg-ocean-surface text-ocean-text-disabled border-ocean-border' },
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const { label, classes } = priorityConfig[priority]
  return (
    <span
      className={clsx(
        'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border',
        classes,
        className
      )}
    >
      {label}
    </span>
  )
}

// ── Label badge ─────────────────────────────────────────────────────────────

interface LabelBadgeProps {
  label: string
  onRemove?: () => void
  className?: string
}

export function LabelBadge({ label, onRemove, className }: LabelBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs',
        'bg-ocean-violet/20 text-ocean-violet border border-ocean-violet/30',
        className
      )}
    >
      #{label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:text-white transition-colors leading-none"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  )
}

// ── Generic badge ───────────────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs',
        'bg-ocean-surface text-ocean-text-muted border border-ocean-border',
        className
      )}
    >
      {children}
    </span>
  )
}
