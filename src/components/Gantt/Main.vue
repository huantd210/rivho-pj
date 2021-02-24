<template>
  <div class="gantt">
    <div class="gantt__calendar">
      <calendar-list
        :start="this.getMinTimeStart"
        :end="getMaxTimeEnd"
        :unit="unit"
        :zoom="zoom"
      ></calendar-list>
    </div>
    <div class="gantt__chart-list">
      <machine-list></machine-list>
    </div>
    <div class="gantt__chart-timeline">
      <timeline-list
        :start="this.getMinTimeStart"
        :end="getMaxTimeEnd"
        :unit="unit"
        :zoom="zoom"
      ></timeline-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
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
    ...mapGetters([
      "getMachineList",
      "getOrderList",
      "getMaxTimeEnd",
      "getMinTimeStart",
    ]),
    getTimelineList() {
      let arrMachine = this.getMachineList;
      let arrOrder = this.getOrderList;
      let arrResult = [];

      if (arrMachine.length > 0 && arrOrder.length > 0) {
        arrResult = arrMachine.map((machine) => {
          let arrTimeline = arrOrder.filter(
            (order) => order.machine_code === machine.code
          );
          return {
            id: machine.id,
            code: machine.code,
            timeline: arrTimeline,
          };
        });
      }
      return arrResult;
    },
  },
  data() {
    return {
      unit: "days",
      zoom: "months",
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
  overflow: scroll;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 60px auto;
}

.gantt__calendar {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.gantt__chart-list {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.gantt__chart-timeline {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
</style>
