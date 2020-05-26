<template>
  <div id="header">
    <div class="flex-container">
      <div class="background">image</div>
      <div class="searchbar">
        <h1>Cool headline</h1>
        <home-search></home-search>
      </div>
    </div>
    <div class="banner"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.flex-container {
  display: flex;
}
.flex-container .background {
  width: 600px;
  height: 600px;
  box-sizing: content-box;
  padding-top: 15px;
  position: relative;
  background-image: url("../assets/header.jpg");
  color: white;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
  z-index: 3;
}
/* sätt z-index för background:after mellan background och footer*/
.flex-container .background:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 200px solid white;
  border-left: 600px solid transparent;
  z-index: 1;
}
.flex-container .searchbar {
  text-align: center;
}

.banner {
  width: 100%;
  height: 200px;
  background-color: blue;
  position: relative;
  z-index: 3;
  top: 0;
}
</style>