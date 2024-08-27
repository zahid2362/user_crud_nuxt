import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

export default defineNuxtPlugin(() => {
  // Doing something with nuxtApp
  const toast = useToast({
    position: 'top-right'
  })
  return {
    provide: {
      toast
    }
  }
})
