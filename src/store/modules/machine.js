import {
  MACHINE_GET_LIST,
  MACHINE_CHANGE_FILTER_MACHINE,
  MACHINE_CHANGE_VISIBLE_CREATE,
  MACHINE_CHANGE_VISIBLE_EDIT,
  MACHINE_CREATE_MACHINE,
  MACHINE_EDIT_MACHINE
} from "../constants/actionTypes";
import axios from "../../config/axios";

export default {
  namespaced: true,
  state: () => {
    return {
      machineList: [],
      filterMachine: "",
      machineEdit: "",
      isVisibleDialogCreate: false,
      isVisibleDialogEdit: false
    };
  },
  getters: {
    getMachineList: state => state.machineList,
    getMachineListByFilter: state => {
      if (state.filterMachine && state.filterMachine.code) {
        console.log("A");
        return state.machineList.filter(
          machine => machine.code === state.filterMachine.code
        );
      }

      return state.machineList;
    },
    getCodeMachineList: state =>
      state.machineList.map(machine => {
        return {
          id: machine.id,
          code: machine.code
        };
      }),
    getFilterMachine: state => state.filterMachine,
    getMachineEdit: state => state.machineEdit,
    getVisibleDialogCreate: state => state.isVisibleDialogCreate,
    getVisibleDialogEdit: state => state.isVisibleDialogEdit
  },
  mutations: {
    [MACHINE_GET_LIST](state, payload) {
      state.machineList = payload.machineList;
    },
    [MACHINE_CHANGE_FILTER_MACHINE](state, payload) {
      state.filterMachine = payload.filterMachine;
    },
    [MACHINE_CHANGE_VISIBLE_CREATE](state, payload) {
      state.isVisibleDialogCreate = payload.isVisibleDialogCreate;
    },
    [MACHINE_CHANGE_VISIBLE_EDIT](state, payload) {
      state.isVisibleDialogEdit = payload.isVisibleDialogEdit;
      state.machineEdit = payload.machineEdit;
    },
    [MACHINE_CREATE_MACHINE](state, payload) {
      payload.machineCreate.id = state.machineList.length;
      state.machineList.push(payload.machineCreate);
    },
    [MACHINE_EDIT_MACHINE](state, payload) {
      state.machineList = state.machineList.map(machine =>
        machine.id === payload.machineEdit.id ? payload.machineEdit : machine
      );
    }
  },
  actions: {
    [MACHINE_GET_LIST](context, payload) {
      const fetchMachineList = async () => {
        try {
          const result = await axios.get("machines");

          if (result.data.length > 0) {
            let machineList = result.data.map(item => {
              return {
                id: item.id,
                code: item.code,
                name: item.name,
                describe: item.describe
              };
            });

            context.commit(MACHINE_GET_LIST, {
              machineList
            });
          }
        } catch (error) {
          if (error) console.error(error);
        }
      };

      fetchMachineList();
    },
    [MACHINE_CHANGE_FILTER_MACHINE](context, payload) {
      context.commit(MACHINE_CHANGE_FILTER_MACHINE, payload);
    },
    [MACHINE_CHANGE_VISIBLE_CREATE](context, payload) {
      context.commit(MACHINE_CHANGE_VISIBLE_CREATE, {
        isVisibleDialogCreate: payload.isVisibleDialog
      });
    },
    [MACHINE_CHANGE_VISIBLE_EDIT](context, payload) {
      context.commit(MACHINE_CHANGE_VISIBLE_EDIT, {
        isVisibleDialogEdit: payload.isVisibleDialog,
        machineEdit: !_.isEmpty(payload.machine) ? payload.machine : ""
      });
    },
    [MACHINE_CREATE_MACHINE](context, payload) {
      context.commit(MACHINE_CREATE_MACHINE, {
        machineCreate: payload.machine
      });
    },
    [MACHINE_EDIT_MACHINE](context, payload) {
      context.commit(MACHINE_EDIT_MACHINE, {
        machineEdit: payload.machine
      });
    }
  }
};
