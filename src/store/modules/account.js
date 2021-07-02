import Vue from 'vue'
import { resetRouter } from '@/router'
import { setToken, removeToken } from '@/utils/token'

const state = {
  userInfo: {}
}

let _renewal = 0

const mutations = {
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // login
  async login({ commit }, { username, password }) {
    try {
      // const params = {
      //   account: username,
      //   password: password
      // }

      // const res = await Vue.prototype.$api.account.login(params)
      // const { token } = res.data
      const token = 123123

      setToken(token)

      // 保持在线状态
      clearInterval(_renewal)
      _renewal = setInterval(() => {
        Vue.prototype.$api.userinfo.renewal(username)
      }, 60 * 1000)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // get account info
  async getAccountInfo({ commit, dispatch }) {
    try {
      const res = { retCode: '0000' }

      if (res.data === null || res.retCode !== '0000') {
        return Promise.reject('令牌已过期')
      }

      // 权限设置
      commit('SET_USERINFO', {
        sysMenuEntities: [],
        ...res.data
      })

      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // logout
  logout({ commit, state, dispatch }) {
    clearInterval(_renewal)

    return new Promise(resolve => {
      dispatch('resetToken')
      resetRouter()

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    clearInterval(_renewal)

    return new Promise(resolve => {
      commit('SET_USERINFO', {})
      removeToken()

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
