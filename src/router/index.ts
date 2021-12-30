import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
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
