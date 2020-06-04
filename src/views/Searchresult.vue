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
  background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(153, 202, 251, 1) 100.2%
  );
  padding-bottom: 20em; /* Temporärt */
}

.loading-wrapper {
  text-align: center;
}
</style>