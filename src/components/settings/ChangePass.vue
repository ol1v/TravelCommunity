<template>
  <div>
    <div id="wrapper">
      <h2 class="center font">Ändra lösenord</h2>

      <!-- Current password -->
      <div class="input-x">
        <label for="currentPass" class="font">Nuvarande lösenord</label>
        <input
          type="password"
          id="currentPass"
          class="change-pass-input font"
          v-model="currentPass"
        />
      </div>

      <!-- New password -->
      <div class="input-x">
        <label for="newPass" class="font">Nytt lösenord</label>
        <input :type="showPass" id="newPass" class="change-pass-input font" v-model="newPass" />
      </div>

      <!-- Repeat password -->
      <div class="input-x">
        <label for="repeatPass" class="font spacing">Repetera lösenord</label>
        <input :type="showPass" id="repeatPass" class="change-pass-input font" v-model="repeatPass" />
      </div>

      <!-- Show / hide password -->
      <input type="checkbox" id="showPass" @click="showPassword" />
      <label for="showPass" class="font">Visa lösenord</label>

      <!-- Change password button -->
      <input
        type="button"
        value="Ändra Lösenord"
        class="change-pass-button font"
        @click="changePassword"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPass: "",
      newPass: "",
      repeatPass: "",
      showPass: "password",
      displayPassword: false
    };
  },
  methods: {
    // Method for changing a user password
    changePassword() {
      // If password matches repeat password
      if (this.newPass == this.repeatPass) {
        // If passwords lenght is 6+
        if (this.newPass.length > 5) {
          let credentials = {
            username: this.$store.state.username,
            currentPass: this.currentPass,
            newPass: this.newPass
          };
          let url = "http://localhost:3005/";

          this.axios
            .post(url + "change-pass/", credentials)
            .then(response => {
              alert(response.data.message);
            })
            .catch(err => {
              alert(err.response.data.message);
            });
        } else {
          alert("Lösenordet måste innehålla minst 6 tecken");
        }
      } else {
        alert("Lösenorden matchar inte!");
      }
    },
    showPassword() {
      this.displayPassword = !this.displayPassword;
      this.showPass = this.showPass === "password" ? "text" : "password";
    }
  }
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: auto;
  margin: auto;
}

@media only screen and (min-width: 600px) {
  #wrapper {
    width: 50%;
    height: auto;
    margin: auto;
  }
}

.input-x {
  margin-top: 10px;
}

.change-pass-input {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.change-pass-button {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #0791a3;
  color: white;
  border: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.2s linear;
}
.change-pass-button:hover {
  background-color: #04b0c7;
}

/* Screens and tablets */
@media only screen and (min-width: 1200px) {
  #wrapper {
    width: 20%;
    height: auto;
    margin: auto;
  }
}
</style>