<template>
  <div>
    <Userpanel></Userpanel>
    <!-- <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>-->
    <MyTrips :userToCheck="passUsername"></MyTrips>
  </div>
</template>

<script>
import Userpanel from "../components/Userpanel";
// import MobileUserpanel from "../mobile-components/MobileUserpanel";
import MyTrips from "../components/MyTrips";

export default {
  components: {
    Userpanel,
    // MobileUserpanel,
    MyTrips
  },
  data() {
    return {
      passUsername: this.$route.params.user
    };
  }
};
</script>

<style>
</style>