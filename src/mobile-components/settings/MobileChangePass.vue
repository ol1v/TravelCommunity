<template>
  <div>
    <div id="pass-wrapper">
      <h2 class="center font">Ändra lösenord</h2>

      <div class="input-x">
        <label for="currentPass" class="font">Nuvarande lösenord</label>
        <input type="password" id="currentPass" class="ban-user-input font" v-model="currentPass">
      </div>

      <div class="input-x">
        <label for="newPass" class="font">Nytt lösenord</label>
        <input :type="showPass" id="newPass" class="ban-user-input font" v-model="newPass">
      </div>

      <div class="input-x">
        <label for="repeatPass" class="font spacing">Repetera lösenord</label>
        <input :type="showPass" id="repeatPass" class="ban-user-input font" v-model="repeatPass">
      </div>

      <input type="checkbox" id="showPass" @click="showPassword">
      <label for="showPass" class="font">Visa lösenord</label>

      <input type="button" value="Byt lösenord" class="ban-user-button font" @click="changePassword">
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      currentPass: "",
      newPass: "",
      repeatPass: "",
      showPass: 'password',
      displayPassword: false
    }
  },
  methods:{
    changePassword(){
      if(this.newPass == this.repeatPass){
        if(this.newPass.length > 5){
          let credentials = { username: this.$store.state.username, currentPass: this.currentPass, newPass: this.newPass }
          let url = "http://localhost:3005/"

          this.axios
          .post(url + "change-pass/", credentials)
          .then(response => {
            alert(response.data.message)
          })
          .catch(err => {
            alert(err.response.data.message)
          })
        }
        else{
          alert("Lösenordet måste innehålla minst 6 tecken")
        }
      }
      else{
        alert("Lösenorden matchar inte!")
      }
    },
    showPassword(){
      this.displayPassword = !this.displayPassword
      this.showPass = this.showPass === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style scoped>
#pass-wrapper{
  width: 100%;
  height: 500px;
  background-color: transparent;
}

.input-x{
  margin-top: 10px;
}
#wrapper{
  width: 100%;
  height: auto;
  margin: auto;
  background-color: yellow;
}
#change_pass_wrapper{
  width: 0%;
  height: auto;
  margin: auto;
}
</style>