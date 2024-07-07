import request from '@/utils/request'

export interface AnswerProps {
  answer: string,
  is_correct: string
}

export interface QuestionProps {
  id: number,
  text: string,
  question_type_id: number,
  score: number,
  name: string,
  side: string
  answers: Array<AnswerProps>
}

export interface QrProps {
  id: number,
  name: string,
  code: string
}

export interface QuestionQrProps {
  whiteQRCodes: Array<QrProps>,
  blackQRCodes: Array<QrProps>
}

export interface MatchProps {
  winner: number,
  loser: number,
  end?: Date
}

export interface PlayerProps {
  id: number | undefined,
  name: string,
  score: number,
  side: string
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
