<template>
  <div>

    <!--  TODO 
    * Create JSON for "FROM" & "TO" containing "City" & "Country" (Database). 
    * Add vehicle types depending on traveltype.
    * Add images for vehicles such as: Bicycle, Train, Boat, Ferry, Car, Buss, Airplane, Walking etc.
    * Create a column for price (Database).
    ** Timestamp when the trip was added? (If yes, database aswell)
    -->

    <div class="travel-data-wrapper" v-for="(travel, index) in travelArray" :key="index">
      <!-- Profile -->
      <div class="left-column">
        <div class="profile-image"></div>
        <h4 class="username-text">{{travelArray[index].username}}</h4>
      </div>
      <!-- Data -->
      <div class="right-column">
        <!-- Top bar for the rating system -->
        <div class="top-content-bar"><span class="rating">☆☆☆☆☆</span></div>

        <!-- From location -->
        <div class="content-wrapper">
          <p class="content-text"><span class="city">Från: {{travelArray[index].from}}</span><span class="country">Land: Sverige</span></p>
        </div>

        <!-- Milestones -->
        <div v-for="(milestones, ind) in travelArray[index].milestones" :key="ind">
          <div class="transportation-img"><img src="../assets/car.png"></div>
          <div class="content-wrapper-milestones">
            <p class="content-text"><span class="city">Stad: {{travelArray[index].milestones[ind].city}}</span><span class="country">Land: {{travelArray[index].milestones[ind].country}}</span></p>
            <p class="content-text">Boende: {{travelArray[index].milestones[ind].resident}}</p>
          </div>
        </div>
        
        <!-- To location -->
        <div class="content-wrapper">
          <p class="content-text"><span class="city">Till: {{travelArray[index].to}}</span><span class="country">Land: Sverige</span></p>
        </div>

        <!-- Price & Traveltime -->
        <div class="content-wrapper bottom-div">
          <p class="content-text"><span class="city">Restid: {{travelArray[index].traveltime}}</span><span class="country">Kostnad: 13599 SEK</span></p>
        </div>

        <!-- Bottom bar with report travel -->
        <div class="bottom-content-bar">
          <div class="bottom-report-button"></div>
        </div>

      </div>
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

<style scoped>

.travel-data-wrapper{
  width: 50%;
  height: auto;
  margin: 50px auto;
  display: flex;
}

.left-column{
  width: 30%;
  height: auto;
  position: relative;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #026f7e;
  color: white;
  float: left;
  border-right: 2px solid black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 10;
}

/* Profile properties */
.profile-image{
  width: 100px;
  height: 100px;
  background-image: url("../assets/user.png");
  background-position: center;
  margin: auto;
}

.username-text{
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

.right-column{
  width: 70%;
  height: 100%;
  float: left;
  background-color: #026f7e;
  position: relative;
}

.content-text{
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  padding-left: 10px;
  padding-right: 10px;
}

.transportation-img{
  width: 90%;
  height: 20px;
  margin: 5px auto;
  text-align: center;
}

.content-wrapper{
  width: 90%;
  height: 50px;
  margin: 10px auto;
  border-radius: 5px;
  background-color: white;
  line-height: 50px;
}

.content-wrapper-milestones{
  width: 90%;
  height: 100px;
  margin: 10px auto;
  border-radius: 5px;
  background-color: white;
  line-height: 50px;
}

.top-content-bar{
  width: 100%;
  height: 20px;
  background-color: #026f7e;
  z-index: 7;
}

.bottom-content-bar{
  width: 100%;
  height: 30px;
  background-color: #026f7e;
  bottom: 0px;
  right: 5px;
  position: absolute;
  z-index: 7;
}
.bottom-report-button{
  width: 20px;
  height: 30px;
  float: right;
  background-image: url("../assets/report.png");
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.bottom-div{
  margin-top: 50px;
  margin-bottom: 50px;
}

.city{
  width: 50%;
  float: left;
  text-align: left;
}
.country{
  width: 50%;
  float: right;
  text-align: right;
}
.rating{
  width: 100%;
  height: 20px;
  float: right;
  text-align: right;
  line-height: 20px;
  color: gold;
}
</style>