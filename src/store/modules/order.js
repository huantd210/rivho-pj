import { ORDER_GET_LIST } from "../contants/actionTypes";
import axios from "../../config/axios";

export default {
  state: () => {
    return {
      orderList: []
    };
  },
  getters: {
    getOrderList: state => state.orderList
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
          context.commit(ORDER_GET_LIST, {
            orderList: result.data
          });
        } catch (error) {
          if (error) console.error(error);
        }
      };

      fetchOrderList();
    }
  }
};
