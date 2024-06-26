import { logout } from '@/api/auth'
import { getCurrentUser } from '@/api/user'
import { ActionContext, Module } from 'vuex'
import { State, UserModuleState } from '../index'

// Define the user module
const user: Module<UserModuleState, State> = {
  state: {
    id: null,
    name: null,
    score: 0
  },
  mutations: {
    SET_ID: (state: UserModuleState, id: number) => {
      state.id = id
    },
    SET_NAME: (state: UserModuleState, name: string) => {
      state.name = name
    },
    SET_SCORE: (state: UserModuleState, score: number) => {
      state.score = score
    },
    RESET_STATE: (state: UserModuleState) => {
      state.id = null
      state.name = null
      state.score = 0
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userScore')
    }
  },
  actions: {
    // Retrieve user information
    async getUserData ({ commit }: ActionContext<UserModuleState, State>): Promise<void> {
      let id = localStorage.getItem('userId')
      let username = localStorage.getItem('userName')
      let score = localStorage.getItem('userScore')
      if (!username || !id || !score) {
        const response = await getCurrentUser()
        const { code, message, data } = response.data
        if (code === 200) {
          id = data.id
          username = data.username
          score = data.score
          localStorage.setItem('userId', data.id)
          localStorage.setItem('userName', data.username)
          localStorage.setItem('userScore', data.score)
        } else {
          return Promise.reject(message)
        }
      }
      // Update state
      commit('SET_ID', id)
      commit('SET_NAME', username)
      commit('SET_SCORE', score)
      return Promise.resolve()
    },
    Logout ({ commit }: ActionContext<UserModuleState, State>): Promise<void> {
      // Call logout API and remove all states upon success
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('RESET_STATE')
          resolve()
        }).catch((error: Error) => {
          reject(error)
        })
      })
    }
  }
}

export default user
