<template>
  <div>
    <!-- Navigation bar -->
    <nav>
      <!-- Left column -->
      <div id="left-column" :style="setWhiteNavbar">
        <div id="navbar-logo">
          <span
            v-if="this.$route.name == 'Home'"
            class="travelTextHome"
            :style="setNavbarText"
          >TRAVEL</span>
          <span v-else class="travelText" :style="setNavbarText">TRAVEL</span>
          <span class="communityText">COMMUNITY</span>
        </div>
      </div>

      <!-- Right column -->
      <div id="right-column">
        <ul>
          <li>
            <router-link to="/" class="navbar-links" @click.native="changeWhitebar">SÖK RESA</router-link>
          </li>
          <li>
            <router-link to="/popular" class="navbar-links" @click.native="changeWhitebar">POPULÄRA</router-link>
          </li>
          <li
            v-if="!this.$store.state.loggedIn"
            class="navbar-links-login"
            @click="loginArea"
          >LOGGA IN / REGISTRERA</li>
          <li>
            <router-link
              to="/user"
              class="navbar-links"
              v-if="this.$store.state.loggedIn"
            >{{this.$store.state.username.toUpperCase()}}</router-link>
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

        <!-- Login components -->
        <div id="login-components">
          <!-- Logo -->
          <div id="login-logo">
            <span class="travelText">TRAVEL</span>
            <span class="communityText">COMMUNITY</span>
          </div>
          <!-- Inputs -->
          <label for="login-username">Användarnamn</label>
          <input v-model="username" class="user-input" type="text" id="login-username" />
          <label for="login-password">Lösenord</label>
          <input v-model="password" class="user-input" type="password" id="login-password" />
          <!-- Forgot password / login button -->
          <div id="buttons">
            <input
              class="forgot-pass-button"
              type="button"
              value="Glömt lösenord?"
              @click="resetPassword"
            />
            <input class="login-button" type="button" @click="login" value="Logga in" />
          </div>
          <!-- Error message if failed to login -->
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
      homeScreen: false,
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  created() {
    if (this.$route.name == "Home") {
      this.homeScreen = true;
    } else {
      this.homeScreen = false;
    }
  },
  methods: {
    // Login button
    login() {
      //Pass data to server
      const credentials = { username: this.username, password: this.password };
      let url = "http://localhost:3005/";

      this.axios
        .post(url + "login/", credentials)
        .then(response => {
          this.$store.commit("SET_LOGGED_IN", true);
          this.$store.commit("SET_USERNAME", this.username);
          this.$store.commit("SET_ADMIN_STATE", response.data.admin);

          this.displayLoginStatus = false;
          this.$router.push({ name: "User" });
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
          console.log(err);
        });
    },
    // Login area
    loginArea() {
      this.errorMessage = "";
      this.displayLoginStatus = !this.displayLoginStatus;
    },
    // Register button
    register() {
      this.displayLoginStatus = false;
      this.$router.push({ name: "Register" });
    },
    // Logout button
    logout() {
      // Check if user wants to logout
      let askLogout = confirm("Är du säker att du vill logga ut?");
      if (askLogout) {
        this.$store.commit("SET_LOGGED_IN", false);
        this.$store.commit("SET_USERNAME", ""),
          this.$store.commit("SET_ADMIN_STATE", 0);
        this.$router.push({ name: "Home" });
      } else {
        console.log("Stayed logged in");
      }
    },
    // Reset password button
    resetPassword() {
      this.displayLoginStatus = !this.displayLoginStatus;
      this.$router.push({ name: "ResetPassword" });
    },
    // Change whitebar
    changeWhitebar() {
      if (this.$route.name == "Home") {
        this.homeScreen = true;
      } else {
        this.homeScreen = false;
      }
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
    },
    setWhiteNavbar() {
      if (this.homeScreen) {
        return {
          "background-color": "transparent"
        };
      } else {
        return {};
      }
    },
    setNavbarText() {
      if (this.displayLoginStatus) {
        return {
          color: "black"
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
  height: 75px;
  z-index: 9999;
  display: flex;
}
ul,
li {
  display: inline;
  padding: 0px;
  margin: 0px;
}
#left-column {
  width: 40%;
  background-color: white;
}

.travelText {
  color: black;
}
.travelTextHome {
  color: white;
}
.communityText {
  color: #8ec5fc;
}

#right-column {
  width: 60%;
  background-color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

#navbar-logo {
  width: auto;
  height: 75px;
  float: left;
  margin-left: 30px;
  line-height: 75px;
  color: white;
  font-size: 25px;
}

.navbar-links:before {
  content: "";
  display: block;
  width: 100%;
  border-bottom: 2px solid #61a3ff;
  position: absolute;
  left: 0;
  bottom: -1px; /* this is to match where the border is */
  transform-origin: left;
  transform: scale(0);
  transition: 0.25s linear;
}

.navbar-links:hover:before {
  transform: scale(1);
}
.navbar-links {
  transition: all 0.25s linear;
  position: relative;
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

.navbar-links:focus{
  color: #8ec5fc;
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
  cursor: pointer;
}

.navbar-links-login:hover {
  color: #61a3ff;
  height: 50px;
}

/* Login panel */
#login-fullscreen {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(153, 202, 251, 0.9) 100.2%
  );
  display: none;
  margin-top: -75px;
  z-index: 25;
}

#login-area {
  width: 25%;
  min-width: 300px;
  height: auto;
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