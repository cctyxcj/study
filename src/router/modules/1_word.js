import Layout from '@/layout'

export default {
  path: '/word',
  component: Layout,
  redirect: {
    name: 'word'
  },
  meta: {
    title: '词类',
    icon: 'el-icon-notebook-1'
  },
  children: [
    {
      path: 'words',
      name: 'word',
      component: () => import('@/views/word/index'),
      meta: {
        title: '词/句类'
      }
    }
  ]
}
