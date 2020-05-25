<template>
  <div id="header">
    <home-search></home-search>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
export default {};
</script>

<style>
#header {
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url("../assets/header.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px;
  margin-bottom: -50px;
  overflow: hidden;
  padding: 0px;
}
</style>