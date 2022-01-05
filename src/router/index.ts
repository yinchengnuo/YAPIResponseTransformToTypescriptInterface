import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    meta: { title: '测试' },
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/print',
    name: 'print',
    meta: { title: '打印' },
    component: () => import('@/views/print/index.vue')
  },
  {
    path: '/port',
    name: 'port',
    meta: { title: '串口' },
    component: () => import('@/views/port/index.vue')
  },
  {
    path: '/vue3',
    name: 'vue3',
    meta: { title: 'vue3' },
    component: () => import('@/views/vue3/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: { title: '哎呀！页面找不到啦！' },
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = `TS接口转换器 ${to.meta.title}`
})

export default router
