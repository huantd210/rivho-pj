import moment from "moment";
import _ from "lodash";
import {
  ORDER_GET_LIST,
  ORDER_CHANGE_VISIBLE_CREATE,
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_CREATE_ORDER,
  ORDER_EDIT_ORDER,
  ORDER_DELETE_ORDER
} from "../constants/actionTypes";
import axios from "../../config/axios";

export default {
  namespaced: true,
  state: () => {
    return {
      orderList: [],
      orderFilter: "",
      orderEdit: "",
      isVisibleDialogCreate: false,
      isVisibleDialogEdit: false
    };
  },
  getters: {
    getOrderList: state => state.orderList,
    getOrderFilter: state => state.orderFilter,
    getOrderEdit: state => state.orderEdit,
    getVisibleDialogCreate: state => state.isVisibleDialogCreate,
    getVisibleDialogEdit: state => state.isVisibleDialogEdit
  },
  mutations: {
    [ORDER_GET_LIST](state, payload) {
      state.orderList = payload.orderList;
      state.orderFilter = payload.orderFilter;
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
      state.orderList = state.orderList.map(order =>
        order.id === payload.orderEdit.id ? payload.orderEdit : order
      );
    },
    [ORDER_DELETE_ORDER](state, payload) {
      state.orderList = state.orderList.filter(
        order => order.id !== payload.orderId
      );
    }
  },
  actions: {
    [ORDER_GET_LIST](context, payload) {
      payload.filter.date = payload.filter.date
        ? moment(payload.filter.date.format("YYYY-MM-DD"))
        : "";

      const fetchOrderList = async () => {
        try {
          const result = await axios.get("orders");
          if (result.data.length > 0) {
            let orderList = result.data.reduce((arrOrder, curOrder) => {
              // get all if filter is null
              let orderItem = {
                id: curOrder.id,
                name: curOrder.name,
                describe: curOrder.describe,
                color: curOrder.color,
                startAt: moment(
                  new Date(curOrder.start_at),
                  "DD MM YYYY HH:mm:ss"
                ),
                endAt: moment(new Date(curOrder.end_at), "DD MM YYYY HH:mm:ss"),
                machineCode: curOrder.machine_code
              };

              if (payload && payload.filter && payload.filter.date) {
                let orderStart = moment(orderItem.startAt.format("YYYY-MM-DD"));
                let orderEnd = moment(orderItem.endAt.format("YYYY-MM-DD"));

                // console.log("orderStart:", orderStart);
                // console.log("orderEnd:", orderEnd);
                // console.log("orderFilter:", payload.filter.date);

                if (
                  orderStart.isSame(payload.filter.date) ||
                  orderEnd.isSame(payload.filter.date) ||
                  (orderStart.isBefore(payload.filter.date) &&
                    orderEnd.isAfter(payload.filter.date))
                ) {
                  arrOrder.push(orderItem);
                }
              } else {
                arrOrder.push(orderItem);
              }

              return arrOrder;
            }, []);

            // console.log(orderList);

            context.commit(ORDER_GET_LIST, {
              orderList,
              orderFilter: payload.filter
            });
          }
        } catch (error) {
          if (error) console.error(error);
        }
      };

      fetchOrderList();
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
    }
  }
};
