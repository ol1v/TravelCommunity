<template>
  <div>
    <div id="left-admin-panel">
      <div id="admin-logo"><font-awesome-icon icon="shield-alt" size="4x"/></div>
      <div id="admin-links-wrapper">
        <input type="button" value="Stäng av användare" class="admin-link" @click="displayBan">
        <input type="button" value="Lås upp användare" class="admin-link" @click="displayUnban">
      </div>
    </div>
    
    <div id="right-admin-panel">
      <Ban v-if="banBool"></Ban>
      <Unban v-if="unbanBool"></Unban>
    </div>
  </div>
</template>

<script>
  import Ban from '../../components/admin/Ban'
  import Unban from '../../components/admin/Unban'
export default {
  components:{
    Ban,
    Unban
  },
  data(){
    return{
      banBool: true,
      unbanBool: false
    }
  },
  methods:{
    displayBan(){
      this.banBool = true
      this.unbanBool = false
    },
    displayUnban(){
      this.banBool = false
      this.unbanBool = true
    }
  }
}
</script>

<style>
#left-admin-panel{
  width: 15%;
  height: calc(100vh - 126px);
  /* background-color: #026f7e; */
  background: rgb(142, 197, 252);
  background: linear-gradient(
    180deg,
    rgba(142, 197, 252, 1) 0%,
    rgba(142, 197, 252, .9) 25%,
    rgba(252, 176, 69, 0) 100%
  );
  float: left;
}

#right-admin-panel{
  width: 85%;
  height: calc(100vh - 126px);
  float: right;
}

#admin-logo{
  width: 100%;
  height: auto;
  color: rgb(0, 0, 0);
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