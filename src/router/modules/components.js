/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'splitpane',
      component: () => import('@/views/components-demo/splitpane'),
      name: 'SplitpaneDemo',
      meta: { title: 'splitPane' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: 'sticky' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/dragDialog'),
      name: 'DragDialogDemo',
      meta: { title: 'dragDialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/dragSelect'),
      name: 'DragSelectDemo',
      meta: { title: 'dragSelect' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/dragKanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban' }
    }
  ]
}

export default componentsRouter
