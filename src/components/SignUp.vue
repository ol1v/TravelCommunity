<!-- 
TODO: 
	•	Password **** decryption input  - REQUIRED #1
	•	Set Password to input on submit - REQUIRED #2
	•	Set Username to input on submit - REQUIRED #3
	•	Email subscription checkbox     - OPTIONAL
	•	CSS RED TEXT - OPTIONAL        -#-HIGH PRIO-#-
  •	ToS Link - REQUIRED            -#-LOW PRIO -#-
-->

<template>
  <div class="hello">
    <div>
      <!-- Name Field -->
      <form @submit.prevent="submit">
        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
          <label class="form__label">Name</label>
          <input class="form__input" v-model.trim="$v.name.$model" @input="delayTouch($v.name)" />
        </div>
        <div class="error" v-if="$v.name.$error && !$v.name.required">Name is required</div>
        <div
          class="error"
          v-if=" $v.name.$error && !$v.name.minLength"
        >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        <div class="error" v-if="$v.name.$error && !$v.name.email">Needs to be a valid Email-adress</div>

        <!-- Password Field -->
        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
          <label class="form__label">Password</label>
          <input class="form__input" v-model.trim="$v.password.$model" />
        </div>
        <div class="error" v-if="!$v.password.required">Password is required.</div>
        <div
          class="error"
          v-if="!$v.password.minLength"
        >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>

        <!-- Repeat password -->
        <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
          <label class="form__label">Repeat password</label>
          <input class="form__input" v-model.trim="$v.repeatPassword.$model" />
        </div>
        <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>

        <!-- Submit -->
        <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>

        <!-- Submit Status -->
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        <!-- Error -->
        <div class="form-group">
          <label class="form__label">Validation status:</label>
          <ul class="list__ul">
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
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";

// Object with keys where keys must be objects with values.
const touchMap = new WeakMap();

export default Vue.extend({
  mixins: [validationMixin],
  created() {
    console.log(typeof email);
  },
  data() {
    return {
      name: "",
      password: "",
      repeatPassword: "",
      submitStatus: null
    };
  },
  methods: {
    submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log(this.submitStatus);
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        console.log(this.submitStatus);
        setTimeout(() => {
          this.submitStatus = "OK";
          console.log(this.submitStatus);
        }, 500);
      }
    },
    delayTouch($v) {
      console.log("Kommet vi hit");
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
        console.log("Kommet vi hit if");
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
      console.log("The end");
    }
  },
  validations: {
    name: {
      email,
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
