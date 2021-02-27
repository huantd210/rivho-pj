import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import store from "./store";

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
