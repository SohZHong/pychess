import request from '@/utils/request'

export interface ScoreProps {
  userId: number,
  scoreAcquired: number,
  transactionTime?: Date
}

export function saveMatchScore (
  player1: ScoreProps,
  player2: ScoreProps
) {
  return request({
    url: '/api/saveMatchScore',
    method: 'post',
    data: {
      player1,
      player2
    }
  })
}
