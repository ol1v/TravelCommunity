<template>
  <div>
    <Userpanel></Userpanel>
    <Adminpanel v-responsive.md.lg.xl></Adminpanel>
    <MobileAdminpanel v-responsive.sm.xs></MobileAdminpanel>
    
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import Adminpanel from '../components/admin/Adminpanel'
import MobileAdminpanel from '../mobile-components/admin/MobileAdminpanel'

export default {
  components:{
    Userpanel,
    Adminpanel,
    MobileAdminpanel
  }

}
</script>

<style>

</style>