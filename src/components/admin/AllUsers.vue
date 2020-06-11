<template>
  <div>
    <div class="user-wrapper">
      <div id="header-text">
        <!-- Headers -->
        <span class="header font center">Användarnamn</span>
        <span class="header font center">Antal inlägg</span>
        <span class="header font center">Visa inlägg</span>
      </div>
      <!-- Looping through all users with 1+ posts -->
      <div class="users" v-for="(users, index) in userData" :key="index">
        <span class="header font center">{{userData[index].username}}</span>
        <span class="header font center">{{userData[index].count}}</span>
        <span class="header center">
          <input
            type="button"
            class="btn font"
            @click="viewDetails(userData[index].username)"
            value="Visa inlägg"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: []
    };
  },
  created() {
    let url = "http://localhost:3005/";
    this.axios
      .post(url + "all-users/")
      .then(response => {
        console.log(response.data.message);
        this.userData = response.data.message;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  },
  methods: {
    // Pushing to MyTrips with params
    viewDetails(username) {
      this.$router.push({ name: "MyTripsProps", params: { user: username } });
    }
  }
};
</script>

<style scoped>
.user-wrapper {
  width: 100%;
  margin-top: 50px;
}

#header-text {
  width: 100%;
  height: 50pt;
  margin: 0px auto 10px;
  line-height: 50px;
  display: flex;
  align-content: space-around;
}
.header {
  width: 33%;
  font-size: 14pt;
}
.btn {
  background-color: rgb(142, 197, 252);
  color: black;
  border: 0px;
  padding: 1em;
  display: block;
  min-width: 50%;
  margin: 0 auto;
  height: 30px;
  cursor: pointer;
}
.users {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  display: flex;
  align-content: space-between;
}

@media only screen and (min-width: 600px) {
  .user-wrapper {
    margin-top: 50px;
    width: auto;
  }
  #header-text {
    width: 100%;
  }
  .header {
    width: 33%;
    font-size: 15px;
  }
}
</style>