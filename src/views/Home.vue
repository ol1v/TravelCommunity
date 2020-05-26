<template>
  <div id="header">
    <div class="flex-container">
      <div class="background"></div>
      <div class="searchbar">
        <div class="texts">
          <h1>Search Travels.</h1>
          <p>Do you dream about going somewhere?</p>
          <h2>See Discovered Routes.</h2>
        </div>

        <home-search></home-search>
      </div>
    </div>
    <div class="banner"></div>
  </div>
</template>

<script>
export default {
  components:{
  }
};
</script>

<style>
.texts {
  text-align: left;
  margin-left: 3em;
}

h1 {
  opacity: 0.2;
  font-weight: 600;
}
p {
  font-size: 1.4em;
  font-weight: 600;
  opacity: 0.7;
}

.flex-container {
  display: flex;
}
.flex-container .background {
  width: 40%;
  height: 600px;
  box-sizing: content-box;
  padding-top: 15px;
  position: relative;
  background-image: url("../assets/test.png");
  background-size: contain;
  background-repeat: no-repeat;
  color: transparent;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
  margin-top: -75px;
  z-index: -2;
}
/* sätt z-index för background:after mellan background och footer*/
.flex-container .background:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  /* border-bottom: 200px solid white;
  border-left: 600px solid transparent; */
  z-index: 0;
}
.flex-container .searchbar {
  text-align: center;
}

.banner {
  width: 100%;
  height: 200px;
  background-color: #026f7e;
  position: relative;
  z-index: -20;
  top: -20px;
}
</style>
