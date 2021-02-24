<template>
  <div class="gantt__machine-list">
    <item
      v-for="item in getMachineList"
      :key="item.id"
      :machine="item"
      :style="styleLabel"
    ></item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Item from "./Item";

export default {
  name: "gantt-machine-list",
  components: {
    Item,
  },
  props: {
    machines: {
      type: Array,
      default: function () {
        return [];
      },
    },
    styleLabel: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getMachineList"]),
  },
};
</script>

<style scoped>
</style>
