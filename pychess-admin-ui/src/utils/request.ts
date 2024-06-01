import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Ensure axios uses utf-8
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  // Change later
  baseURL: 'http://localhost:3000',
  // 10 seconds timeout
  timeout: 10000,
  // Support cookies
  withCredentials: true
})

// Request interceptor
service.interceptors.request.use(config => {
  // Adding token to request
  // const token = localStorage.getItem('authToken')
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
})

// Response interceptor
// Response JSON example: { code: 200, message: "Request Successful }"
service.interceptors.response.use(response => {
  // Handle the response here
  const { code, message } = response.data
  const router = useRouter()

  if (code === 401) {
    ElMessageBox.alert(message, 'Login Expired', {
      confirmButtonText: 'OK',
      callback: () => {
        ElMessage({
          type: 'info',
          message: 'Redirecting...'
        })
        router.push('/login')
      }
    })
    return Promise.reject(new Error('Login Expired! Please relogin'))
  } else {
    return response.data
  }
},
(error) => {
  // Handle errors here
  console.error(error)
  // Extract error message
  const { message } = error
  ElMessage({
    type: 'error',
    message,
    duration: 5 * 1000 // Show for 5 seconds
  })
  return Promise.reject(new Error(message))
})

export default service
