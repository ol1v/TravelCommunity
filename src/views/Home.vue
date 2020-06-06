<template>
  <div>
    <Home v-responsive.md.lg.xl></Home>
    <MobileHome v-responsive.sm.xs></MobileHome>
  </div>
</template>

<script>
import Home from '../components/Home'
import MobileHome from '../mobile-components/MobileHome'
export default {
  components: {
    Home,
    MobileHome
  }
};
</script>

<style>

</style>
