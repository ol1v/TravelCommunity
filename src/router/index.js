import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Importing views
import Login from '../views/Login'
import Home from '../views/Home'


let router = new VueRouter({
  mode: 'history',
  routes: [{
    component: Home,
    path: '/'
  }, {
    component: Login,
    path: '/login'
  }]
})

//Export router
export default router