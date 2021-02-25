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
    styleCell: {
      type: Object,
    },
  },
  computed: {
    getCalendarList() {
      let calendarList = [];
      let calendarBlocksItem = [];

      for (let i = 0; i < this.slice; i++) {
        calendarBlocksItem.push(`${60 / (this.slice - i)}`);
      }

      for (let i = this.min; i <= this.max; i++) {
        let calendarItem = {
          id: "calendar-item-" + i,
          time: i,
          blocks: calendarBlocksItem,
        };

        calendarList.push(calendarItem);
      }
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
