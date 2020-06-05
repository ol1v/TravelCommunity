<template>
  <div>
    <!-- Elements to unban a user -->
    <div class="ban-user-wrapper">
      <h2 class="center font">Lås upp användare</h2>
      <label for="user" class="font">Användarnamn</label>
      <input type="text" id="user" class="ban-user-input font" v-model="username">
      <input type="button" value="Lås upp konto" class="ban-user-button font" @click="unbanUser">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username: ""
    }
  },
  // Unban user method
  methods:{
    unbanUser(){
      let credentials = {username: this.username}
      let url = "http://localhost:3005/"

      this.axios
      .post(url + "unban/", credentials)
      .then(response => {
        alert(response.data.message)
      })
      .catch(err => {
        alert(err.response.data.message)
      })
    }
  }
}
</script>

<style>

</style>