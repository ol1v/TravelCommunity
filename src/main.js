import Vue from 'vue'
import App from './App.vue'
import search from './components/Search.vue'
import Result from './components/Result.vue'
import Loader from './components/Loader.vue'
import store from './store'

import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

Vue.config.productionTip = false

Vue.component('home-search', search);
Vue.component('Result', Result)
Vue.component('Loader', Loader)

import router from './router'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
