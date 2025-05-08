import renderHabits from './ui.js'
import storeHabitsInLocalStorage from './storage.js'

// DOM Elements
const form = document.querySelector('.habit-modal__form')
const habitName = document.querySelector('.habit-modal__input')
const habitCategory = document.querySelectorAll('.habit-modal__category-btn')
const habitTags = document.querySelectorAll('.habit-modal__time-btn')
const emptyText = document.querySelector('.main__content-habits-empty')
const categoryLinks = document.querySelectorAll(
  '.main__nav-categories .main__nav-link',
)
const dashboardLink = document.getElementById('dashboard')
const modal = document.querySelector('.habit-modal')
const overlay = document.querySelector('.habit-modal__overlay')
const openModalBtns = document.querySelectorAll('.modal-open')
const closeModalBtn = document.querySelector('.habit-modal__close-btn')
const cancelModalBtn = document.querySelector('.habit-modal__cancel-btn')

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

let habits = []

// Utility functions
function updateEmptyState() {
  if (habits.length === 0) {
    emptyText.classList.remove('hidden')
  } else {
    emptyText.classList.add('hidden')
  }
}

function handleDelete(index) {
  habits.splice(index, 1)
  storeHabitsInLocalStorage(habits)
  renderHabits(habits)
  updateEmptyState()
}

// Modal functions
function closeModal() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
  document.body.style.overflow = ''

  // Reset form
  habitName.value = ''
  habitCategory.forEach((btn) => {
    btn.classList.remove('habit-modal__category-btn--active')
    btn.setAttribute('aria-pressed', 'false')
  })
  habitTags.forEach((btn) => {
    btn.classList.remove('habit-modal__time-btn--active')
  })
}

function openModal() {
  habitCategory.forEach((btn) => {
    btn.classList.remove('habit-modal__category-btn--active')
  })
  if (habitCategory[5]) {
    habitCategory[5].classList.add('habit-modal__category-btn--active')
  }

  habitTags.forEach((btn) => {
    btn.classList.remove('habit-modal__time-btn--active')
  })
  if (habitTags[3]) {
    habitTags[3].classList.add('habit-modal__time-btn--active')
  }

  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
  habitName.focus()
}

// Event Handlers
document.addEventListener('click', (e) => {
  const target = e.target

  // Handle habit checkbox toggle
  const checkBoxBtn = target.closest('.main__content-habit-checkbox')
  if (checkBoxBtn) {
    const index = checkBoxBtn.dataset.index
    if (typeof habits[index].toggleHabit === 'function') {
      habits[index].toggleHabit()
      storeHabitsInLocalStorage(habits)
      renderHabits(habits)
    }
    return
  }

  // Handle delete button click
  const deleteBtn = target.closest('.main__content-habit-actions-btn')
  if (deleteBtn) {
    const index = deleteBtn.dataset.index
    handleDelete(index)
    return
  }

  // Close any open menus when clicking elsewhere
  document
    .querySelectorAll('.main__content-habit-actions-menu')
    .forEach((menu) => menu.classList.add('hidden'))
})

// Category and tag selection handlers
function setupCategorySelection() {
  habitCategory.forEach(function (btn) {
    btn.addEventListener('click', function () {
      habitCategory.forEach((b) => {
        b.classList.remove('habit-modal__category-btn--active')
        b.setAttribute('aria-pressed', 'false')
      })
      btn.classList.add('habit-modal__category-btn--active')
      btn.setAttribute('aria-pressed', 'true')
    })
  })
}

function setupTagSelection() {
  habitTags.forEach(function (btn) {
    btn.addEventListener('click', function () {
      habitTags.forEach((b) => {
        b.classList.remove('habit-modal__time-btn--active')
      })
      btn.classList.add('habit-modal__time-btn--active')
    })
  })
}

function setupCategoryFilter() {
  categoryLinks.forEach((link) => {
    link.addEventListener('click', function () {
      categoryLinks.forEach((link) => {
        link.classList.remove('main__nav-link--active')
      })
      link.classList.add('main__nav-link--active')

      const filteredHabits = habits.filter(
        (habit) => habit.category === link.dataset.category,
      )

      if (filteredHabits.length === 0) {
        emptyText.classList.remove('hidden')
      } else {
        emptyText.classList.add('hidden')
      }
      renderHabits(filteredHabits)
    })
  })
}

// Initialize habits from localStorage
const storedHabits = JSON.parse(localStorage.getItem('habits'))
if (storedHabits) {
  habits = storedHabits.map((h) => new Habit(h.name, h.category, h.tag))
}

// Initial setup
updateEmptyState()
renderHabits(habits)
setupCategorySelection()
setupTagSelection()
setupCategoryFilter()

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

// Dashboard link handler
dashboardLink.addEventListener('click', () => {
  categoryLinks.forEach((link) => {
    link.classList.remove('main__nav-link--active')
  })

  if (habits.length === 0) {
    emptyText.classList.remove('hidden')
  } else {
    emptyText.classList.add('hidden')
  }

  renderHabits(habits)
})

// Form submission
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const name = habitName.value.trim()
  const categoryBtn = document.querySelector(
    '.habit-modal__category-btn--active',
  )
  const tagBtn = document.querySelector('.habit-modal__time-btn--active')

  const category = categoryBtn ? categoryBtn.dataset.category : 'general'
  const tag = tagBtn ? tagBtn.dataset.tag : 'anytime'

  const newHabit = new Habit(name, category, tag)
  habits.push(newHabit)

  if (habits.length > 0) {
    emptyText.classList.add('hidden')
  }

  renderHabits(habits)
  storeHabitsInLocalStorage(habits)
  closeModal()
})
