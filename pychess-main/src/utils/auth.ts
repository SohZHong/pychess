export const validateUsername = (username: string): string => {
  if (username.length === 0) return ''
  return username.length < 8 ? 'Username must be at least 8 characters long' : ''
}

export const validatePassword = (password: string): string => {
  if (password.length === 0) return ''
  // Check number
  const hasNumber = /\d/.test(password)
  // Check if there is special characters
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  // Check length
  if (password.length < 8) return 'Password must be at least 8 characters long'
  if (!hasNumber || !hasSpecialChar) return 'Password must include at least one number and one special character'
  return ''
}
