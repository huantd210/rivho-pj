<template>
  <div class="gantt">
    <div
      id="calendar"
      ref="ganttCalendar"
      class="gantt__calendar"
      @scroll.passive="handleCalendarScroll"
    >
      <calendar-list
        :start="getTimelineStart"
        :end="getTimelineEnd"
        :unit="unit"
        :zoom="zoom"
        :styleCell="{ width: width + 'px' }"
      ></calendar-list>
    </div>
    <div id="chart-list" ref="ganttChartList" class="gantt__chart-list">
      <machine-list
        :styleLabel="{
          minHeight: height * 2 + 'px',
          height: height * 2 + 'px',
        }"
      ></machine-list>
    </div>
    <div
      id="chart-timeline"
      ref="ganttChartTimeline"
      class="gantt__chart-timeline"
      @scroll.passive="handleTimelineScroll"
    >
      <timeline-list
        :start="getTimelineStart"
        :end="getTimelineEnd"
        :unit="unit"
        :zoom="zoom"
        :styleCell="{ width: width + 'px', height: height + 'px' }"
        :styleBlock="{ height: height + 'px' }"
      ></timeline-list>
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
    ...mapGetters(["getTimelineStart", "getTimelineEnd"]),
  },
  methods: {
    handleTimelineScroll(event) {
      let elChartList = this.$refs.ganttChartList;
      elChartList.scrollTop = event.target.scrollTop;
    },
    handleCalendarScroll(event) {
      let elChartTimeline = this.$refs.ganttChartTimeline;
      elChartTimeline.scrollLeft = event.target.scrollLeft;
    },
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

.gantt__calendar {
  font-size: 12px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  overflow-x: scroll;
  overflow-y: hidden;
}

.gantt__chart-list {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow: hidden;
}

.gantt__chart-timeline {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  grid-row: 2 / 3;
}

/*  Scroll*/
#chart-timeline::-webkit-scrollbar {
  background: red;
  width: 12px;
}

/* Track Scroll*/
#chart-timeline::-webkit-scrollbar-track {
  background: #454e59;
}
/* Handle Scroll*/
#chart-timeline::-webkit-scrollbar-thumb {
  height: 150px;
  background: #8395a7;
}

#chart-timeline::-webkit-scrollbar-thumb:window-inactive {
  background: #8395a7;
}
</style>
