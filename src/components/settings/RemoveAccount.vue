<template>
  <div>
    <div id="remove_account_wrapper">
      <h2 class="center font">Radera konto</h2>
      <label for="currentPass" class="font">Ange ditt lösenord</label>
      <input type="password" id="currentPass" class="ban-user-input font" v-model="password" autocomplete="new-password">
      
      <div id="remove_account_info">
        <p class="font"><span class="red-note">Notering!</span><br>
        Om du raderar ditt konto kommer det att stängas av permanent.<br><br>
        Om du kryssar i 'Radera alla min resor' kommer alla dina tidigare privata och publika resor att försvinna ur webbsidan.<br><br>
        Är du säker att du vill radera ditt konto?
        </p>
      </div>

      <div id="remove_trips">
        <input type="checkbox" id="removeAllTravels" @click="removeTrips">
        <label for="removeAllTravels" class="font">Radera alla mina resor</label>
        <br>
        <input type="checkbox" id="removeAccount" @click="readed">
        <label for="removeAccount" class="font">Jag har läst och godkänner radering av konto.</label>
      </div>

      <input type="button" value="Radera mitt konto" class="remove-account-button font" @click="removeAccount">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      removeTripsBool: false,
      readBool: false,
      password: ""
    }
  },
  methods:{
    removeTrips(){
      this.removeTripsBool = !this.removeTripsBool
    },
    readed(){
      this.readBool = !this.readBool
    },
    removeAccount(){
      console.log("asd")

      if(this.readBool){
        console.log("inne i remove")
        const data = { username: this.$store.state.username, password: this.password, removeAllData: this.removeTripsBool }
        let url = "http://localhost:3005/"

        this.axios
        .post(url + "remove-account/", data)
        .then(response => {
          alert(response.data.message)
          
          //Logout user when deleted
          this.$store.commit("SET_LOGGED_IN", false);
          this.$store.commit("SET_USERNAME", ""),
          this.$store.commit("SET_ADMIN_STATE", 0)
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          alert((err.response.data.message))
        })
      }
      else{
        alert("Du måste godkänna villkoren!")
      }
    }
  }
}
</script>

<style>
#remove_account_wrapper{
  width: 20%;
  margin: auto;
}

#remove_trips{
  width: 100%;
  height: auto;
  margin-top: 10px;
  line-height: 30px;
  background-color: #8ec5fc;
}

#remove_account_info{
  width: 100%;
  height: auto;
  margin-top: 10px;
}

.red-note{
  color: red;
}

.remove-account-button{
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 0px;
  background-color: red;
  font-size: 15px;
  cursor: pointer;
}
</style>