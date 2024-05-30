import { getToken, setToken } from '@/utils/auth'
import { VueCookies } from 'vue-cookies'
import { login } from '@/api/login'
import { ActionContext, StoreOptions } from 'vuex'
import { AxiosResponse } from 'axios'

// Define the UserStateProps interface
interface UserStateProps {
  token: VueCookies | null;
  name: string | null;
}

// Define the LoginResponse interface
interface LoginResponse {
  token: VueCookies;
}

// Define the user module
const user = {
  state: {
    token: getToken(),
    name: null
  } as UserStateProps,
  mutations: {
    SET_TOKEN: (state: UserStateProps, token: VueCookies) => {
      state.token = token
    },
    SET_NAME: (state: UserStateProps, name: string) => {
      state.name = name
    }
  },
  actions: {
    // Define the type for the context parameter
    async Login ({ commit }: ActionContext<UserStateProps, StoreOptions<UserStateProps>>, userInfo: { username: string; password: string }): Promise<void> {
      const { username, password } = userInfo
      try {
        const res: AxiosResponse<LoginResponse> = await login(username, password)
        const token = res.data.token
        setToken(token)
        commit('SET_TOKEN', token)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default user
