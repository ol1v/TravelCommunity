import Vue from 'vue'
import App from './App.vue'
import search from './components/Search.vue'
import store from './store'

Vue.config.productionTip = false
Vue.component('home-search', search);

import router from './router'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
