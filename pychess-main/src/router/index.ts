import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/HomeGuestView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/HomeView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/play',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'play',
        component: () => import('@/views/PlayView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'game',
        component: () => import('@/views/GameView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/match',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'match',
        component: () => import('@/views/MatchView.vue')
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
      next() // Proceed to the route if user data is successfully fetched
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      next('/login') // Redirect to login page
    }
  } else {
    next() // Proceed to the route if it doesn't require authentication
  }
})

export default router
