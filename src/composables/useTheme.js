import { computed, ref } from 'vue'

const STORAGE_KEY = 'fritzc-theme'

const theme = ref('light')
let initialized = false

function getSystemTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)

  return storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : null
}

function applyTheme(value) {
  theme.value = value

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = value
  }
}

function initializeTheme() {
  if (initialized) {
    return
  }

  const storedTheme = getStoredTheme()
  const initialTheme = storedTheme ?? getSystemTheme()

  applyTheme(initialTheme)

  initialized = true
}

function setTheme(value) {
  if (value !== 'light' && value !== 'dark') {
    return
  }

  applyTheme(value)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, value)
  }
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const isDark = computed(() => theme.value === 'dark')

export function useTheme() {
  initializeTheme()

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}