<template>
  <div>
    <Navbar v-responsive.md.lg.xl></Navbar>
    <MobileNavbar v-responsive.sm.xs></MobileNavbar>
    
    <router-view></router-view>
  </div>
</template>

<script>
//Imports
import Navbar from './components/Navbar'
import MobileNavbar from './mobile-components/MobileNavbar'

export default {
  name: 'App',
  components:{
    Navbar,
    MobileNavbar
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
