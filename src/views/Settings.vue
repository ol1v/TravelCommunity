<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>

    <Settingspanel v-responsive.md.lg.xl></Settingspanel>
    <MobileSettingspanel v-responsive.sm.xs></MobileSettingspanel>
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import MobileUserpanel from '../mobile-components/MobileUserpanel'
import Settingspanel from '../components/settings/Settingspanel'
import MobileSettingspanel from '../mobile-components/settings/MobileSettingspanel'

export default {
  components:{
    Userpanel,
    MobileUserpanel,
    Settingspanel,
    MobileSettingspanel
  }

}
</script>

<style>

</style>