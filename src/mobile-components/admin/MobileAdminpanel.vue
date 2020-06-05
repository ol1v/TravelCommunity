<template>
  <div>
      <div id="left-admin-panel" :style="showSidepanel">
        <div id="admin-logo"><font-awesome-icon icon="shield-alt" size="4x"/></div>
        <div id="admin-links-wrapper">
          <input type="button" value="Stäng av användare" class="admin-link" @click="displayBan">
          <input type="button" value="Lås upp användare" class="admin-link" @click="displayUnban">
          <input type="button" value="Hantera inlägg" class="admin-link" @click="displayAllUsers">
        </div>
        <div id="expand-button">
          <font-awesome-icon class="arrow" icon="angle-right" size="3x" @click="displaySidepanel" :style="rotateButton"/>
        </div>
      </div>

    <div id="panel" @click="closePanel">
      <div id="content">
        <!-- Links -->
        <MobileBan v-if="banBool"></MobileBan>
        <MobileUnban v-if="unbanBool"></MobileUnban>
        <MobileAllUsers v-if="allUsersBool"></MobileAllUsers>
      </div>
    </div>
  </div>
</template>

<script>
import MobileBan from './MobileBan'
import MobileUnban from './MobileUnban'
import MobileAllUsers from './MobileAllUsers'

export default {
  components:{
    MobileBan,
    MobileUnban,
    MobileAllUsers
  },
  data(){
    return{
      banBool: true,
      unbanBool: false,
      allUsersBool: false,
      displayPanel: false,
      rotateBtn: false
    }
  },
  methods:{
    displayUnban(){
      this.banBool = false
      this.unbanBool = true
      this.allUsersBool = false
      this.displayPanel = !this.displayPanel
    },
    displayBan(){
      this.banBool = true
      this.unbanBool = false
      this.allUsersBool = false
      this.displayPanel = !this.displayPanel
    },
    displayAllUsers(){
      this.banBool = false
      this.unbanBool = false
      this.allUsersBool = true
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
#left-admin-panel{
  width: 60%;
  height: calc(100vh - 126px);
  background: rgb(142, 197, 252);
  background: linear-gradient(
    180deg,
    rgba(142, 197, 252, 0.9),
    white
  ); 
  transform: translateX(-85%);
  transition: 1s;
  position: absolute;
}

#right-admin-panel{
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

#admin-logo{
  width: 100%;
  height: auto;
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#admin-links-wrapper{
  width: 100%;
  height: auto;
}

.admin-link{
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

.admin-link:hover{
  background-color: white;
}

</style>