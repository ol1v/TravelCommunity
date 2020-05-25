<template>
  <div id="container">
    Search result should appear here
    <Result></Result>
    <div class="loading-wrapper">
      <Loader></Loader>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#container {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  padding-bottom: 20em; /* Temporärt */
}

.loading-wrapper {
  text-align: center;
}
</style>