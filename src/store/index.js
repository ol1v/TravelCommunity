import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  loggedIn: false,
  username: "",
  // search variables
  from: null,
  to: null
}

let mutations = {
  SET_LOGGED_IN(state, payload) {
    state.loggedIn = payload
  },
  SET_USERNAME(state, payload) {
    state.username = payload
  },
  // Searchfunction
  SET_FROM(state, payload) {
    state.from = payload
  },
  SET_TO(state, payload) {
    state.to = payload
  }
}

//Use secureLS for making logged-in boolean non editable.

let store = new Vuex.Store({
  state,
  mutations
})

export default store