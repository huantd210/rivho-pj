<template>
  <div class="gantt__calendar-item__grid">
    <div class="gantt__calendar-item__grid__wrapper">
      <div class="gantt__calendar-item__grid__top">
        <span>{{ calendar.time }}</span>
      </div>
      <div class="gantt__calendar-item__grid__bottom" :style="gridStyle">
        <item-block
          v-for="(item, index) in calendar.blocks"
          :key="item.id"
          :block="item"
          :style="
            blockGridPosition({ x: index + 1, y: index + 2 }, { x: 1, y: 2 })
          "
        >
        </item-block>
      </div>
    </div>
  </div>
</template>

<script>
import ItemBlock from "./Block";

export default {
  name: "gantt-calendar-item-grid",
  components: {
    ItemBlock,
  },
  props: {
    calendar: {
      type: Object,
      required: true,
    },
    styleCell: {
      type: Object,
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.calendar.cols}, ${this.styleCell.width})`,
      };
    },
  },
  methods: {
    blockGridPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
      return {
        ...this.styleCell,
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
      };
    },
  },
};
</script>

<style scoped>
.gantt__calendar-item__grid {
  height: 100%;
}

.gantt__calendar-item__grid__wrapper {
  height: 100%;
}

.gantt__calendar-item__grid__top {
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: left;
}

.gantt__calendar-item__grid__bottom {
  display: grid;
}
</style>
