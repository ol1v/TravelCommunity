import Vue from 'vue'
import App from './App.vue'
import search from './components/Search.vue'
import Result from './components/Result.vue'
import store from './store'

import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false
Vue.component('home-search', search);
Vue.component('Result', Result)

import router from './router'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
