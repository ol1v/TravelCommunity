<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
//Imports
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components:{
    Navbar,
    MyFooter
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
</style>
