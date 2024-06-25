import { createStore } from 'vuex'
import getters from '@/store/getter'
import user from '@/store/modules/user'
import app from '@/store/modules/app'
import alert from '@/store/modules/alert'

export interface UserModuleState {
  id: number | null
  name: string | null
  score: number
}

export interface AppModuleState {
  theme: string
  device: string
}

export interface AlertModuleState {
  alert: {
    isOpen: boolean,
    message: string,
    header: string,
    onClose: (() => void) | null
  }
}

export interface State {
  user: UserModuleState
  app: AppModuleState
  alert: AlertModuleState
}

export default createStore<State>({
  modules: {
    user,
    app,
    alert
  },
  getters
})
