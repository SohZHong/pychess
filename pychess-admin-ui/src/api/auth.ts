import request from '@/utils/request'

interface LoginProps {
  username: string,
  password: string
}

// Login function
export function login (
  data: LoginProps
) {
  return request({
    url: '/api/system/login',
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
