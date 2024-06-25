import { ActionContext, Module } from 'vuex'
import { AppModuleState, State } from '../index'

const app: Module<AppModuleState, State> = {
  state: {
    theme: 'light',
    device: 'desktop'
  },
  mutations: {
    TOGGLE_THEME: (state: AppModuleState) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    SET_DEVICE: (state: AppModuleState, device: string) => {
      state.device = device
    }
  },
  actions: {
    toggleTheme ({ commit }: ActionContext<AppModuleState, State>) {
      commit('TOGGLE_THEME')
    },
    setDevice ({ commit }: ActionContext<AppModuleState, State>, device: string) {
      commit('SET_DEVICE', device)
    }
  }
}

export default app
