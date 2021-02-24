<template>
  <div class="gantt__calendar-item__block">
    <span>{{ block.name }}</span>
  </div>
</template>

<script>
export default {
  name: "gantt-calendar-item-block",
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.gantt__calendar-item__block {
  height: 100%;
}

.gantt__calendar-item__block span {
  font-size: 14px;
}

.gantt__calendar-item__block {
  overflow: hidden;
}
</style>
