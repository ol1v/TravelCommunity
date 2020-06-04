<template>
  <div>
    <!--- If user wants to make another search  --->
    <home-search></home-search>
    <!--- filter options --->
    <div id="filter">
      <button class="filter-btn" @click="openFilterMenu">Filter</button>
      <div class="filter-content" v-bind="filterMenu" v-if="filterMenu">
        <select>
          <option value="0">Budget</option>
          <option value="1">Under 10000SEK</option>
          <option value="2">No limit</option>
        </select>
        <select>
          <option value="0">Days</option>
          <option value="1">One Week</option>
          <option value="2">Two Weeks Up</option>
        </select>
      </div>
    </div>
    <div class="res-found-wrapper">
      <h3
        class="res-found"
      >Hittade {{searchResult.length}} resultat för {{this.$store.state.from}} till {{this.$store.state.to}}</h3>
    </div>
    <section id="results-container">
      <!--- result object --->
      <div class="results-object" v-for="(result, index) in searchResult" :key="index">
        <div class="rating">
          <span @click="insertRating(5, result.id)">☆</span>
          <span @click="insertRating(4, result.id)">☆</span>
          <span @click="insertRating(3, result.id)">☆</span>
          <span @click="insertRating(2, result.id)">☆</span>
          <span @click="insertRating(1, result.id)">☆</span>
        </div>

        <div class="from-wrapper">
          <span class="destinations">{{result.from}}</span>
        </div>
        <!-- Replace line with icons -->
        <div class="line-wrapper">
          <div class="line">|</div>
          <font-awesome-icon class="icons" icon="car" size="2x" />
        </div>

        <div class="milestone-wrapper">
          <div class="milestones">
            <span>{{result.milestones[0].city}}</span>
            <span>{{result.milestones[0].country}}</span>

            <div class="hotel">
              <font-awesome-icon icon="hotel" size="1x" />
              {{result.milestones[0].resident}}
            </div>
          </div>
        </div>

        <!--- loop to get all icons --->
        <!--- Icons (Create enum with icons) --->
        <!-- <span id="travel-icons">
          <p>
            <font-awesome-icon icon="plane" size="2x" />
            <font-awesome-icon icon="ship" size="2x" />
            <font-awesome-icon icon="car" size="2x" />
          </p>
        </span>-->

        <div class="line-wrapper">
          <font-awesome-icon icon="plane" size="2x" />
          <div class="line">|</div>
        </div>
        <!-- Replace line with icons -->
        <div class="to-wrapper">
          <span class="destinations">{{result.to}}</span>
        </div>
        <div id="travel-info">
          <span>Antal Resemål {{result.milestones.length}}</span>
          <span>
            <font-awesome-icon icon="hourglass-end" size="1x" />
            {{result.traveltime}}
          </span>
        </div>

        <input class="info-btn" type="button" value="Läs mer om resan" />
        <!--- View all details --->
      </div>
    </section>
  </div>
</template>

<script>
/**
 * TO-DO
 * Get results from GET-request from database (which should be stored in store) and
 *  populate elements in this template.
 * Link inputs to from and to in store as two-way computed component.
 * Use this component in views/Searchresult
 */
export default {
  data() {
    return {
      filterMenu: false
    };
  },
  methods: {
    openFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    insertRating(value, index) {
      console.log(index);
      const values = { rating: value, index: index };

      let url = "http://localhost:3005/";

      this.axios
        .post(url + "rating/", values)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  computed: {
    searchResult: {
      get() {
        return this.$store.state.results;
      }
    }
  }
};
</script>

<style>
h3 {
  font-family: "Montserrat", sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}

#results-container {
  background-color: white;
  opacity: 0.9;
  width: 90%;
  margin: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat", sans-serif;
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
.rating {
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
  color: grey;
}
.rating > span:hover:before,
.rating > span:hover ~ span:before {
  content: "\2605";
  position: absolute;
  left: 0;
  color: gold;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}
.rating > span:hover,
.rating > span:hover ~ span {
  color: transparent;
}

.destinations {
  margin: 1em;
}

.filter-btn {
  margin-left: 1em;
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  position: relative;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  background-color: transparent;
  padding: 12px 68px;
  margin: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.filter-content {
  height: 30px;
  width: 250px;
  background-color: crimson;
  overflow-x: hidden;
  padding: 10px;
  transition: 0.5s;
  border-radius: 5pt;
  margin-left: 0.7em;
  margin: auto;
}

.results-button {
  background-color: lightskyblue;
  color: white;
  border-color: lightskyblue;
}

.results-inputs {
  margin: 1em;
}

.from-wrapper,
.to-wrapper {
  text-align: center;
  font-size: 18pt;
  color: rgb(5, 41, 75);
}

.milestone-wrapper {
  text-align: center;
}

.milestones {
  font-weight: 300;
  color: rgb(5, 41, 75);
  background-color: #8ec5fc1a;
  font-size: 13pt;
  margin-left: 1em;
  margin-right: 1em;
  padding: 1em;
}
.milestones span {
  margin: 0.3em;
}

.hotel {
  margin-top: 0.5em;
  font-size: 15pt;
}

.line-wrapper {
  text-align: center;
  color: rgb(5, 41, 75);
}

.line {
  font-size: 1.5em;
  font-weight: 100;
  margin: 0.4em;
}

#travel-info {
  text-align: center;
  margin-top: 1em;
  color: rgb(5, 41, 75);
}

#travel-info span {
  margin: 1em;
}

.info-btn {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  background-color: rgb(5, 41, 75);
  padding: 10px 40px;
  margin: 0 auto;
  margin-top: 1em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.res-found-wrapper {
  width: 90%;
  margin: auto;
}

.res-found {
  color: rgb(5, 41, 75);
}
</style>