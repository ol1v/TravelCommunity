import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'
import SecureLs from 'secure-ls'

Vue.use(Vuex)

let state = {
  loggedIn: false,
  username: "",
  admin: 0,
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
  SET_ADMIN_STATE(state, payload){
    state.admin = payload
  },
  // Searchfunction
  SET_FROM(state, payload) {
    state.from = payload
  },
  SET_TO(state, payload) {
    state.to = payload
  }
}

const ls = new SecureLs({isCompression: false})

let store = new Vuex.Store({
  state,
  mutations,
  plugins: [
    PersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})

export default store