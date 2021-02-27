<template>
  <div class="gantt__timeline-item__grid">
    <div
      v-if="timeline"
      class="gantt__timeline-item__grid__wrapper"
      :style="gridStyle"
    >
      <div
        v-for="index in columns"
        :key="'row-top-' + index"
        class="gantt__timeline-item__grid__cell--non cell-has-border-bottom"
        :style="{
          ...getBlockGridPosition({ x: index, y: index + 1 }, { x: 1, y: 2 }),
          ...styleCell,
        }"
      ></div>

      <div
        v-for="index in columns"
        :key="'row-bottom-' + index"
        class="gantt__timeline-item__grid__cell--non"
        :style="{
          ...getBlockGridPosition({ x: index, y: index + 1 }, { x: 2, y: 3 }),
          ...styleCell,
        }"
      ></div>

      <item-block
        v-for="item in timeline.blocks"
        :key="item.id"
        :block="item"
        class="gantt__timeline-item__grid__cell--has-data"
        :style="{
          ...styleBlock,
          ...getBlockGridPosition(item.gridCol, item.gridRow),
          ...item.blockStyleCustom,
        }"
      ></item-block>
    </div>
    <div v-else class="gantt__timeline-item__grid__wrapper" :style="gridStyle">
      <div
        v-for="index in columns"
        :key="'row-top-' + index"
        class="gantt__timeline-item__grid__cell--non cell-has-border-bottom"
        :style="{
          ...getBlockGridPosition({ x: index, y: index + 1 }, { x: 1, y: 2 }),
          ...styleCell,
        }"
      ></div>

      <div
        v-for="index in columns"
        :key="'row-bottom-' + index"
        class="gantt__timeline-item__grid__cell--non"
        :style="{
          ...getBlockGridPosition({ x: index, y: index + 1 }, { x: 2, y: 3 }),
          ...styleCell,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import ItemBlock from "./Block";

export default {
  name: "gantt-machine-item-grid",
  components: {
    ItemBlock,
  },
  props: {
    timeline: {
      type: Object,
    },
    columns: {
      type: Number,
      default: 0,
    },
    styleCell: {
      type: Object,
    },
    styleBlock: {
      type: Object,
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.columns}, ${this.styleCell.width})`,
        gridTemplateRows: `repeat(2, ${this.styleCell.height}`,
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
.gantt__timeline-item__grid {
  margin-bottom: 1px;
  width: 100%;
  height: 100%;
  border-left: 1px solid #222f3e;
}

.gantt__timeline-item__grid__wrapper {
  width: 100%;
  height: 100%;
  display: grid;
}

.gantt__timeline-item__grid__row-top {
  grid-row: 1 / 2;
}

.gantt__timeline-item__grid__row-bottom {
  grid-row: 2 / 3;
}

.gantt__timeline-item__grid__cell--non {
  border-right: 1px solid #98c6ff;
  background-color: #ffffff;
}

.gantt__timeline-item__grid__cell--has-data {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 100;
}

.gantt__timeline-item__grid__cell--has-data:hover {
  border: 1px solid #222f3e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 999;
}

.cell-has-border-bottom {
  border-bottom: 1px solid #98c6ff;
}
</style>
