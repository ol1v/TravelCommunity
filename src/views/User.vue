<template>
  <div>
    <Userpanel></Userpanel>
    <CreateTrip></CreateTrip>
  </div>
</template>

<script>
//Imports
import CreateTrip from "../components/CreateTrip.vue";
import Userpanel from "../components/Userpanel.vue";

export default {
  name: "App",
  components: {
    CreateTrip,
    Userpanel
  }
};
</script>

<style>
</style>