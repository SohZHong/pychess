import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import router from '@/router' // Import the router directly

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true
})

service.interceptors.response.use(
  response => {
    const { code, message } = response.data

    if (code === 401) {
      ElMessageBox.alert(message, 'Login Expired', {
        confirmButtonText: 'OK',
        callback: () => {
          ElMessage({
            type: 'info',
            message: 'Redirecting...'
          })
          router.push('/login') // Use the router directly
        }
      })
      return Promise.reject(new Error('Login Expired! Please relogin'))
    } else {
      return response
    }
  },
  error => {
    console.error(error)
    if (error.response) {
      // Extract error message from response
      const { code, message } = error.response.data
      // Token expired
      if (code === 401) {
        ElMessageBox.alert(message, 'Unauthorized Access', {
          confirmButtonText: 'OK',
          callback: () => {
            ElMessage({
              type: 'info',
              message: 'Redirecting...'
            })
            router.push('/login')
          }
        })
        return Promise.reject(new Error('Unauthorized Access! Please relogin'))
      } else {
        ElMessage({
          type: 'error',
          message,
          duration: 5 * 1000
        })
        return Promise.reject(new Error(message))
      }
    } else {
      // Network or other errors
      ElMessage({
        type: 'error',
        message: 'Network Error or Server not responding',
        duration: 5 * 1000
      })
      return Promise.reject(new Error('Network Error or Server not responding'))
    }
  }
)

export default service
