import request from '@/utils/request'

interface UserProps {
  id: number,
  name: string,
  password: string,
  email: string,
  status: string,
  delFlag: string,
  createBy: string,
  createTime: Date,
  updateBy: string,
  updateTime: Date
}

// Retrieve all user
export function listAllUser (query: string) {
  return request({
    url: '/api/system/users',
    method: 'get',
    params: query
  })
}
// Insert new user
export function insertUser (data: UserProps) {
  return request({
    url: '/api/system/users',
    method: 'post',
    data
  })
}
// Update user
export function updateUser (data: UserProps) {
  return request({
    url: '/api/system/users',
    method: 'put',
    data
  })
}
// Soft delete user
export function softDeleteUser (userId: number | number[]) {
  let url: string = '/api/system/users'
  let data
  if (Array.isArray(userId)) {
    data = { ids: userId } // Send multiple ids as JSON to body
  } else {
    url += `/${userId}` // Append single id to url
  }
  return request({
    url,
    method: 'patch',
    data
  })
}
// Delete user
export function deleteUser (userId: number | number[]) {
  let url: string = '/api/system/users'
  let data
  if (Array.isArray(userId)) {
    data = { ids: userId } // Send multiple ids as JSON to body
  } else {
    url += `/${userId}` // Append single id to url
  }
  return request({
    url,
    method: 'delete',
    data
  })
}
