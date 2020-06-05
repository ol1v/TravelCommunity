<template>
  <div class="popular">
    <div class="travel-data-wrapper" v-for="(travel, index) in travelArray" :key="index">
      <!-- Profile -->
      <div class="top-column">
        <div class="profile-image"></div>
        <h4 class="center font white">{{travelArray[index].username}}</h4>
        <h4 class="center font white">Uppladdat: {{travelArray[index].timestamp}}</h4>

        <!-- Remove post as an admin-->
        <div class="remove-data" v-if="checkAdmin">
          <input class="remove-post-button font" type="button" value="Radera inlägg" @click="deleteTravel(travelArray[index].id)">
        </div>

      </div>
      <!-- Data -->
      <div class="bottom-column">
        <!-- Top bar for the rating system -->
        <div class="top-content-bar">
          <span class="rating">
            <span v-if="travelArray[index].ratingScore >= 1">☆</span>
            <span v-if="travelArray[index].ratingScore >= 2">☆</span>
            <span v-if="travelArray[index].ratingScore >= 3">☆</span>
            <span v-if="travelArray[index].ratingScore >= 4">☆</span>
            <span v-if="travelArray[index].ratingScore >= 5">☆</span>
          </span>
        </div>

        <button class="full-travel-button" @click="fullTravelBtnClicked" >{{travelButtonText}} {{travelArray[index].milestones.length}} delmål</button>

        <!-- From location -->
        <div>
          <div class="content-wrapper">
            <p class="content-text-from-to">
              <span class="start">{{travelArray[index].from}}</span>
              <span class="country">{{travelArray[index].fromCountry}}</span>
            </p>
          </div>
        </div>
        <!--- from vehicle icon --->
        <div class="transportation-img" v-if="toggleFullTravel">
          <p>
            <font-awesome-icon icon="car" size="2x" />
          </p>
        </div>

        <!-- Milestones -->
        <div v-for="(milestones, ind) in travelArray[index].milestones" :key="ind">
          <div class="content-wrapper-milestones" v-if="toggleFullTravel">
            <p class="content-text-milestones">
              <span class="city">{{travelArray[index].milestones[ind].city}}</span>
              <span class="country">{{travelArray[index].milestones[ind].country}}</span>
            </p>
            <p class="content-text">
              <font-awesome-icon icon="hotel" size="1x" />
              {{travelArray[index].milestones[ind].resident}}
            </p>
            <div class="transportation-img" v-if="toggleFullTravel">
              <p>
                <font-awesome-icon icon="plane" size="2x" />
              </p>
            </div>
          </div>
        </div>

        <!-- To location -->
        <div class="content-wrapper">
          <p class="content-text-from-to">
            <span class="finish">{{travelArray[index].to}}</span>
            <span class="country">{{travelArray[index].toCountry}}</span>
          </p>
          <p class="map-pin">
            <font-awesome-icon icon="map-pin" size="2x" />
          </p>
        </div>

        <!-- Price & Traveltime -->
        <div class="bottom-div">
          <p class="content-text">
            <span class="city">
              <font-awesome-icon icon="hourglass-end" size="1x" />
              {{travelArray[index].traveltime}}
            </span>
            <span class="country">{{travelArray[index].price}}</span>
          </p>
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
  data() {
    return {
      travelArray: [],
      toggleFullTravel: false,
      travelButtonText: "Se"
    };
  },
  created() {
    this.fetchTravels()
  },
  methods: {
    fetchTravels(){
      let url = "http://192.168.1.159:3005/";

      this.axios
        .post(url + "travels/")
        .then(response => {
          for (let i = 0; i < response.data.travelData.length; i++) {
            this.travelArray.push(response.data.travelData[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTravel(id){
      //Verify that the user wants to delete the post.
      let securityCheck = confirm("Är du säker att du vill radera inlägget?")
      if(securityCheck){
        let url = "http://192.168.1.159:3005/"
        let credentials = { id: id }

        this.axios
        .post(url + "delete-post/", credentials)
        .then(response => {
          this.travelArray = []
          this.fetchTravels()
          
          alert(response.data.message)
        })
        .catch(err => {
          console.log(err.response.data)
        })

      }else{
        console.log("Avbryt")
      }
    },
    fullTravelBtnClicked() {
      this.toggleFullTravel = !this.toggleFullTravel;
      if (this.toggleFullTravel) {
        this.travelButtonText = "Göm";
      } else {
        this.travelButtonText = "Se";
      }
    }
  },
  computed:{
    checkAdmin(){
      return this.$store.state.admin
    }
  }
};
</script>

<style scoped>
.popular{
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(153, 202, 251, 1) 100.2%
  );
}

.travel-data-wrapper{
  width: 90%;
  height: auto;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.top-column{
  width: 100%;
  height: auto;
  margin-top: 100px;
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(153, 202, 251, 1) 100.2%
  );
}
.profile-image{
  width: 100px;
  height: 100px;
  background-image: url("../assets/user.png");
  margin: auto; 
}
.white{
  color: black;
  margin: 0;
}
.bottom-column{
  width: 100%;
  height: auto;
}
.top-content-bar{
  width: 100%;
  height: 20px;
}
.rating{
  float: right;
}
.full-travel-button{
  background-color: rgb(5, 41, 75);
  color: white;
  display: block;
  width: 30%;
  height: 40px;
}
.content-wrapper{
  width: 90%;
  height: 75pt;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
.city {
  width: 60%;
  float: left;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}
.country {
  width: 40%;
  float: right;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}

.content-text-from-to{
  padding-left: 10px;
  padding-right: 10px;
  color: rgb(5, 41, 75);
}

.content-text{
  padding-left: 10px;
  padding-right: 10px;
  color: rgb(5, 41, 75);
  background-color: rgba(5, 41, 75, 0.103);
}

.content-wrapper-milestones {
  width: 90%;
  height: 100pt;
  margin: 30pt auto;
  border-radius: 5px;
  line-height: 50px;
}

.transportation-img{
  text-align: center;
}

.map-pin{
  float: right;
  padding-right: 10px;
}

.bottom-div{
  margin-top: 50px;
  height: 20pt;
  line-height: 20pt;
}

.remove-post-button{
  width: 50%;
  height: 40px;
  background-color: #026f7e;
  border: 0px;
  cursor: pointer;
  color: white;
}
.remove-data{
  width: 100%;
  height: auto;
  text-align: center;
}
</style>