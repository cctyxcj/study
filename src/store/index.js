import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

import { importModules } from '@/utils'

/* 利用webpack自动化引入modules下所有模块 */
const modules = importModules(require.context('./modules', true, /\.js$/))

export default new Vuex.Store({
  modules,
  getters
})
