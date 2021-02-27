<template>
  <div class="gantt__machine-item">
    <div class="gantt__machine-item__wrapper">
      <div class="gantt__machine-item__left">
        <div class="gantt__machine-item__left__label">
          <span>{{ machine.code }}</span>
        </div>
        <div class="gantt__machine-item__left__action">
          <el-button :style="{ padding: 0, 'background-color': 'transparent' }">
            <i class="el-icon-video-play"></i>
          </el-button>
        </div>
        <div class="gantt__machine-item__left__describe"></div>
      </div>
      <div class="gantt__machine-item__right">
        <span>{{ machine.name }}</span>
        <span>{{ machine.describe }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../UI/Button";

export default {
  name: "gantt-machine-item",
  components: {
    "el-button": Button,
  },
  props: {
    machine: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.gantt__machine-item {
  padding-top: 1px;
  padding-left: 8px;
  padding-bottom: 1px;
  margin-bottom: 1px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: #218c74;
}

.gantt__machine-item__wrapper {
  height: 100%;
  width: 100%;
  background-color: #222f3e;
  display: flex;
}

.gantt__machine-item__left {
  width: 45%;
}

.gantt__machine-item__left__label {
  text-align: start;
  background-color: #218c74;
}

.gantt__machine-item__left__action {
  margin-top: 3px;
  margin-bottom: 15px;
}

.gantt__machine-item__left__action,
.gantt__machine-item__left__describe {
  text-align: start;
  padding-left: 6px;
}

.gantt__machine-item__right {
  width: 55%;
  text-align: left;
}

.gantt__machine-item__right span {
  display: block;
}
</style>
