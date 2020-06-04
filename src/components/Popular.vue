<template>
  <div class="popular">
    <div class="travel-data-wrapper" v-for="(travel, index) in travelArray" :key="index">
      <!-- Profile -->
      <div class="left-column">
        <div class="profile-image"></div>
        <h4 class="username-text">{{travelArray[index].username}}</h4>
        <h4 class="username-text">Uppladdat: {{travelArray[index].timestamp}}</h4>
      </div>
      <!-- Data -->
      <div class="right-column">
        <!-- Top bar for the rating system -->
        <div class="top-content-bar">
          <span class="rating">
            <span v-if="travelArray[index].ratingScore >= 1">☆</span>
            <span v-if="travelArray[index].ratingScore >= 2">☆</span>
            <span v-if="travelArray[index].ratingScore >= 3">☆</span>
            <span v-if="travelArray[index].ratingScore >= 4">☆</span>
            <span v-if="travelArray[index].ratingScore >= 5">☆</span>
          </span>

          <button
            class="full-travel-button"
            @click="fullTravelBtnClicked"
          >{{travelButtonText}} {{travelArray[index].milestones.length}} delmål</button>
        </div>
        <!-- From location -->
        <div>
          <div class="content-wrapper">
            <p class="content-text">
              <span class="start">{{travelArray[index].from}}</span>
              <span class="country">{{travelArray[index].fromCountry}}</span>
            </p>
          </div>
        </div>
        <!--- from vehicleicon --->
        <div class="transportation-img-from" v-if="toggleFullTravel">
          <p>
            <font-awesome-icon icon="car" size="2x" />
          </p>
        </div>

        <!-- Milestones -->
        <div v-for="(milestones, ind) in travelArray[index].milestones" :key="ind">
          <div class="content-wrapper-milestones" v-if="toggleFullTravel">
            <p class="content-text">
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
          <p class="content-text">
            <!-- NOTE!! From last milestone to endpoint -> travelArray[index].toTrans -->
            <span class="finish">{{travelArray[index].to}}</span>
            <span class="country">{{travelArray[index].toCountry}}</span>
          </p>
        </div>
        <!--- to travelicon --->
        <div class="transportation-img-to" v-if="toggleFullTravel">
          <p>
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
    let url = "http://localhost:3005/";

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
  methods: {
    fullTravelBtnClicked() {
      this.toggleFullTravel = !this.toggleFullTravel;
      if (this.toggleFullTravel) {
        this.travelButtonText = "Göm";
      } else {
        this.travelButtonText = "Se";
      }
    }
  }
};
</script>

<style scoped>
.popular {
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(153, 202, 251, 1) 100.2%
  );
}

.travel-data-wrapper {
  width: 50%;
  height: auto;
  margin: 50px auto;
  display: flex;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.left-column {
  width: 30%;
  height: auto;
  position: relative;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: transparent;
  color: white;
  float: left;
  border-right: 1pt solid white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 10;
}

/* Profile properties */
.profile-image {
  width: 100px;
  height: 100px;
  background-image: url("../assets/user.png");
  background-position: center;
  margin: auto;
}

.username-text {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
}

.right-column {
  width: 70%;
  height: 100%;
  float: left;
  background-color: white;
  position: relative;
}

.content-text {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgba(5, 41, 75, 0.103);
  color: rgb(5, 41, 75);
}

.transportation-img {
  margin-left: 1.6em;
  text-align: center;
  margin-top: 2.2em;
  color: rgb(5, 41, 75);
}

.transportation-img-from {
  text-align: center;
  margin-top: 1em;
  color: rgb(5, 41, 75);
}

.transportation-img-to {
  text-align: right;
  margin-right: 5em;
  margin-top: -4em;
  color: rgb(5, 41, 75);
}

.content-wrapper {
  width: 90%;
  height: 100pt;
  margin-top: 5em;
  border-radius: 5px;
  background-color: white;
  line-height: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.content-wrapper-milestones {
  width: 90%;
  height: 100pt;
  margin: 30pt auto;
  border-radius: 5px;
  line-height: 50px;
}

.top-content-bar {
  width: 100%;
  height: 20px;
  background-color: transparent;
  z-index: 7;
}

.bottom-content-bar {
  width: 100%;
  height: 30px;
  background-color: transparent;
  bottom: 0px;
  right: 5px;
  position: absolute;
  z-index: 7;
}
.bottom-report-button {
  width: 20px;
  height: 30px;
  float: right;
  cursor: pointer;
}

.bottom-div {
  margin-top: 30pt;
  margin-bottom: 30pt;
}

.full-travel-button {
  color: white;
  background-color: rgb(5, 41, 75);
  border-top: 0.5pt solid white;
  padding: 1em;
  border-radius: 0.3em;
  margin-right: 12em;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
}

.start {
  width: 50%;
  float: left;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
}

.finish {
  width: 50%;
  float: left;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
}

.city {
  width: 50%;
  float: left;
  text-align: left;
}
.country {
  width: 50%;
  float: right;
  text-align: right;
}
.rating {
  width: 100%;
  height: 20px;
  float: right;
  text-align: right;
  line-height: 20px;
  color: gold;
}
</style>