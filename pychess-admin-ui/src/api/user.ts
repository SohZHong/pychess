import request from '@/utils/request'

interface UserProps {
  name: string,
  email: string,
  password: string
}

// Retrieve all user
export function listAllUser (query: string) {
  return request({
    url: '/api/system/users',
    method: 'get',
    params: query
  })
}

// Update user
export function updateUser (data: UserProps) {
  return request({
    url: '/api/system/user',
    method: 'put',
    data: data
  })
}
