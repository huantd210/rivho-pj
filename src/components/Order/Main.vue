<template>
  <div class="order">
    <order-search></order-search>
    <order-list></order-list>
  </div>
</template>

<script>
import { ORDER_GET_LIST } from "../../store/contants/actionTypes";
import OrderSearch from "../Order/Search";
import OrderList from "../Order/List";

export default {
  name: "el-sidebar",
  components: {
    OrderSearch,
    OrderList,
  },
  async created() {
    try {
      await this.$store.dispatch(ORDER_GET_LIST);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.order {
  width: 100%;
  height: 100%;
  padding-top: 12px;
  padding-left: 8px;
  border-top-left-radius: 8px;
  background-color: #576574;
  display: flex;
  flex-direction: column;
}
</style>
