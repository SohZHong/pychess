import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

type DebouncedFunction = (...args: unknown[]) => void;

// Delays function call by xx milliseconds
const debounce = (func: DebouncedFunction, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: unknown[]) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const useResizeHandler = () => {
  const store = useStore()
  const WIDTH = 992 // bootstrap standard
  const device = ref(window.innerWidth >= WIDTH ? 'desktop' : 'mobile')

  const handleResize = debounce(() => {
    device.value = window.innerWidth >= WIDTH ? 'desktop' : 'mobile'
    store.dispatch('setDevice', device.value)
  }, 50) // Delay by 50 milliseconds

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // Initial check
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}
