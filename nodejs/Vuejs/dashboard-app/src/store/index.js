import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  breadcrumbs: {},
  menuItem: {},
  viewName: ''
}

const mutations = {
  setBreadcrumbs: function (state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  },
  setViewName: function (state, viewName) {
    state.viewName = viewName
  }
}

const actions = {

}

const getters = {
  getBreadcrumbs: function (state) {
    return state.breadcrumbs
  },
  getViewName: function (state) {
    return state.viewName
  }
}

export default new Vuex.Store({
  strict: debug,
  state,
  getters,
  actions,
  mutations
})
