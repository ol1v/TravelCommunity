import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Importing views
import Login from '../views/Login'
import Home from '../views/Home'
import Register from '../views/Register'
import Searchresult from '../views/Searchresult'
import User from '../views/User'

let router = new VueRouter({
  mode: 'history',
  routes: [{
    name: "Home",
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
  },{
    name: "User",
    component: User,
    path: '/user'
  }]
})

//Export router
export default router