<template>
  <div
    class="gantt__timeline-item__block"
    :style="{ 'background-color': block.process.color, color: '#000000' }"
  >
    <el-popover
      placement="top"
      width="30"
      v-model="isVisiblePopover"
      popper-class="gantt__timeline-item__block__popover"
    >
      <div class="gantt__timeline-item__block__popover__body">
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

      <div class="gantt__timeline-item__block__trigger" slot="reference">
        <el-tooltip
          class="item"
          effect="light"
          content="Right Bottom prompts info"
          placement="right"
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
      </div>
    </el-popover>
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
      isVisiblePopover: false,
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

.gantt__timeline-item__block__popover__body {
  display: flex;
  justify-content: space-around;
}
</style>
