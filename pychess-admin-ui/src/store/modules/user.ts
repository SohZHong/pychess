import { login, logout } from '@/api/login'
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
      state.name = null
    }
  },
  actions: {
    // Define the type for the context parameter
    async Login ({ commit }: ActionContext<UserModuleState, State>, userInfo: { username: string; password: string }): Promise<void> {
      const { username, password } = userInfo
      const response = await login(username, password)
      const { code, message } = response.data
      if (code === 200) {
        commit('SET_NAME', username)
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
