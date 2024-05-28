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

// Update user
export function updateUser (data: UserProps) {
  return request({
    url: '/api/system/user',
    method: 'put',
    data
  })
}

// Delete user
export function deleteUser (userId: number | number[]) {
  return request({
    url: '/api/system/user' + userId,
    method: 'delete'
  })
}
