<template>
  <div>
    <nav>
      <div id="left-column">
        <h1><span class="travel" :style="setWhiteText">Travel</span><span class="community">Community</span></h1>
      </div>
      <div id="right-column">
        <div id="dropDownButton" @click="displayDropdown" :style="changeButton"></div>
      </div>
    </nav>

    <div id="dropDown" :style="showDropDown">
      <ul>
        <li><router-link to="/" @click.native="displayDropdown" class="links">SÖK RESA</router-link></li>
        <li><router-link to="/popular" @click.native="displayDropdown" class="links">POPULÄRA</router-link></li>
        <li v-if="!this.$store.state.loggedIn" class="links" @click="showLoginArea">LOGGA IN / REGISTRERA</li>
        <li><router-link to="/user" class="links" @click.native="displayDropdown" v-if="this.$store.state.loggedIn">{{this.$store.state.username.toUpperCase()}}</router-link></li>
        <li v-if="this.$store.state.loggedIn" class="links" @click="logout">LOGGA UT</li>
      </ul>
    </div>

    <!-- Login fullscreen -->
    <div id="displayLogin" :style="displayLogin">
      <div id="login-full-screen">
        <div id="login-area">
          <div id="top-login-bar">
            <input type="button" class="font close-window" value="X" @click="showLoginArea">
          </div>

          <div id="login-logo">
            <span class="travelText font">TRAVEL</span>
            <span class="communityText font">COMMUNITY</span>
          </div>

          <!-- Login inputs -->
          <div class="user-input">
            <label for="username" class="font pad">Användarnamn</label>
            <input type="text" id="username" class="login-input pad" v-model="username">
            <label for="password" class="font pad">Lösenord</label>
            <input type="password" id="password" class="login-input pad" v-model="password">
            
            <!-- Buttons for login and forgot password -->
            <div id="login-buttons">
              <input type="button" value="Glömt lösenord?" class="forgot-pass font" @click="resetPassword">
              <input type="button" value="Logga in" class="login-button font" @click="login">
            </div>
          </div>

          <!-- Error message -->
          <div id="error-message">{{errorMessage}}</div>

          <!-- Registration components -->
          <div id="register-components">
            <p class="center font">Eller</p>
            <input class="register-button font" type="button" value="Registrera dig" @click="register"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dropDownStatus: false,
      changeButtonStatus: false,
      displayLoginScreen: false,
      homeScreen: false,
      username: "",
      password: "",
      errorMessage: ""
    }
  },
  created(){
    if(this.$route.name == "Home"){
      this.homeScreen = true
    }
    else{
      this.homeScreen = false
    }
  },
  methods:{
    displayDropdown(){
      this.dropDownStatus = !this.dropDownStatus
      this.changeButtonStatus = !this.changeButtonStatus
      this.changeWhiteColor()
    },
    showLoginArea(){
      this.displayLoginScreen = !this.displayLoginScreen
      this.dropDownStatus = false
      this.changeButtonStatus = false
      this.errorMessage = ""
    },
    login(){
      const credentials = { username: this.username, password: this.password };
      let url = "http://192.168.1.159:3005/";

      this.axios
        .post(url + "login/", credentials)
        .then(response => {
          this.$store.commit("SET_LOGGED_IN", true);
          this.$store.commit("SET_USERNAME", this.username);
          this.$store.commit("SET_ADMIN_STATE", response.data.admin)

          this.showLoginArea()
          this.homeScreen = false

          this.$router.push({ name: "User" });
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
          console.log(err);
        });
    },
    register() {
      this.showLoginArea()
      this.$router.push({ name: "RegisterUser" });
    },
    logout(){
      this.dropDownStatus = false
      this.changeButtonStatus = false

      this.$store.commit("SET_LOGGED_IN", false);
      this.$store.commit("SET_USERNAME", ""),
      this.$store.commit("SET_ADMIN_STATE", 0)
      this.$router.push({ name: "Home" });
    },
    resetPassword(){
      this.showLoginArea()
      this.$router.push({name: "ResetPassword"})
    },
    changeWhiteColor(){
      if(this.$route.name == "Home"){
        console.log("Home tapped")
        this.homeScreen = true
      }
      else{
        this.homeScreen = false
      }
    }
  },
  computed:{
    showDropDown(){
      if(this.dropDownStatus){
        return {
          "transform":"translateX(0)",
        }
      }
      else{
        return {}
      }
    },
    changeButton(){
      if(this.changeButtonStatus){
        return{
          "transform": "rotate(-90deg)"
        }
      }
      else{
        return {}
      }
    },
    displayLogin(){
      if(this.displayLoginScreen){
        return{
          display: "block"
        }
      }
      else{
        return {}
      }
    },
    setWhiteText() {
      if(this.homeScreen){
        return{
          "color":"white"
        }
      }
      else{
        return {
          
        }
      } 
    }
  }
}
</script>

