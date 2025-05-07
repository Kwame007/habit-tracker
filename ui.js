const categoryIcons = {
  health: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-heart-icon lucide-heart"
        style="color: #ef4444">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    `,
    color: '#ef4444',
    accentColor: 'rgba(244, 63, 94, 0.082)',
  },
  productivity: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-zap-icon lucide-zap"
        style="color:rgb(245, 158, 11)">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
      </svg>
    `,
    color: '#f59e0b',
    accentColor: 'rgba(253, 230, 138, 0.52)',
  },
  learning: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-book-open-icon lucide-book-open">
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
          style="color: #3b82f6"/>
      </svg>
    `,
    color: '#3b82f6',
    accentColor: '#bfdbfe',
  },
  social: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-users-icon lucide-users"
        style="color: #8b5cf6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    `,
    color: '#8b5cf6',
    accentColor: '#c4b5fd',
  },
  creativity: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-paintbrush-icon lucide-paintbrush"
        style="color: #ec4899">
        <path d="m14.622 17.897-10.68-2.913" />
        <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
        <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>
      </svg>
    `,
    color: '#ec4899',
    accentColor: '#fcd8e9',
  },
  general: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-list-todo-icon lucide-list-todo"
        style="color: #eb5e28">
        <rect x="3" y="5" width="6" height="6" rx="1" />
        <path d="m3 17 2 2 4-4" />
        <path d="M13 6h8" />
        <path d="M13 12h8" />
        <path d="M13 18h8" />
      </svg>
    `,
    color: '#eb5e28',
    accentColor: '#fcd8e9',
  },
}

const renderHabits = function (habits) {
  const habitsContainer = document.querySelector('.main__content-habits-list')
  habitsContainer.innerHTML = ''

  habits.forEach((habit, index) => {
    const categoryKey = habit.category?.toLowerCase()
    const category = categoryIcons[categoryKey] || categoryIcons.general

    const isCompleted = habit.completed
    const icon = isCompleted
      ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-circle-check-icon lucide-circle-check check"
          style="color: ${category.color}">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      `
      : `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-circle-icon lucide-circle uncheck">
          <circle cx="12" cy="12" r="10" />
        </svg>
      `

    const habitDiv = document.createElement('div')
    habitDiv.classList.add('main__content-habit')

    habitDiv.innerHTML = `
      <div class="main__content-habit-info">
        <div class="main__content-habit-icon" style="background-color: ${category.accentColor}">
          ${category.icon}
        </div>
        <div>
          <h3 class="main__content-habit-name ellipsis"
              style="text-decoration: ${isCompleted ? 'line-through' : 'none'}">
              ${habit.name || 'Unnamed habit'}
          </h3>
          <div class="main__content-habit-tags">
            <span class="main__content-habit-tag">
              <span class="main__content-habit-tag-icon"></span>
              ${habit.tag ?? 'No tag'}
            </span>
            <span class="main__content-habit-tag">
              <span class="main__content-habit-tag-icon"></span>
              ${habit.category || 'General'}
            </span>
          </div>
        </div>
      </div>
      <button class="main__content-habit-checkbox" data-index="${index}">
        ${icon}
      </button>
    `

    habitsContainer.appendChild(habitDiv)
  })

  // Reattach checkbox event listeners
  document.querySelectorAll('.main__content-habit-checkbox').forEach((btn) => {
    btn.addEventListener('click', function () {
      const index = btn.dataset.index
      if (typeof habits[index].toggleHabit === 'function') {
        habits[index].toggleHabit()
        renderHabits(habits)
      }
    })
  })
}

export default renderHabits
