<template>
  <div>
    <nav>
      <div id="navbar-logo"></div>
      <ul>
          <li><router-link to="/" class="navbar-links">Sök resa</router-link></li> | 
          <li><router-link to="/" class="navbar-links">Resor</router-link></li>
          <!--<li><router-link to="/login" class="navbar-links-login">Logga in</router-link></li>-->
          <li class="navbar-links-login" @click="loginArea">Logga in</li>
      </ul> 
    </nav>


  </div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
nav{
  /* background-color: rgba(236,236,236,1); */
  width: 100%;
  height: 50px;
  box-shadow: rgb(211, 207, 207) 0px 0px 0px 1px;
}
ul, li{
  display: inline;
  padding: 0px;
  margin: 0px;
}
#navbar-logo{
  width: 200px;
  height: 50px;
  background-color: black;
  float: left;
}
.navbar-links{
  display: inline-block;
  width: auto;
  height: 50px;
  color: black;
  text-align: center;
  text-decoration: none;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
}
.navbar-links-login{
  display: block;
  width: auto;
  height: 50px;
  color: black;
  text-align: center;
  text-decoration: none;
  line-height: 50px;
  float: right;
  padding-right: 30px;
  padding-left: 30px;
  cursor: pointer;
}
.navbar-links:hover, .navbar-links-login:hover{
  background-color: grey;
  color: white;
  height: 50px;
}

</style>