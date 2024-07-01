import request from '@/utils/request'

export interface GameProps {
  id: number | undefined,
  player1: string,
  player2: string,
  endTime: Date | undefined
}

export function saveGame (
  data: GameProps
) {
  return request({
    url: '/api/saveMatch',
    method: 'post'
  })
}