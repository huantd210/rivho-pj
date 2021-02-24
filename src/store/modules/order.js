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
    getMaxTimeEnd: state => {
      if (state.orderList.length > 0) {
        return state.orderList.reduce((max, cur) => {
          return max > cur.endAt ? max : cur.endAt;
        }, state.orderList[0].endAt);
      }
    },
    getMinTimeStart: state => {
      if (state.orderList.length > 0) {
        return state.orderList.reduce((min, cur) => {
          return min < cur.startAt ? min : cur.startAt;
        }, state.orderList[0].startAt);
      }
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
