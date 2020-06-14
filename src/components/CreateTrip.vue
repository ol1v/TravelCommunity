<template>
  <div class="container">
    <div class="row my-row">
      <div class="col">
        <input type="text" v-model="routeStructure.startLoc" placeholder="Start destination.." />
      </div>
    </div>

    <div v-for="entry in routeStructure.milestonesData" :key="entry.id" class="row my-row">
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
        <select v-model="entry.transport">
          <option selected disabled>Transportation</option>
          <option value="airplane">Airplane</option>
          <option value="train">Train</option>
          <option value="boat">Boat</option>
          <option value="car">Car</option>
        </select>
      </div>
      <div class="col">
        <input class="centerButton" type="button" value="Remove" @click="removeRoute(entry)" />
      </div>
    </div>

    <div class="container">
      <div class="row my-row">
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
          <select v-model="milestone.transport">
            <option selected disabled>Transportation</option>
            <option value="airplane">Airplane</option>
            <option value="train">Train</option>
            <option value="boat">Boat</option>
            <option value="car">Car</option>
          </select>
        </div>
        <div class="col">
          <input class="centerButton" type="button" value="Add" @click="addRoute()" />
        </div>
      </div>
    </div>

    <div class="row my-row">
      <div class="col">
        <input type="text" v-model="routeStructure.endLoc" placeholder="End destination.." />
      </div>
      <div class="col">
        <input
          type="number"
          v-model.number="routeStructure.price"
          placeholder="Estimated travel cost"
        />
      </div>
      <div class="col">
        <input type="checkbox" v-model="routeStructure.isPublic" id="isPublicCheckbox" />
        <label for="isPublicCheckbox">Make trip private {{ routeStructure.isPublic }}</label>
      </div>
    </div>

    <input class="centerButton" type="button" value="Debug log" @click="printObject()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeStructure: {
        startLoc: "",
        milestonesData: [],
        endLoc: "",
        price: Number(),
        isPublic: false
      },
      milestone: {
        city: "",
        country: "",
        resident: "",
        transport: "Transportation"
      }
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
      /*console.log(
        "\n \n* RouteStructure object \n \n" +
          this.routeStructure.startLoc +
          " - Start location."
      );
      */
      console.log(this.routeStructure);
      /*
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
        */
      this.saveTrip();
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
  min-width: 10rem;
}

.my-row {
  border: 3px red;
  padding: 0.5rem;
}
</style>