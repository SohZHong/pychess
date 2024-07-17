import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'
import store from '@/store'

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
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/question',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'question',
        component: () => import('@/views/QuestionView.vue')
      },
      {
        path: 'chess',
        name: 'chess',
        component: () => import('@/views/ChessView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/UserView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue')
      }
    ],
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    try {
      await store.dispatch('getUserData')
      next() // Proceed to the route if user data is successfully fetched and validations pass
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      next('/login') // Redirect to login page
    }
  } else {
    next() // Proceed to the route if it doesn't require authentication
  }
})

export default router
