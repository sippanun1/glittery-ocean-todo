import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore } from '../taskStore'

function getStore() {
  return useTaskStore.getState()
}

function resetStore() {
  useTaskStore.setState({ tasks: [], labels: [] })
}

describe('taskStore', () => {
  beforeEach(resetStore)

  describe('addTask', () => {
    it('creates a task with defaults', () => {
      const task = getStore().addTask({ title: 'Buy groceries' })

      expect(task.title).toBe('Buy groceries')
      expect(task.priority).toBe(4)
      expect(task.completed).toBe(false)
      expect(task.columnId).toBe('todo')
      expect(task.dueDate).toBeNull()
      expect(task.id).toBeTruthy()
    })

    it('assigns sequential positions', () => {
      getStore().addTask({ title: 'First' })
      getStore().addTask({ title: 'Second' })
      getStore().addTask({ title: 'Third' })

      const { tasks } = getStore()
      expect(tasks[0].position).toBe(0)
      expect(tasks[1].position).toBe(1)
      expect(tasks[2].position).toBe(2)
    })

    it('respects provided priority and dueDate', () => {
      const task = getStore().addTask({
        title: 'Urgent',
        priority: 1,
        dueDate: '2026-05-10T00:00:00.000Z',
      })

      expect(task.priority).toBe(1)
      expect(task.dueDate).toBe('2026-05-10T00:00:00.000Z')
    })
  })

  describe('updateTask', () => {
    it('updates specified fields', () => {
      const task = getStore().addTask({ title: 'Old title' })
      getStore().updateTask(task.id, { title: 'New title', priority: 2 })

      const updated = getStore().tasks.find((t) => t.id === task.id)!
      expect(updated.title).toBe('New title')
      expect(updated.priority).toBe(2)
    })
  })

  describe('deleteTask', () => {
    it('removes the task from the list', () => {
      const task = getStore().addTask({ title: 'To delete' })
      getStore().deleteTask(task.id)

      expect(getStore().tasks.find((t) => t.id === task.id)).toBeUndefined()
    })
  })

  describe('toggleComplete', () => {
    it('marks a task complete and sets columnId to done', () => {
      const task = getStore().addTask({ title: 'Finish report' })
      getStore().toggleComplete(task.id)

      const updated = getStore().tasks.find((t) => t.id === task.id)!
      expect(updated.completed).toBe(true)
      expect(updated.completedAt).toBeTruthy()
      expect(updated.columnId).toBe('done')
    })

    it('un-completes a task and resets columnId to todo', () => {
      const task = getStore().addTask({ title: 'Finish report' })
      getStore().toggleComplete(task.id) // complete
      getStore().toggleComplete(task.id) // uncomplete

      const updated = getStore().tasks.find((t) => t.id === task.id)!
      expect(updated.completed).toBe(false)
      expect(updated.completedAt).toBeNull()
      expect(updated.columnId).toBe('todo')
    })
  })

  describe('restoreTask', () => {
    it('adds a task back if it no longer exists', () => {
      const task = getStore().addTask({ title: 'Restore me' })
      getStore().deleteTask(task.id)
      getStore().restoreTask(task)

      expect(getStore().tasks.find((t) => t.id === task.id)).toBeDefined()
    })

    it('does not duplicate a task that already exists', () => {
      const task = getStore().addTask({ title: 'Already here' })
      getStore().restoreTask(task)

      expect(getStore().tasks.filter((t) => t.id === task.id)).toHaveLength(1)
    })
  })

  describe('reorderTasks', () => {
    it('moves a task to a new position and re-assigns positions', () => {
      const a = getStore().addTask({ title: 'A' })
      getStore().addTask({ title: 'B' })
      const c = getStore().addTask({ title: 'C' })

      // Move A to where C is
      getStore().reorderTasks(a.id, c.id)

      const tasks = getStore().tasks
      const titles = tasks.map((t) => t.title)
      expect(titles.indexOf('A')).toBeGreaterThan(titles.indexOf('B'))
      // All positions are sequential 0..n
      tasks.forEach((t, i) => expect(t.position).toBe(i))
    })
  })

  describe('moveToColumn', () => {
    it('changes the columnId of a task', () => {
      const task = getStore().addTask({ title: 'Move me' })
      getStore().moveToColumn(task.id, 'inprogress')

      const updated = getStore().tasks.find((t) => t.id === task.id)!
      expect(updated.columnId).toBe('inprogress')
    })
  })

  describe('labels', () => {
    it('adds a label without duplicates', () => {
      getStore().addLabel('work')
      getStore().addLabel('work')

      expect(getStore().labels.filter((l) => l === 'work')).toHaveLength(1)
    })

    it('removes a label and strips it from all tasks', () => {
      getStore().addLabel('work')
      getStore().addTask({ title: 'Tagged task', labels: ['work'] })
      getStore().removeLabel('work')

      expect(getStore().labels).not.toContain('work')
      expect(getStore().tasks[0].labels).not.toContain('work')
    })
  })
})
