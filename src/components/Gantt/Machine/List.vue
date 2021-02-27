<template>
  <div
    :class="[
      getMachineList.length > 0
        ? 'gantt__machine-list'
        : 'gantt__machine-list--empty',
    ]"
  >
    <div v-if="getMachineList.length > 0" class="gantt__machine-list__wrapper">
      <item
        v-for="item in getMachineList"
        :key="item.id"
        :machine="item"
        :style="styleLabel"
      ></item>
    </div>
    <div v-else class="gantt__machine-list__wrapper--empty">
      <span>空の</span>
    </div>
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
    },
    styleLabel: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("machine", ["getMachineList"]),
  },
};
</script>

<style scoped>
.gantt__machine-list {
  width: 100%;
}

.gantt__machine-list--empty {
  width: 100%;
  height: 100%;
}

.gantt__machine-list__wrapper {
  width: 100%;
  height: 100%;
}

.gantt__machine-list__wrapper--empty {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  border-top: 1px solid #222f3e;
  border-left: 1px solid #222f3e;
  border-right: 1px solid #222f3e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gantt__machine-list__wrapper--empty:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
