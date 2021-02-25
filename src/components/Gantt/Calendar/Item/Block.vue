<template>
  <div class="gantt__calendar-item__block">
    <span>{{ block }}</span>
  </div>
</template>

<script>
export default {
  name: "gantt-calendar-item-block",
  props: {
    block: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.gantt__calendar-item__block {
  height: 100%;
  border-left: 1px solid #222f3e;
  border-top: 1px solid #222f3e;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gantt__calendar-item__block:nth-child(1) {
  border-left-width: 0;
}

.gantt__calendar-item__block span {
  font-size: 12px;
}

.gantt__calendar-item__block {
  overflow: hidden;
}
</style>
