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
      return new Promise(async (resolve, reject) => {
        // Example response:
        // {
        //   "code": 200,
        //   "message": "Login Successful",
        //   "data": <token string>
        // }
        await login(username, password).then(res => {
          const code = res.data.code
          // If login success
          if (code === 200){
            commit('SET_NAME', username)
            return resolve()
          } else {
            return reject(res.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }: ActionContext<UserStateProps, StoreOptions<UserStateProps>>): Promise<void> {
      // Call logout API and remove all states upon success
      return new Promise(async (resolve, reject) => {
        await logout().then(() => {
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
