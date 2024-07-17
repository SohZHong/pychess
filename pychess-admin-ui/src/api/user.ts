import request from '@/utils/request'

export interface UserProps {
  id?: number | null,
  name: string,
  password?: string,
  email: string,
  status?: string | null,
  delFlag?: string | null,
  createBy?: string | null,
  createTime?: Date | null,
  updateBy?: string,
  updateTime?: Date | null
}

export interface GameUserProps {
  id?: number,
  name: string,
  password: string,
  email: string,
  score?: number
  status?: string,
  delFlag?: string,
  createBy?: string,
  createTime?: Date,
  updateBy?: string,
  updateTime?: Date
}

// Retrieve current user data
export function getCurrentUser () {
  return request({
    url: '/api/system/getCurrentUser',
    method: 'get'
  })
}

// Retrieve all System user
export function listAllSysUser (query: string) {
  return request({
    url: '/api/system/sys_users',
    method: 'get',
    params: query
  })
}
// Insert new System user
export function insertSysUser (data: UserProps) {
  return request({
    url: '/api/system/sys_users',
    method: 'post',
    data
  })
}
// Update System user
export function updateSysUser (data: UserProps) {
  return request({
    url: '/api/system/sys_users',
    method: 'put',
    data
  })
}
// Soft delete System user
export function softDeleteSysUser (userId: number | number[]) {
  let url: string = '/api/system/sys_users'
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
// Delete System user
export function deleteSysUser (userId: number | number[]) {
  let url: string = '/api/system/sys_users'
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

// Retrieve all user
export function listAllGameUser (query: string) {
  return request({
    url: '/api/system/users',
    method: 'get',
    params: query
  })
}
// Insert new user
export function insertGameUser (data: GameUserProps) {
  return request({
    url: '/api/system/users',
    method: 'post',
    data
  })
}
// Update user
export function updateGameUser (data: GameUserProps) {
  return request({
    url: '/api/system/users',
    method: 'put',
    data
  })
}
// Soft delete user
export function softDeleteGameUser (userId: number | number[]) {
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

// Update user settings
export function updateUserSettings (data: UserProps) {
  return request({
    url: '/api/system/settings',
    method: 'put',
    data
  })
}
