<template>
  <div class="gantt">
    <div class="gantt__calendar">gantt__calendar</div>
    <div class="gantt__chart">
      <div class="gantt__chart__list">
        <machine-list></machine-list>
      </div>
      <div class="gantt__chart__timeline">gantt__chart__timeline</div>
    </div>
  </div>
</template>

<script>
import { MACHINE_GET_LIST } from "../../store/contants/actionTypes";
import MachineList from "./Machine/List";
import TimelineList from "./Timeline/List";

export default {
  name: "gantt",
  components: {
    MachineList,
  },
  async created() {
    try {
      await this.$store.dispatch(MACHINE_GET_LIST);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.gantt {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  background-color: #576574;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 38px auto;
}

.gantt__calendar {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.gantt__chart {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto;
}

.gantt__chart__list {
  grid-column: 1 / 2;
}

.gantt__chart__timeline {
  grid-column: 2 / 3;
  /* overflow-x: scroll; */
}
</style>
