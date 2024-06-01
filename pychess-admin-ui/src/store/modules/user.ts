import { login, logout } from '@/api/login'
import { ActionContext, StoreOptions } from 'vuex'

// Define the UserStateProps interface
interface UserStateProps {
  name: string | null;
}

// Define the user module
const user = {
  state: {
    name: null
  } as UserStateProps,
  mutations: {
    SET_NAME: (state: UserStateProps, name: string) => {
      state.name = name
    },
    RESET_STATE: (state: UserStateProps) => {
      state.name = null
      state.name = null
    }
  },
  actions: {
    // Define the type for the context parameter
    async Login ({ commit }: ActionContext<UserStateProps, StoreOptions<UserStateProps>>, userInfo: { username: string; password: string }): Promise<void> {
      const { username, password } = userInfo
      const response = await login(username, password)
      const { code, message } = response.data
      console.log(code)
      console.log(message)
      if (code === 200) {
        commit('SET_NAME', username)
        return Promise.resolve()
      } else {
        return Promise.reject(message)
        // login(username, password).then((res :AxiosResponse<LoginResponse>) => {
        //   const { code, message } = res.data
        //   console.log(code)
        //   console.log(message)
        //   if (code === 200) {
        //     // Set the name in the store
        //     commit('SET_NAME', username)
        //     return resolve()
        //   } else {
        //     return reject(message)
        //   }
        // }).catch(error => {
        //   reject(error)
      } // })
    },
    Logout ({ commit }: ActionContext<UserStateProps, StoreOptions<UserStateProps>>): Promise<void> {
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
