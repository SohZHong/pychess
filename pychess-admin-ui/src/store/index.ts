import { createStore } from 'vuex'
import getters from './getter'
import user from './modules/user'
import { app, SideBarProps } from './modules/app'

export interface UserModuleState {
  name: string | null
}

export interface AppModuleState {
  sidebar: SideBarProps
  device: string
}

export interface State {
  user: UserModuleState
  app: AppModuleState
}

export default createStore<State>({
  modules: {
    user,
    app
  },
  getters
})
