import { inject } from 'vue'
import { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies')

const tokenKey = 'Token'

// Get Authentication Token
export const getToken = () => {
  return $cookies?.get(tokenKey)
}
// Set Authentication Token
export const setToken = (
  token: string,
  expires: string | number | Date | undefined = undefined
) => {
  return $cookies?.set(tokenKey, token, expires)
}
// Remove Authentication Token (for logout)
export const removeToken = () => {
  return $cookies?.remove(tokenKey)
}
// Check if Authentication Token Exists
export const isTokenExist = () => {
  return $cookies?.isKey(tokenKey)
}
