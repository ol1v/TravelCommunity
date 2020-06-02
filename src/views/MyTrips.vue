<template>
  <div>
    <Userpanel></Userpanel>
        <!-- Fix design for this -->
        <!-- Add button to delete data -->
        <!-- (Add button to edit data)??? -->
    <div class="travel-data-wrapper rounded-corners" v-for="(travel, index) in travelArray" :key="index">
      <p>Från: {{travelArray[index].from}}</p>

      <div class="milestones" v-for="(milestones, ind) in travelArray[index].milestones" :key="ind">
        <h4 class="milestone-header">Milstolpe {{ind + 1}}</h4>
        <p>Stad: {{travelArray[index].milestones[ind].city}}</p>
        <p>Land: {{travelArray[index].milestones[ind].country}}</p>
        <p>Boende: {{travelArray[index].milestones[ind].resident}}</p>
        <p>Transportmedel: {{travelArray[index].milestones[ind].transportation}}</p>
      </div>

      <p style="margin-top: 50px;">Till: {{travelArray[index].to}}</p>
      <p>Transporttid: {{travelArray[index].traveltime}}</p>

      <div class="travel-top-bar">
        <p class="uploaded">Uppladdat av: {{travelArray[index].username}}</p>
        <input type="button" class="remove-travel" @click="deleteTravel(travelArray[index].id)">
      </div>
    </div>
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
export default {
  components:{
    Userpanel
  },
  data(){
    return{
      travelArray: []
    }
  },
  created(){
    let url = "http://localhost:3005/"

    let credentials = {username: this.$store.state.username}
    console.log(credentials)

    this.axios
    .post(url + "my-travels/", credentials)
    .then(response => {

      for(let i=0; i<response.data.travelData.length; i++){
        this.travelArray.push(response.data.travelData[i])
      }

    })
    .catch(err => {
      console.log(err)
    })
  },
  methods:{
    deleteTravel(id){
      //Fix delete button
      console.log("Deleted: " + id)
    }
  }

}
</script>

<style>
.travel-top-bar{
  width: 100%;
  height: 20px;
  bottom: 0px;
}
.uploaded{
  height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  float: left;
  line-height: 20px;
  margin: 0px;
  font-size: 10px;
}
.remove-travel{
  width: 20px;
  height: 20px;
  float: right;
  cursor: pointer;
  margin-right: 10px;
  border: 0px;
}
</style>