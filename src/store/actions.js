import * as types from './mutations-types'

export default {
  toggleNav({
    commit
  }) {
    commit(types.TOGGLE_NAV)
  },
  toggleBar({
    commit
  }) {
    commit(types.TOGGLE_BAR)
  },
  showListPanel({
    commit
  }) {
    commit(types.SHOW_LIST_PANEL)
  },
  showFontPanel({
    commit
  }) {
    commit(types.SHOW_FONT_PANEL)
  },
  fzSizeAdd({
    commit
  }) {
    commit(types.FZ_SIZE_ADD)
  },
  fzSizeSub({
    commit
  }) {
    commit(types.FZ_SIZE_SUB)
  },
  switchNight({
    commit
  }) {
    commit(types.SWITCH_NIGHT)
  }
}