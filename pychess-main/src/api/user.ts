import request from '@/utils/request'

export interface UserProps {
  id: number | null,
  name: string,
  password: string,
  email: string,
  status: string | undefined,
  score: number | undefined,
  delFlag: string | undefined,
  createBy: string | undefined,
  createTime: Date | undefined,
  updateBy: string,
  updateTime: Date | undefined
}

// Retrieve current user data
export function getCurrentUser () {
  return request({
    url: '/api/getCurrentUser',
    method: 'get'
  })
}

// Update user data via settings
export function updateUser (
  data: UserProps
) {
  return request({
    url: '/api/settings',
    method: 'put',
    data
  })
}
