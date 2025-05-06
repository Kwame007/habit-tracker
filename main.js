// modal
const modal = document.querySelector('.habit-modal')
const overlay = document.querySelector('.habit-modal__overlay')
const openModalBtn = document.querySelector('.main__button')
const closeModalBtn = document.querySelector('.habit-modal__close-btn')
const cancelModalBtn = document.querySelector('.habit-modal__cancel-btn')

// close modal function
const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

// close modal when the cancel button is clicked
cancelModalBtn.addEventListener('click', closeModal)

// close modal when the Esc key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

// open modal function
const openModal = function () {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

openModalBtn.addEventListener('click', openModal)
