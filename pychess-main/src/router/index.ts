import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/LayoutView.vue'
import store from '@/store'
import { decrypt } from '@/utils/crypto'
import { PlayerProps } from '@/api/match'
import { computed } from 'vue'

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
  },
  {
    path: '/leaderboard',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'leaderboard',
        component: () => import('@/views/LeaderboardView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('@/views/SettingsView.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/rules',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'rules',
        component: () => import('@/views/RuleView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const validateAccess = async (to: RouteLocationNormalized) => {
  const encryptedPlayer1 = to.query.player1 as string
  const encryptedPlayer2 = to.query.player2 as string
  const id = computed(() => store.state.user.id)
  try {
    const decryptedPlayer1: PlayerProps = JSON.parse(decrypt(encryptedPlayer1))
    const decryptedPlayer2: PlayerProps = JSON.parse(decrypt(encryptedPlayer2))
    return (id.value === decryptedPlayer1.id || id.value === decryptedPlayer2.id)
  } catch (error) {
    console.error('Error decrypting player data:', error)
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    try {
      await store.dispatch('getUserData')

      // Validate the players
      if (to.name === 'game' || to.name === 'match') {
        const isValidForGame = await validateAccess(to)
        if (!isValidForGame) {
          await store.dispatch('showAlert', {
            message: 'You are not part of this game!',
            header: 'Invalid Session!',
            onClose: () => {
              router.back()
            }
          })
        }
      }

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
