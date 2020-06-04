<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
    <Adminpanel v-responsive.md.lg.xl></Adminpanel>
    <MobileAdminpanel v-responsive.sm.xs></MobileAdminpanel>
    
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import MobileUserpanel from '../mobile-components/MobileUserpanel'
import Adminpanel from '../components/admin/Adminpanel'
import MobileAdminpanel from '../mobile-components/admin/MobileAdminpanel'

export default {
  components:{
    Userpanel,
    MobileUserpanel,
    Adminpanel,
    MobileAdminpanel
  }

}
</script>

<style>

</style>