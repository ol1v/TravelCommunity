<template>
  <div>
    <!-- Elements for banning a user -->
    <div class="ban-user-wrapper">
      <h2 class="center font">Stäng av användare</h2>
      <label for="ban-user" class="font">Användarnamn</label>
      <input type="text" id="ban-user" class="ban-user-input font" v-model="username" />
      <input type="button" value="Stäng av konto" class="ban-user-button font" @click="banUser" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    // Ban user method
    banUser() {
      if (this.$store.state.username == this.username) {
        alert("Du kan inte banna dig själv!");
      } else {
        let credentials = { username: this.username };
        let url = "http://localhost:3005/";

        this.axios
          .post(url + "ban/", credentials)
          .then(response => {
            alert(response.data.message);
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      }
    }
  }
};
</script>

<style scoped>
.ban-user-wrapper {
  width: 100%;
  height: auto;
  padding: 10px;
  margin: 15px auto;
  font-family: "Montserrat", sans-serif;
}
.ban-user-input {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.ban-user-button {
  width: 100%;
  font-size: 0.9rem;
  height: 30pt;
  margin-top: 10px;
  cursor: pointer;
  background: #026f7e;
  color: white;
  border: 0;
}
.ban-user-button:hover {
  background: #026f7e;
  background: linear-gradient(
    90deg,
    #e77d04 0%,
    rgb(201, 54, 10) 100%,
    rgba(255, 255, 255, 1) 100%
  );
}

@media only screen and (min-width: 600px) {
  .ban-user-wrapper {
    width: 50%;
    height: auto;
    padding: 10px;
    margin: 15px auto;
  }
}

@media only screen and (min-width: 1200px) {
  .ban-user-wrapper {
    width: 20%;
    height: auto;
    padding: 10px;
    margin: 15px auto;
  }
}
</style>