import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { clsx } from 'clsx'
import { useTaskStore } from '../../store/taskStore'
import TaskCard from './TaskCard'
import type { Task, KanbanColumn } from '../../types/task'

const COLUMNS: { id: KanbanColumn; label: string; accent: string }[] = [
  { id: 'todo', label: 'To Do', accent: 'border-t-ocean-text-disabled' },
  { id: 'inprogress', label: 'In Progress', accent: 'border-t-ocean-accent' },
  { id: 'done', label: 'Done', accent: 'border-t-ocean-seafoam' },
]

function KanbanColumn({
  id,
  label,
  accent,
  tasks,
  onEdit,
}: {
  id: KanbanColumn
  label: string
  accent: string
  tasks: Task[]
  onEdit?: (t: Task) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      className={clsx(
        'flex flex-col flex-1 min-w-0 rounded-xl border-t-2 border border-ocean-border bg-ocean-surface/50 transition-colors',
        accent,
        isOver && 'bg-ocean-elevated'
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-ocean-border">
        <span className="text-xs font-semibold text-ocean-text-muted uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[10px] text-ocean-text-disabled bg-ocean-elevated px-1.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div ref={setNodeRef} className="flex-1 p-2 flex flex-col gap-2 min-h-24">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <p className="text-[11px] text-ocean-text-disabled text-center py-4">Drop here</p>
        )}
      </div>
    </div>
  )
}

interface Props {
  tasks: Task[]
  onEdit?: (task: Task) => void
}

export default function TaskKanban({ tasks, onEdit }: Props) {
  const moveToColumn = useTaskStore((s) => s.moveToColumn)
  const reorderTasks = useTaskStore((s) => s.reorderTasks)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const overId = String(over.id)
    const activeId = String(active.id)

    // Dropped on a column
    const col = COLUMNS.find((c) => c.id === overId)
    if (col) {
      moveToColumn(activeId, col.id)
      return
    }

    // Dropped on another task — reorder within column
    if (activeId !== overId) reorderTasks(activeId, overId)
  }

  const byColumn = (col: KanbanColumn) => tasks.filter((t) => t.columnId === col)

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-3 h-full p-4 overflow-x-auto">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            label={col.label}
            accent={col.accent}
            tasks={byColumn(col.id)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </DndContext>
  )
}
