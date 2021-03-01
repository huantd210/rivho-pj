import moment from "moment";
import _ from "lodash";
import {
  ORDER_GET_LIST,
  ORDER_CHANGE_FILTER_ORDER,
  ORDER_CHANGE_VISIBLE_CREATE,
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_CREATE_ORDER,
  ORDER_EDIT_ORDER,
  ORDER_DELETE_ORDER,
  ORDER_CHANGE_FILTER_PROCESS,
  ORDER_DELETE_PROCESS
} from "../constants/actionTypes";
import axios from "../../config/axios";

export default {
  namespaced: true,
  state: () => {
    return {
      orderList: [],
      filterOrder: {
        date: "",
        processId: ""
      },
      filterProcess: {
        id: ""
      },
      orderEdit: "",
      isVisibleDialogCreate: false,
      isVisibleDialogEdit: false
    };
  },
  getters: {
    getOrderList: state => state.orderList,
    getOrderListByFilter: state => {
      if (state.filterOrder && state.filterOrder.date !== "") {
        let dateFilter = moment(state.filterOrder.date.format("YYYY-MM-DD"));

        let orderLisFilter = state.orderList.reduce((arrOrder, curOrder) => {
          let importDate = moment(curOrder.importDate.format("YYYY-MM-DD"));
          let exportDate = moment(curOrder.exportDate.format("YYYY-MM-DD"));

          if (
            importDate.isSame(dateFilter) ||
            exportDate.isSame(dateFilter) ||
            (importDate.isBefore(dateFilter) && exportDate.isAfter(dateFilter))
          ) {
            arrOrder.push(curOrder);
          }

          return arrOrder;
        }, []);

        return orderLisFilter;
      }

      return [];
    },
    getProcessList: (state, getters) => {
      let processScheduleList = []; // get all process list
      if (
        getters.getOrderListByFilter &&
        getters.getOrderListByFilter.length > 0
      ) {
        processScheduleList = getters.getOrderListByFilter.reduce(
          (arrProcess, curOrder) => {
            if (
              curOrder &&
              curOrder.processList &&
              curOrder.processList.length > 0
            ) {
              let processListPerOrder = curOrder.processList.map(curProcess => {
                let processScheduleItem = {
                  name: curOrder.id + "/" + curOrder.productName,
                  color: curOrder.color,
                  orderId: curOrder.id,
                  ...curProcess
                };

                return processScheduleItem;
              });

              arrProcess = arrProcess.concat(processListPerOrder);
            }

            return arrProcess;
          },
          []
        );
      }
      return processScheduleList;
    },
    getProcessListByFilter: (state, getters) => {
      let processScheduleList = getters.getProcessList;
      if (state.filterProcess && state.filterProcess.id) {
        processScheduleList = getters.getProcessList.filter(
          process => process.id === state.filterProcess.id
        );
      }

      return processScheduleList;
    },
    getFilterOrder: state => state.filterOrder,
    getFilterProcess: state => state.filterProcess,
    getProcessIdList: (state, getters) => {
      let processIdList = getters.getProcessList.map(process => process.id);
      processIdList = [...new Set(processIdList)];
      return processIdList;
    },
    getOrderEdit: state => state.orderEdit,
    getVisibleDialogCreate: state => state.isVisibleDialogCreate,
    getVisibleDialogEdit: state => state.isVisibleDialogEdit
  },
  mutations: {
    [ORDER_GET_LIST](state, payload) {
      state.orderList = payload.orderList;
    },
    [ORDER_CHANGE_FILTER_ORDER](state, payload) {
      state.filterOrder = payload.filterOrder;
    },
    [ORDER_CHANGE_VISIBLE_CREATE](state, payload) {
      state.isVisibleDialogCreate = payload.isVisibleDialogCreate;
    },
    [ORDER_CHANGE_VISIBLE_EDIT](state, payload) {
      state.isVisibleDialogEdit = payload.isVisibleDialogEdit;
      state.orderEdit = payload.orderEdit;
    },
    [ORDER_CREATE_ORDER](state, payload) {
      payload.orderCreate.id = state.orderList.length;
      state.orderList.push(payload.orderCreate);
    },
    [ORDER_EDIT_ORDER](state, payload) {
      console.log(payload);
      state.orderList = state.orderList.map(order =>
        order.id === payload.orderEdit.id ? payload.orderEdit : order
      );
    },
    [ORDER_DELETE_ORDER](state, payload) {
      state.orderList = state.orderList.filter(
        order => order.id !== payload.orderId
      );
    },
    [ORDER_CHANGE_FILTER_PROCESS](state, payload) {
      state.filterProcess = payload.filterProcess;
    },
    [ORDER_DELETE_PROCESS](state, payload) {
      state.orderList = state.orderList.map(order => {
        if (
          order.id === payload.orderId &&
          order.processList &&
          order.processList.length > 0
        ) {
          order.processList = order.processList.filter(
            process => process.id !== payload.processId
          );
        }
        return order;
      });
    }
  },
  actions: {
    [ORDER_GET_LIST](context, payload) {
      const fetchOrderList = async () => {
        try {
          const result = await axios.get("orders");
          if (result && result.data && result.data.length > 0) {
            let orderList = result.data.map(order => {
              let orderItem = {
                id: order.id,
                customerName: order.customer_name,
                fNumber: order.f_number,
                color: order.color,
                importDate: moment(new Date(order.import_date), "YYYY-MM-DD"),
                exportDate: moment(new Date(order.export_date), "YYYY-MM-DD"),
                productName: order.product_name,
                quantity: order.quantity,
                processList: []
              };

              if (order.process_list.length > 0) {
                orderItem.processList = order.process_list.map(process => {
                  return {
                    id: process.file_field,
                    status: process.status,
                    machineId: process.machine_id,
                    fileField: process.file_field,
                    quantity: process.quantity,
                    startAt: moment(
                      new Date(process.start_at),
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                    endAt: moment(
                      new Date(process.end_at),
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  };
                });
              }

              return orderItem;
            });

            context.commit(ORDER_GET_LIST, {
              orderList
            });
          }
        } catch (error) {
          if (error) console.error(error);
        }
      };

      fetchOrderList();
    },
    [ORDER_CHANGE_FILTER_ORDER](context, payload) {
      if (payload.filterOrder && payload.filterOrder.date !== "") {
        context.commit(ORDER_CHANGE_FILTER_ORDER, {
          filterOrder: {
            date: moment(payload.filterOrder.date.format("YYYY-MM-DD"))
          }
        });
      }
    },
    [ORDER_CHANGE_VISIBLE_CREATE](context, payload) {
      context.commit(ORDER_CHANGE_VISIBLE_CREATE, {
        isVisibleDialogCreate: payload.isVisibleDialog
      });
    },
    [ORDER_CHANGE_VISIBLE_EDIT](context, payload) {
      context.commit(ORDER_CHANGE_VISIBLE_EDIT, {
        isVisibleDialogEdit: payload.isVisibleDialog,
        orderEdit: !_.isEmpty(payload.order) ? payload.order : ""
      });
    },
    [ORDER_CREATE_ORDER](context, payload) {
      context.commit(ORDER_CREATE_ORDER, {
        orderCreate: payload.order
      });
    },
    [ORDER_EDIT_ORDER](context, payload) {
      context.commit(ORDER_EDIT_ORDER, {
        orderEdit: payload.order
      });
    },
    [ORDER_DELETE_ORDER](context, payload) {
      context.commit(ORDER_DELETE_ORDER, {
        orderId: payload.orderId
      });
    },
    [ORDER_CHANGE_FILTER_PROCESS](context, payload) {
      context.commit(ORDER_CHANGE_FILTER_PROCESS, payload);
    },
    [ORDER_DELETE_PROCESS](context, payload) {
      context.commit(ORDER_DELETE_PROCESS, {
        orderId: payload.orderId,
        processId: payload.processId
      });
    }
  }
};
