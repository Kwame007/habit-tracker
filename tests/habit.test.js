import Habit from '../habit.js'

describe('Habit', () => {
  let habit

  beforeEach(() => {
    habit = new Habit('Exercise', 'health', 'morning')
  })

  test('should create a habit with correct properties', () => {
    expect(habit.name).toBe('Exercise')
    expect(habit.category).toBe('health')
    expect(habit.tag).toBe('morning')
    expect(habit.completed).toBe(false)
    expect(habit.createdAt).toBeInstanceOf(Date)
  })

  test('should toggle habit completion status', () => {
    expect(habit.completed).toBe(false)
    habit.toggleHabit()
    expect(habit.completed).toBe(true)
    habit.toggleHabit()
    expect(habit.completed).toBe(false)
  })

  test('should create habit with default values when not provided', () => {
    const defaultHabit = new Habit('Read', 'general', 'anytime')
    expect(defaultHabit.name).toBe('Read')
    expect(defaultHabit.category).toBe('general')
    expect(defaultHabit.tag).toBe('anytime')
    expect(defaultHabit.completed).toBe(false)
  })
})
