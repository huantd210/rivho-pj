<template>
  <div class="gantt">
    <div
      id="calendar"
      ref="ganttCalendar"
      class="gantt__calendar"
      @scroll.passive="handleCalendarScroll"
    >
      <calendar-list
        :start="start"
        :end="end"
        :min="start"
        :max="end"
        :slice="slice"
        :width="width"
        :height="height"
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
      <div class="gantt__chart-list__virtual-scroll"></div>
    </div>
    <div
      id="chart-timeline"
      ref="ganttChartTimeline"
      class="gantt__chart-timeline"
      @scroll.passive="handleTimelineScroll"
    >
      <timeline-list
        :start="start"
        :end="end"
        :min="0"
        :max="(this.end - this.start) * this.slice"
        :width="width"
        :height="height"
        :styleCell="{ width: width + 'px', height: height + 'px' }"
        :styleBlock="{ height: height + 'px' }"
      ></timeline-list>
    </div>
  </div>
</template>

<script>
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
  methods: {
    handleTimelineScroll(event) {
      let elChartList = this.$refs.ganttChartList;
      let elGanttCalendar = this.$refs.ganttCalendar;
      elChartList.scrollTop = event.target.scrollTop;
      elGanttCalendar.scrollLeft = event.target.scrollLeft;
    },
    handleCalendarScroll(event) {
      let elChartTimeline = this.$refs.ganttChartTimeline;
      let elGanttCalendar = this.$refs.ganttCalendar;
      elChartTimeline.scrollLeft = event.target.scrollLeft;
    },
  },
  data() {
    return {
      start: 9, // start at 9 AM
      end: 21, // end at 9 PM
      slice: 4, // slice 1/4 hour
      width: 30,
      height: 45,
    };
  },
  async created() {
    try {
      await this.$store.dispatch(`machine/${MACHINE_GET_LIST}`);
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
  overflow: hidden;
}

.gantt__chart-list {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow: hidden;
}

.gantt__chart-timeline {
  width: 100%;
  height: 100%;
  overflow: scroll;
  grid-row: 2 / 3;
}

.gantt__chart-list__virtual-scroll {
  height: 12px;
  background-color: #576574;
}

/*  Scroll*/
#chart-timeline::-webkit-scrollbar {
  background: red;
  width: 12px;
  height: 12px;
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
