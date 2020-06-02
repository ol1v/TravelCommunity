<template>
  <div>
    <Navbar v-responsive.lg.xl></Navbar>
    <MobileNavbar v-responsive.sm.xs></MobileNavbar>
    
    <router-view></router-view>
    <!-- <MyFooter></MyFooter> -->
  </div>
</template>

<script>
//Imports
import Navbar from './components/Navbar'
import MobileNavbar from './mobile-components/MobileNavbar'
// import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components:{
    Navbar,
    MobileNavbar
    // MyFooter
  }

}
</script>

<style>
html, body{
  margin: 0px;
  padding: 0px;
}
.center{
  text-align: center;
}
.font{
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}
</style>
