import moment from "moment";
import _ from "lodash";
import { ORDER_GET_LIST, ORDER_FILTER } from "../contants/actionTypes";
import axios from "../../config/axios";

export default {
  namespaced: true,
  state: () => {
    return {
      orderList: [],
      orderFilter: ""
    };
  },
  getters: {
    getOrderList: state => state.orderList,
    getOrderFilter: state => state.orderFilter
  },
  mutations: {
    [ORDER_GET_LIST](state, payload) {
      state.orderList = payload.orderList;
      state.orderFilter = payload.orderFilter;
    }
  },
  actions: {
    [ORDER_GET_LIST](context, payload) {
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
                  moment(new Date(curOrder.start_at)).format(
                    "YYYY-MM-DD HH:MM:SS"
                  )
                ),
                endAt: moment(
                  moment(new Date(curOrder.end_at)).format(
                    "YYYY-MM-DD HH:MM:SS"
                  )
                ),
                machineCode: curOrder.machine_code
              };

              if (payload && payload.filter && payload.filter.date) {
                let orderStart = moment(orderItem.startAt.format("YYYY-MM-DD"));
                let orderEnd = moment(orderItem.endAt.format("YYYY-MM-DD"));
                payload.filter.date = moment(
                  moment(payload.filter.date).format("YYYY-MM-DD")
                );

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
    }
  }
};
