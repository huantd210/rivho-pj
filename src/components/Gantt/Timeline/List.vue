<template>
  <div class="gantt__timeline-list">
    <item-grid
      v-for="item in getTimelineList"
      :key="item.id"
      :timeline="item"
      :cols="getColsTimeline"
      :styleCell="styleCell"
      :styleBlock="styleBlock"
    ></item-grid>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ItemGrid from "./Item/Grid";

export default {
  name: "gantt-machine-list",
  components: {
    ItemGrid,
  },
  props: {
    start: {
      required: true,
    },
    end: {
      required: true,
    },
    unit: {
      type: String,
      default: "days",
    },
    zoom: {
      type: String,
      default: "months",
    },
    styleCell: {
      type: Object,
    },
    styleBlock: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getMachineList", "getOrderList"]),
    getTimelineList() {
      let machineList = this.getMachineList;
      let orderList = this.getOrderList;
      let timelineList = [];

      if (machineList.length > 0 && orderList.length > 0) {
        timelineList = machineList.map((machine) => {
          let machineItem = {
            id: machine.id,
            code: machine.code,
            blocks: [],
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
                gridRow,
              };

              arrOrder.push(orderItem);
            }

            return arrOrder;
          }, []);

          return machineItem;
        });
      }
      // console.log(timelineList);

      return timelineList;
    },
    getColsTimeline() {
      let start = moment(this.start);
      let end = moment(this.end);
      if (start && end) {
        return end.diff(start, this.unit) + 1;
      }

      return 0;
    },
  },
};
</script>

<style scoped>
</style>
