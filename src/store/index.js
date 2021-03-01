import Vue from "vue";
import Vuex from "vuex";
import moduleMachine from "./modules/machine";
import moduleOrder from "./modules/order";
import { WINDOW_RESIZE } from "./constants/actionTypes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => {
    return {
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  },
  getters: {
    getWindow: state => state.window
  },
  mutations: {
    [WINDOW_RESIZE](state, payload) {
      state.window.width = payload.window.width;
      state.window.height = payload.window.height;
    }
  },
  actions: {
    [WINDOW_RESIZE](context, payload) {
      if (payload.windowHeight && payload.windowWidth) {
        context.commit(WINDOW_RESIZE, {
          window: {
            width: payload.windowWidth,
            height: payload.windowHeight
          }
        });
      }
    }
  },
  modules: {
    machine: moduleMachine,
    order: moduleOrder
  }
});
