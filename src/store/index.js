import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  loggedIn: false
}

let mutations = {
  SET_LOGGED_IN(state, payload){
    state.loggedIn = payload
  }
}

//Use secureLS for making logged-in boolean non editable.

let store = new Vuex.Store({
  state,
  mutations
})

export default store