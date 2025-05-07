// store habit in local storage
const storeHabitsInLocalStorage = function (habits) {
  if (!Array.isArray(habits)) {
    throw new Error(
      'Expected an array of habits to store, but received:',
      habits,
    )
  }

  try {
    const formattedHabits = JSON.stringify(habits)
    localStorage.setItem('habits', formattedHabits)
    console.log('Habits successfully stored:', habits)
  } catch (err) {
    console.error('Failed to store habits in localStorage:', err)
  }
}

export default storeHabitsInLocalStorage
