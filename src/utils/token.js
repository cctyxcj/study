import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token, params = {}) {
  return Cookies.set(TOKEN_KEY, token, params)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}
