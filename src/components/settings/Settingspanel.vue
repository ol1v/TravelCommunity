<template>
  <div>
    <!-- Side-panel -->
    <div id="left-settings-panel">
      <div id="settings-logo"><font-awesome-icon icon="user-cog" size="4x"/></div>
      <div id="settings-links-wrapper">
        <!-- Links in the side-panel -->
        <input type="button" value="Ändra lösenord" class="settings-link" @click="changePassword">
        <input type="button" value="Radera konto" class="settings-link"  @click="removeAccount">
      </div>
    </div>
    <!-- Right panel with components -->
    <div id="right-settings-panel">
      <ChangePass v-if="changePasswordBool"></ChangePass>
      <RemoveAccount v-if="removeAccountBool"></RemoveAccount>
    </div>
  </div>
</template>

<script>
import ChangePass from '../../components/settings/ChangePass'
import RemoveAccount from '../../components/settings/RemoveAccount'
export default {
  components:{
    ChangePass,
    RemoveAccount
  },
  data(){
    return{
      changePasswordBool: true,
      removeAccountBool: false
    }
  },
  methods:{
    // Show / hide components
    changePassword(){
      this.changePasswordBool = true
      this.removeAccountBool = false
    },
    removeAccount(){
      this.changePasswordBool = false
      this.removeAccountBool = true
    }
  }
}
</script>

<style scoped>
#left-settings-panel{
  width: 15%;
  height: calc(100vh - 126px);
  background: rgb(142, 197, 252);
  background: linear-gradient(
    180deg,
    rgba(142, 197, 252, 1) 0%,
    rgba(142, 197, 252, .9) 25%,
    rgba(252, 176, 69, 0) 100%
  );
  float: left;
}

#right-settings-panel{
  width: 85%;
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