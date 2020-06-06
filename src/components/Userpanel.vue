<template>
  <div>
    <nav>
      <div id="left-user-column">
        <ul>
          <li>
            <router-link to="/user" class="user-links">NY RESA</router-link>
          </li>
          <li>
            <router-link to="/user/test" class="user-links">NY RESAtest</router-link>
          </li>
          <li>
            <router-link to="/user/trips" class="user-links">MINA RESOR</router-link>
          </li>
          <li>
            <router-link to="/user/settings" class="user-links">INSTÄLLNINGAR</router-link>
          </li>
          <li>
            <router-link
              to="/user/admin"
              class="user-links"
              v-if="this.$store.state.admin"
            >ADMINPANEL</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  width: 100%;
  height: 50px;
  box-shadow: 0px 0.1px 0px 1px rgba(142, 197, 252, 0.2);
  margin-top: 1px;
}
#left-user-column {
  width: 50%;
  height: 50px;
  background: rgb(142, 197, 252);
  /* background-image: radial-gradient(
    circle 1224px at 10.6% 8.8%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(153, 202, 251, 0.9) 100.2%
  ); */

  background: linear-gradient(90deg, rgb(142, 197, 252), white);
}
ul,
li {
  display: inline-block;
  padding: 0px;
  margin: 0px;
}
.user-links {
  display: block;
  width: auto;
  height: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  text-decoration: none;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 50px;
  font-weight: 400;
}
.user-links:hover {
  color: #8ec5fc;
  background-color: white;
}
</style>