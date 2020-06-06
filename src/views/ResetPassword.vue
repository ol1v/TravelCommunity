<template>
  <div>
    <div id="reset-pass-wrapper">
      <h2 class="center font">Återställ lösenord</h2>
      <label for="email" class="font">Email</label>
      <input type="email" id="email" class="reset-pass-input" v-model="email">
      <input type="button" value="Återställ lösenord" class="reset-pass-button font" @click="resetPassword">
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

<style scoped>
#reset-pass-wrapper{
  width: 15%;
  height: auto;
  padding: 10px;
  margin: 50px auto;
}
.reset-pass-input{
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.reset-pass-button{
  width: 100%;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #026f7e;
  color: white;
}

@media (min-width: 769px) and (max-width: 1500px) {
  #reset-pass-wrapper{
    width: 20%;
    height: auto;
    padding: 10px;
    margin: 50px auto;
    border-radius: 0px;
  }
}

@media (min-width: 501px) and (max-width: 768px) {
  #reset-pass-wrapper{
    width: 80%;
    height: auto;
    padding: 10px;
    margin: 50px auto;
    border-radius: 0px;
  }
}

@media (max-width: 500px) {
  #reset-pass-wrapper{
    width: 80%;
    height: auto;
    padding: 10px;
    margin: 50px auto;
    border-radius: 0px;
  }
}
</style>