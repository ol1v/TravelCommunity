<template>
  <div>
    <div id="ban-user-wrapper">
      <h2 class="center">Lås upp användare</h2>
      <label for="user">Användarnamn</label>
      <input type="text" id="user" class="ban-user-input" v-model="username">
      <input type="button" value="Lås upp konto" class="ban-user-button" @click="unbanUser">
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
#ban-user-wrapper{
  width: 15%;
  height: auto;
  border: 1px solid black;
  padding: 10px;
  margin-top: 15px;
  margin-left: 15px;
}
.ban-user-input{
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.ban-user-button{
  width: 100%;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}

</style>