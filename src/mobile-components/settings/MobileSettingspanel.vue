<template>
  <div>
      <div id="left-settings-panel" :style="showSidepanel">
        <div id="settings-logo"><font-awesome-icon icon="user-cog" size="4x"/></div>
        <div id="settings-links-wrapper">
          <input type="button" value="Ändra lösenord" class="settings-link" @click="changePassword">
          <input type="button" value="Radera konto" class="settings-link"  @click="removeAccount">
        </div>
        <div id="expand-button">
          <font-awesome-icon class="arrow" icon="angle-right" size="3x" @click="displaySidepanel" :style="rotateButton"/>
        </div>
      </div>

    <div id="panel" @click="closePanel">
      <div id="content">
        <!-- Links -->
        <MobileChangePass v-if="changePasswordBool"></MobileChangePass>
        <MobileRemoveAccount v-if="removeAccountBool"></MobileRemoveAccount> 
      </div>
    </div>
  </div>
</template>

<script>
  import MobileChangePass from '../settings/MobileChangePass'
  import MobileRemoveAccount from '../settings/MobileRemoveAccount'
export default {
  components:{
    MobileChangePass,
    MobileRemoveAccount
  },
  data(){
    return{
      changePasswordBool: true,
      removeAccountBool: false,
      displayPanel: false,
      rotateBtn: false
    }
  },
  methods:{
    changePassword(){
      this.changePasswordBool = true
      this.removeAccountBool = false
      this.displayPanel = !this.displayPanel
    },
    removeAccount(){
      this.changePasswordBool = false
      this.removeAccountBool = true
      this.displayPanel = !this.displayPanel
    },
    displaySidepanel(){
      this.displayPanel = !this.displayPanel
    },
    closePanel(){
      this.displayPanel = false
    }
  },
  computed:{
    showSidepanel(){
      if(this.displayPanel){
        return{
          "transform":"translateX(0)"
        }
      }
      else{
        return{}
      }
    },
    rotateButton(){
      if(this.displayPanel){
        return{
          "transform":"rotate(180deg)"
        }
      }
      else{
        return{}
      }
    }
  }
}
</script>

<style scoped>
#left-settings-panel{
  width: 60%;
  height: calc(100vh - 126px);
  background: rgb(142, 197, 252);
  background: linear-gradient(
    180deg,
    rgba(142, 197, 252, 1) 0%,
    rgba(142, 197, 252, .9) 25%,
    rgba(252, 176, 69, 0) 100%
  ); 
  transform: translateX(-85%);
  transition: 1s;
  position: absolute;
}

#right-settings-panel{
  width: 100%;
  height: 500px;
  background-color: transparent;
}

#panel{
  width: 100%;
  float: left;
  height: calc(100vh - 126px);
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
}

#content{
  width: 70%;
  height: auto;
  margin: 0 auto;
}
#expand-button{
  width: 100%;
  height: 50px;
}
.arrow{
  color: white;
  float: right;
  /* transform: rotate(180deg); */
}

#right-settings-panel{
  width: 100%;
  height: calc(100vh - 126px);
  float: right;
}

#settings-logo{
  width: 100%;
  height: auto;
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#settings-links-wrapper{
  width: 100%;
  height: auto;
}

.settings-link{
  display: block;
  width: 100%;
  height: 50px;
  border: 0px;
  background-color: transparent;
  color: black;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  cursor: pointer;
}

.settings-link:hover{
  background-color: white;
}

</style>