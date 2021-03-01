<template>
  <div class="gantt__timeline-list">
    <div
      v-if="getTimelineList && getTimelineList.length > 0"
      class="gantt__timeline-wrapper"
    >
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
        v-for="item in getMachineListByFilter.length"
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
    slice: {
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
    ...mapGetters("machine", ["getMachineListByFilter"]),
    ...mapGetters("order", ["getFilterOrder", "getProcessListByFilter"]),
    getTimelineList() {
      let timelineList = [];
      let timePerBlock = 60 / this.slice; // 60 / 4 minutes

      if (
        this.getMachineListByFilter &&
        this.getMachineListByFilter.length > 0 &&
        this.getProcessListByFilter &&
        this.getProcessListByFilter.length > 0 &&
        this.getFilterOrder &&
        this.getFilterOrder.date !== ""
      ) {
        let dateStart = moment(this.getFilterOrder.date)
          .set("hour", this.start)
          .set("minute", 0);
        let dateEnd = moment(this.getFilterOrder.date)
          .set("hour", this.end)
          .set("minute", 0);

        // console.log("dateStart", dateStart);
        // console.log("dateEnd", dateEnd);

        timelineList = this.getMachineListByFilter.map((machine) => {
          let timelineItem = {
            ...machine,
            blocks: [],
          };

          timelineItem.blocks = this.getProcessListByFilter.reduce(
            (blockList, curProcess) => {
              if (curProcess.machineId === machine.id) {
                let gridCol = { x: 1, y: 2 };
                let gridRow = { x: 1, y: 2 };

                let blockStyleCustom = {
                  position: "relative",
                  left: "0px",
                };

                if (curProcess.endAt <= dateStart) {
                  gridCol.x = this.min;
                  gridCol.y = this.min;
                } else if (curProcess.startAt >= dateEnd) {
                  gridCol.x = this.max + 1;
                  gridCol.y = this.max + 1;
                } else if (
                  curProcess.startAt <= dateStart &&
                  curProcess.endAt >= dateEnd
                ) {
                  gridCol.x = this.min + 1;
                  gridCol.y = this.max + 1;
                } else if (
                  curProcess.startAt <= dateStart &&
                  curProcess.endAt < dateEnd
                ) {
                  gridCol.x = this.min + 1;
                  gridCol.y =
                    Math.floor(
                      curProcess.endAt.diff(dateStart, "minutes") / timePerBlock
                    ) + 1;

                  blockStyleCustom.width =
                    (curProcess.endAt.diff(dateStart, "minutes") /
                      timePerBlock) *
                      this.width +
                    "px";
                } else if (
                  curProcess.startAt > dateStart &&
                  curProcess.endAt < dateEnd
                ) {
                  let tempX =
                    curProcess.startAt.diff(dateStart, "minutes") /
                    timePerBlock;
                  gridCol.x = Math.floor(tempX) + 1;
                  gridCol.y =
                    Math.floor(
                      curProcess.endAt.diff(dateStart, "minutes") / timePerBlock
                    ) + 1;

                  blockStyleCustom.left =
                    (tempX - Math.floor(tempX)) * this.width + "px";
                  blockStyleCustom.width =
                    (curProcess.endAt.diff(curProcess.startAt, "minutes") /
                      timePerBlock) *
                      this.width +
                    "px";
                } else if (
                  curProcess.startAt > dateStart &&
                  curProcess.endAt >= dateEnd
                ) {
                  let tempX =
                    curProcess.startAt.diff(dateStart, "minutes") /
                    timePerBlock;
                  gridCol.x = Math.floor(tempX) + 1;
                  gridCol.y = this.max + 1;

                  blockStyleCustom.left =
                    (tempX - Math.floor(tempX)) * this.width + "px";
                  blockStyleCustom.width =
                    (dateEnd.diff(curProcess.startAt, "minutes") /
                      timePerBlock) *
                      this.width +
                    "px";
                }

                let blockItem = {
                  process: curProcess,
                  gridCol,
                  gridRow,
                  blockStyleCustom,
                };

                // console.log(blockItem);

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
      // console.log("getFilterOrder ", this.getFilterOrder);

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
