<template>
  <div>
    <Userpanel></Userpanel>
    <MyTrips :userToCheck="passUsername"></MyTrips>
  </div>
</template>

<script>
import Userpanel from "../components/Userpanel";
import MyTrips from "../components/MyTrips";

export default {
  components: {
    Userpanel,
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