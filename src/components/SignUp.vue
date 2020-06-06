<!-- 
TODO: 
	•	Set Password to input on submit - REQUIRED #1
	•	Set Username to input on submit - REQUIRED #2
	•	Email subscription checkbox     - OPTIONAL
	•	CSS RED TEXT - OPTIONAL        -#-HIGH PRIO-#-
  •	ToS Link - REQUIRED            -#-LOW PRIO -#-
-->

<template>
  <div>
    <div id="register-wrapper">
      <form @submit.prevent="submit">
        <div id="register-left">
          <div id="register-components">
            <h5 class="font center headerText">Registrera dig</h5>
            <!-- Email Field -->
            <div class="input-components" :class="{ 'input-components--error': $v.email.$error }">
              <label class="label-text font">Email</label>
              <input
                class="register-input"
                id="email"
                v-model.trim="$v.email.$model"
                @input="delayTouch($v.email)"
              />
            </div>
            <div class="error" v-if="$v.email.$error && !$v.email.required">Email is required</div>
            <div class="error" v-if=" $v.email.$error">Must be an email adress.</div>

            <!-- Name Field-->
            <div class="input-components" :class="{ 'input-components--error': $v.name.$error }">
              <label class="label-text font">Name</label>
              <input
                class="register-input"
                id="userName"
                v-model.trim="$v.name.$model"
                @input="delayTouch($v.name)"
              />
            </div>
            <div class="error" v-if="$v.name.$error && !$v.name.required">Name is required</div>
            <div
              class="error"
              v-if=" $v.name.$error && !$v.name.minLength"
            >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
            <div
              class="error"
              v-if=" $v.name.$error && !$v.name.alpha"
            >Name must consist of letters only.</div>

            <!-- Password Field -->
            <div
              class="input-components"
              :class="{ 'input-components--error': $v.password.$error }"
            >
              <label class="label-text font">Password</label>
              <input
                class="register-input"
                id="password"
                type="password"
                v-model.trim="$v.password.$model"
                @input="delayTouch($v.password)"
              />
            </div>

            <div
              class="error"
              v-if="$v.password.minLength && !$v.password.minLength"
            >Password is required.</div>

            <div
              class="error"
              v-if="!$v.password.minLength"
            >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>

            <!-- Repeat password -->
            <div
              class="input-components"
              :class="{ 'input-components--error': $v.repeatPassword.$error }"
            >
              <label class="label-text font">Repeat password</label>
              <input
                class="register-input"
                id="repeatPassword"
                type="password"
                v-model.trim="$v.repeatPassword.$model"
              />
            </div>
            <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>

            <!-- Submit -->
            <button
              class="font"
              id="register-button"
              type="submit"
              :disabled="submitStatus === 'PENDING'"
            >Submit!</button>

            <!-- Submit Status -->
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

            <!-- Error -->
            <div class="input-components">
              <label class="label-text font">Validation status:</label>
              <ul class="list__ul">
                <li v-if="$v.email.$invalid">
                  Email is
                  <kbd>$invalid</kbd>.
                </li>

                <li v-if="$v.name.$invalid">
                  Name is
                  <kbd>$invalid</kbd>.
                </li>

                <li v-if="$v.password.$invalid">
                  Field password is
                  <kbd>$invalid</kbd>.
                </li>

                <li v-if="$v.repeatPassword.$invalid">
                  RepeatPassword is
                  <kbd>$invalid</kbd>.
                </li>

                <li v-if="$v.$invalid">
                  Form is
                  <kbd>$invalid</kbd>.
                </li>
                <li v-else>All fine.</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
      <div id="register-right">
        <div id="register-right-image">
          <div id="register-text-area">
            <p class="register-para-text font">Här i kan du skriva en lång text</p>
          </div>
        </div>
        <div id="register-right-footer">
          <div id="follow-us">
            <p class="font follow-us-text">Följ oss</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  minLength,
  email,
  alpha
} from "vuelidate/lib/validators";

// Object with keys where keys must be objects with values.
const touchMap = new WeakMap();

