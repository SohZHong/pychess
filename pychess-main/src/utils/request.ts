import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true
})

service.interceptors.response.use(
  response => {
    const { code } = response.data

    if (code === 401) {
      store.dispatch('showAlert', {
        message: 'Login Expired! Please relogin',
        header: 'Login Expired',
        onClose: () => {
          router.push('/login')
        }
      })
      return Promise.reject(new Error('Login Expired! Please relogin'))
    } else {
      return response
    }
  },
  error => {
    if (error.response) {
      // Extract error message from response
      const { code, message } = error.response.data
      // Token expired
      if (code === 401) {
        store.dispatch('showAlert', {
          message: 'Unauthorised Access! Please relogin',
          header: 'Unauthorised Access',
          onClose: () => {
            router.push('/login')
          }
        })
        return Promise.reject(new Error('Unauthorized Access! Please relogin'))
      } else {
        store.dispatch('showAlert', {
          message
        })
        return Promise.reject(new Error(message))
      }
    } else {
      // Network or other errors
      store.dispatch('showAlert', {
        message: 'Network Error or Server not responding'
      })
      return Promise.reject(new Error('Network Error or Server not responding'))
    }
  }
)

export default service
