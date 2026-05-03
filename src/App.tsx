import { lazy, Suspense } from 'react'
import AppShell from './components/layout/AppShell'
import TaskView from './components/views/TaskView'
import UndoToast from './components/ui/UndoToast'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

const KeyboardHelpModal = lazy(() => import('./components/ui/KeyboardHelpModal'))

function AppContent() {
  useKeyboardShortcuts()
  return (
    <>
      <AppShell>
        <TaskView />
      </AppShell>
      <UndoToast />
      <Suspense fallback={null}>
        <KeyboardHelpModal />
      </Suspense>
    </>
  )
}

export default function App() {
  return <AppContent />
}
