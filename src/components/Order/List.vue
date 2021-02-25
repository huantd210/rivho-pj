<template>
  <div class="order-list">
    <order-item
      v-for="item in getOrderList"
      :key="item.id"
      :order="item"
    ></order-item>
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
    "el-button": Button,
  },
  computed: {
    ...mapGetters("order", ["getOrderList"]),
  },
};
</script>

<style scoped>
.order-list {
  overflow-y: scroll;
  flex-grow: 1;
}
</style>
