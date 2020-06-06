<template>
  <div>
    <div class="bg">
      <div id="image-body">
        <div id="page-wrapper">
          <div id="search-components">
             <mobile-search id="animsearch"></mobile-search> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobileSearch from './MobileSearch'
export default {
  components:{
    MobileSearch
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(2, 111, 126, 1) 0%,
    rgba(142, 197, 252, 1) 100%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: -5;
}
#image-body{
  width: 100%;
  height: 100vh;
  background-image: url("../assets/tchighreswide.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: -75px auto;
  z-index: -4;
}

#search-components{
  width: 80%;
  position: absolute;
  z-index: -1;
}

#page-wrapper{
  width: 100%;
  position: relative;
  top: 50%;
  display: flex;
  justify-content: center;
  margin: -100px auto;
  z-index: 0;
}
</style>