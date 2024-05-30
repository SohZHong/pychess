import request from '@/utils/request'

export interface RegisterProps {
    username: string,
    password: string,
    email: string,
    role: string
}
// Login function
export function login (
  username: string,
  password: string
) {
  const data = {
    username, password
  }
  return request({
    url: '/api/system/login',
    method: 'post',
    data
  })
}
// Register function for students and teachers
export function register (data: RegisterProps) {
  return request({
    url: '/api/register',
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
