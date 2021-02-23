import { MACHINE_GET_LIST } from "../contants/actionTypes";
import axios from "../../config/axios";

export default {
  state: () => {
    return {
      machineList: []
    };
  },
  getters: {
    getMachineList: state => state.machineList
  },
  mutations: {
    [MACHINE_GET_LIST](state, payload) {
      state.machineList = payload.machineList;
    }
  },
  actions: {
    [MACHINE_GET_LIST](context, payload) {
      const fetchMachineList = async () => {
        try {
          const result = await axios.get("machines");
          context.commit(MACHINE_GET_LIST, {
            machineList: result.data
          });
        } catch (error) {
          if (error) console.error(error);
        }
      };

      fetchMachineList();
    }
  }
};
