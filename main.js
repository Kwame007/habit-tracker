import renderHabits from './ui.js'
import storeHabitsInLocalStorage from './storage.js'

const form = document.querySelector('.habit-modal__form')
const habitName = document.querySelector('.habit-modal__input')
const habitCategory = document.querySelectorAll('.habit-modal__category-btn')
const habitTags = document.querySelectorAll('.habit-modal__time-btn')
const emptyText = document.querySelector('.main__content-habits-empty')
const categoryLinks = document.querySelectorAll(
  '.main__nav-categories .main__nav-link',
)
const dashboardLink = document.getElementById('dashboard')

document.addEventListener('click', (e) => {
  const target = e.target

  // 1. Handle habit checkbox toggle
  const checkBoxBtn = target.closest('.main__content-habit-checkbox')
  if (checkBoxBtn) {
    const index = checkBoxBtn.dataset.index
    if (typeof habits[index].toggleHabit === 'function') {
      habits[index].toggleHabit()

      // update local storage
      storeHabitsInLocalStorage(habits)
      renderHabits(habits)
    }
    return
  }

  // 2. Handle "..." actions button click (toggle menu)
  const actionsBtn = target.closest('.main__content-habit-actions-btn')
  if (actionsBtn) {
    const index = actionsBtn.dataset.index

    // Close all open menus
    document
      .querySelectorAll('.main__content-habit-actions-menu')
      .forEach((menu) => menu.classList.add('hidden'))

    // Toggle current menu
    const parent = actionsBtn.closest('.main__content-habit-actions')
    const menu = parent.querySelector('.main__content-habit-actions-menu')
    if (menu) {
      menu.classList.toggle('hidden')
    }

    return
  }

  // 3. Handle menu item clicks (edit/delete)
  const menuItem = target.closest('.main__content-habit-actions-menu-item')
  if (menuItem) {
    const parent = menuItem.closest('.main__content-habit-actions')
    const index = parent.dataset.index
    const action = menuItem.dataset.action // "edit" or "delete"

    if (action === 'edit') {
      // TODO: handle edit
      // handleEdit(index)
    } else if (action === 'delete') {
      handleDelete(index)
    }

    // Hide menu after action
    const menu = parent.querySelector('.main__content-habit-actions-menu')
    if (menu) {
      menu.classList.add('hidden')
    }

    return
  }

  // 4. Clicked elsewhere: close all menus
  document
    .querySelectorAll('.main__content-habit-actions-menu')
    .forEach((menu) => menu.classList.add('hidden'))
})

// function handleEdit(index) {
//   const habit = habits[index]
//   console.log('Edit habit:', habit)

//   // Populate habit name
//   habitName.value = habit.name

//   // Populate category
//   habitCategory.forEach((btn) =>
//     btn.classList.remove('habit-modal__category-btn--active'),
//   )
//   habitCategory.forEach((btn) => {
//     if (btn.dataset.category === habit.category) {
//       btn.classList.add('habit-modal__category-btn--active')
//     }
//   })

//   // Populate time of day
//   // timeButtons.forEach((btn) =>
//   //   btn.classList.remove('habit-modal__time-btn--active'),
//   // )
//   // timeButtons.forEach((btn) => {
//   //   if (btn.dataset.time === habit.time) {
//   //     btn.classList.add('habit-modal__time-btn--active')
//   //   }
//   // })

//   // Populate tag
//   habitTags.forEach((btn) =>
//     btn.classList.remove('habit-modal__tag-btn--active'),
//   )
//   habitTags.forEach((btn) => {
//     if (btn.dataset.tag === habit.tag) {
//       btn.classList.add('habit-modal__tag-btn--active')
//     }
//   })

//   // Track which habit is being edited
//   form.dataset.index = index

//   // Show modal
//   modal.classList.remove('hidden')
// }

function handleDelete(index) {
  habits.splice(index, 1)

  storeHabitsInLocalStorage(habits)
  renderHabits(habits)
}

// modal
const modal = document.querySelector('.habit-modal')
const overlay = document.querySelector('.habit-modal__overlay')
const openModalBtns = document.querySelectorAll('.modal-open')
const closeModalBtn = document.querySelector('.habit-modal__close-btn')
const cancelModalBtn = document.querySelector('.habit-modal__cancel-btn')

// loop through categories and add click event listener
function addCategoryClickEventListeners() {
  categoryLinks.forEach((link) => {
    link.addEventListener('click', function () {
      categoryLinks.forEach((link) =>
        link.classList.remove('main__nav-link--active'),
      )
      link.classList.add('main__nav-link--active')

      // filter habits
      const filteredHabits = habits.filter(
        (habit) => habit.category === link.dataset.category,
      )
      console.log(link.dataset.category)
      console.log(filteredHabits)

      if (filteredHabits.length === 0) {
        emptyText.classList.remove('hidden')
      } else {
        emptyText.classList.add('hidden')
      }
      renderHabits(filteredHabits)
    })
  })
}
addCategoryClickEventListeners()

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
    habitCategory.forEach((b) => {
      b.classList.remove('habit-modal__category-btn--active')
      b.setAttribute('aria-pressed', 'false')
    })

    btn.classList.add('habit-modal__category-btn--active')
    btn.setAttribute('aria-pressed', 'true')
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

// remove active class from category links
dashboardLink.addEventListener('click', () => {
  categoryLinks.forEach((link) => {
    link.classList.remove('main__nav-link--active')
  })

  // show all habits
  if (habits.length === 0) {
    emptyText.classList.remove('hidden')
  } else {
    emptyText.classList.add('hidden')
  }

  renderHabits(habits)
})

// Handle form submission
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

  // Show or hide empty text
  if (habits.length > 0) {
    emptyText.classList.add('hidden')
  }

  addCategoryClickEventListeners()
  renderHabits(habits)
  storeHabitsInLocalStorage(habits)
  closeModal()
})
