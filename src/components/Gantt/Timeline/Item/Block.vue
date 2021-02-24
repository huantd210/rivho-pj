<template>
  <div
    class="gantt__timeline-item__block"
    :style="{ 'background-color': block.color, color: '#000000' }"
  >
    <span>{{ block.name }}</span>
  </div>
</template>

<script>
export default {
  name: "gantt-machine-item-block",
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.gantt__timeline-item__block {
  overflow: hidden;
}
</style>
