<template>
  <div>
    <div class="user-wrapper">
      <div class="users" v-for="(users, index) in userData" :key="index">
        <span class="header font center">{{userData[index].username}}</span>
        <span class="header font center">{{userData[index].count}}</span>
        <span class="header center"><input type="button" class="btn font" @click="viewDetails(userData[index].username)" value="Visa inlägg"></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userData: []
    }
  },
  created(){
    let url = "http://localhost:3005/"
    this.axios
    .post(url + "all-users/")
    .then(response => {
      console.log(response.data.message)
      this.userData = response.data.message
    })
    .catch(err => {
      console.log(err.response.data)
    })
  },
  methods:{
    viewDetails(username){
      console.log("clicked " + username)
      this.$router.push({ name: "MyTrips", params: { user: username } })
    }
  }
}
</script>

<style scoped>
.user-wrapper{
  width: 100%;
  margin-top: 50px;
}
#header-text{
  width: 100%;
  height: 50px;
  margin: 0px auto 10px;
  line-height: 50px;
}
.header{
  width: 33%;
  float: left;
  font-size: 12px;
}

.btn{
  background-color: rgb(142, 197, 252);
  color: black;
  border: 0px;
  display: block;
  width: 50%;
  margin: 0 auto;
  height: 30px;
  cursor: pointer;
}
.users{
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
}

</style>