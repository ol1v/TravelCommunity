<template>
  <div id="results-searchbar">
    <input class="results-inputs" type="text" placeholder="FROM" v-model="from" />
    <input class="results-inputs" type="text" placeholder="TO" v-model="to" />
    <button class="results-btn" @click="searchBtnPressed">
      <span>Search</span>
    </button>
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

      //Search / fetch with searchwords
      const credentials = { from: this.from, to: this.to };
      let url = "http://localhost:3005/";

      this.axios
        .post(url + "search/", credentials)
        .then(response => {
          this.$store.commit("SET_RESULT", response.data.searchresult);
          console.log("response: " + response.data);
        })
        .catch(err => {
          console.log("err:" + err);
        });

      //set from and to variables in store
      this.$store.commit("SET_FROM", this.from);
      this.$store.commit("SET_TO", this.to);

      //Then navigate
      //this.$router.push({ name: "Searchresult" });
    }
  },
  computed: {}
};
</script>

<style>
#results-searchbar {
  text-align: center;
}

.results-inputs {
  border: none;
  text-transform: uppercase;
  font-weight: 400;
  color: black;
  font-size: 15px;
  padding: 10px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.results-btn {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.results-btn span {
  position: relative;
  z-index: 1;
}

.results-btn:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #8ec5fc;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

.results-btn:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>