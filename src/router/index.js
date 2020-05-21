import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Importing views
import Login from '../views/Login'
import Home from '../views/Home'
import Register from '../views/Register'
import Searchresult from '../views/Searchresult'

let router = new VueRouter({
  mode: 'history',
  routes: [{
    component: Home,
    path: '/'
  }, {
    component: Login,
    path: '/login'
  }, {
    name: "Register",
    component: Register,
    path: '/register'
  },
  {
    name: "Searchresult",
    component: Searchresult,
    path: '/results'
  }]
})

//Export router
export default router