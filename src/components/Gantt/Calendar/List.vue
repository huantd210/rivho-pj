<template>
  <div class="gantt__calendar" :blocks="getBlocks"></div>
</template>

<script>
import moment from "moment";

export default {
  name: "gantt-calendar",
  props: {
    start: {
      type: Object,
    },
    end: {
      type: Object,
    },
    unit: {
      type: String,
      default: "days",
    },
    zoom: {
      type: String,
      default: "months",
    },
  },
  computed: {
    getBlocks() {
      let numBlocks = 1;
      let blocks = [];
      let startOf = moment(this.start).startOf(this.zoom.slice(0, -1)); // around time
      let endOf = moment(this.end).endOf(this.zoom.slice(0, -1)); // around time
      let diffZoom = endOf.diff(startOf, this.zoom);

      if (this.end > this.start) {
        numBlocks = diffZoom + 1;
      }

      if (this.zoom == "months") {
        moment().startOf("day");
      }

      for (let i = 0; i < numBlocks; i++) {
        let temp = startOf.add(i, this.zoom);
        let cols = 0;
        let block = {
          id: "calendar-item-block-" + i,
        };

        if (numBlocks === 1) {
          cols = this.end.diff(this.start, this.unit);
        } else {
          if (this.zoom == "months") {
            if (i === 0) {
              cols =
                moment(temp).daysInMonth() -
                startOf.diff(this.start, this.zoom);
            } else if (i === numBlocks - 1) {
              cols =
                moment(temp).daysInMonth() - endOf.diff(this.end, this.zoom);
            }
          }
        }

        block.cols = cols;
        blocks.push(block);
      }

      console.log("Blocks ", blocks);

      return blocks;
    },
  },
};
</script>

<style scoped>
</style>
