function createHabitTracker(initialHabits = []) {
  let habits = initialHabits.filter((habit) => habit.completed)

  // Calculate current streak based on all habits being completed
  function getStreak() {
    if (habits.length === 0) return '0 days'

    let streak = 0
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    // Check if total completed habits equals total habits
    if (getTotalCompleted() === getTotalHabits()) {
      streak++
    }

    return `${streak} days`
  }

  function getTotalCompleted() {
    return habits.length
  }

  // Get total number of habits
  function getTotalHabits() {
    return initialHabits.length
  }

  // Calculate habit completion progress (percentage)
  function getCompletionProgress(date = new Date()) {
    const totalHabits = getTotalHabits()
    if (totalHabits === 0) return 0

    const completed = getTotalCompleted(date)
    return (completed / totalHabits) * 100
  }

  // Get all statistics for a specific date
  function getStats(date = new Date()) {
    return {
      totalHabits: getTotalHabits(),
      totalCompleted: getTotalCompleted(date),
      completionProgress: getCompletionProgress(date),
      currentStreak: getStreak(),
    }
  }

  return {
    getStreak,
    getTotalCompleted,
    getTotalHabits,
    // getStats,
    // completeHabit,
    // getCompletionProgress,
  }
}

export default createHabitTracker
