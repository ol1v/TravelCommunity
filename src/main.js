import Vue from "vue";
import App from "./App.vue";
import search from "./components/Search.vue";
import Result from "./components/Result.vue";
import Loader from "./components/Loader.vue";
import MyFooter from "./components/MyFooter.vue";
import store from "./store";

import axios from "axios";
import vueAxios from "vue-axios";
Vue.use(vueAxios, axios);

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

//Responsive
import responsive from 'vue-responsive'
Vue.use(responsive)

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faShip } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons" 
import { faUserCog } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

library.add(faPlane, faShip, faCar, faHotel, faMapPin, faHourglassEnd, faShieldAlt, faUserCog, faAngleRight);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.component("home-search", search);
Vue.component("Result", Result);
Vue.component("Loader", Loader);
Vue.component("MyFooter", MyFooter);

import router from "./router";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
