import Layout from '@/layout'

export default {
  path: '/article',
  component: Layout,
  redirect: {
    name: 'article'
  },
  meta: {
    title: '文章',
    icon: 'el-icon-collection'
  },
  children: [
    {
      path: 'article',
      name: 'article',
      component: () => import('@/views/article/index'),
      meta: {
        title: '文章'
      }
    },
    {
      path: 'articleDetails',
      name: 'articleDetails',
      component: () => import('@/views/article/details/index'),
      hidden: true,
      meta: {
        title: '浏览'
      }
    },
  ]
}
