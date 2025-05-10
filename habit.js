class Habit {
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
    this.completionHistory = [] // Array of dates when the habit was completed
    this.completedHabits = [] // Array of dates when the habit was completed
  }

  toggleHabit() {
    this.completed = !this.completed
    if (this.completed) {
      // Add today's date to completion history when marking as completed
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateStr = today.toISOString().split('T')[0]

      if (this.completed) {
        this.completedHabits.push(dateStr)
      }

      // if (!this.completionHistory.includes(dateStr)) {
      //   this.completionHistory.push(dateStr)
      // }

      console.log(today)
      console.log(dateStr)
    } else {
      this.completedHabits.pop()
    }

    console.log(this.completionHistory)
    console.log(this.completedHabits)
  }

  toJSON() {
    return {
      name: this.name,
      category: this.category,
      tag: this.tag,
      completed: this.completed,
      createdAt: this.createdAt,
      completionHistory: this.completionHistory,
    }
  }

  static fromJSON(json) {
    const habit = new Habit(json.name, json.category, json.tag)
    habit.completed = json.completed
    habit.createdAt = new Date(json.createdAt)
    habit.completionHistory = json.completionHistory || []
    return habit
  }
}

export default Habit
