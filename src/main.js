import Vue from 'vue'
import App from './App.vue'
import search from './components/Search.vue'

Vue.config.productionTip = false
Vue.component('home-search' , search);

import router from './router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
