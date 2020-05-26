<template>
  <div id="component">
    <ul v-if="routeData.length < 1">
      <li><input type="text" v-model="routeStructure.from" placeholder="From.."></li>
      <li>
        <select v-model="routeStructure.transportation">
        <option selected disabled="">Transportation</option>
        <option value="airplane">Airplane</option>
        <option value="train">Train</option>
        <option value="boat">Boat</option>
        <option value="car">Car</option>
      </select>
      </li>
      <li><input type="text" v-model="routeStructure.to" placeholder="To.."></li>
      <li><input type="number" v-model="routeStructure.price" placeholder="Estimated travel cost"></li>
      <input class="centerButton" type="button" @click="addRoute()">
      </ul>

      <ul v-else v-for="route in routeData" :key="route">
      <li><input type="text" v-model="route.from" placeholder="From.."></li>
      <li>
        <select v-model="route.transportation">
        <option selected disabled="">Transportation</option>
        <option value="airplane">Airplane</option>
        <option value="train">Train</option>
        <option value="boat">Boat</option>
        <option value="car">Car</option>
      </select>
      </li>
      <li><input type="text" v-model="route.to" placeholder="To.."></li>
      <li><input type="number" v-model="route.price" placeholder="Estimated travel cost"></li>
      <input class="centerButton" type="button" @click="addRoute()">
      </ul>
  </div>
</template>

<script>
export default {
 data(){
    return{
      routeStructure: {
        from: '',
        transportation: 'Transportation',
        to: '',
        price: Number
      },
      //routeStructureModel is only used to create a new empty form values to routeData, from code.
      routeStructureModel: {
        from: '',
        transportation: 'Transportation',
        to: '',
        price: Number
      },
      //Containing all the routes created, will be sent to database when done.
      routeData: []
    }
  },
  methods: {
    //Adding a new route when pressing the button under the form.
    addRoute(){
      this.routeData.push(this.routeStructure)
    
      if(this.routeData.length < 2){
        this.routeData.push(this.routeStructureModel)
      }

      //Debug ..
      var index = this.routeData.length-1
      console.log('Route added.. ' + this.routeData.length + ' total routes.')
      console.log('Route info: ' + this.routeData[index].from + ' to ' + this.routeData[index].to + '. Price: ' + this.routeData[index].price + ' by ' + this.routeData[index].transportation + '.')
      console.log(this.routeData.length)
    }
  }
}
</script>

<style>
  li{
    padding: 0.4rem;
  }
  li input{
    padding: 0.5rem;
    border-radius: 0.5rem;
    border-style:groove;
  }

  ul{
    display: inline;
  }

  #component{
    text-align: center;
  }

  .centerButton{
    display: inline;
  }
</style>