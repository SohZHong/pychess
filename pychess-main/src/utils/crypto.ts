import CryptoJS from 'crypto-js'

const secretKey = 'pychessMain'

export function encrypt (text: string, secret?: string): string {
  return CryptoJS.AES.encrypt(text, secret || secretKey).toString()
}

export function decrypt (ciphertext: string, secret?: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret || secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}
