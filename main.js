import renderHabits from './ui.js'
import storeHabitsInLocalStorage from './storage.js'

// get the form inputs (moved up to avoid undefined usage)
const form = document.querySelector('.habit-modal__form')
const habitName = document.querySelector('.habit-modal__input')
const habitCategory = document.querySelectorAll('.habit-modal__category-btn')
const habitTags = document.querySelectorAll('.habit-modal__time-btn')
const emptyText = document.querySelector('.main__content-habits-empty')

// modal
const modal = document.querySelector('.habit-modal')
const overlay = document.querySelector('.habit-modal__overlay')
const openModalBtns = document.querySelectorAll('.modal-open')
const closeModalBtn = document.querySelector('.habit-modal__close-btn')
const cancelModalBtn = document.querySelector('.habit-modal__cancel-btn')

// close modal function
const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
  document.body.style.overflow = ''

  // reset the form
  habitName.value = ''
  habitCategory.forEach((btn) =>
    btn.classList.remove('habit-modal__category-btn--active'),
  )
  habitTags.forEach((btn) =>
    btn.classList.remove('habit-modal__time-btn--active'),
  )
}

// open modal function
const openModal = function () {
  habitCategory.forEach((btn) =>
    btn.classList.remove('habit-modal__category-btn--active'),
  )
  if (habitCategory[5])
    habitCategory[5].classList.add('habit-modal__category-btn--active')

  habitTags.forEach((btn) =>
    btn.classList.remove('habit-modal__time-btn--active'),
  )
  if (habitTags[3]) habitTags[3].classList.add('habit-modal__time-btn--active')

  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
  habitName.focus()
}

// Modal event listeners
openModalBtns.forEach((btn) => btn.addEventListener('click', openModal))
closeModalBtn.addEventListener('click', closeModal)
cancelModalBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

// Habit class
class Habit {
  constructor(name, category, tag) {
    this.name = name
    this.category = category
    this.tag = tag
    this.completed = false
    this.createdAt = new Date()
  }

  toggleHabit() {
    this.completed = !this.completed
  }
}

// Handle category selection
habitCategory.forEach(function (btn) {
  btn.addEventListener('click', function () {
    habitCategory.forEach((b) =>
      b.classList.remove('habit-modal__category-btn--active'),
    )
    btn.classList.add('habit-modal__category-btn--active')
  })
})

// Handle tag selection
habitTags.forEach(function (btn) {
  btn.addEventListener('click', function () {
    habitTags.forEach((b) =>
      b.classList.remove('habit-modal__time-btn--active'),
    )
    btn.classList.add('habit-modal__time-btn--active')
  })
})

let habits = []

// Get habits from local storage and rehydrate
const storedHabits = JSON.parse(localStorage.getItem('habits'))
if (storedHabits) {
  habits = storedHabits.map((h) => new Habit(h.name, h.category, h.tag))
}

// Show or hide empty text based on habits
if (habits.length === 0) {
  emptyText.classList.remove('hidden')
} else {
  emptyText.classList.add('hidden')
}

// Initial render
renderHabits(habits)

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const name = habitName.value.trim()

  const categoryBtn = document.querySelector(
    '.habit-modal__category-btn--active',
  )
  const tagBtn = document.querySelector('.habit-modal__time-btn--active')

  const category = categoryBtn ? categoryBtn.value : 'general'
  const tag = tagBtn ? tagBtn.value : 'anytime'

  const newHabit = new Habit(name, category, tag)
  habits.push(newHabit)

  // Show or hide empty text
  if (habits.length > 0) {
    emptyText.classList.add('hidden')
  }

  renderHabits(habits)
  storeHabitsInLocalStorage(habits)
  closeModal()
})
