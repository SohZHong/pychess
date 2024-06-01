import { ActionContext, Module } from 'vuex'
import { AppModuleState, State } from '../index'

export interface SideBarProps {
  open: boolean,
  hide: boolean // hidden for mobiles
}

export const app: Module<AppModuleState, State> = {
  state: {
    sidebar: <SideBarProps> {
      open: true,
      hide: false // hidden for mobiles
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: AppModuleState) => {
      // Untoggleable in mobile
      if (state.sidebar.hide) {
        return false
      }
      state.sidebar.open = !state.sidebar.open
    },
    SET_DEVICE: (state: AppModuleState, device: string) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar ({ commit }: ActionContext<AppModuleState, State>) {
      commit('TOGGLE_SIDEBAR')
    },
    setDevice ({ commit }: ActionContext<AppModuleState, State>, device: string) {
      commit('SET_DEVICE', device)
    }
  }
}
