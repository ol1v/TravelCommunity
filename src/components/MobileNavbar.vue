<template>
  <div>
    <nav>
      <div id="left-column">
        <h1><span class="travel">Travel</span><span class="community">Community</span></h1>
      </div>
      <div id="right-column">
        <div id="dropDownButton" @click="displayDropdown" :style="changeButton"></div>
      </div>
    </nav>

    <div id="dropDown" :style="showDropDown">
      <ul>
        <li><router-link to="/" @click.native="displayDropdown" class="links">SÖK RESA</router-link></li>
        <li><router-link to="/popular" @click.native="displayDropdown" class="links">POPULÄRA</router-link></li>
        <li v-if="!this.$store.state.loggedIn" class="links">LOGGA IN / REGISTRERA</li>
        <li><router-link to="/user" class="links" @click.native="displayDropdown" v-if="this.$store.state.loggedIn">{{this.$store.state.username.toUpperCase()}}</router-link></li>
        <li v-if="this.$store.state.loggedIn" class="links" >LOGGA UT</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      dropDownStatus: false,
      changeButtonStatus: false,
      url: "..assets/menuStanding.png"
    }
  },
  methods:{
    displayDropdown(){
      this.dropDownStatus = !this.dropDownStatus
      this.changeButtonStatus = !this.changeButtonStatus
    }
  },
  computed:{
    showDropDown(){
      if(this.dropDownStatus){
        return {
          "transform":"translateX(0)",
        }
      }
      else{
        return {}
      }
    },
    changeButton(){
      if(this.changeButtonStatus){
        return{
          "transform": "rotate(-90deg)"
        }
      }
      else{
        return {}
      }
    }
  }
}
</script>

<style scoped>
nav{
  width: 100%;
  height: 75px;
  position: fixed;
  z-index: 9999;
}

#left-column{
  width: 90%;
  height: 75px;
  float: left;
  text-align: center;
  line-height: 75px;
}

#right-column{
  width: 10%;
  height: 75px;
  float: right;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

#dropDownButton{
  width: 30px;
  height: 30px;
  margin: auto; 
  background-image: url('../assets/menu.png');
  background-repeat: no-repeat; 
  transition: 0.5s;
}

#dropDown{
  width: 80%;
  height: calc(100vh - 75px);
  float: right;
  background-color: #026f7e;
  position: fixed;
  right: 0px;
  top: 75px;
  transform: translateX(120%);
  transition: 2s;
  z-index: 99999;
}

#dropDown ul, li{
  display: block;
  padding: 0px;
  margin: 0px;
}

.links{
  display: block;
  width: 100%;
  height: 50px;
  color: white;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}

.travel{
  color: black;
  font-family: "Montserrat", sans-serif;
}
.community{
  color: #8ec5fc;
  font-family: "Montserrat", sans-serif;
}

h1{
  margin: 0px;
  padding: 0px;
}
</style>