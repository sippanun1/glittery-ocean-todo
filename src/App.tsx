import AppShell from './components/layout/AppShell'
import TaskView from './components/views/TaskView'
import UndoToast from './components/ui/UndoToast'
import KeyboardHelpModal from './components/ui/KeyboardHelpModal'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function AppContent() {
  useKeyboardShortcuts()
  return (
    <>
      <AppShell>
        <TaskView />
      </AppShell>
      <UndoToast />
      <KeyboardHelpModal />
    </>
  )
}

export default function App() {
  return <AppContent />
}
