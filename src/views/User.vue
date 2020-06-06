<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
    <CreateTrip></CreateTrip>
  </div>
</template>

<script>
//Imports
import CreateTrip from "../components/CreateTrip.vue";
import Userpanel from "../components/Userpanel.vue";
import MobileUserpanel from "../mobile-components/MobileUserpanel";

export default {
  name: "App",
  components: {
    CreateTrip,
    Userpanel,
    MobileUserpanel
  }
};
</script>

<style>
</style>