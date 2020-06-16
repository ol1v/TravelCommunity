<template>
  <div v-if="!tripPosted" class="container center createTrip-action">
    <div class="row">
      <h2>Här börjar din resa</h2>
    </div>
    <div class="row">
      <div class="my-padding">
        <input type="text" v-model="routeStructure.startLoc" placeholder="Start destination.." />
      </div>
      <div class="my-padding">
        <input type="text" v-model="routeStructure.startCountry" placeholder="Start land.." />
      </div>
      <div class="my-padding">
        <input
          type="radio"
          id="car"
          name="startTransport"
          value=0
          v-model.number="routeStructure.startLocTransport"
        />
        <label for="car">
          <font-awesome-icon icon="car" size="2x" />
        </label>

        <input
          type="radio"
          id="plane"
          name="startTransport"
          value=1
          v-model.number="routeStructure.startLocTransport"
        />
        <label for="plane">
          <font-awesome-icon icon="plane" size="2x" />
        </label>

        <input
          type="radio"
          id="boat"
          name="startTransport"
          value=2
          v-model.number="routeStructure.startLocTransport"
        />
        <label for="boat">
          <font-awesome-icon icon="ship" size="2x" />
        </label>

        <input
          type="radio"
          id="train"
          name="startTransport"
          value=3
          v-model.number="routeStructure.startLocTransport"
        />
        <label for="train">
          <font-awesome-icon icon="subway" size="2x" />
        </label>
      </div>
    </div>

    <div class="row">
      <h2>Dina milstolpar</h2>
    </div>

    <div v-if="!hideCreatedMilestones.value">
      <div v-for="entry in routeStructure.milestonesData" :key="entry.id" class="row">
        <div class="col my-padding">
          <input type="text" v-model="entry.city" placeholder="Stad.." />
        </div>
        <div class="col my-padding">
          <input type="text" v-model="entry.country" placeholder="Land.." />
        </div>
        <div class="col my-padding">
          <input type="text" v-model="entry.resident" placeholder="Boende.." />
        </div>
        <div class="col my-padding">
          <input
            type="radio"
            id="car"
            :name="entry.id"
            value=0
            v-model.number="entry.Transportation"
          />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input
            type="radio"
            id="plane"
            :name="entry.id"
            value=1
            v-model.number="entry.Transportation"
          />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input
            type="radio"
            id="boat"
            :name="entry.id"
            value=2
            v-model.number="entry.Transportation"
          />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input
            type="radio"
            id="train"
            :name="entry.id"
            value=3
            v-model.number="entry.Transportation"
          />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
        </div>
        <div class="col my-padding">
          <input class="centerButton" type="button" value="Remove" @click="removeRoute(entry)" />
        </div>
      </div>
    </div>

    <div class="row my-padding">
      <input
        class="centerButton"
        type="button"
        :value="hideCreatedMilestones.text"
        @click="toggleMilestones()"
      />
    </div>

    <div class="row">
      <h2>Skapa milstolpe</h2>
    </div>
    <div class="container">
      <div class="row">
        <div class="col my-padding">
          <input type="text" v-model="milestone.city" placeholder="Stad.." />
        </div>
        <div class="col my-padding">
          <input type="text" v-model="milestone.country" placeholder="Land.." />
        </div>
        <div class="col my-padding">
          <input type="text" v-model="milestone.resident" placeholder="Boende.." />
        </div>
        <div class="col my-padding">
          <input
            type="radio"
            id="car"
            name="milestoneTransport"
            value=0
            v-model.number="milestone.Transportation"
          />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input
            type="radio"
            id="plane"
            name="milestoneTransport"
            value=1
            v-model.number="milestone.Transportation"
          />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input
            type="radio"
            id="boat"
            name="milestoneTransport"
            value=2
            v-model.number="milestone.Transportation"
          />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input
            type="radio"
            id="train"
            name="milestoneTransport"
            value=3
            v-model.number="milestone.Transportation"
          />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
        </div>
        <div class="col">
          <input class="centerButton" type="button" value="Lägg till" @click="addRoute()" />
        </div>
      </div>

      <div class="row">
        <h2>Här slutar din resa</h2>
      </div>
      <div class="row">
        <div class="my-padding">
          <input type="text" v-model="routeStructure.endLoc" placeholder="Slut destination.." />
        </div>
        <div class="my-padding">
          <input type="text" v-model="routeStructure.endCountry" placeholder="Slut land.." />
        </div>
        <div class="my-padding">
          <input type="text" v-model="routeStructure.endResident" placeholder="Slut boende.." />
        </div>
        <div class="my-padding">
          <input type="text" v-model="routeStructure.travelTime" placeholder="Resetid.." />
        </div>
        <div class="my-padding">
          <input
            type="number"
            v-model.number="routeStructure.price"
            placeholder="Uppskattad kostnad.."
          />
        </div>
        <div>
          <input type="checkbox" v-model="routeStructure.isPublic" id="isPublicCheckbox" />
          <label for="isPublicCheckbox">Privat resa</label>
        </div>
      </div>
      
      <div>
      <input class="centerButton" type="button" value="Ladda upp resa" @click="saveTrip()" />
      </div>
    </div>
  </div>

  <div v-else class="center createTrip-done">
    <h3 class="my-padding">Resa uppladdad!</h3>
    <input
      class="centerButton my-padding"
      type="button"
      value="Tillbaka till resa"
      @click="{{ tripPosted = false }}"
    />
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      routeStructure: {
        username: this.$store.state.username,
        startLoc: "",
        startCountry: "",
        startLocTransport: 0,
        milestonesData: [],
        endLoc: "",
        endCountry: "",
        endResident: "",
        travelTime: "",
        price: null,
        isPublic: false
      },
      milestone: { city: "", country: "", resident: "", Transportation: 0 },

      hideCreatedMilestones: { value: false, text: "Dölj milstolpar" },
      tripPosted: false
    };
  },
  methods: {
    //Adding a new route when pressing the button under the form.
    addRoute() {
      if (
        this.milestone.city.length < 1 ||
        this.milestone.country.length < 1 ||
        this.milestone.resident.length < 1 ||
        this.milestone.Transportation == "Transportation"
      ) {
        console.log("All fields must be used");
        //Put some red icon / warning sign
      } else {
        console.log(this.milestone.city);
        this.routeStructure.milestonesData.push({
          city: this.milestone.city,
          country: this.milestone.country,
          resident: this.milestone.resident,
          Transportation: this.milestone.Transportation
        });

        this.milestone.city = "";
        this.milestone.country = "";
        this.milestone.resident = "";
        this.milestone.Transportation = 0;

        console.log(
          "Added new route, " +
            this.routeStructure.milestonesData.length +
            " routes"
        );
      }
    },
    removeRoute(object) {
      console.log(object);
      var i = this.routeStructure.milestonesData.indexOf(object);
      console.log(i);
      this.routeStructure.milestonesData.splice(i, 1);

      console.log(this.routeStructure.milestonesData.length + " routes");
    },

    printObject() {
      console.log(
        "\n \n* RouteStructure object \n \n" +
          this.routeStructure.startLoc +
          " - Start location."
      );

      for (var i = 0; i < this.routeStructure.milestonesData.length; i++) {
        console.log("\n \nMilestone: " + (i + 1) + "\n \n");
        console.log(this.routeStructure.milestonesData[i].city + " - City");
        console.log(
          this.routeStructure.milestonesData[i].country + " - Country"
        );
        console.log(
          this.routeStructure.milestonesData[i].resident + " - Resident"
        );
        console.log(
          this.routeStructure.milestonesData[i].Transportation + " - Transport"
        );
      }

      console.log("\n \n" + this.routeStructure.endLoc + " - End location.");
      console.log(this.routeStructure.price + " - Price.");
      console.log(this.routeStructure.isPublic + " - Is public \n \n* \n \n");
    },

    toggleMilestones() {
      this.hideCreatedMilestones.value = !this.hideCreatedMilestones.value;

      if (this.hideCreatedMilestones.value == true) {
        this.hideCreatedMilestones.text = "Visa milstolpar";
      } else {
        this.hideCreatedMilestones.text = "Dölj milstolpar";
      }
    },
    saveTrip() {
      var route = this.routeStructure;
      if (
        route.milestonesData.length > 0 &&
        route.startLoc.length > 0 &&
        route.startCountry.length > 0 &&
        route.endLoc.length > 0 &&
        route.endCountry.length > 0 &&
        route.endResident.length > 0 &&
        route.travelTime.length > 0 &&
        route.price > 0
      ) {
        // Set data
        const credentials = {
          trip: this.routeStructure
        };
        let url = "http://localhost:3005/";

        // Send data
        this.axios
          .post(url + "user/", credentials)
          .then(response => {
            console.log("SUGSE");
            console.log(response);
            if (response.status == 201) {
              this.tripPosted = true;
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
};
</script>
 
<style scoped>
.center {
  margin: auto;
}

.createTrip-action{
  padding-bottom: 3rem;
  padding-top: 1rem;
  background-color: rgba(29, 98, 228, 0.178);
}

.createTrip-done{
  padding-bottom: 33%;
  padding-top: 1rem;
  background-color: rgba(29, 98, 228, 0.178);
}

h2, h3{
  background-color: rgba(29, 98, 228, 0.091);
}

.my-padding{
  padding: 0.5rem;
}

.centerButton {
  display: inline;
  min-width: 8rem;
  margin: auto;
}
</style>