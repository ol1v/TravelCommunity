<template>
  <div>
    <div id="left-admin-panel">
      <!-- Shield-logo in side-panel -->
      <div id="admin-logo">
        <font-awesome-icon icon="shield-alt" size="4x" />
      </div>
      <div id="admin-links-wrapper">
        <!-- Side panel buttons -->
        <input type="button" value="Stäng av användare" class="admin-link" @click="displayBan" />
        <input type="button" value="Lås upp användare" class="admin-link" @click="displayUnban" />
        <input type="button" value="Hantera inlägg" class="admin-link" @click="displayList" />
      </div>
    </div>
    <!-- Right panel with components -->
    <div id="right-admin-panel">
      <Ban v-if="banBool"></Ban>
      <Unban v-if="unbanBool"></Unban>
      <AllUsers v-if="displayListBool"></AllUsers>
    </div>
  </div>
</template>

<script>
import Ban from "../../components/admin/Ban";
import Unban from "../../components/admin/Unban";
import AllUsers from "../../components/admin/AllUsers";

export default {
  components: {
    Ban,
    Unban,
    AllUsers
  },
  data() {
    return {
      banBool: true,
      unbanBool: false,
      displayListBool: false
    };
  },
  methods: {
    // Show / hide components
    displayBan() {
      this.banBool = true;
      this.unbanBool = false;
      this.displayListBool = false;
    },
    displayUnban() {
      this.banBool = false;
      this.unbanBool = true;
      this.displayListBool = false;
    },
    displayList() {
      this.banBool = false;
      this.unbanBool = false;
      this.displayListBool = true;
    }
  }
};
</script>

<style scoped>
#left-admin-panel {
  width: 15%;
  height: calc(100vh - 126px);
  background: #8ec5fc;
  background: linear-gradient(
    180deg,
    #85c0f4 0%,
    rgba(142, 197, 252, 0.9) 25%,
    rgba(252, 176, 69, 0) 100%
  );
  float: left;
}

#right-admin-panel {
  width: 85%;
  height: calc(100vh - 126px);
  float: right;
}

#admin-logo {
  width: 100%;
  height: auto;
  color: #0e4e79;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#admin-links-wrapper {
  width: 100%;
  height: auto;
}

.admin-link {
  display: block;
  width: 100%;
  height: 50px;
  border: 0px;
  background-color: transparent;
  color: #0e4e79;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  cursor: pointer;
}

.admin-link:hover {
  background-color: rgba(51, 122, 253, 0.171);
}
</style>