import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PageIndex from '@/views/PageIndex/PageIndex.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
