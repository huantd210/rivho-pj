import Vue from "vue";
import Vuex from "vuex";
import moduleMachine from "./modules/machine";
import moduleOrder from "./modules/order";
import moduleTimeline from "./modules/timeline";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    machine: moduleMachine,
    order: moduleOrder,
    timeline: moduleTimeline
  }
});