export default Vue.extend({
  mixins: [validationMixin],
  mounted() {
    window.scrollTo(0, 500);
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      repeatPassword: "",
      submitStatus: null
    };
  },
  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      // Time before Error shows
      touchMap.set($v, setTimeout($v.$touch, 1000));
      console.log("The end");
    },

    loginAfterRegistration() {
      let url = "http://localhost:3005/";
      const credentials = { username: this.name, password: this.password };
      this.axios.post(url + "login/", credentials).then(response => {
        this.$store.commit("SET_LOGGED_IN", true);
        this.$store.commit("SET_USERNAME", this.name);
        this.$store.commit("SET_ADMIN_STATE", response.data.admin);

        this.$router.push({ name: "User" });
      });
    },
    login() {
      this.$router.push({ name: "Home" });
    },

    register() {
      // Set data
      const credentials = {
        username: this.name,
        email: this.email,
        password: this.password
      };
      let url = "http://localhost:3005/";

      // Send data
      this.axios
        .post(url + "register/", credentials)
        .then(response => {
          console.log(response.data.message);
          this.loginAfterRegistration();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },

    submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log(this.submitStatus);
      } else {
        // Submit Logic HERE
        this.submitStatus = "PENDING";
        console.log(this.submitStatus);
        setTimeout(() => {
          this.submitStatus = "OK";
          console.log(this.submitStatus);
        }, 500);
        this.register();
      }
    }
  },
  validations: {
    email: {
      email, // Requires Email input
      required
    },
    name: {
      alpha, // Required Alphabetic letters
      required, // Required field
      minLength: minLength(4) // Minimum characters
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password") // Must be === password
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#register-wrapper {
  background-color: white;
  border-top-left-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
  border: 1px solid rgba(0, 0, 0, 0.877);
  box-shadow: 2px 1px 0px 0px black;
  min-height: 400pt;
  margin: 2rem auto;
  overflow: auto;
  position: relative;
  top: 5rem;
  width: 50%;
}

#register-left {
  width: 55%;
  min-height: 400pt;
  float: left;
}

#register-right {
  width: 45%;
  min-height: 400pt;
  float: right;
}

#register-right-image {
  width: 90%;
  height: 325pt;
  background-image: url("../assets/register.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  right: 0;
  left: 10%;
  z-index: 10;
}

#register-right-footer {
  width: 100%;
  height: 100pt;
  background-color: #026f7e;
  margin-top: -25pt;
}

#register-components {
  width: 80%;
  margin: auto;
}

/* Error Tool Tip Styles*/
.error {
  /* font */
  color: #cc0033;
  font-family: Helvetica;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 0.6rem;
  /* background */
  background-color: #fce4e4;
  border: 0.1rem solid #fcc2c3;
  border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  /* positioning */
  margin-bottom: 1rem;
  margin-top: 0.3rem;
  margin-left: 0.4rem; /* distance between error tip and element it points to */
  margin-right: auto;
  padding: 0.7rem 0.7rem 0.45rem;
  position: relative;
}

/* Left Arrow Styles */
.error:after,
.error:before {
  border: 0.2rem solid transparent;
  content: "";
  position: absolute;
  top: -0.55rem;
}
.error:before {
  border-left: 0.5rem solid ffd9d9;
  border-right: 0.5rem solid ffd9d9;
  border-bottom: 0.3rem solid;
  height: 0;
  width: 15;
}

.register-input {
  width: 100%;
  height: 1.5rem;
  box-sizing: border-box;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  background-color: transparent;
  border-bottom: 0.1rem solid black;
  padding-left: 0.6rem;
}

.label-text {
  padding-left: 0.6rem;
  font-size: 0.7rem;
}

.input-components {
  margin-top: 0.7rem;
}

.headerText {
  font-size: 1.5rem;
  margin-top: 1.2rem;
}

#register-button {
  background-color: #026f7e;
  border: 0px;
  box-shadow: 0 3px 0 #01333a;
  color: white;
  cursor: pointer;
  height: 40px;
  width: 50%;
  margin-top: 3.5rem;
  transition-duration: 0.4s;
}

#register-button:hover {
  background-color: #0093a7;
  box-shadow: 0 3px 0 #026f7e;
}

#register-button:active {
  background-color: #00e1ff;
  box-shadow: none;
  top: 5px;
  transition-duration: 0s;
  box-shadow: 0 3px 0 #6ac3cf;
}

.button-component {
  width: 100%;
  height: auto;
  margin-top: 4rem;
  text-align: center;
}

.already-account-component {
  width: 100%;
  height: 50px;
  background-color: white;
  margin-top: 20pt;
}

.login-button {
  color: #026f7e;
  line-height: 50px;
  cursor: pointer;
  padding-left: 10px;
}

#register-text-area {
  width: 80%;
  height: 130px;
  position: relative;
  bottom: -190pt;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  overflow: hidden;
}

.register-para-text {
  padding: 10px;
  line-height: 65px;
  color: white;
  text-align: center;
}

#follow-us {
  width: 50%;
  height: 50px;
  position: relative;
  top: 50px;
  left: 10%;
  z-index: 0;
}
.follow-us-text {
  color: white;
  margin: 0;
  line-height: 50px;
}
</style>
