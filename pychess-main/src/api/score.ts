import request from '@/utils/request'

export interface ScoreProps {
  userId: number,
  scoreAcquired: number,
  transactionTime?: Date
}

export function saveMatchScore (
  player: ScoreProps
) {
  return request({
    url: '/api/saveMatchScore',
    method: 'post',
    data: {
      player
    }
  })
}
