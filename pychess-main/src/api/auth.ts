import request from '@/utils/request'

interface RegisterProps {
    username: string,
    password: string,
    email: string
}

interface LoginProps {
    username: string,
    password: string
}

// Register function
export function register (
  data: RegisterProps
) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

// Login function
export function login (
    data: LoginProps
) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// Logout function
export function logout () {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}