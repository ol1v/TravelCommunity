import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

Vue.use(VueRouter)

//Importing views
import Home from '../views/Home'
import Register from '../views/Register'
import Searchresult from '../views/Searchresult'
import User from '../views/User'
import Popular from '../views/Popular'
import MyTrips from '../views/MyTrips'
import Controlpanel from '../views/Controlpanel'
import Settings from '../views/Settings'
import ResetPassword from '../views/ResetPassword'
import CreateTrip2 from '../components/CreateTrip2'

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
  }, {
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
    name: "Popular",
    component: Popular,
    path: '/popular'
  }, {
    name: "MyTrips",
    component: MyTrips,
    path: '/user/trips',
    meta: {
      requiresAuth: true
    }
  },{
    name: "CreateTrip2",
    component: CreateTrip2,
    path: '/user/test',
    meta: {
      requiresAuth: true
    }
  },{
    name: "MyTripsProps",
    component: MyTrips,
    path: '/user/trips/:checkUser',
    meta: {
      requiresAuth: true
    },
    props: true
  }, {
    name: "Settings",
    component: Settings,
    path: '/user/settings',
    meta: {
      requiresAuth: true
    }
  }, {
    name: "Controlpanel",
    component: Controlpanel,
    path: '/user/admin',
    meta: {
      requiresAdmin: true
    }
  }, {
    name: "ResetPassword",
    component: ResetPassword,
    path: '/reset-password'
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
  else if (to.meta.requiresAdmin) {
    if (Store.state.loggedIn && Store.state.admin) {
      next()
    }
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