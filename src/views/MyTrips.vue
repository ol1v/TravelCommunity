<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
  
    <!-- This code was moved into /components/MyTrips.vue -->
    <MyTrips v-responsive.md.lg.xl :userToCheck="passUsername"></MyTrips>
    <MobileMyTrips v-responsive.sm.xs :userToCheck="passUsername"></MobileMyTrips>

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
  },
  data(){
    return{
      passUsername: this.$route.params.user
    }
  }
}
</script>

<style>

</style>