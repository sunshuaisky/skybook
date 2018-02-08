import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  topnav: true,
  readbar: false,
  font_panel: false,
  bg_color: 0,
  bg_night: false,
  fz_size: 18,
  list_panel: false,
  Clist: [],
  curChapter: "",
  bookid: "",
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})