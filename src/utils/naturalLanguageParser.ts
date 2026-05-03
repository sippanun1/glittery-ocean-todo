import * as chrono from 'chrono-node'
import type { Priority } from '../types/task'

export interface ParsedInput {
  title: string
  dueDate: string | null // UTC ISO string
  dueTime: string | null // "HH:MM" 24h format
  priority: Priority
  labels: string[]
}

// Matches !1 !2 !3 !4 (with optional trailing space)
const PRIORITY_RE = /\s*!([1-4])\b/g

// Matches #word (label tags)
const LABEL_RE = /\s*#(\w+)/g

export function parseTaskInput(input: string, now = new Date()): ParsedInput {
  let text = input.trim()

  // 1. Extract priority tags — last one wins if multiple
  let priority: Priority = 4
  text = text.replace(PRIORITY_RE, (_, p) => {
    priority = Number(p) as Priority
    return ''
  })

  // 2. Extract label tags
  const labels: string[] = []
  text = text.replace(LABEL_RE, (_, label: string) => {
    const normalized = label.toLowerCase()
    if (!labels.includes(normalized)) labels.push(normalized)
    return ''
  })

  // 3. Extract date/time with chrono-node
  const results = chrono.parse(text, now, { forwardDate: true })

  let dueDate: string | null = null
  let dueTime: string | null = null

  if (results.length > 0) {
    const result = results[0]
    const date = result.start.date()
    dueDate = date.toISOString()

    // Only set dueTime if the user explicitly mentioned an hour
    if (result.start.isCertain('hour')) {
      const h = result.start.get('hour') ?? 0
      const m = result.start.get('minute') ?? 0
      dueTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }

    // Remove the matched date text from the title
    text = (text.slice(0, result.index) + text.slice(result.index + result.text.length)).trim()
  }

  const title = text.replace(/\s+/g, ' ').trim()

  return { title: title || input.trim(), dueDate, dueTime, priority, labels }
}

// Convenience: just extract a Date (or null) from freeform text
export function parseDate(text: string, now = new Date()): Date | null {
  return chrono.parseDate(text, now, { forwardDate: true })
}
