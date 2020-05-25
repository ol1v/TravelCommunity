<template>
  <div>
    <nav>
      <div id="navbar-logo"></div>
      <ul>
        <li>
          <router-link to="/" class="navbar-links">Sök resa</router-link>
        </li>|
        <li>
          <router-link to="/" class="navbar-links">Resor</router-link>
        </li>
        <span v-if="this.$store.state.loggedIn">|</span>
        <li
          v-if="!this.$store.state.loggedIn"
          class="navbar-links-login"
          @click="loginArea"
        >Logga in / Registrera</li>
        <li>
          <router-link
            to="/user"
            class="navbar-links"
            v-if="this.$store.state.loggedIn"
          >{{username}}</router-link>
        </li>
        <li v-if="this.$store.state.loggedIn" class="navbar-links-login" @click="logout">Logga ut</li>
      </ul>
    </nav>

    <!-- Login page -->
    <div id="login-fullscreen" :style="displayLogin">
      <div id="login-area">
        <div id="login-top-bar">
          <input class="close-window-button" type="button" value="X" @click="loginArea" />
        </div>
        <div id="login-components">
          <div id="login-logo"></div>

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
  computed: {
    displayLogin() {
      if (this.displayLoginStatus) {
        return {
          display: "block"
        };
      } else {
        return {};
      }
    }
  }
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 50px;
  box-shadow: rgb(211, 207, 207) 0px 0px 0px 1px;
}
ul,
li {
  display: inline;
  padding: 0px;
  margin: 0px;
}
#navbar-logo {
  width: 200px;
  height: 50px;
  background-image: url("../assets/tempLogo.png");
  float: left;
}
.navbar-links {
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
.navbar-links-login {
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
.navbar-links:hover,
.navbar-links-login:hover {
  color: #00cbff;
  height: 50px;
}
/* Login panel */
#login-fullscreen {
  width: 100%;
  height: 100vh;
  background-color: grey;
  position: fixed;
  opacity: 0.9;
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
  width: 200px;
  height: 50px;
  background-image: url("../assets/tempLogo.png");
  margin: 50px auto;
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
  color: blue;
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