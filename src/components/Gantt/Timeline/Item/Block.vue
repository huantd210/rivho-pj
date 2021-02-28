<template>
  <div
    class="gantt__timeline-item__block"
    :style="{ 'background-color': block.order.color, color: '#000000' }"
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
          @confirm="handleDeleteOrder"
        >
          <el-button-custom slot="reference" :style="{ padding: '2px' }">
            <i class="el-icon-delete"></i>
          </el-button-custom>
        </el-popconfirm>
      </div>

      <div class="gantt__timeline-item__block__trigger" slot="reference">
        <span>
          {{ block.order.name }}
        </span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_DELETE_ORDER,
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
        order: this.block.order,
      });
    },
    handleDeleteOrder() {
      this.$store.dispatch(`order/${ORDER_DELETE_ORDER}`, {
        orderId: this.block.order.id,
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

.gantt__timeline-item__block__trigger span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}

.gantt__timeline-item__block__popover__body {
  display: flex;
  justify-content: space-around;
}
</style>
