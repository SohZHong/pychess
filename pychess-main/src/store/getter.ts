import { GetterTree } from 'vuex'
import { AlertModuleState, State } from '@/store/index'

export interface Getters extends GetterTree<State, State> {
  id(state: State): number | null
  name(state: State): string | null
  score(state: State): number
  theme(state: State): string
  device(state: State): string
  alert(state: State): AlertModuleState
}

const getters: Getters = {
  id: state => state.user.id,
  name: state => state.user.name,
  score: state => state.user.score,
  theme: state => state.app.theme,
  device: state => state.app.device,
  alert: state => state.alert
}

export default getters