<style scoped>
nav{
  width: 100%;
  height: 75px;
  z-index: 500;
}

#left-column{
  width: 90%;
  height: 75px;
  float: left;
  text-align: center;
  line-height: 75px;
}

#right-column{
  width: 10%;
  height: 75px;
  float: right;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

#dropDownButton{
  width: 30px;
  height: 30px;
  margin: auto; 
  background-image: url('../assets/menu.png');
  background-repeat: no-repeat; 
  transition: 0.5s;
  z-index: 10;
}

#dropDown{
  width: 80%;
  height: calc(100vh - 75px);
  float: right;
  background-color: #026f7e;
  position: fixed;
  right: 0px;
  top: 75px;
  transform: translateX(120%);
  transition: 1s;
  z-index: 1000;
}

#dropDown ul, li{
  display: block;
  padding: 0px;
  margin: 0px;
}

.links{
  display: block;
  width: 100%;
  height: 50px;
  color: white;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}

.travel{
  color: black;
  font-family: "Montserrat", sans-serif;
}
.community{
  color: #8ec5fc;
  font-family: "Montserrat", sans-serif;
}

h1{
  margin: 0px;
  padding: 0px;
}
/* Login / Register */
#displayLogin{
  display: none;
  z-index: 400;
}

#login-full-screen{
  width: 100%;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.9);
  z-index: 501;
  position: fixed;
  margin-top: -75px;
  display: flex;
}

#login-area{
  width: 95%;
  height: 400pt;
  margin: 50px auto;
  background-color: white;
  position: relative;
  border-radius: 10px;
}

#top-login-bar{
  width: 100%;
  height: 30px;
  background-color: white;
  border-top-left-radius: 10px;
}

.close-window{
  width: 30px;
  height: 30px;
  background-color: transparent;
  position: absolute;
  right: 0;
  border: 0.5px solid black;
}

#login-logo{
  width: 100%;
  height: 50px;
  margin-top: 50px;
  font-size: 30px;
  text-align: center;
}
.travelText{
  color: black;
}
.communityText{
  color: #8ec5fc;
}

.user-input{
  width: 90%;
  height: auto;
  margin: 20px auto;
}

.login-input{
  width: 100%;
  height: 50px;
  box-sizing: border-box;
}
.pad{
  padding-left: 10px;
}

#login-buttons{
  width: 100%;
  height: 50px;
  margin: 15px auto;
}
.forgot-pass{
  width: 70%;
  height: 50px;
  text-align: left;
  color: #00cbff;
  border: 0;
  background-color: transparent;
}
.login-button{
  width: 30%;
  height: 50px;
  border: 1px solid black;
  color: black;
  background-color: transparent;
}

#register-components{
  width: 90%;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 50px;
  margin-right: auto;
}

.register-button{
  width: 100%;
  height: 50px;
  margin: auto;
  background-color: transparent;
  border: 1px solid black;;
}

#error-message{
  width: 100%;
  height: auto;
  text-align: center;
  color: red;
  margin-top: 10px;
}
</style>