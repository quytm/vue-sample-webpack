import request from '@/utils/request'

export function register(username, password, confirmPassword) {
  const data = {
    username,
    password,
    confirmPassword
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
