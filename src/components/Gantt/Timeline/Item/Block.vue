<template>
  <div
    class="gantt__timeline-item__block"
    :style="{ 'background-color': block.process.color, color: '#000000' }"
    @contextmenu.prevent="handleOpenActionProcess"
  >
    <el-tooltip
      :disabled="!isVisibleDescribe"
      placement="right"
      popper-class="gantt__timeline-item__block__tooltip-process"
    >
      <div slot="content">
        {{ block.process.name }} <br />
        ファイル区分: {{ block.process.fileField }} <br />
        数量: {{ block.process.quantity.toLocaleString("ja-JP") }}
      </div>

      <div class="gantt__timeline-item__block__describe">
        <span>
          {{ block.process.name }}
        </span>
        <span> ファイル区分: {{ block.process.fileField }} </span>
        <span>
          数量: {{ block.process.quantity.toLocaleString("ja-JP") }}
        </span>
      </div>
    </el-tooltip>

    <div
      v-show="isVisibleAction"
      ref="popoverProcess"
      @blur="handleCloseActionProcess"
      tabindex="-1"
      class="gantt__timeline-item__block__popover-process"
      :style="{
        top: popoverProcess.top + 'px',
        left: popoverProcess.left + 'px',
      }"
    >
      <el-button-custom :style="{ padding: '2px' }" @click="handleEditOrder">
        <i class="el-icon-setting"></i>
      </el-button-custom>

      <el-popconfirm
        title="Are you sure to delete this?"
        @confirm="handleDeleteProcess"
      >
        <el-button-custom slot="reference" :style="{ padding: '2px' }">
          <i class="el-icon-delete"></i>
        </el-button-custom>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import {
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_DELETE_PROCESS,
} from "../../../../store/constants/actionTypes";
import Button from "../../../UI/Button";

export default {
  name: "gantt-machine-item-block",
  components: {
    "el-button-custom": Button,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisibleAction: false,
      isVisibleDescribe: true,
      popoverProcess: {
        top: 0,
        left: 0,
      },
    };
  },
  methods: {
    handleEditOrder() {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_EDIT}`, {
        isVisibleDialog: true,
        order: this.block.process,
      });
    },
    handleDeleteProcess() {
      this.$store.dispatch(`order/${ORDER_DELETE_PROCESS}`, {
        orderId: this.block.process.orderId,
        processId: this.block.process.id,
      });
    },
    handleOpenActionProcess(event) {
      this.isVisibleAction = true;
      this.isVisibleDescribe = false;

      this.$nextTick(() => {
        this.$refs.popoverProcess.focus();
      });

      this.popoverProcess.left = event.clientX;
      this.popoverProcess.top = event.clientY;
    },
    handleCloseActionProcess() {
      this.isVisibleAction = false;
      this.isVisibleDescribe = true;
    },
  },
};
</script>

<style scoped>
.gantt__timeline-item__block {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gantt__timeline-item__block__trigger {
  width: 100%;
  height: 100%;
}

.gantt__timeline-item__block__describe {
  width: 100%;
  height: 100%;
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  white-space: nowrap;
}

.gantt__timeline-item__block__describe span {
  outline: none;
  width: 100%;
  text-align: left;
  overflow: hidden;
}

.gantt__timeline-item__block__tooltip-process {
  color: red;
}

.gantt__timeline-item__block__popover-process {
  width: 80px;
  padding: 6px 12px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222f3e;
}

.gantt__timeline-item__block__popover-process:focus {
  border: none;
  outline: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}
</style>
