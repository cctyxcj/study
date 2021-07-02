import request from '@/utils/request'
import { importModules } from '@/utils'

/* 利用webpack自动化引入modules下所有模块 */
const modules = importModules(require.context('./modules', true, /\.js$/))

export default {
  install(Vue) {
    const api = {}

    Object.keys(modules).forEach(key => {
      api[key] = new modules[key](request)
    })

    Vue.prototype.$api = api
  }
}
