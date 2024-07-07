import request from '@/utils/request'

export interface LeaderboardItemProps {
  id: number,
  name: string,
  score: number,
  wins: number,
  matches: number,
  rank?: number
}

export interface LeaderboardProps {
  top10: Array<LeaderboardItemProps>,
  user: LeaderboardItemProps
}

// Register function
export function getLeaderboardStatistics () {
  return request({
    url: '/api/getLeaderboard',
    method: 'get'
  })
}
