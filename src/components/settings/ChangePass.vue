<template>
  <div>
    <Userpanel></Userpanel>
    <div id="wrapper">
      <div id="change_pass_wrapper">
        <h2 class="center">Ändra lösenord</h2>

        <label for="currentPass">Nuvarande lösenord</label>
        <input type="password" id="currentPass" class="ban-user-input" v-model="currentPass">

        <label for="newPass">Nytt lösenord</label>
        <input :type="showPass" id="newPass" class="ban-user-input" v-model="newPass">
        <label for="repeatPass">Repetera lösenord</label>
        <input :type="showPass" id="repeatPass" class="ban-user-input" v-model="repeatPass">
        
        <input type="checkbox" id="showPass" @click="showPassword">
        <label for="showPass">Visa lösenord</label>

        <input type="button" value="Byt lösenord" class="ban-user-button" @click="changePassword">
      </div>
    </div>
  </div>
</template>

<script>
import Userpanel from '../Userpanel'
export default {
  components:{
    Userpanel
  },
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