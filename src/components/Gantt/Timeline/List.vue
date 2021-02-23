<template>
  <div class="gantt__timeline-list"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "gantt-machine-list",
  components: {},
  computed: {
    ...mapGetters(["getMachineList", "getOrderList"]),
    getTimelineList() {
      let arrMachine = this.getMachineList;
      let arrOrder = this.getOrderList;

      let arrResult = arrMachine.map((machine) => {
        let arrTimeline = arrOrder.filter(
          (order) => order.machine_code === machine.code
        );
        return {
          id: machine.id,
          code: machine.code,
          timeline: arrTimeline,
        };
      });

      return arrResult;
    },
  },
  created() {
    console.log(this.getTimelineList);
  },
};
</script>

<style scoped>
</style>
