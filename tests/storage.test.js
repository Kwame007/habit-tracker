import storeHabitsInLocalStorage from '../storage.js'

describe('storeHabitsInLocalStorage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    })
  })

  test('should store valid habits array in localStorage', () => {
    const habits = [
      { id: 1, name: 'Exercise', completed: false },
      { id: 2, name: 'Read', completed: true },
    ]

    storeHabitsInLocalStorage(habits)

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'habits',
      JSON.stringify(habits),
    )
  })

  test('should throw error when non-array is passed', () => {
    const invalidInputs = [
      null,
      undefined,
      'string',
      123,
      { object: 'not array' },
    ]

    invalidInputs.forEach((input) => {
      expect(() => storeHabitsInLocalStorage(input)).toThrow(
        'Expected an array of habits to store',
      )
    })
  })

  test('should handle localStorage errors gracefully', () => {
    const habits = [{ id: 1, name: 'Test' }]

    // Mock localStorage.setItem to throw an error
    window.localStorage.setItem.mockImplementationOnce(() => {
      throw new Error('Storage error')
    })

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error')

    // Should not throw error
    expect(() => storeHabitsInLocalStorage(habits)).not.toThrow()

    // Should log error to console
    expect(consoleSpy).toHaveBeenCalled()

    // Clean up
    consoleSpy.mockRestore()
  })
})
