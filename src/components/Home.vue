<template>
  <div id="header">
    <div class="flex-container">
      <div class="background animate__animated animate__fadeIn"></div>
      <div class="searchbar">
        <div class="texts">
          <!-- Animated text -->
          <h1 class="animh1">Search Travels.</h1>
          <p class="animp">Do you dream about going somewhere?</p>
          <h2 class="animh2">See Discovered Routes.</h2>
        </div>
        <!-- Search button & textfields -->
        <home-search id="animsearch"></home-search>
      </div>
    </div>
    <div class="banner"></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css";

.texts {
  text-align: left;
  margin-left: 1em;
  padding-top: 2em;
  padding-bottom: 2em;
  line-height: 50%;
}

.animh1 {
  opacity: 0.2;
  font-weight: 600;
  animation: fadeInLeft;
  animation-duration: 1s;
}

@keyframes animh1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}

.animp {
  font-size: 1.4em;
  font-weight: 600;
  opacity: 0.7;
  animation: fadeInRight;
  animation-duration: 1s;
  animation-delay: 0.2s;
}

@keyframes animp {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.7;
  }
}

#animsearch {
  animation: fadeIn;
  animation-duration: 5s;
}

.animh2 {
  animation: backInUp;
  animation-delay: 0.4s;
  animation-duration: 1s;
}

@keyframes animh2 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}

.flex-container {
  display: flex;
}
.flex-container .background {
  width: 40%;
  height: 600px;
  box-sizing: content-box;
  position: relative;
  background-image: url("../assets/tchighreswide.png");
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
  z-index: 0;
}
.flex-container .searchbar {
  text-align: center;
  margin-left: 4em;
}

.banner {
  width: 100%;
  height: 200px;
  background: rgb(2, 111, 126);
  background: linear-gradient(
    90deg,
    rgba(2, 111, 126, 1) 0%,
    rgba(142, 197, 252, 1) 100%,
    rgba(255, 255, 255, 1) 100%
  );

  position: relative;
  top: -20pt;
  z-index: -20;
}
</style>
