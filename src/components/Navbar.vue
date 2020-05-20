<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/" class="navbar-links">Hem</router-link>
        </li>
        <li>
          <router-link to="/Login" class="navbar-links">Sign In</router-link>
        </li>
        <li>
          <router-link to="/Register" class="navbar-links">Register</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  background-color: rgba(236, 236, 236, 1);
  width: 100%;
  height: 50px;
}
ul,
li {
  display: inline;
  padding: 0px;
  margin: 0px;
}
.navbar-links {
  display: inline-block;
  width: auto;
  height: 50px;
  color: black;
  text-align: center;
  text-decoration: none;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>