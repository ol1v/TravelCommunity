<template>
  <div>
    <Userpanel></Userpanel>
    
    <div id="ban-panel">
      <Ban></Ban>
      <Unban></Unban>
    </div>
    
  </div>
</template>

<script>
import Userpanel from '../components/Userpanel'
import Ban from '../components/admin/Ban'
import Unban from '../components/admin/Unban'

export default {
  components:{
    Userpanel,
    Ban,
    Unban
  }

}
</script>

<style>

</style>