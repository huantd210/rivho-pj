import moment from "moment";
import _ from "lodash";
import { TIMELINE_GET_LIST } from "../constants/actionTypes";

export default {
  namespaced: true,
  state: () => {
    return {
      timelineList: []
    };
  },
  getters: {
    getTimelineList: state => state.timelineList,
    getTimelineStart: state => {
      if (state.timelineList.length > 0) {
        return state.timelineList.reduce((max, cur) => {
          return max > cur.endAt ? max : cur.endAt;
        }, state.timelineList[0].endAt);
      }
    },
    getTimelineEnd: state => {
      if (state.timelineList.length > 0) {
        return state.timelineList.reduce((min, cur) => {
          return min < cur.startAt ? min : cur.startAt;
        }, state.timelineList[0].startAt);
      }
    }
  },
  mutations: {
    [TIMELINE_GET_LIST](state, payload) {
      state.timelineList = payload.timelineList;
    }
  },
  actions: {
    async [TIMELINE_GET_LIST](context, payload) {
      const { rootGetters } = context;
      let machineList = rootGetters["machine/getMachineList"];
      let orderList = rootGetters["order/getOrderList"];

      console.log("A", rootGetters["machine/getMachineList"]);
      console.log("B", rootGetters["order/getOrderList"]);

      let timelineList = [];

      if (machineList.length > 0 && orderList.length > 0) {
        timelineList = machineList.map(machine => {
          let machineItem = {
            id: machine.id,
            code: machine.code,
            blocks: []
          };

          machineItem.blocks = orderList.reduce((arrOrder, curOrder) => {
            if (curOrder.machineCode === machine.code) {
              let gridCol = { x: 1, y: 2 };
              let gridRow = { x: 1, y: 2 };

              gridCol.x = curOrder.startAt.diff(this.start, this.unit);
              gridCol.y =
                gridCol.x + curOrder.endAt.diff(curOrder.startAt, this.unit);

              let orderItem = {
                ...curOrder,
                startAt: moment(curOrder.startAt).format("YYYY-MM-DD"),
                endAt: moment(curOrder.endAt).format("YYYY-MM-DD"),
                gridCol,
                gridRow
              };

              arrOrder.push(orderItem);
            }

            return arrOrder;
          }, []);
        });

        context.commit(TIMELINE_GET_LIST, {
          timelineList
        });
      }
    }
  }
};
