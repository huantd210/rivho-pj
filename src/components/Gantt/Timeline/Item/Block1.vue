<template>
  <div
    class="gantt__timeline-item__block"
    :style="{ 'background-color': block.order.color, color: '#000000' }"
    @contextmenu="handleOpenPopover"
  >
    <span>
      {{ block.order.name }}
    </span>

    <div
      v-if="isVisiblePopover"
      tabindex="-1"
      ref="timelineBlockPopover"
      class="gantt__timeline-item__block__popover"
    >
      Handle right
    </div>
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
      popover: {
        top: "0px",
        left: "0px",
      },
    };
  },
  methods: {
    handleEditOrder() {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_EDIT}`, {
        isVisibleDialog: false,
        order: this.block.order,
      });
    },
    handleDeleteOrder() {
      this.$store.dispatch(`order/${ORDER_DELETE_ORDER}`, {
        orderId: this.block.order.id,
      });
    },
    handleOpenPopover(event) {
      this.isVisiblePopover = true;
      this.$nextTick(() => {
        this.$refs.timelineBlockPopover.focus();
        // this.setMenu(e.y, e.x);
      });
      event.preventDefault();
    },
    handleClosePopover() {
      this.isVisiblePopover = false;
    },
    setPositionPopover(top, left) {},
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

.gantt__timeline-item__block__popover {
  width: 50px;
  height: 30px;
  background-color: #ffffff;
  z-index: 9999;
  position: absolute;
}
</style>
