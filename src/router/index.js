import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/* Layout */
import Layout from '@/layout'

/*
 * modules
 *
 * 利用webpack自动化引入modules下所有模块
 *
 * 排序命名规则：序号_模块名称
 */
import { importModules } from '@/utils'

const modules = importModules(require.context('./modules', true, /\.js$/))
const asyncRoutesModules = Object.entries(modules)
  .sort(([aKey], [bKey]) => {
    const params = [/^([0-9]*)\_.*$/, '$1']
    const A = aKey.replace(...params)
    const B = bKey.replace(...params)

    return A - B
  })
  .map(([key, value]) => value)

const errorRouters = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]

export const constantRoutes = [
  /* base */
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
    hidden: true
  },

  /* login */
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },

  /* index */
  {
    path: '/homeLayout',
    component: Layout,
    redirect: {
      name: 'Home'
    },
    hidden: true,
    children: [
      {
        path: '/home',
        name: 'Home',
        redirect: '/word'
      }
    ]
  },

  ...errorRouters
]

export const asyncRoutes = [
  ...asyncRoutesModules,

  // 404 必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history',
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
  })

/* 创建router */
const router = createRouter()

/* 重置路由 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
