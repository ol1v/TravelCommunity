<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    
  </div>
</template>

<script>
//Imports
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components:{
    Navbar
  }

}
</script>

<style>
html, body{
  margin: 0px;
  padding: 0px;
}
</style>
