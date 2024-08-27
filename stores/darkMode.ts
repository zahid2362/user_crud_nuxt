import { useStorage } from '@vueuse/core'

export const useDarkModeStore = defineStore('darkMode', () => {
  const darkMode = useStorage('darkMode', ref(false))

  // Ensure document interaction only happens on the client
  if (import.meta.client) {
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    // Ensure document interaction only happens on the client
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', darkMode.value)
    }
  }

  return { darkMode, toggleDarkMode }
})
