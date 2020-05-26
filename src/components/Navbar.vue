<template>
  <div>
    <!-- Navigation bar -->
    <nav>
      <!-- Left column -->
      <div id="left-column" :style="setWhiteNavbar">
        <div id="navbar-logo">
          <span v-if="this.$route.name == 'Home'" class="travelTextHome" :style="setNavbarText">TRAVEL</span>
          <span v-else class="travelText" :style="setNavbarText">TRAVEL</span>
          <span class="communityText">COMMUNITY</span>
        </div>
      </div>

      <!-- Right column -->
      <div id="right-column">
        <ul>
          <li>
            <router-link to="/" class="navbar-links">SÖK RESA</router-link>
          </li>
          <li>
            <router-link to="/popular" class="navbar-links">POPULÄRA</router-link>
          </li>
          <li v-if="!this.$store.state.loggedIn" class="navbar-links-login" @click="loginArea">LOGGA IN / REGISTRERA</li>
          <li>
            <router-link to="/user" class="navbar-links" v-if="this.$store.state.loggedIn">{{username.toUpperCase()}}</router-link>
          </li>
          <li v-if="this.$store.state.loggedIn" class="navbar-links-login" @click="logout">LOGGA UT</li>
        </ul>
      </div>
    </nav>

    <!-- Login page -->
    <div id="login-fullscreen" :style="displayLogin">
      <div id="login-area">
        <div id="login-top-bar">
          <input class="close-window-button" type="button" value="X" @click="loginArea" />
        </div>
        <div id="login-components">
          <div id="login-logo">
            <span class="travelText">TRAVEL</span>
            <span class="communityText">COMMUNITY</span>
          </div>

          <label for="username">Användarnamn</label>
          <input v-model="username" class="user-input" type="text" id="username" />
          <label for="password">Lösenord</label>
          <input v-model="password" class="user-input" type="password" id="password" />

          <div id="buttons">
            <input class="forgot-pass-button" type="button" value="Glömt lösenord?" />
            <input class="login-button" type="button" @click="login" value="Logga in" />
          </div>

          <div id="error-message">{{errorMessage}}</div>

          <!-- Register button -->
          <div id="register-components">
            <p class="center">Eller</p>
            <input class="register-button" type="button" value="Registrera dig" @click="register" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayLoginStatus: false,
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    login() {
      //Connect
      const credentials = { username: this.username, password: this.password };
      let url = "http://localhost:3005/";

      this.axios
        .post(url + "login/", credentials)
        .then(response => {
          console.log(response.data);
          this.$store.commit("SET_LOGGED_IN", true);
          this.$store.commit("SET_USERNAME", this.username);

          this.displayLoginStatus = false;
          this.$router.push({ name: "User" });
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
          console.log(err);
        });
    },
    loginArea() {
      this.errorMessage = "";
      this.displayLoginStatus = !this.displayLoginStatus;
    },
    register() {
      this.displayLoginStatus = false;
      this.$router.push({ name: "Register" });
    },
    logout() {
      this.$store.commit("SET_LOGGED_IN", false);
      this.$router.push({ name: "Home" });
    }
  },
  computed:{
    displayLogin(){
      if(this.displayLoginStatus){
        return{
          "display":"block",
        }
      }
      else{
        return {}
      }
    },
    setWhiteNavbar(){
      if(this.displayLoginStatus){
        return{
          "background-color": "white"
        }
      }
      else{
        return {}
      }
    },
    setNavbarText(){
      if(this.displayLoginStatus){
        return{
          "color": "black"
        }
      }
      else{
        return {}
      }
    }
  }
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 75px;
  z-index: 9999;
}
ul,
li {
  display: inline;
  padding: 0px;
  margin: 0px;
}
#left-column{
  width: 40%;
  height: 100%;
  float: left;
  background-color: transparent;
}

.travelText{
  color: black;
}
.travelTextHome{
  color: white;
}
.communityText{
  color: #8ec5fc;
}

#right-column{
  width: 60%;
  height: 100%;
  float: right;
  background-color: white;
}

#navbar-logo {
  width: auto;
  height: 75px;
  /* background-image: url("../assets/tempLogo.png");
  background-repeat: no-repeat; */
  float: left;
  margin-left: 30px;
  line-height: 75px;
  color: white;
  font-size: 25px;
}
.navbar-links {
  display: inline-block;
  width: auto;
  height: 50px;
  color: black;
  text-align: center;
  text-decoration: none;
  line-height: 75px;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
}
.navbar-links-login {
  display: block;
  width: auto;
  height: 50px;
  color: black;
  text-align: center;
  text-decoration: none;
  line-height: 75px;
  float: right;
  font-size: 18px;
  padding-right: 30px;
  padding-left: 30px;
  cursor: pointer;
}
.navbar-links:hover,
.navbar-links-login:hover {
  color: #00cbff;
  height: 50px;
}
/* Login panel */
#login-fullscreen {
  width: 100%;
  height: 100vh;
  background: rgba(128, 128, 128, 0.9);
  position: fixed;
  display: none;
  z-index: 2;
}
#login-area {
  width: 25%;
  height: 55%;
  background-color: white;
  margin: auto;
  position: relative;
  top: 100px;
  border-radius: 10px;
}
#login-top-bar {
  width: 100%;
  height: 40px;
}
.close-window-button {
  background-color: lightgrey;
  color: black;
  border: 0px;
  float: right;
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
}
#login-components {
  width: 75%;
  height: 550px;
  margin: auto;
}
#login-logo {
  width: 100%;
  height: 50px;
  background-image: url("../assets/tempLogo.png");
  margin-top: 50px;
  margin-bottom: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  font-size: 25px;
}

#error-message {
  width: 100%;
  height: auto;
  margin-top: 10px;
  text-align: center;
  color: red;
}

.user-input {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
#buttons {
  width: 100%;
  height: 40px;
}
.forgot-pass-button {
  width: 70%;
  height: 40px;
  float: left;
  text-align: left;
  background-color: transparent;
  color: #00cbff;
  border: 0px;
  cursor: pointer;
}
.login-button {
  width: 30%;
  height: 40px;
  float: left;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  cursor: pointer;
}
#register-components {
  width: 100%;
  height: 150px;
  margin-top: 30px;
}
.register-button {
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  cursor: pointer;
}
</style>