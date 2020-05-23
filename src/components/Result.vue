<template>
  <div>
    <!--- If user wants to make another search  --->
    <div id="results-searchbar">
      <input class="results-inputs" type="text" />
      <input class="results-inputs" type="text" />
      <input type="button" value="Search" />
    </div>

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

    <section id="results-container">
      <!--- result object --->
      <div class="results-object">
        <span>Betyg 3/5</span>
        <span class="destinations">from Gothenburg</span>
        <span class="destinations">to Rome</span>

        <ul id="travel-info">
          <li>9487 SEK</li>
          <li>Stops: 3</li>
          <li>Traveltime</li>
        </ul>

        <span id="travel-icons">icons: car airplane boat</span>
        <!--- Icons (Create enum with icons) --->
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
  }
};
</script>

<style>
#results-container {
  background-color: cornflowerblue;
  width: 90%;
  margin: auto;
  border-radius: 15pt;
}

.filter-btn {
  margin-left: 1em;
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
}

.results-inputs {
  margin: 1em;
}
</style>