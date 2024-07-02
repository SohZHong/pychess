import request from '@/utils/request'

export interface AnswerProps {
  answer: string,
  isCorrect: string
}

export interface QuestionProps {
  id: number,
  name: string,
  code: string
}

export interface MatchProps {
  winner: string,
  loser: string,
  end?: Date
}

export function getQuestions (
) {
  return request({
    url: '/api/getQuestions',
    method: 'get'
  })
}

export function getMatchHistory (
) {
  return request({
    url: '/api/getMatchHistory',
    method: 'get'
  })
}

export function saveMatch (
  data: MatchProps
) {
  return request({
    url: '/api/saveMatch',
    method: 'post',
    data
  })
}
