import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '../../store/uiStore'
import { useTaskStore } from '../../store/taskStore'

export default function UndoToast() {
  const lastAction = useUIStore((s) => s.lastAction)
  const clearLastAction = useUIStore((s) => s.clearLastAction)
  const restoreTask = useTaskStore((s) => s.restoreTask)
  const toggleComplete = useTaskStore((s) => s.toggleComplete)

  function handleUndo() {
    if (!lastAction) return
    if (lastAction.type === 'delete') {
      restoreTask(lastAction.task)
    } else if (lastAction.type === 'complete') {
      toggleComplete(lastAction.task.id)
    } else if (lastAction.type === 'uncomplete') {
      toggleComplete(lastAction.task.id)
    }
    clearLastAction()
  }

  const label =
    lastAction?.type === 'delete'
      ? 'Task deleted'
      : lastAction?.type === 'complete'
        ? 'Task completed'
        : 'Task uncompleted'

  return (
    <AnimatePresence>
      {lastAction && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl border border-ocean-border bg-ocean-elevated shadow-glow-cyan text-sm whitespace-nowrap"
        >
          <span className="text-ocean-text-muted">{label}</span>
          <button
            onClick={handleUndo}
            className="text-ocean-accent font-semibold hover:opacity-80 transition-opacity"
          >
            Undo
          </button>
          <button
            onClick={clearLastAction}
            className="text-ocean-text-disabled hover:text-ocean-text-muted transition-colors ml-1"
            aria-label="Dismiss"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
