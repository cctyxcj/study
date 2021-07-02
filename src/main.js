import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-ui
import Element from 'element-ui'

Vue.use(Element, {
  size: 'medium'
})

// global css
import './styles/index.scss'

// global components
import globalComponents from './components'

Vue.use(globalComponents)

// global filters
import globalFilters from './filters'

Vue.use(globalFilters)

// global directives
import globalDirectives from './directives'

Vue.use(globalDirectives)

// global request api
import globalApi from './api'

Vue.use(globalApi)

// permission
import './router/permission'

const to = Symbol()
Vue.directive('to', {
  bind(element, binding) {
    element[to] = function() {
      router.push(binding.value)
    }
    element.addEventListener('click', element[to])
  },
  unbind(element) {
    element.removeEventListener('click', element[to])
  }
})

// 添加自定义函数
Vue.prototype.$showError = function(error = '') {
  const isObject = error instanceof Object
  let content = error

  if (isObject) {
    content = error.message ?? ''
  }

  console.log(error)
  return Vue.prototype.$message.error(content || '发生未知错误，请稍后重试')
}

Vue.prototype.$showConfirm = function(callback, title = '确定要删除记录吗？') {
  this.$confirm(title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(callback)
    .catch(e => {
      if (e !== 'cancel') {
        this.$showError(e)
      }
    })
}

Vue.config.productionTip = false

console.log(
  `当前环境：${process.env.NODE_ENV === 'production' ? '线上' : '开发'}`
)
console.log(`是否处于测试：${process.env.VUE_APP_TESTING ? '是' : '否'}`)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
