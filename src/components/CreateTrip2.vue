<template>
  <div class="ct-bg">
    <div class="CreateTrip-wrapper">
      <div class="newtrip-btn-wrapper">
        <button class="newtrip-btn" @click="openNewTrip" v-if="!toggleTravelForm">Create New Trip</button>
        <p v-if="!createdTripSuccess">Resa skapad! (success-ikon)</p>
      </div>
      <div class="newtrip" v-if="toggleTravelForm">
        <!-- New Travel form -->
        <div class="from-wrapper">
          <h3>Välj startdestination för din resa</h3>
          <label for="from"></label>
          <input id="from" type="text" placeholder="from" v-model="trip.from" />
        </div>
        <div class="country-wrapper">
          <input type="text" placeholder="country" v-model="trip.fromCountry" />
        </div>
        <!-- From to first milestone transport -->
        <div class="icon-buttons">
          <h4>Välj transportmedel till nästa resemål</h4>
          <input type="radio" id="car" name="transport" value="0" v-model="trip.transport" />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input type="radio" id="plane" name="transport" value="1" v-model="trip.transport" />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input type="radio" id="boat" name="transport" value="2" v-model="trip.transport" />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>
        </div>
        <br />
        <!-- Open first milestone -->
        <button class="buttons" @click="newMilestone" v-if="!toggleMilestone">Lägg till delmål</button>
        <div class="milestone-wrapper" v-if="toggleMilestone">
          <h4>Ange information om delmålet</h4>
          <!-- Milestone inputs -->
          <div class="milestone-inputs">
            <input type="text" placeholder="city" v-model="milestone.city" />
            <input type="text" placeholder="country" v-model="milestone.country" />
            <input type="text" placeholder="resident" v-model="milestone.resident" />
          </div>
          <p class="milestone-errmsg" v-bind="milestoneErrorMsg">{{ milestoneErrorMsg }}</p>
          <!-- milestone travelradiobuttons -->
          <h4>Ange transportmedel till nästa resemål</h4>
          <input type="radio" id="car" name="transport" value="0" v-model="milestone.transport" />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input type="radio" id="plane" name="transport" value="1" v-model="milestone.transport" />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input type="radio" id="boat" name="transport" value="2" v-model="milestone.transport" />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>
        </div>

        <!-- Add another milestone -->

        <button class="addmilestone-button" v-if="toggleMilestone" @click="addMilestone">+</button>
        <!-- if more than one milestone -->
        <div class="milestone-wrapper" v-for="(milestone, index) in trip.milestones" :key="index"></div>
        <h3>Välj slutdestination för din resa</h3>
        <div class="to-wrapper">
          <input type="text" placeholder="to" v-model="trip.to" />
        </div>
        <div class="country-wrapper">
          <input type="text" placeholder="country" v-model="trip.toCountry" />
        </div>
        <h5>Ange uppskattat pris och resetid för resan</h5>
        <div class="price-wrapper">
          <input type="text" placeholder="kostnad" v-model="trip.price" />
        </div>
        <div class="traveltime-wrapper">
          <input type="text" placeholder="resetid" v-model="trip.traveltime" />
        </div>
        <button class="buttons" @click="createTrip">Skapa resa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleTravelForm: false,
      toggleMilestone: false,
      createdTripSuccess: false,
      milestone: { city: null, country: null, resident: null, transport: null }, // push this milestone to trip.milestones when adding a new milestone
      trip: {
        username: this.$store.state.username,
        from: null,
        fromCountry: null,
        transport: null,
        milestones: [],
        to: null,
        toCountry: null,
        price: null,
        traveltime: null
      },
      milestoneErrorMsg: ""
    };
  },
  methods: {
    openNewTrip() {
      this.toggleTravelForm = true;
    },
    newMilestone() {
      // check to see if milestone fields are filled in before opening new milestone
      this.toggleMilestone = true;
    },
    addMilestone() {
      if (this.milestone.city == null) {
        this.milestoneErrorMsg =
          "Fyll i alla fält innan du lägger till ett nytt delmål";
      } else {
        this.trip.milestones.push(this.milestone);
        // clear milestone
        this.milestone = { city: null, country: null, resident: null };
        // clear errormsg
        this.milestoneErrorMsg = "";
      }
    },
    createTrip() {
      // post to db
      console.log(this.trip);
      console.log(this.milestone);

      const credentials = { trip: this.trip };
      let url = "http://localhost:3005/";

      this.axios
        .post(url + "create-trip2/", credentials)
        .then(response => {
          console.log("SUCCESS!");
          console.log(response);
        })
        .catch(err => {
          console.log("err:" + err);
        });
      // show success (connect with db 201)
      this.createdTripSuccess = true;
      // reset variables
      this.toggleTravelForm = false;
      this.toggleMilestone = false;
      this.createdTripSuccess = false;
      this.milestone = { city: null, country: null, resident: null };
      this.trip = {
        from: null,
        fromCountry: null,
        transport: null,
        milestones: [],
        to: null,
        toCountry: null,
        price: null,
        traveltime: null
      };
      this.milestoneErrorMsg = "";
    }
  }
};
</script>

<style scoped>
h3 {
  background-color: rgba(22, 113, 197, 0.089);
}

.CreateTrip-wrapper {
  text-align: center;
}
.newtrip {
  background-color: rgba(29, 98, 228, 0.178);
  padding: 2em;
  width: 60%;
  margin: auto;
}
.from-wrapper,
.to-wrapper {
  margin: 0.5em;
}
.country-wrapper {
}
input {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0.6em;
}
.icon-buttons {
  color: rgb(5, 41, 75);
  margin: 1em;
}
.buttons {
  width: 115pt;
  padding: 1em;
  cursor: pointer;
}
.addmilestone-button {
  border-radius: 50%;
  width: 5em;
  height: 5em;
  cursor: pointer;
  margin: 1em;
  background-color: rgba(14, 224, 67, 0.774);
  color: white;
  border: none;
}
.milestone-errmsg {
  color: red;
}
</style>