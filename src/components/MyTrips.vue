<template>
  <div>
    <div class="bg">
      <div
        class="travel-data-wrapper rounded-corners"
        v-for="(travel, index) in travelArray"
        :key="index"
      >
        <div class="input-label-wrapper">
          <label for="mytrips-from">Från</label>
          <input id="mytrips-from" class="inputs" type="text" v-model="travelArray[index].from" />
        </div>

        <div
          class="milestones"
          v-for="(milestones, ind) in travelArray[index].milestones"
          :key="ind"
        >
          <h4 class="milestone-header">Delmål {{ind + 1}}</h4>
          <div class="input-label-wrapper">
            <label for="mytrips-city">Stad</label>
            <input
              id="mytrips-city"
              class="inputs"
              type="text"
              v-model="travelArray[index].milestones[ind].city"
            />
          </div>
          <div class="input-label-wrapper">
            <label for="mytrips-country">Land</label>
            <input
              id="mytrips-country"
              class="inputs"
              type="text"
              v-model="travelArray[index].milestones[ind].country"
            />
          </div>
          <div class="input-label-wrapper">
            <label for="mytrips-resident">Boende</label>
            <input
              id="mytrips-resident"
              class="inputs"
              type="text"
              v-model="travelArray[index].milestones[ind].resident"
            />
          </div>
          <!--- Fixa select med ikoner för transportation--->
          <div class="select-wrapper">
            <select class="selects" v-model="travelArray[index].milestones[ind].Transportation">
              <option selected>{{travelArray[index].milestones[ind].Transportation}}</option>
              <option value="fa fa-address-card">&#xf2bb;</option>
              <option value="train">Train</option>
              <option value="boat">Boat</option>
              <option value="car">Car</option>
            </select>
          </div>
        </div>

        <div class="input-label-wrapper">
          <label for="mytrips-to">Till</label>
          <input id="mytrips-to" class="inputs" type="text" v-model="travelArray[index].to" />
        </div>

        <div class="input-label-wrapper">
          <label for="mytrips-traveltime">Resetid</label>
          <input
            id="mytrips-traveltime"
            class="inputs"
            type="text"
            v-model="travelArray[index].traveltime"
          />
        </div>

        <div class="input-label-wrapper">
          <label for="mytrips-price">Kostnad</label>
          <input id="mytrips-price" class="inputs" type="text" v-model="travelArray[index].price" />
        </div>

        <div class="travel-top-bar">
          <div class="equal-spacing">
            <p class="uploaded">Uppladdat av: {{travelArray[index].username}}</p>
          </div>

          <div class="equal-spacing">
            <button class="update-button" @click="updateTravel(travelArray[index])">Ändra</button>
          </div>

          <div class="equal-spacing">
            <input
              type="button"
              class="remove-travel"
              value="X"
              @click="deleteTravel(travelArray[index].id)"
            />
          </div>
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

      // variables for making alterations in travel
      from: null,
      to: null,
      milestones: null,
      city: null,
      country: null,
      hotel: null,
      transportation: null,
      traveltime: null,
      cost: null,
      activateChange: false,
      //Must be saved
      user: this.userToCheck
    };
  },
  created() {
    this.fetchTravels();
  },
  methods: {
    fetchTravels() {
      let url = "http://localhost:3005/";
      let credentials = {};

      // Set credentials depending on status
      if (this.user) {
        credentials = { username: this.user };
      } else {
        credentials = { username: this.$store.state.username };
      }

      this.axios
        .post(url + "my-travels/", credentials)
        .then(response => {
          for (let i = 0; i < response.data.travelData.length; i++) {
            this.travelArray.push(response.data.travelData[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTravel(id) {
      //Verify that the user wants to delete the post.
      let securityCheck = confirm("Är du säker att du vill radera inlägget?");
      if (securityCheck) {
        let url = "http://localhost:3005/";
        let credentials = { id: id };

        this.axios
          .post(url + "delete-post/", credentials)
          .then(response => {
            this.travelArray = [];
            this.fetchTravels();

            alert(response.data.message);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      } else {
        console.log("Avbryt");
      }
    },
    updateTravel(travel) {
      console.log(travel);
      // Updatera ny resa i databasen
      let url = "http://localhost:3005/";

      let credentials = { travel: this.travelArray };

      this.axios
        .post(url + "updatetravel/", credentials)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: {
    userToCheck: String
  }
};
</script>

<style scoped>
.bg {
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(153, 202, 251, 1) 100.2%
  );
}
.travel-top-bar {
  width: 100%;
  height: 20px;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
}
.uploaded {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 20px;
  margin: 0px;
  font-size: 10px;
}

.update-button {
  color: #fff;
  font-weight: 500;
  min-width: 15em;
  height: 30px;
  cursor: pointer;
  font-size: 10px;
  background-color: #222;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.remove-travel {
  cursor: pointer;
  margin-right: 10px;
  border: 0px;
  text-align: right;
}
.equal-spacing {
  width: 33%;
  display: flex;
  justify-content: center;
}
.travel-data-wrapper {
  background-color: white;
  width: 30%;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding-top: 1em;
  margin-top: 1em;
  margin-left: 0.5em;
  margin-bottom: 1em;
  border-radius: 0.5em;
}
.milestone-header {
  margin-left: 0.5em;
  font-weight: 500;
  color: rgb(5, 41, 75);
}
.milestones {
  background-color: #1066e615;
  margin-top: 1em;
  margin-left: 1em;
  color: white;
  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
}
.inputs {
  border: none;
  color: rgb(5, 41, 75);
  padding-bottom: 0.4em;
  padding-left: 0.4em;
  font-size: 10pt;
  font-weight: 500;
}
.selects {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 0.6em;
  width: 9.4rem;
  margin-bottom: -1em;
}
.select-wrapper {
  text-align: center;
}
.input-label-wrapper {
  background-color: white;
  margin: 0.5em;
  width: 150pt;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.1em;
}
input,
label {
  display: block;
}
label {
  color: rgba(5, 41, 75, 0.637);
  font-size: 9pt;
  padding-top: 0.2em;
  padding-left: 0.4em;
}
@media screen and (max-width: 1000px) {
  .travel-data-wrapper {
    background-color: white;
    width: 90%;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding-top: 1em;
    margin-top: 1em;
    margin-left: 0.5em;
    margin-bottom: 1em;
    border-radius: 0.5em;
  }
}
</style>