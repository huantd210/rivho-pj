<template>
  <div class="gantt__timeline-list">
    <item-grid
      v-for="item in getTimelineList"
      :key="item.id"
      :timeline="item"
      :cols="getColsTimeline"
      :styleCell="styleCell"
      :styleBlock="styleBlock"
    ></item-grid>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ItemGrid from "./Item/Grid";

export default {
  name: "gantt-machine-list",
  components: {
    ItemGrid,
  },
  props: {
    start: {
      required: true,
    },
    end: {
      required: true,
    },
    unit: {
      type: String,
      default: "days",
    },
    zoom: {
      type: String,
      default: "months",
    },
    styleCell: {
      type: Object,
    },
    styleBlock: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getMachineList", "getOrderList", "getTimelineList"]),
    getColsTimeline() {
      let start = moment(this.start);
      let end = moment(this.end);
      if (start && end) {
        return end.diff(start, this.unit) + 1;
      }

      return 0;
    },
  },
};
</script>

<style scoped>
</style>
