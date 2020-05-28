<template>
  <div>
    <!-- Fix design for this -->
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
export default {
  data(){
    return{
      travelArray: []
    }
  },
  created(){
    let url = "http://localhost:3005/"

    this.axios
    .post(url + "travels/")
    .then(response => {
      console.log("count me")
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
.travel-data-wrapper{
  width: 50%;
  height: auto;
  margin: auto;
  background-color: white;
  border: 1px solid black;
  margin-top: 10px;
}

.milestones{
  width: 100%;
  height: auto;
  margin-top: 5px;
}

.milestone-header{
  text-decoration: underline;
}

.rounded-corners{
  border-radius: 10px;
}
</style>