import request from '@/utils/request'

export interface GameProps {
  id: number | undefined,
  winner: string,
  loser: string,
  endTime: Date | undefined
}

export function saveGame (
  data: GameProps
) {
  return request({
    url: '/api/saveMatch',
    method: 'post',
    data
  })
}