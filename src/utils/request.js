import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from './token'

import { REQUEST_BASE_URL } from '@/config'

const service = axios.create({
  baseURL: REQUEST_BASE_URL,
  timeout: 50000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // 文件上传
    if (config.headers['Content-Type'] !== 'multipart/form-data') {
      const token = getToken()
      console.log(config.url, token)
      config.data = Object.assign({}, config.data, { token })
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.retCode !== '0000') {
      switch (res.retCode) {
        case 401:
          store.dispatch('account/logout').then(res => {
            const { path, query } = router.app.$route
            router.push({
              path: '/login',
              query: {
                redirect: path,
                ...query
              }
            })
          })
          break
      }

      return Promise.reject(res)
    }

    return res
  },
  error => {
    error

    return Promise.reject('服务器开小差了，请稍后重试')
  }
)

export default service
