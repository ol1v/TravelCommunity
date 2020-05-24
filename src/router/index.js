import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

Vue.use(VueRouter)

//Importing views
//import Login from '../views/Login'
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
    name: "Register",
    component: Register,
    path: '/register'
  },
  {
    name: "Searchresult",
    component: Searchresult,
    path: '/results'
  }, {
    name: "User",
    component: User,
    path: '/user',
    meta: {
      requiresAuth: true
    }
  }, {
    name: "Searchresult",
    component: Searchresult,
    path: '/search'
  }]
})

//Avoid navigating to Users if not logged in
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    //Check if user is logged in
    if (Store.state.loggedIn) {
      next()
    }
    //Else, push them back to Homescreen.
    else {
      router.push({ name: "Home" })
    }
  }
  else {
    next()
  }
})

//Export router
export default router