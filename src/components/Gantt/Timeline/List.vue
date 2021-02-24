<template>
  <div class="gantt__timeline-list">Timeline</div>
</template>

<script>
export default {
  name: "gantt-machine-list",
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
};
</script>

<style scoped>
</style>
