<template>
  <div>
    <div id="register-wrapper">
      <div id="register-left">
        <h5 class="font center headerText">Registrera dig</h5>
        <div id="register-components">

          <div class="input-components">
            <label for="username" class="label-text font">Användarnamn</label>
            <input type="text" id="username" required class="register-input" v-model="username">
          </div>

          <div class="input-components">
            <label for="email" class="label-text font">Email</label>
            <input type="email" id="email" required class="register-input" v-model="email">
          </div>

          <div class="input-components">
            <label for="password" class="label-text font">Lösenord</label>
            <input type="password" id="password" required class="register-input" v-model="password">
          </div>

          <div class="input-components">
            <label for="repeatPassword" class="label-text font">Repetera lösenord</label>
            <input type="password" id="repeatPassword" required class="register-input" v-model="repeatPassword">
          </div>

          <div class="button-component">
            <input type="button" id="register-button" value="Registrera" @click="register" class="font">
          </div>
        </div>

        <div class="already-account-component">
          <p class="font center login-btn">Har du redan ett konto?<span class="login-button" @click="login">Logga in</span></p>
        </div>

      </div>

      <div id="register-right">
        <div id="register-right-image">
          <div id="register-text-area">
            <p class="register-para-text font">Här i kan du skriva en lång text</p>
          </div>

        </div>
        <div id="register-right-footer">
          <div id="follow-us">
            <p class="font follow-us-text">Följ oss</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    }
  },
  methods:{
    register(){
      if(this.username && this.email && this.password && this.repeatPassword){
        if(this.email.includes("@") && this.email.includes(".")){
          if(this.password == this.repeatPassword){
            if(this.password.length > 5){
              const credentials = { username: this.username, email: this.email, password: this.password}
              let url = "http://localhost:3005/"

              this.axios
              .post(url + "register/", credentials)
              .then(response => {
                console.log(response.data.message)
                this.loginAfterRegistration()
              })
              .catch(err => {
                alert(err.response.data.message)
              })

            }
            else{
              alert("Lösenordet måste innehålla minst 6 bokstäver")
            }
          }
          else{
            alert("Lösenorden matchade inte!")
          }
        }
        else{
          alert("Du måste ange en giltig email adress")
        }
      }
      else{
        alert("Du måste fylla i alla rutor!")
      }
    },
    loginAfterRegistration(){
      let url = "http://localhost:3005/"
      const credentials = {username: this.username, password: this.password}
      this.axios
      .post(url + "login/", credentials)
      .then(response => {
          this.$store.commit("SET_LOGGED_IN", true);
          this.$store.commit("SET_USERNAME", this.username);
          this.$store.commit("SET_ADMIN_STATE", response.data.admin)

          this.$router.push({ name: "User" });
      })
    },
    login(){
      this.$router.push({ name: "Home" })
    }
  }
}
</script>

<style scoped>
#register-wrapper{
  width: 50%;
  height: 400pt;
  background-color: white;
  margin: 50px auto;
  position: relative;
  top:  50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid black;
  box-shadow: 2px 1px 0px 0px black;
}

#register-left{
  width: 55%;
  height: 400pt;
  float: left;
}

#register-right{
  width: 45%;
  height: 400pt;
  float: right;
}

#register-right-image{
  width: 90%;
  height: 325pt;
  background-image: url("../assets/register.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  right: 0;
  left: 10%;
  z-index: 10;
}

#register-right-footer{
  width: 100%;
  height: 100pt;
  background-color: #026f7e;
  margin-top: -25pt;
}

#register-components{
  width: 80%;
  height: 250pt;
  margin: auto;
}

.register-input{
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  background-color: transparent;
  border-bottom: 1px solid black;
  padding-left: 10px;
}

.label-text{
  padding-left: 10px;
  font-size: 10px;
}

.input-components{
  margin-top: 10px;
}

.headerText{
  font-size: 25px;
  margin-top: 15px;
}

#register-button{
  width: 50%;
  height: 40px;
  cursor: pointer;
  background-color: #026f7e;
  color: white;
  border: 0px;
  box-shadow: 1px 1px 1px 1px black;
}

.button-component{
  width: 100%;
  height: auto;
  margin-top: 40px;
  text-align: center;
}

.already-account-component{
  width: 100%;
  height: 50px;
  background-color: white;
  margin-top: 20pt;
}

.login-button{
  color: #026f7e;
  line-height: 50px;
  cursor: pointer;
  padding-left: 10px;
}

#register-text-area{
  width: 80%;
  height: 130px;
  position: relative;
  bottom: -190pt;
  margin: auto;
  background-color: rgba(0, 0, 0, .8);
  box-sizing: border-box;
  overflow: hidden;
}

.register-para-text{
  padding: 10px;
  line-height: 65px;
  color: white;
  text-align: center;
}

#follow-us{
  width: 50%;
  height: 50px;
  position: relative;
  top: 50px;
  left: 10%;
  z-index: 0;
}
.follow-us-text{
  color: white;
  margin: 0;
  line-height: 50px;
}
</style>