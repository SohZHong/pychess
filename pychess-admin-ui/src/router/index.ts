import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      }
    ]
  },
  {
    path: '/about',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
