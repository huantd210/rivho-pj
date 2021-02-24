<template>
  <div class="gantt">
    <div class="gantt__chart-list">
      <machine-list
        :styleLabel="{
          minHeight: height * 2 + 'px',
          height: height * 2 + 'px',
        }"
      ></machine-list>
    </div>
    <div class="gantt__wrapper">
      <div class="gantt__calendar">
        <calendar-list
          :start="getMinTimeStart"
          :end="getMaxTimeEnd"
          :unit="unit"
          :zoom="zoom"
          :styleCell="{ width: width + 'px' }"
        ></calendar-list>
      </div>

      <div class="gantt__chart-timeline">
        <timeline-list
          :start="getMinTimeStart"
          :end="getMaxTimeEnd"
          :unit="unit"
          :zoom="zoom"
          :styleCell="{ width: width + 'px', height: height + 'px' }"
          :styleBlock="{ height: height + 'px' }"
        ></timeline-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MACHINE_GET_LIST } from "../../store/contants/actionTypes";
import TimelineList from "./Timeline/List";
import CalendarList from "./Calendar/List";
import MachineList from "./Machine/List";

export default {
  name: "gantt",
  components: {
    TimelineList,
    CalendarList,
    MachineList,
  },
  computed: {
    ...mapGetters(["getMinTimeStart", "getMaxTimeEnd"]),
  },
  data() {
    return {
      unit: "days",
      zoom: "months",
      width: 30,
      height: 45,
    };
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
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 60px auto;
}

.gantt__wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  display: grid;
  grid-template-rows: 60px auto;
}

.gantt__calendar {
  font-size: 12px;
  grid-row: 1 / 2;
}

.gantt__chart-list {
  height: 100%;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.gantt__chart-timeline {
  grid-row: 2 / 3;
  /* overflow-y: scroll; */
}
</style>
