<template>
  <div>
    <Userpanel></Userpanel>
        <!-- Fix design for this -->
        <!-- Add button to delete data -->
        <!-- (Add button to edit data)??? -->
    <div class="travel-data-wrapper rounded-corners" v-for="(travel, index) in travelArray" :key="index">
      <p>Uppladdat av: {{travelArray[index].username}}</p>
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
  }

}
</script>

<style>

</style>