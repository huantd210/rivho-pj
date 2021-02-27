<template>
  <div
    class="order-item"
    :style="{ 'background-color': order.color || '#1dd1a1' }"
  >
    <div class="order-item__wrapper">
      <div class="order-item__describe">
        <span>{{ order.name }}</span>
        <span>{{ order.describe }}</span>
        <span>{{ order.startAt.format("YYYY-DD-MM HH:MM:SS") }}</span>
        <span>{{ order.endAt.format("YYYY-DD-MM HH:MM:SS") }}</span>
      </div>
      <div class="order-item__action">
        <el-button :style="{ padding: 0, 'background-color': 'transparent' }">
          <i class="el-icon-setting"></i>
        </el-button>
        <el-button :style="{ padding: 0, 'background-color': 'transparent' }">
          <i class="el-icon-s-fold"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button";

export default {
  name: "order-item",
  components: {
    "el-button": Button,
  },
  props: {
    order: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.order-item {
  padding-top: 2px;
  padding-left: 8px;
  padding-bottom: 2px;
  height: 90px;
  margin-bottom: 3px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  color: #000000;
}

.order-item__wrapper {
  height: 100%;
  width: 100%;
  border-bottom: 2px solid #b33939;
  display: flex;
}

.order-item__describe {
  text-align: left;
  flex-grow: 1;
}

.order-item__describe span {
  display: block;
}

.order-item__action {
  padding-left: 10px;
  background-color: #222f3e;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
