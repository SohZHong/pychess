import { login, logout } from '@/api/auth'
import { getCurrentUser } from '@/api/user'
import { ActionContext, Module } from 'vuex'
import { State, UserModuleState } from '../index'

// Define the user module
const user: Module<UserModuleState, State> = {
  state: {
    name: null
  },
  mutations: {
    SET_NAME: (state: UserModuleState, name: string) => {
      state.name = name
    },
    RESET_STATE: (state: UserModuleState) => {
      state.name = null
      localStorage.removeItem('username')
    }
  },
  actions: {
    // Retrieve user information
    async getUserData ({ commit }: ActionContext<UserModuleState, State>, refresh: boolean): Promise<void> {
      let username = localStorage.getItem('username')
      if (!username || refresh) {
        const response = await getCurrentUser()
        const { code, message, data } = response.data
        console.log(code)
        if (code === 200) {
          username = data.username
          localStorage.setItem('username', data.username)
        } else {
          return Promise.reject(message)
        }
      }
      // Update state
      commit('SET_NAME', username)
      return Promise.resolve()
    },
    // Define the type for the context parameter
    async Login ({ commit }: ActionContext<UserModuleState, State>, userInfo: { username: string; password: string }): Promise<void> {
      const { username, password } = userInfo
      const response = await login({ username, password })
      const { code, message } = response.data
      if (code === 200) {
        commit('SET_NAME', username)
        localStorage.setItem('username', username)
        return Promise.resolve()
      } else {
        return Promise.reject(message)
      }
    },
    Logout ({ commit }: ActionContext<UserModuleState, State>): Promise<void> {
      // Call logout API and remove all states upon success
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('RESET_STATE')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
