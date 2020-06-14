<template>
  <div>
    <!-- Elements to unban a user -->
    <div class="unban-user-wrapper">
      <h2 class="center font">Lås upp användare</h2>

      <label for="unban-user" class="font">Användarnamn</label>
      <input type="text" id="unban-user" class="unban-user-input font" v-model="username" />

      <input type="button" value="Lås upp konto" class="unban-user-button font" @click="unbanUser" />
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
  // Unban user method
  methods: {
    unbanUser() {
      let credentials = { username: this.username };
      let url = "http://localhost:3005/";

      this.axios
        .post(url + "unban/", credentials)
        .then(response => {
          alert(response.data.message);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.unban-user-wrapper {
  width: 100%;
  height: auto;
  padding: 10px;
  margin: 15px auto;
}
.unban-user-input {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.unban-user-button {
  width: 100%;
  font-size: 0.9rem;
  height: 30pt;
  margin-top: 10px;
  cursor: pointer;
  background: #026f7e;
  color: white;
  border: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.unban-user-button:hover {
  background: #026f7e;
  background: linear-gradient(
    90deg,
    #027e59 0%,
    rgb(12, 214, 130) 100%,
    rgba(255, 255, 255, 1) 100%
  );
}

@media only screen and (min-width: 600px) {
  .unban-user-wrapper {
    width: 20%;
    height: auto;
    padding: 10px;
    margin: 15px auto;
  }
}
</style>