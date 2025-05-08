export class Habit {
  constructor(name, category, tag) {
    if (!name || typeof name !== 'string') {
      throw new Error('Habit name is required and must be a string')
    }
    if (!category || typeof category !== 'string') {
      throw new Error('Category is required and must be a string')
    }
    if (!tag || typeof tag !== 'string') {
      throw new Error('Tag is required and must be a string')
    }

    this.name = name.trim()
    this.category = category
    this.tag = tag
    this.completed = false
    this.createdAt = new Date()
  }

  toggleHabit() {
    this.completed = !this.completed
  }

  toJSON() {
    return {
      name: this.name,
      category: this.category,
      tag: this.tag,
      completed: this.completed,
      createdAt: this.createdAt,
    }
  }

  static fromJSON(json) {
    const habit = new Habit(json.name, json.category, json.tag)
    habit.completed = json.completed
    habit.createdAt = new Date(json.createdAt)
    return habit
  }
}
