import Modal from './Modal'
import { useUIStore } from '../../store/uiStore'

const SHORTCUTS = [
  { keys: ['N'], desc: 'New task — focus the add input' },
  { keys: ['/'], desc: 'Search tasks' },
  { keys: ['1'], desc: 'Switch to Today view' },
  { keys: ['2'], desc: 'Switch to Inbox view' },
  { keys: ['3'], desc: 'Switch to Upcoming view' },
  { keys: ['?'], desc: 'Show this help' },
  { keys: ['Esc'], desc: 'Close modal / cancel input' },
  { keys: ['Enter'], desc: 'Submit task form' },
]

export default function KeyboardHelpModal() {
  const openModal = useUIStore((s) => s.openModal)
  const setOpenModal = useUIStore((s) => s.setOpenModal)

  return (
    <Modal
      open={openModal === 'keyboard-help'}
      onClose={() => setOpenModal(null)}
      title="Keyboard Shortcuts"
      size="sm"
    >
      <div className="flex flex-col gap-2">
        {SHORTCUTS.map(({ keys, desc }) => (
          <div key={desc} className="flex items-center justify-between gap-4">
            <span className="text-sm text-ocean-text-muted">{desc}</span>
            <div className="flex gap-1 shrink-0">
              {keys.map((k) => (
                <kbd
                  key={k}
                  className="px-2 py-0.5 text-xs rounded-md bg-ocean-surface border border-ocean-border text-ocean-text-primary font-mono"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
