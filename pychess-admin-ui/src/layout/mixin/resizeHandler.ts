import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

// Delays function call by xx milliseconds
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const useResizeHandler = () => {
  const store = useStore()
  const WIDTH = 992 // bootstrap standard
  // Initial check
  const device = ref(window.innerWidth >=  WIDTH ? 'desktop' : 'mobile')
  const handleResize = debounce(() => {
    device.value = window.innerWidth >= WIDTH ? 'desktop' : 'mobile'
    store.dispatch('setDevice', device)
  }, 200) // Delay by 2 seconds

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}
