<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
  
    <!-- This code was moved into /components/MyTrips.vue -->
    <MyTrips v-responsive.md.lg.xl></MyTrips>
    <MobileMyTrips v-responsive.sm.xs></MobileMyTrips>

  </div>
</template>

<script>
import Userpanel from "../components/Userpanel";
import MobileUserpanel from "../mobile-components/MobileUserpanel"
import MyTrips from '../components/MyTrips'
import MobileMyTrips from '../mobile-components/MobileMyTrips'

export default {
  components: {
    Userpanel,
    MobileUserpanel,
    MyTrips,
    MobileMyTrips
  }
}
</script>

<style>

</style>