import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import enLocale from "element-ui/lib/locale/lang/en";
import jaLocale from "element-ui/lib/locale/lang/ja";
import locale from "element-ui/lib/locale";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import store from "./store";

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(faExclamationTriangle);

// configure language
locale.use(enLocale);

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
