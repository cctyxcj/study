import { asyncRoutes, constantRoutes } from '@/router'
import { hasPermission } from '@/utils/permission'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []

  function checkChildren(route) {
    if (route.children) {
      route.children = filterAsyncRoutes(route.children)
    }

    res.push(route)
  }

  routes.forEach(route => {
    if (route?.meta?.roles) {
      const { roles = [] } = route.meta

      if (hasPermission(roles)) {
        checkChildren(route)
      }
    } else {
      checkChildren(route)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes)
      console.log(asyncRoutes)
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
