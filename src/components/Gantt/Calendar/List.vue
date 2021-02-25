<template>
  <div class="gantt__calendar-list">
    <item-grid
      v-for="item in getCalendarList"
      :key="item.id"
      :calendar="item"
      :styleCell="styleCell"
    ></item-grid>
  </div>
</template>

<script>
import moment from "moment";
import ItemGrid from "./Item/Grid";

export default {
  name: "gantt-calendar-list",
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
  },
  computed: {
    getCalendarList() {
      let calendarList = [];
      let numItem = 1;

      if (!this.start || !this.end) {
        return calendarList;
      }

      // around time start & time end
      let startOf = moment(this.start).startOf(this.zoom.slice(0, -1));
      let endOf = moment(this.end).endOf(this.zoom.slice(0, -1));
      numItem = endOf.diff(startOf, this.zoom) + 1;

      console.log("--> start: ", moment(this.start).format("YYYY-MM-DD"));
      console.log("--> end: ", moment(this.end).format("YYYY-MM-DD"));
      console.log("--> startOf: ", moment(startOf).format("YYYY-MM-DD"));
      console.log("--> endOf: ", moment(endOf).format("YYYY-MM-DD"));
      console.log("--> columns: ", this.end.diff(this.start, this.unit) + 1);

      for (let i = 0; i < numItem; i++) {
        let startOfNext = moment(startOf).add(i, this.zoom); // start time of next calendar
        let startCol = 0;
        let endCol = 0;
        let calendarItem = {
          id: "calendar-item-" + i,
          blocks: [],
          time: moment(startOfNext).format("YYYY/MM"),
        };

        if (numItem === 1) {
          startCol = moment(this.start).get("date");
          endCol = this.end.diff(this.start, this.unit);
        } else {
          if (i === 0) {
            let diffStart = startOf.diff(this.start, this.zoom); // diff start with around start
            calendarItem.time = diffStart === 0 ? calendarItem.time : "";
            startCol = moment(this.start).get("date");
            endCol = moment(startOfNext).daysInMonth() - diffStart;
          } else if (i === numItem - 1) {
            startCol = 1;
            endCol = moment(this.end).get("date");
          } else {
            startCol = 1;
            endCol = moment(startOfNext).daysInMonth();
          }
        }

        for (let j = startCol; j < endCol + 1; j++) {
          let col = {
            id: "col-" + j,
            name: j,
          };
          calendarItem.blocks.push(col);
        }

        calendarList.push(calendarItem);
      }

      // console.log(calendarList);

      return calendarList;
    },
  },
};
</script>

<style scoped>
.gantt__calendar-list {
  height: 100%;
  display: flex;
}
</style>
