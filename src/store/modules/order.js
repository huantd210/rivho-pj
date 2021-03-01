import moment from "moment";
import _ from "lodash";
import {
  ORDER_GET_LIST,
  ORDER_CHANGE_FILTER_ORDER,
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
      filterOrder: "",
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
        return state.orderList.reduce((arrOrder, curOrder) => {
          let orderStart = moment(curOrder.startAt.format("YYYY-MM-DD"));
          let orderEnd = moment(curOrder.endAt.format("YYYY-MM-DD"));

          if (
            orderStart.isSame(dateFilter) ||
            orderEnd.isSame(dateFilter) ||
            (orderStart.isBefore(dateFilter) && orderEnd.isAfter(dateFilter))
          ) {
            arrOrder.push(curOrder);
          }

          return arrOrder;
        }, []);
      }

      return [];
    },
    getNameOrderList: state => state.orderList.map(order => order.name),
    getFilterOrder: state => state.filterOrder,
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
                name: order.name,
                quantity: order.quantity,
                color: order.color,
                startAt: moment(
                  new Date(order.start_at),
                  "DD MM YYYY HH:mm:ss"
                ),
                endAt: moment(new Date(order.end_at), "DD MM YYYY HH:mm:ss"),
                machineCode: order.machine_code
              };

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
    }
  }
};
