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
    path: '/serialport',
    name: 'serialport',
    meta: { title: '串口通信（serialport）' },
    component: () => import('@/views/serialport/index.vue')
  },
  {
    path: '/webserial',
    name: 'webserial',
    meta: { title: '串口通信（webserial）' },
    component: () => import('@/views/webserial/index.vue')
  },
  {
    path: '/SQLite',
    name: 'SQLite',
    meta: { title: 'SQLite' },
    component: () => import('@/views/SQLite/index.vue')
  },
  {
    path: '/IndexedDB',
    name: 'IndexedDB',
    meta: { title: 'IndexedDB' },
    component: () => import('@/views/IndexedDB/index.vue')
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
