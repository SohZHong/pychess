import request from '@/utils/request'

export function fetchApiKey () {
  return request({
    url: '/api/fetchApi',
    method: 'get'
  })
}