<template>
  <div>
    <Userpanel></Userpanel>
    <!-- Fix design for this -->
    <!-- Add button to delete data -->
    <!-- (Add button to edit data)??? -->
    <!--- Fix edit travelobject (get and insert new values in database)--->

    <div>
      <div
        class="travel-data-wrapper rounded-corners"
        v-for="(travel, index) in travelArray"
        :key="index"
      >
        <input class="inputs" type="text" v-model="travelArray[index].from" />

        <div
          class="milestones"
          v-for="(milestones, ind) in travelArray[index].milestones"
          :key="ind"
        >
          <h4 class="milestone-header">Milstolpe {{ind + 1}}</h4>

          <input class="inputs" type="text" v-model="travelArray[index].milestones[ind].city" />
          <input class="inputs" type="text" v-model="travelArray[index].milestones[ind].country" />
          <input class="inputs" type="text" v-model="travelArray[index].milestones[ind].resident" />
          <!--- Fixa select med ikoner för transportation--->
          <p>Transportmedel: {{travelArray[index].milestones[ind].transportation}}</p>
        </div>

        <input class="inputs" type="text" v-model="travelArray[index].to" />
        <p>Transporttid: {{travelArray[index].traveltime}}</p>

        <div class="travel-top-bar">
          <p class="uploaded">Uppladdat av: {{travelArray[index].username}}</p>
          <button class="update-button" @click="updateTravel(travelArray[index])">Ändra</button>
          <input type="button" class="remove-travel" @click="deleteTravel(travelArray[index].id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Userpanel from "../components/Userpanel";
export default {
  components: {
    Userpanel
  },
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
      activateChange: false
    };
  },
  created() {
    let url = "http://localhost:3005/";

    let credentials = { username: this.$store.state.username };
    console.log(credentials);

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
  methods: {
    deleteTravel(id) {
      //Fix delete button
      console.log("Deleted: " + id);
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
  }
};
</script>

<style>
.travel-top-bar {
  width: 100%;
  height: 20px;
  bottom: 0px;
}
.uploaded {
  height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  float: left;
  line-height: 20px;
  margin: 0px;
  font-size: 10px;
}
.remove-travel {
  width: 20px;
  height: 20px;
  float: right;
  cursor: pointer;
  margin-right: 10px;
  border: 0px;
}
.travel-data-wrapper {
  background-color: blue;
  width: 30%;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding-top: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 0.5em;
}
.milestones {
  background-color: aqua;
  margin-left: 1em;
}
</style>