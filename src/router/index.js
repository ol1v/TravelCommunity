import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Importing views
import Home from '../views/Home'
import Login from '../views/Login'

let router = new VueRouter({
  mode: 'history',
  routes:[{
    component: Home,
    path: '/'
  }, {
    component: Login,
    path: '/login'
  }]
})

//Export router
export default router