<template>
  <div>
    <Userpanel></Userpanel>

    <Settingspanel v-responsive.md.lg.xl></Settingspanel>
    <MobileSettingspanel v-responsive.sm.xs></MobileSettingspanel>
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import Settingspanel from '../components/settings/Settingspanel'
import MobileSettingspanel from '../mobile-components/settings/MobileSettingspanel'

export default {
  components:{
    Userpanel,
    Settingspanel,
    MobileSettingspanel
  }

}
</script>

<style>

</style>