import Layout from '@/layout'

export default {
  path: '/english',
  component: Layout,
  redirect: {
    name: 'english'
  },
  meta: {
    title: '英语',
    icon: 'el-icon-collection'
  },
  children: [
    {
      path: 'english',
      name: 'englishs',
      component: () => import('@/views/english/index'),
      meta: {
        title: '词库'
      }
    },
    {
      path: 'englishGrammar',
      name: 'englishGrammar',
      component: () => import('@/views/english/grammar/index'),
      meta: {
        title: '语法'
      }
    }
  ]
}
