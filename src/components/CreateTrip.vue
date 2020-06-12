<template>
  <div class="container">
<<<<<<< HEAD
    <div class="my-row">
      <div>
        <input type="text" v-model="routeStructure.startLoc" placeholder="Start destination..">
=======
    <div class="row my-row">
      <div class="col">
        <input type="text" v-model="routeStructure.startLoc" placeholder="Start destination.." />
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
      </div>
      <div>
        <input type="text" v-model="routeStructure.startCountry" placeholder="Start country..">
      </div>
      <div>
        <input type="radio" id="car" name="startTransport" value="0" v-model="routeStructure.startLocTransport" />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input type="radio" id="plane" name="startTransport" value="1" v-model="routeStructure.startLocTransport" />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input type="radio" id="boat" name="startTransport" value="2" v-model="routeStructure.startLocTransport" />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input type="radio" id="train" name="startTransport" value="3" v-model="routeStructure.startLocTransport" />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
      </div>
    </div>

<<<<<<< HEAD
    <div v-if="!hideCreatedMilestones.value">
    <div v-for="entry in routeStructure.milestonesData" :key="entry.id" class="row">
=======
    <div v-for="entry in routeStructure.milestonesData" :key="entry.id" class="row my-row">
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
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
<<<<<<< HEAD
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
=======
        <select v-model="entry.transport">
          <option selected disabled>Transportation</option>
          <option value="airplane">Airplane</option>
          <option value="train">Train</option>
          <option value="boat">Boat</option>
          <option value="car">Car</option>
        </select>
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
      </div>
      <div class="col">
        <input class="centerButton" type="button" value="Remove" @click="removeRoute(entry)" />
      </div>
    </div>
<<<<<<< HEAD
    </div>
      
    <div class="row">
    <input class="centerButton" type="button" :value="hideCreatedMilestones.text" @click="toggleMilestones()">
    </div>  
  
  <div class="container">
    <div class="row">
      <div class="col">
        <input type="text" v-model="milestone.city" placeholder="City..">
      </div>
      <div class="col">
        <input type="text" v-model="milestone.country" placeholder="Country..">
      </div>
      <div class="col">
        <input type="text" v-model="milestone.resident" placeholder="Resident..">
      </div>
      <div class="col">
        <input type="radio" id="car" name="milestoneTransport" value="0" v-model="milestone.transport" />
          <label for="car">
            <font-awesome-icon icon="car" size="2x" />
          </label>

          <input type="radio" id="plane" name="milestoneTransport" value="1" v-model="milestone.transport" />
          <label for="plane">
            <font-awesome-icon icon="plane" size="2x" />
          </label>

          <input type="radio" id="boat" name="milestoneTransport" value="2" v-model="milestone.transport" />
          <label for="boat">
            <font-awesome-icon icon="ship" size="2x" />
          </label>

          <input type="radio" id="train" name="milestoneTransport" value="3" v-model="milestone.transport" />
          <label for="train">
            <font-awesome-icon icon="subway" size="2x" />
          </label>
      </div>
      <div class="col">
        <input class="centerButton" type="button" value="Add" @click="addRoute()">
=======

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
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
      </div>
    </div>

<<<<<<< HEAD
    <div class="my-row">
      <div>
        <input type="text" v-model="routeStructure.endLoc" placeholder="End destination..">
      </div>
      <div>
        <input type="text" v-model="routeStructure.endCountry" placeholder="End country..">
      </div>
      <div>
        <input type="text" v-model="routeStructure.endResident" placeholder="End resident..">
      </div>
      <div>
        <input type="text" v-model="routeStructure.travelTime" placeholder="Travel time..">
      </div>
      <div>
        <input type="number" v-model.number="routeStructure.price" placeholder="Estimated travel cost">
      </div>
      <div>
        <input type="checkbox" v-model="routeStructure.isPublic" id="isPublicCheckbox">
        <label for="isPublicCheckbox">Private trip</label>
=======
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
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
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
        username: '',
        startLoc: '',
        startCountry: '',
        startLocTransport: 0,
        milestonesData: [],
        endLoc: '',
        endCountry: '',
        endResident: '',
        travelTime: '',
        price: null,
        isPublic: false
      },
      milestone: {city: '', country: '', resident: '', transport: 0},
      
      hideCreatedMilestones: {value: true, text: 'Show'},
    }
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

<<<<<<< HEAD
      console.log('\n \n' + this.routeStructure.endLoc + ' - End location.') 
      console.log(this.routeStructure.price + ' - Price.') 
      console.log(this.routeStructure.isPublic + ' - Is public \n \n* \n \n') 
    },

    toggleMilestones(){
      this.hideCreatedMilestones.value = !this.hideCreatedMilestones.value

      if(this.hideCreatedMilestones.value == true){
        this.hideCreatedMilestones.text = 'Show'
      }else{
        this.hideCreatedMilestones.text = 'Hide'
      }
    },
=======
      console.log("\n \n" + this.routeStructure.endLoc + " - End location.");
      console.log(this.routeStructure.price + " - Price.");
      console.log(this.routeStructure.isPublic + " - Is public \n \n* \n \n");
    }
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
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

<<<<<<< HEAD
  .centerButton{
    display: inline;
    min-width: 8rem;
  }

  .my-row{
    display: flex;
  }

  .my-row div{
    padding: 0.5rem;
  }
=======
.centerButton {
  display: inline;
  min-width: 10rem;
}

.my-row {
  border: 3px red;
  padding: 0.5rem;
}
>>>>>>> 07e5dd8bd039c83cf658942cb00d80e56b8695d0
</style>