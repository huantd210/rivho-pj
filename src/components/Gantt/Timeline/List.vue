<template>
  <div class="gantt__timeline-list">
    <div v-if="getTimelineList.length > 0" class="gantt__timeline-wrapper">
      <item-grid
        v-for="item in getTimelineList"
        :key="item.id"
        :timeline="item"
        :columns="max - min"
        :styleCell="styleCell"
        :styleBlock="styleBlock"
      ></item-grid>
    </div>
    <div v-else class="gantt__timeline-wrapper--empty">
      <item-grid
        v-for="item in getMachineList.length"
        :key="item"
        :columns="max - min"
        :styleCell="styleCell"
        :styleBlock="styleBlock"
      ></item-grid>
    </div>
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
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 30,
    },
    height: {
      type: Number,
      required: 45,
    },
    styleCell: {
      type: Object,
    },
    styleBlock: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("machine", ["getMachineList"]),
    ...mapGetters("order", ["getOrderList", "getOrderFilter"]),
    getTimelineList() {
      let timelineList = [];

      if (
        this.getMachineList.length > 0 &&
        this.getOrderList.length > 0 &&
        this.getOrderFilter &&
        this.getOrderFilter.date
      ) {
        let dateStart = moment(this.getOrderFilter.date)
          .set("hour", this.start)
          .set("minute", 0);
        let dateEnd = moment(this.getOrderFilter.date)
          .set("hour", this.end)
          .set("minute", 0);

        // console.log("dateStart", dateStart);
        // console.log("dateEnd", dateEnd);

        timelineList = this.getMachineList.map((machine) => {
          let timelineItem = {
            id: machine.id,
            code: machine.code,
            blocks: [],
          };

          timelineItem.blocks = this.getOrderList.reduce(
            (blockList, curOrder) => {
              if (curOrder.machineCode === machine.code) {
                let gridCol = { x: 1, y: 2 };
                let gridRow = { x: 1, y: 2 };

                let blockStyleCustom = {
                  position: "relative",
                  left: "0px",
                };

                if (curOrder.endAt <= dateStart) {
                  gridCol.x = this.min;
                  gridCol.y = this.min;
                } else if (curOrder.startAt >= dateEnd) {
                  gridCol.x = this.max + 1;
                  gridCol.y = this.max + 1;
                } else if (
                  curOrder.startAt <= dateStart &&
                  curOrder.endAt >= dateEnd
                ) {
                  gridCol.x = this.min + 1;
                  gridCol.y = this.max + 1;
                } else if (
                  curOrder.startAt <= dateStart &&
                  curOrder.endAt < dateEnd
                ) {
                  gridCol.x = this.min + 1;
                  gridCol.y =
                    Math.floor(curOrder.endAt.diff(dateStart, "minutes") / 15) +
                    1;

                  blockStyleCustom.width =
                    (curOrder.endAt.diff(dateStart, "minutes") / 15) *
                      this.width +
                    "px";
                } else if (
                  curOrder.startAt > dateStart &&
                  curOrder.endAt < dateEnd
                ) {
                  let tempX = curOrder.startAt.diff(dateStart, "minutes") / 15;
                  gridCol.x = Math.floor(tempX) + 1;
                  gridCol.y =
                    Math.floor(curOrder.endAt.diff(dateStart, "minutes") / 15) +
                    1;

                  blockStyleCustom.left =
                    (tempX - Math.floor(tempX)) * this.width + "px";
                  blockStyleCustom.width =
                    (curOrder.endAt.diff(curOrder.startAt, "minutes") / 15) *
                      this.width +
                    "px";
                } else if (
                  curOrder.startAt > dateStart &&
                  curOrder.endAt >= dateEnd
                ) {
                  let tempX = curOrder.startAt.diff(dateStart, "minutes") / 15;
                  gridCol.x = Math.floor(tempX) + 1;
                  gridCol.y = this.max + 1;

                  blockStyleCustom.left =
                    (tempX - Math.floor(tempX)) * this.width + "px";
                  blockStyleCustom.width =
                    (dateEnd.diff(curOrder.startAt, "minutes") / 15) *
                      this.width +
                    "px";
                }

                let blockItem = {
                  ...curOrder,
                  startAt: curOrder.startAt.format("YYYY-MM-DD HH:MM:SS"),
                  endAt: curOrder.endAt.format("YYYY-MM-DD HH:MM:SS"),
                  gridCol,
                  gridRow,
                  blockStyleCustom,
                };

                blockList.push(blockItem);
              }

              return blockList;
            },
            []
          );

          return timelineItem;
        });
      }

      // console.log("timelineList ", timelineList);
      // console.log("getOrderFilter ", this.getOrderFilter);

      return timelineList;
    },
  },
  methods: {
    getGridPointPositionByDate(date) {
      let hourDate = date.get("hour");

      if (hourDate < this.start) {
        return this.min;
      } else if (hourDate >= this.end) {
        return this.max;
      } else {
        return date.diff(this.start, "minutes") / this.slice;
      }
    },
  },
};
</script>

<style scoped>
</style>
