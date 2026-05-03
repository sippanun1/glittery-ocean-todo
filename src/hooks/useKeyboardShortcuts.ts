import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'

export function useKeyboardShortcuts() {
  const setOpenModal = useUIStore((s) => s.setOpenModal)
  const setSearchQuery = useUIStore((s) => s.setSearchQuery)
  const setActiveView = useUIStore((s) => s.setActiveView)

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      const typing =
        tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable

      // ? — keyboard help (always works)
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault()
        setOpenModal('keyboard-help')
        return
      }

      // Esc — close modals
      if (e.key === 'Escape') {
        setOpenModal(null)
        return
      }

      if (typing) return

      switch (e.key) {
        case 'n':
        case 'N':
          // Focus the task input
          document.querySelector<HTMLInputElement>('input[placeholder*="Add a task"]')?.focus()
          break
        case '/':
          e.preventDefault()
          document.querySelector<HTMLInputElement>('input[aria-label="Search tasks"]')?.focus()
          setSearchQuery('')
          break
        case '1':
          setActiveView('today')
          break
        case '2':
          setActiveView('inbox')
          break
        case '3':
          setActiveView('upcoming')
          break
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpenModal, setSearchQuery, setActiveView])
}
