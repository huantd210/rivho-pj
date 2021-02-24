<template>
  <div class="gantt__timeline-item__grid" :style="gridStyle">
    <div
      v-for="index in cols"
      :key="'row-top-' + index"
      class="gantt__timeline-item__grid__cell--non"
      :style="blockGridPosition({ x: index, y: index + 1 }, { x: 1, y: 2 })"
    ></div>
    <div
      v-for="index in cols"
      :key="'row-bottom-' + index"
      class="gantt__timeline-item__grid__cell--non"
      :style="{
        ...blockGridPosition({ x: index, y: index + 1 }, { x: 2, y: 3 }),
        ...styleCell,
      }"
    ></div>

    <item-block
      v-for="item in timeline.blocks"
      :key="item.id"
      :block="item"
      class="gantt__timeline-item__grid__cell--has"
      :style="{
        ...blockGridPosition(item.gridCol, item.gridRow),
        ...styleBlock,
      }"
    ></item-block>
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
    cols: {
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
        gridTemplateColumns: `repeat(${this.cols}, ${this.styleCell.width})`,
        gridTemplateRows: `repeat(2, ${this.styleCell.height}`,
      };
    },
  },
  methods: {
    blockGridPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
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
  display: grid;
}

.gantt__timeline-item__grid__row-top {
  grid-row: 1 / 2;
}

.gantt__timeline-item__grid__row-bottom {
  grid-row: 2 / 3;
}

.gantt__timeline-item__grid__cell--non {
  border: 1px solid #98c6ff;
  background-color: #ffffff;
}

.gantt__timeline-item__grid__cell--has {
  border: 1px solid #98c6ff;
  z-index: 100px;
}
</style>
