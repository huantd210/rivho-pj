<template>
  <div class="gantt__machine-item">
    <div class="gantt__machine-item__wrapper">
      <div class="gantt__machine-item__left">
        <div class="gantt__machine-item__left__label">
          <span>{{ machine.id }}</span>
        </div>
        <div class="gantt__machine-item__left__action">
          <el-button-custom
            :style="{ padding: '2px', marginTop: '2px' }"
            @click="handleEditMachine"
          >
            <i class="el-icon-setting"></i>
          </el-button-custom>
        </div>
        <div class="gantt__machine-item__left__describe"></div>
      </div>
      <!-- <div class="gantt__machine-item__right">
        <span>{{ machine.name }}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  MACHINE_CHANGE_VISIBLE_EDIT,
  MACHINE_DELETE_MACHINE,
} from "../../../store/constants/actionTypes";
import Button from "../../UI/Button";

export default {
  name: "gantt-machine-item",
  components: {
    "el-button-custom": Button,
  },
  props: {
    machine: {
      type: Object,
    },
  },
  methods: {
    handleEditMachine() {
      this.$store.dispatch(`machine/${MACHINE_CHANGE_VISIBLE_EDIT}`, {
        machine: this.machine,
        isVisibleDialog: true,
      });
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
  padding-top: 30px;
  padding-left: 6px;
}

.gantt__machine-item__right {
  width: 55%;
  text-align: left;
}

.gantt__machine-item__right span {
  padding-left: 6px;
  font-size: 14px;
  display: block;
}
</style>
