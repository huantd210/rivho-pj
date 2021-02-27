<template>
  <div class="order-list">
    <div v-if="getOrderList.length > 0" class="order-list__wrapper">
      <order-item
        v-for="item in getOrderList"
        :key="item.id"
        :order="item"
      ></order-item>
    </div>
    <div v-else class="order-list__wrapper--empty">空の</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../UI/Button";
import OrderItem from "./Item";

export default {
  name: "order-list",
  components: {
    OrderItem,
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters("order", ["getOrderList"]),
  },
};
</script>

<style scoped>
.order-list {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow-y: scroll;
}

.order-list__wrapper {
  width: 100%;
  height: 100%;
}

.order-list__wrapper--empty {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  border-top: 1px solid #222f3e;
  border-left: 1px solid #222f3e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.order-list__wrapper--empty:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.order-list__virtual-scroll {
  height: 14px;
  background-color: #576574;
}
</style>
