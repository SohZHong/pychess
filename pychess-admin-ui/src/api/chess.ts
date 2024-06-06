import request from '@/utils/request'

export interface ChessProps {
  id: number | null,
  name: string,
  questionTypeId: number,
  createBy: string | null,
  createTime: Date | null,
  updateBy: string,
  updateTime: Date | null
}

// Retrieve all questions
export function listAllChessPiece (query: string) {
  return request({
    url: '/api/system/questions/chess',
    method: 'get',
    params: query
  })
}

// Insert new question
export function insertChessPiece (data: ChessProps) {
  return request({
    url: '/api/system/questions/chess',
    method: 'post',
    data
  })
}
// Update question
export function updateChessPiece (data: ChessProps) {
  return request({
    url: '/api/system/questions/chess',
    method: 'patch',
    data
  })
}
// Delete question
export function deleteChessPiece (chessId: number | number[]) {
  let url: string = '/api/system/questions/chess'
  let data
  if (Array.isArray(chessId)) {
    data = { ids: chessId } // Send multiple ids as JSON to body
  } else {
    url += `/${chessId}` // Append single id to url
  }
  return request({
    url,
    method: 'delete',
    data
  })
}
