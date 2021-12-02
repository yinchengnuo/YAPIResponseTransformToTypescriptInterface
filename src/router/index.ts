import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/index/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('@/views/print/index.vue')
  },
  {
    path: '/port',
    name: 'port',
    component: () => import('@/views/port/index.vue')
  },
  {
    path: '/vue3',
    name: 'vue3',
    component: () => import('@/views/vue3/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
