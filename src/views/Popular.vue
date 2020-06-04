<template>
  <div>
    <Popular v-responsive.lg.xl></Popular>
    <MobilePopular v-responsive.sm.xs></MobilePopular>
  </div>
</template>

<script>
import Popular from '../components/Popular'
import MobilePopular from '../mobile-components/MobilePopular'

export default {
  components:{
    Popular,
    MobilePopular
  }
}
</script>

<style>

</style>