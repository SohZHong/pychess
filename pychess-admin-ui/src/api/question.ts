import request from '@/utils/request'

export interface AnswerProps {
  id: number | undefined,
  answer: string | null
}

export interface QuestionProps {
  id: number | null,
  text: string,
  questionTypeId: number,
  chessPieceId: number,
  answers: Array<string | AnswerProps | null>
  createBy: string | null,
  createTime: Date | null,
  updateBy: string,
  updateTime: Date | null
}

// Retrieve all questions
export function listAllQuestion (query: string) {
  return request({
    url: '/api/system/questions',
    method: 'get',
    params: query
  })
}
// Retrieve all question types
export function listAllQuestionTypes () {
  return request({
    url: '/api/system/questions/type',
    method: 'get'
  })
}

// Insert new question
export function insertQuestion (data: QuestionProps) {
  return request({
    url: '/api/system/questions',
    method: 'post',
    data
  })
}
// Update question
export function updateQuestion (data: QuestionProps) {
  return request({
    url: '/api/system/questions',
    method: 'put',
    data
  })
}
// Delete question
export function deleteQuestion (questionId: number | number[]) {
  let url: string = '/api/system/questions'
  let data
  if (Array.isArray(questionId)) {
    data = { ids: questionId } // Send multiple ids as JSON to body
  } else {
    url += `/${questionId}` // Append single id to url
  }
  return request({
    url,
    method: 'delete',
    data
  })
}
