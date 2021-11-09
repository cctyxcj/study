import Layout from '@/layout'

export default {
  path: '/japan',
  component: Layout,
  redirect: {
    name: 'japan'
  },
  meta: {
    title: '日语',
    icon: 'el-icon-collection'
  },
  children: [
    {
      path: 'japan',
      name: 'japans',
      component: () => import('@/views/japan/index'),
      meta: {
        title: '词库'
      }
    },
    {
      path: 'japanGrammar',
      name: 'japanGrammar',
      component: () => import('@/views/japan/grammar/index'),
      meta: {
        title: '文法'
      }
    },
    {
      path: 'japanGrammarCreate',
      name: 'japanGrammarCreate',
      component: () => import('@/views/japan/grammar/create'),
      hidden: true,
      meta: {
        title: '编辑语法'
      }
    },
    {
      path: 'alphabet',
      name: 'alphabet',
      component: () => import('@/views/japan/alphabet/index'),
      meta: {
        title: '五十音'
      }
    }
  ]
}
