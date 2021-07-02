import { hasPermission } from '@/utils/permission'

function checkPermission(el, binding, vnode, oldVnode) {
  const { value = [] } = binding

  if (!hasPermission(value)) {
    el && el.remove()
  }
}

export default {
  inserted(...params) {
    checkPermission(...params)
  },

  update(...params) {
    checkPermission(...params)
  }
}
