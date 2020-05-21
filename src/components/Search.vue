<template>
  <div class="search-box">
    <input type="text" class="from-field" placeholder="Från... " v-model="from" />
    <input type="text" class="to-field" placeholder="Till... " v-model="to" />
    <button class="search-btn" @click="searchBtnPressed">Sök</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: null,
      to: null
    };
  },
  methods: {
    searchBtnPressed() {
      // Trigger searchfunction with parameters (fetch from database)

      //set from and to variables in store
      this.$store.commit("SET_FROM", this.from);
      this.$store.commit("SET_TO", this.to);

      //Then navigate
      this.$router.push({ name: "Searchresult" });
    }
  },
  computed: {}
};
</script>

<style>
.search-box {
  width: 40%;
  margin: auto;
}

.search-box .from-field {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 30px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px 0px 0px 16px;
  transition: 0.4s;
}

.search-box .from-field:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0px 16px 16px 0px;
}

.search-box .to-field {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 30px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 16px 0px;
  transition: 0.4s;
}

.search-box .to-field:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 0px 16px;
}

#app {
  background-size: cover;
  background-position: bottom;
}

.search-box .search-btn {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 30px;
  cursor: pointer;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: #00cbff;
  border-radius: 16px 16px 16px 16px;
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
</style>