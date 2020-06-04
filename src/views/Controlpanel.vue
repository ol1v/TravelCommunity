<template>
  <div>
    <Userpanel v-responsive.md.lg.xl></Userpanel>
    <MobileUserpanel v-responsive.sm.xs></MobileUserpanel>
    <Adminpanel></Adminpanel>
    
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import MobileUserpanel from '../mobile-components/MobileUserpanel'
import Adminpanel from '../components/admin/Adminpanel'

export default {
  components:{
    Userpanel,
    MobileUserpanel,
    Adminpanel
  }

}
</script>

<style>

</style>