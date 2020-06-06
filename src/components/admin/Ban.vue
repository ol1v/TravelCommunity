<template>
  <div>
    <!-- Elements for banning a user -->
    <div class="ban-user-wrapper">
      <h2 class="center font">Stäng av användare</h2>
      <label for="ban-user" class="font">Användarnamn</label>
      <input type="text" id="ban-user" class="ban-user-input font" v-model="username">
      <input type="button" value="Stäng av konto" class="ban-user-button font" @click="banUser">
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
    // Ban user method
    banUser(){
      if(this.$store.state.username == this.username){
        alert("Du kan inte banna dig själv!")
      }
      else{
        let credentials = {username: this.username}
        let url = "http://localhost:3005/"

        this.axios
        .post(url + "ban/", credentials)
        .then(response => {
          alert(response.data.message)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      }
    }
  }
}
</script>

<style scoped>
.ban-user-wrapper{
  width: 20%;
  height: auto;
  padding: 10px;
  margin: 15px auto;

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
  background-color: #026f7e;
  color: white;
  border: 0;
}
</style>