function createHabitTracker(initialHabits = []) {
  let habits = initialHabits.filter((habit) => habit.completed)


  // Add a new habit
  function addHabit(habit) {
    if (habit.completed && !habits.find((h) => h.name === habit.name)) {
      habits.push(habit)
    }
  }

  // Mark a habit as completed for a specific date
  function completeHabit(habit, date = new Date()) {
    const existingHabit = habits.find((h) => h.name === habit.name)
    if (!existingHabit) {
      throw new Error('Habit does not exist')
    }

    const dateStr = date.toISOString().split('T')[0]
    if (!existingHabit.completionHistory) {
      existingHabit.completionHistory = []
    }
    existingHabit.completionHistory.push(dateStr)
  }

  // Check if all habits were completed for a specific date
  function wereAllHabitsCompleted(date) {
    const dateStr = date.toISOString().split('T')[0]
    return habits.every((habit) => {
      return (
        habit.completionHistory && habit.completionHistory.includes(dateStr)
      )
    })
  }

  // Calculate current streak based on all habits being completed
  function getStreak() {
    if (habits.length === 0) return '0 days'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let streak = 0
    let currentDate = new Date(today)

    // Check if all habits are completed for today
    if (!wereAllHabitsCompleted(currentDate)) {
      // If not completed today, check yesterday
      currentDate.setDate(currentDate.getDate() - 1)
      if (!wereAllHabitsCompleted(currentDate)) {
        return '0 days' // Streak broken if not completed yesterday either
      }
    }

    // Count consecutive days where all habits were completed
    while (wereAllHabitsCompleted(currentDate)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    }

    return `${streak} days`
  }

  // Get total completed habits for a specific date
  function getTotalCompleted(date = new Date()) {
    const dateStr = date.toISOString().split('T')[0]
    let completed = 0

    for (const habit of habits) {
      if (
        habit.completionHistory &&
        habit.completionHistory.includes(dateStr)
      ) {
        completed++
      }
    }

    return completed
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
    addHabit,
    completeHabit,
    getStats,
    getStreak,
    getTotalCompleted,
    getTotalHabits,
    getCompletionProgress,
  }
}

export default createHabitTracker;