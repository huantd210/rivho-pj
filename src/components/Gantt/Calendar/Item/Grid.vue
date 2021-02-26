<template>
  <div class="gantt__calendar-item__grid" :style="styleGrid">
    <div class="gantt__calendar-item__grid__wrapper">
      <div class="gantt__calendar-item__grid__top">
        <span>{{ calendar.time }}時 </span>
      </div>
      <div class="gantt__calendar-item__grid__bottom" :style="gridStyle">
        <item-block
          v-for="(item, index) in calendar.blocks"
          :key="item.id"
          :block="item"
          :style="
            getBlockGridPosition({ x: index + 1, y: index + 2 }, { x: 1, y: 2 })
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
    styleGrid: {
      type: Object,
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.calendar.blocks.length})`,
      };
    },
  },
  methods: {
    getBlockGridPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
      return {
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
  background-color: #feca57;
  border-left: 1px solid #222f3e;
  border-bottom: 1px solid #222f3e;
  display: grid;
  grid-auto-rows: 50% 50%;
}

.gantt__calendar-item__grid__top {
  text-align: center;
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gantt__calendar-item__grid__top span {
  font-size: 14px;
}

.gantt__calendar-item__grid__bottom {
  grid-row: 2 / 3;
  display: grid;
}
</style>
