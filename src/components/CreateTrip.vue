<template>
  <div class="container">
    <div class="my-row">
      <h2>Välj vart din resa börjar</h2>
    </div>
    <div class="my-row">
      <div>
        <input type="text" v-model="routeStructure.startLoc" placeholder="Start destination.." />
      </div>
      <div>
        <input type="text" v-model="routeStructure.startCountry" placeholder="Start country.." />
      </div>
      <div>
        <input
          type="radio"
          id="car"
          name="startTransport"
          value="0"
          v-model="routeStructure.startLocTransport"
        />
        <label for="car">
          <font-awesome-icon icon="car" size="2x" />
        </label>

        <input
          type="radio"
          id="plane"
          name="startTransport"
          value="1"
          v-model="routeStructure.startLocTransport"
        />
        <label for="plane">
          <font-awesome-icon icon="plane" size="2x" />
        </label>

        <input
          type="radio"
          id="boat"
          name="startTransport"
          value="2"
          v-model="routeStructure.startLocTransport"
        />
        <label for="boat">
          <font-awesome-icon icon="ship" size="2x" />
        </label>

        <input
          type="radio"
          id="train"
          name="startTransport"
          value="3"
          v-model="routeStructure.startLocTransport"
        />
        <label for="train">
          <font-awesome-icon icon="subway" size="2x" />
        </label>
      </div>
    </div>

    <div v-if="!hideCreatedMilestones.value">
      <div class="my-row">
        <h2>Mina milstolpar</h2>
      </div>
      <div v-for="entry in routeStructure.milestonesData" :key="entry.id" class="row">
        <div class="col">
          <input type="text" v-model="entry.city" placeholder="City.." />
        </div>
        <div class="col">
          <input type="text" v-model="entry.country" placeholder="Country.." />
        </div>
        <div class="col">
          <input type="text" v-model="entry.resident" placeholder="Resident.." />
        </div>
        <div class="col">
          <input type="radio" id="car" :name="entry.id" value="0" v-model="entry.transport" />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input type="radio" id="plane" :name="entry.id" value="1" v-model="entry.transport" />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input type="radio" id="boat" :name="entry.id" value="2" v-model="entry.transport" />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input type="radio" id="train" :name="entry.id" value="3" v-model="entry.transport" />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
        </div>
        <div class="col">
          <input class="centerButton" type="button" value="Remove" @click="removeRoute(entry)" />
        </div>
      </div>
    </div>

    <div class="row">
      <input
        class="centerButton"
        type="button"
        :value="hideCreatedMilestones.text"
        @click="toggleMilestones()"
      />
    </div>

    <div class="my-row">
      <h2>Skapa milstolpe</h2>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <input type="text" v-model="milestone.city" placeholder="City.." />
        </div>
        <div class="col">
          <input type="text" v-model="milestone.country" placeholder="Country.." />
        </div>
        <div class="col">
          <input type="text" v-model="milestone.resident" placeholder="Resident.." />
        </div>
        <div class="col">
          <input
            type="radio"
            id="car"
            name="milestoneTransport"
            value="0"
            v-model="milestone.transport"
          />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input
            type="radio"
            id="plane"
            name="milestoneTransport"
            value="1"
            v-model="milestone.transport"
          />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input
            type="radio"
            id="boat"
            name="milestoneTransport"
            value="2"
            v-model="milestone.transport"
          />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input
            type="radio"
            id="train"
            name="milestoneTransport"
            value="3"
            v-model="milestone.transport"
          />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
        </div>
        <div class="col">
          <input class="centerButton" type="button" value="Add" @click="addRoute()" />
        </div>
      </div>

      <div class="my-row">
        <h2>Här slutar din resa</h2>
      </div>
      <div class="my-row">
        <div>
          <input type="text" v-model="routeStructure.endLoc" placeholder="End destination.." />
        </div>
        <div>
          <input type="text" v-model="routeStructure.endCountry" placeholder="End country.." />
        </div>
        <div>
          <input type="text" v-model="routeStructure.endResident" placeholder="End resident.." />
        </div>
        <div>
          <input type="text" v-model="routeStructure.travelTime" placeholder="Travel time.." />
        </div>
        <div>
          <input
            type="number"
            v-model.number="routeStructure.price"
            placeholder="Estimated travel cost"
          />
        </div>
        <div>
          <input type="checkbox" v-model="routeStructure.isPublic" id="isPublicCheckbox" />
          <label for="isPublicCheckbox">Private trip</label>
        </div>
      </div>

      <input class="centerButton" type="button" value="Debug log" @click="printObject()" />
    </div>
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
      milestone: { city: "", country: "", resident: "", transport: 0 },

      hideCreatedMilestones: { value: true, text: "Show" }
    };
  },
  methods: {
    //Adding a new route when pressing the button under the form.
    addRoute() {
      if (
        this.milestone.city.length < 1 ||
        this.milestone.country.length < 1 ||
        this.milestone.resident.length < 1 ||
        this.milestone.transport == "Transportation"
      ) {
        console.log("All fields must be used");
        //Put some red icon / warning sign
      } else {
        console.log(this.milestone.city);
        this.routeStructure.milestonesData.push({
          city: this.milestone.city,
          country: this.milestone.country,
          resident: this.milestone.resident,
          transport: this.milestone.transport
        });

        this.milestone.city = "";
        this.milestone.country = "";
        this.milestone.resident = "";
        this.milestone.transport = "Transportation";

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
          this.routeStructure.milestonesData[i].transport + " - Transport"
        );
      }

      console.log("\n \n" + this.routeStructure.endLoc + " - End location.");
      console.log(this.routeStructure.price + " - Price.");
      console.log(this.routeStructure.isPublic + " - Is public \n \n* \n \n");
      this.saveTrip();
    },

    toggleMilestones() {
      this.hideCreatedMilestones.value = !this.hideCreatedMilestones.value;

      if (this.hideCreatedMilestones.value == true) {
        this.hideCreatedMilestones.text = "Show";
      } else {
        this.hideCreatedMilestones.text = "Hide";
      }
    },
    saveTrip() {
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
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
 
<style>
li {
  padding: 0.4rem;
}
li input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border-style: groove;
}

ul {
  display: inline;
}

#component {
  text-align: center;
}

.centerButton {
  display: inline;
  min-width: 8rem;
}

.my-row {
  display: flex;
}

.my-row div {
  padding: 0.5rem;
}
</style>