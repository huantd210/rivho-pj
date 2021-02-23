<template>
  <div class="gantt__machine-list">
    <item v-for="item in getMachineList" :key="item.id" :machine="item"></item>
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
  },
  computed: {
    ...mapGetters(["getMachineList"]),
  },
  created() {
    console.log(this.machines);
  },
};
</script>

<style scoped>
</style>
