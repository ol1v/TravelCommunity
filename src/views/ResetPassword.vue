<template>
  <div>
    <div id="ban-user-wrapper">
      <h2 class="center">Återställ lösenord</h2>
      <label for="user">Email</label>
      <input type="email" id="email" class="ban-user-input" v-model="email">
      <input type="button" value="Återställ lösenord" class="ban-user-button" @click="resetPassword">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email: ""
    }
  },
  methods:{
    resetPassword(){
      if(this.email){
        const credentials = { email: this.email }
        let url = "http://localhost:3005/"

        this.axios
        .post(url + "reset-password/", credentials)
        .then(response => {
          console.log(response.data.message)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
      }
      else{
        alert("Du måste ange en giltlig email")
      }
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
  margin: 50px auto;
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