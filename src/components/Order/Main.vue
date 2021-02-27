<template>
  <div class="order">
    <order-search></order-search>
    <order-list></order-list>
    <order-create></order-create>
    <order-edit></order-edit>
  </div>
</template>

<script>
import OrderSearch from "./Search";
import OrderList from "./List";
import OrderCreate from "./Create";
import OrderEdit from "./Edit";

export default {
  name: "el-sidebar",
  components: {
    OrderSearch,
    OrderList,
    OrderCreate,
    OrderEdit,
  },
};
</script>

<style scoped>
.order {
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  display: flex;
  flex-direction: column;
}
</style>
