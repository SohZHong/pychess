import { GetterTree } from 'vuex'
import { State } from './index'
import { SideBarProps } from './modules/app'

export interface Getters extends GetterTree<State, State> {
  name(state: State): string | null
  sidebar(state: State): SideBarProps
  device(state: State): string
}

const getters: Getters = {
  name: state => state.user.name,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}

export default getters
