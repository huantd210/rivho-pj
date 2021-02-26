<template>
  <div class="gantt__calendar-list" :style="gridListStyle">
    <item-grid
      v-for="(item, index) in getCalendarList"
      :key="item.id"
      :calendar="item"
      :styleCell="styleCell"
      :styleGrid="gridStyle(index)"
    ></item-grid>
    <div
      class="gantt__calendar-list__virtual-scroll"
      :style="gridVirtualScrollStyle"
    ></div>
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
      default: 45,
    },
    styleCell: {
      type: Object,
    },
  },
  computed: {
    getCalendarList() {
      let calendarList = [];
      let calendarBlocksItem = [];

      for (let i = 0; i < this.slice; i++) {
        calendarBlocksItem.push(`${(60 / this.slice) * (i + 1)}`);
      }

      for (let i = this.min; i < this.max; i++) {
        let calendarItem = {
          id: "calendar-item-" + i,
          time: i,
          blocks: calendarBlocksItem,
        };

        calendarList.push(calendarItem);
      }
      return calendarList;
    },
    gridListStyle() {
      return {
        gridTemplateColumns: `repeat(
          ${this.end - this.start},
          ${this.width * this.slice + "px"}
        ) 14px`,
      };
    },
    gridVirtualScrollStyle() {
      return {
        gridColumnStart: this.end - this.start + 1,
        gridColumnEnd: this.end - this.start + 2,
      };
    },
  },
  methods: {
    gridStyle(index) {
      return {
        gridColumns: index + 1 + "/" + index + 2,
      };
    },
  },
};
</script>

<style scoped>
.gantt__calendar-list {
  height: 100%;
  width: 100%;
  display: grid;
}

.gantt__calendar-list__virtual-scroll {
  background-color: #222f3e;
}
</style>
