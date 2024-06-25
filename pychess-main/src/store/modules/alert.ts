import { ActionContext, Module } from 'vuex'
import { AlertModuleState, State } from '@/store/index'

interface AlertProps {
  isOpen: boolean,
  message: string,
  header: string,
  onClose: (() => void) | null
}

const alert: Module<AlertModuleState, State> = {
  state: {
    alert: {
      isOpen: false,
      message: '',
      header: '',
      onClose: null
    }
  },
  mutations: {
    SHOW_ALERT (state: AlertModuleState, payload: AlertProps) {
      state.alert.isOpen = true
      state.alert.message = payload.message
      state.alert.header = payload.header || 'Error'
      state.alert.onClose = payload.onClose || null
    },
    HIDE_ALERT (state: AlertModuleState) {
      state.alert.isOpen = false
      // Run custom on close if provided
      if (state.alert.onClose) state.alert.onClose()
    }
  },
  actions: {
    showAlert ({ commit }: ActionContext<AlertModuleState, State>, payload: AlertProps) {
      commit('SHOW_ALERT', payload)
    },
    closeAlert ({ commit }: ActionContext<AlertModuleState, State>) {
      commit('HIDE_ALERT')
    }
  }
}

export default alert
