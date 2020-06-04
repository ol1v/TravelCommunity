<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
    <Settingspanel></Settingspanel>
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import MobileUserpanel from '../mobile-components/MobileUserpanel'
import Settingspanel from '../components/settings/Settingspanel'
export default {
  components:{
    Userpanel,
    MobileUserpanel,
    Settingspanel
  }

}
</script>

<style>

</style>