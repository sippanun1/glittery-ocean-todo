import { describe, it, expect } from 'vitest'
import { parseTaskInput } from '../naturalLanguageParser'

// Fixed reference date for deterministic tests: Monday 2026-05-04 09:00 UTC
const REF = new Date('2026-05-04T09:00:00.000Z')

function parse(input: string) {
  return parseTaskInput(input, REF)
}

describe('parseTaskInput — title extraction', () => {
  it('returns the plain text as title when no tags', () => {
    expect(parse('Buy groceries').title).toBe('Buy groceries')
  })

  it('strips priority tag from title', () => {
    expect(parse('File taxes !2').title).toBe('File taxes')
  })

  it('strips label tag from title', () => {
    expect(parse('Write report #work').title).toBe('Write report')
  })

  it('strips date text from title', () => {
    const { title } = parse('Call mom tomorrow')
    expect(title).toBe('Call mom')
  })

  it('strips all tags and date, leaving clean title', () => {
    const { title } = parse('Finish slides tomorrow !1 #work')
    expect(title).toBe('Finish slides')
  })

  it('falls back to original input if title becomes empty', () => {
    // Edge case: only a date was entered
    const { title } = parse('tomorrow')
    expect(title.length).toBeGreaterThan(0)
  })
})

describe('parseTaskInput — priority', () => {
  it('defaults to P4 when no priority tag', () => {
    expect(parse('Do laundry').priority).toBe(4)
  })

  it('parses !1 as priority 1', () => {
    expect(parse('Urgent task !1').priority).toBe(1)
  })

  it('parses !2 as priority 2', () => {
    expect(parse('Important task !2').priority).toBe(2)
  })

  it('parses !3 as priority 3', () => {
    expect(parse('Normal task !3').priority).toBe(3)
  })

  it('last priority tag wins when multiple are present', () => {
    expect(parse('Task !1 !3').priority).toBe(3)
  })

  it('handles priority tag at start', () => {
    expect(parse('!1 Critical fix').priority).toBe(1)
  })
})

describe('parseTaskInput — labels', () => {
  it('returns empty array when no label tags', () => {
    expect(parse('No labels here').labels).toEqual([])
  })

  it('extracts a single label', () => {
    expect(parse('Fix bug #work').labels).toEqual(['work'])
  })

  it('extracts multiple labels', () => {
    const { labels } = parse('Review PR #work #urgent')
    expect(labels).toContain('work')
    expect(labels).toContain('urgent')
  })

  it('normalises labels to lowercase', () => {
    expect(parse('Task #Work #URGENT').labels).toEqual(['work', 'urgent'])
  })

  it('deduplicates the same label', () => {
    expect(parse('Task #work #work').labels).toEqual(['work'])
  })
})

describe('parseTaskInput — dueDate', () => {
  it('returns null when no date mentioned', () => {
    expect(parse('No date task').dueDate).toBeNull()
  })

  it('parses "tomorrow" relative to reference date', () => {
    const { dueDate } = parse('Call dentist tomorrow')
    expect(dueDate).not.toBeNull()
    const parsed = new Date(dueDate!)
    // Tomorrow from 2026-05-04 is 2026-05-05
    expect(parsed.getUTCFullYear()).toBe(2026)
    expect(parsed.getUTCMonth()).toBe(4) // May = 4
    expect(parsed.getUTCDate()).toBe(5)
  })

  it('parses "today"', () => {
    const { dueDate } = parse('Quick task today')
    expect(dueDate).not.toBeNull()
    const parsed = new Date(dueDate!)
    expect(parsed.getUTCDate()).toBe(4) // reference date is May 4
  })

  it('parses an absolute date', () => {
    const { dueDate } = parse('Submit report June 15')
    expect(dueDate).not.toBeNull()
    const parsed = new Date(dueDate!)
    expect(parsed.getUTCMonth()).toBe(5) // June = 5
    expect(parsed.getUTCDate()).toBe(15)
  })

  it('parses "next Monday" (forwardDate: true)', () => {
    const { dueDate } = parse('Team meeting next Monday')
    expect(dueDate).not.toBeNull()
    const parsed = new Date(dueDate!)
    expect(parsed.getUTCDay()).toBe(1) // Monday
    // Must be in the future relative to reference
    expect(parsed.getTime()).toBeGreaterThan(REF.getTime())
  })

  it('stores dueDate as a UTC ISO string', () => {
    const { dueDate } = parse('Task tomorrow')
    expect(dueDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  })
})

describe('parseTaskInput — dueTime', () => {
  it('returns null when no time mentioned', () => {
    expect(parse('Task tomorrow').dueTime).toBeNull()
  })

  it('parses "at 3pm"', () => {
    const { dueTime } = parse('Call at 3pm')
    expect(dueTime).toBe('15:00')
  })

  it('parses "at 9am"', () => {
    const { dueTime } = parse('Standup at 9am')
    expect(dueTime).toBe('09:00')
  })

  it('parses "at 14:30"', () => {
    const { dueTime } = parse('Meeting at 14:30')
    expect(dueTime).toBe('14:30')
  })

  it('parses combined date and time', () => {
    const { dueDate, dueTime } = parse('Submit report tomorrow at 5pm')
    expect(dueDate).not.toBeNull()
    expect(dueTime).toBe('17:00')
  })
})

describe('parseTaskInput — combined', () => {
  it('handles a fully tagged input', () => {
    const result = parse('Finish slides tomorrow at 2pm !1 #work')
    expect(result.title).toBe('Finish slides')
    expect(result.priority).toBe(1)
    expect(result.labels).toEqual(['work'])
    expect(result.dueTime).toBe('14:00')
    expect(result.dueDate).not.toBeNull()
  })

  it('handles priority before title', () => {
    const result = parse('!2 Review PR tomorrow #team')
    expect(result.title).toBe('Review PR')
    expect(result.priority).toBe(2)
    expect(result.labels).toEqual(['team'])
  })
})
