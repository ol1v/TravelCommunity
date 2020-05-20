<template>
  <div>
    <div id="login-area">
      <div id="login-logo"></div>
      <div id="login-components">
        <label for="username">Användarnamn</label>
        <input class="input" id="username" type="text" placeholder="Användarnamn">
        <label for="password">Lösenord</label>
        <input class="input" id="password" type="password" placeholder="Lösenord">
        <input class="input-button" type="button" value="Logga in">
      </div>

      <p class="center">-- Eller --</p>  
        <div id="registration-area">
          <input class="input-button-register" type="button" value="Registrera dig">
        </div>


    </div>



    <!--<div id="login-wrapper">
      <div id="login-inside-wrapper">
        <div id="login-logo"></div>
        <div id="login-area">
          <input class="input" type="text" placeholder="Användarnamn">
          <input class="input" type="password" placeholder="Lösenord">
          <input class="input-button" type="button" value="Logga in">
          
        </div>
        <p class="center">-- Eller --</p>  
        <div id="registration-area">
          <input class="input-button-register" type="button" value="Registrera dig">
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#login-area{
  width: 30%;
  height: 600px;
  background-color: white;
  margin: 50px auto;
}
#login-logo{
  width: 200px;
  height: 50px;
  background-color: black;
  margin: auto;
}
#login-components{
  width: 50%;
  height: 25%;
  margin: 20px auto;
}

/* Classes */
.input{
  width: 100%;
  height: 30px;
  margin-top: 2px;
  box-sizing: border-box;
}
.input-button{
  width: 30%;
  height: 30px;
  float: right;
  margin-top: 10px;
}
.input-button-register{
  width: 50%;
  height: 30px;
}

#registration-area{
  width: 100%;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
}



/*#login-wrapper{
  width: 50%;
  height: 700px;
  margin: auto;
  background-color: green;
}
#login-logo{
  width: 50px;
  height: 50px;
  background-color: black;
  margin: auto;
}
#login-inside-wrapper{
  width: 50%;
  height: auto;
  margin: auto;
  position: relative;
  top: 100px;
}
#login-area{
  width: 70%;
  height: 110px;
  margin: auto;
}
.input{
  width: 100%;
  height: 30px;
  margin-top: 2px;
  box-sizing: border-box;
}
.input-button{
  width: 30%;
  height: 30px;
  float: right;
  margin-top: 10px;
}
.input-button-register{
  width: 100%;
  height: 30px;
  margin: auto;
}

#registration-area{
  width: 70%;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
} */
</style>