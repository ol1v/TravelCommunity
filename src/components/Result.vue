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
    <h3>Found 1 travel</h3>
    <section id="results-container">
      <!--- result object --->
      <div class="results-object">
        <div class="rating">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
        <span class="destinations">{{searchResult[0].from}}</span>
        <span class="destinations">{{searchResult[0].to}}</span>

        <ul id="travel-info">
          <li>9487 SEK</li>
          <li>Stops: 3</li>
          <li>{{searchResult[0].traveltime}}</li>
        </ul>
        <!--- loop to get all icons --->
        <!--- Icons (Create enum with icons) --->
        <span id="travel-icons">
          <p>
            <font-awesome-icon icon="plane" size="2x" />
            <font-awesome-icon icon="ship" size="2x" />
            <font-awesome-icon icon="car" size="2x" />
          </p>
        </span>

        <input type="button" value="View Details" />
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
</style>