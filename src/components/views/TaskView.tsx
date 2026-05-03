import { useUIStore } from '../../store/uiStore'
import { useAllTasks, useTasks } from '../../hooks/useTasks'
import TaskForm from '../task/TaskForm'
import TaskList from '../task/TaskList'
import TaskKanban from '../task/TaskKanban'
import TaskCardSkeleton from '../task/TaskCardSkeleton'

const EMPTY: Record<string, { headline: string; sub: string }> = {
  today: { headline: 'Nothing due — enjoy the ocean', sub: "You're all caught up. Take a breath." },
  inbox: {
    headline: 'Drop your first task here',
    sub: 'Everything starts as an idea. Capture it.',
  },
  upcoming: {
    headline: 'Clear skies ahead',
    sub: 'No tasks on the horizon. Plan something great.',
  },
}

export default function TaskView() {
  const viewMode = useUIStore((s) => s.viewMode)
  const activeView = useUIStore((s) => s.activeView)
  const allTasks = useAllTasks()
  const { tasks } = useTasks()

  // Show skeletons briefly while Zustand hydrates (store has no tasks yet but localStorge may have some)
  const isHydrating =
    allTasks.length === 0 &&
    typeof window !== 'undefined' &&
    localStorage.getItem('glittery-ocean-tasks') !== null

  const empty = tasks.length === 0 && !isHydrating

  return (
    <div className="flex flex-col h-full">
      {/* Add task form */}
      <div className="px-4 pt-4 pb-2">
        <TaskForm />
      </div>

      {/* Task list / kanban */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 sm:pb-4">
        {isHydrating ? (
          <div className="flex flex-col gap-2 mt-2">
            {[1, 2, 3].map((i) => (
              <TaskCardSkeleton key={i} />
            ))}
          </div>
        ) : empty ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-3">
            <span className="text-4xl">🌊</span>
            <p className="text-base font-medium text-ocean-text-muted">
              {EMPTY[activeView]?.headline}
            </p>
            <p className="text-sm text-ocean-text-disabled">{EMPTY[activeView]?.sub}</p>
          </div>
        ) : viewMode === 'kanban' ? (
          <TaskKanban tasks={tasks} />
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <TaskList tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  )
}
