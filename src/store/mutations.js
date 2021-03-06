import * as types from './mutations-types'

export default {
  [types.TOGGLE_NAV](state) {
    state.topnav = !state.topnav
  },
  [types.TOGGLE_BAR](state) {
    state.readbar = !state.readbar
  },
  [types.SHOW_LIST_PANEL](state) {
    state.list_panel = !state.list_panel
  },
  [types.SHOW_FONT_PANEL](state) {
    state.font_panel = !state.font_panel
  },
  [types.FZ_SIZE_ADD](state) {
    state.fz_size++
      if (state.fz_size >= 24) {
        state.fz_size = 24
      }
  },
  [types.FZ_SIZE_SUB](state) {
    state.fz_size--
      if (state.fz_size <= 14) {
        state.fz_size = 14
      }
  },
  [types.SWITCH_NIGHT](state) {
    state.bg_night = !state.bg_night
  }
}