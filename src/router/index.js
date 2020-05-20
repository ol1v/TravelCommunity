import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Importing views
import Home from '../views/Home'

let router = new VueRouter({
  mode: 'history',
  routes:[{
    component: Home,
    path: '/'
  }]
})

//Export router
export default router