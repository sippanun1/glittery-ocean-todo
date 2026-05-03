import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTaskStore } from '../../store/taskStore'
import TaskCard from './TaskCard'
import type { Task } from '../../types/task'

function SortableTaskCard({ task, onEdit }: { task: Task; onEdit?: (t: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}>
      <TaskCard
        task={task}
        isDragging={isDragging}
        onEdit={onEdit}
        dragHandleProps={{ ...attributes, ...listeners } as React.HTMLAttributes<HTMLButtonElement>}
      />
    </div>
  )
}

interface Props {
  tasks: Task[]
  onEdit?: (task: Task) => void
}

export default function TaskList({ tasks, onEdit }: Props) {
  const reorderTasks = useTaskStore((s) => s.reorderTasks)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderTasks(String(active.id), String(over.id))
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
