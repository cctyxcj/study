import router from '@/router'
import store from '@/store'

import { Message } from 'element-ui'

import { PAGE_TITLE } from '@/config'

// import { getToken } from '@/utils/token' // get token from cookie

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login'] // no redirect whitelist

function getPageTitle(title) {
  if (title) {
    return `${title} - ${PAGE_TITLE}`
  }

  return `${PAGE_TITLE}`
}

/*
 * router beforeEach
 */
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasToken = true

  // determine whether the user has obtained his permission roles through getUserInfo
  // const hasRoles = store.getters.roles && store.getters.roles.length > 0
  // 如果为true，则已经拿过用户信息
  const hasRoles = Array.isArray(store.getters.roles)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })

      NProgress.done()
    } else if (hasRoles) {
      if (to.matched.length === 0) {
        return next({ path: '/404' })
      }

      next()
    } else {
      try {
        // get user info
        await store.dispatch('account/getAccountInfo')

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes')

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({
          ...to,
          replace: true
        })
      } catch (error) {
        console.log(error)
        Message.error(error)

        // remove token and go to login page to re-login
        await store.dispatch('account/resetToken')

        next({
          path: '/login',
          query: {
            redirect: to.path
          }
        })

        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })

      NProgress.done()
    }
  }
})

/*
 * router afterEach
 */
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
