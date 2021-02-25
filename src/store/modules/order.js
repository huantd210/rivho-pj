import moment from "moment";
import _ from "lodash";
import { ORDER_GET_LIST } from "../contants/actionTypes";
import axios from "../../config/axios";

export default {
  state: () => {
    return {
      orderList: []
    };
  },
  getters: {
    getOrderList: state => state.orderList,
    getOrderListByDate: state => date => {
      if (date) {
        return state.orderList.filter(
          order =>
            moment(order.startAt.format("YYYY-MM-DD")).isSame(date) ||
            moment(order.endAt.format("YYYY-MM-DD")).isSame(date)
        );
      }

      return state.orderList;
    }
  },
  mutations: {
    [ORDER_GET_LIST](state, payload) {
      state.orderList = payload.orderList;
    }
  },
  actions: {
    [ORDER_GET_LIST](context, payload) {
      const fetchOrderList = async () => {
        try {
          const result = await axios.get("orders");
          if (result.data.length > 0) {
            let orderList = result.data.map(item => {
              return {
                id: item.id,
                name: item.name,
                describe: item.describe,
                color: item.color,
                startAt: moment(item.start_at),
                endAt: moment(item.end_at),
                machineCode: item.machine_code
              };
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
    }
  }
};
