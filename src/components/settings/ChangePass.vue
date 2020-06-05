<template>
  <div>
    <div id="wrapper">
      <div id="change_pass_wrapper">
        <h2 class="center font">Ändra lösenord</h2>
        <!-- Current password -->
        <label for="currentPass" class="font">Nuvarande lösenord</label>
        <input type="password" id="currentPass" class="ban-user-input font" v-model="currentPass">
        <!-- New password -->
        <label for="newPass" class="font">Nytt lösenord</label>
        <input :type="showPass" id="newPass" class="ban-user-input font" v-model="newPass">
        <!-- Repeat password -->
        <label for="repeatPass" class="font">Repetera lösenord</label>
        <input :type="showPass" id="repeatPass" class="ban-user-input font" v-model="repeatPass">
        <!-- Show/hide password -->
        <input type="checkbox" id="showPass" @click="showPassword">
        <label for="showPass" class="font">Visa lösenord</label>
        <!-- Button to change password -->
        <input type="button" value="Byt lösenord" class="ban-user-button font" @click="changePassword">
      </div>
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
    // Method for changing a user password
    changePassword(){
      // If password matches repeat password
      if(this.newPass == this.repeatPass){
        // If passwords lenght is 6+
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
#wrapper{
  width: 40%;
  height: auto;
  margin: auto;
}
#change_pass_wrapper{
  width: 50%;
  height: auto;
  margin: auto;
}
</style>