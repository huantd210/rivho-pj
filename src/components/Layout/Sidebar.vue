<template>
  <div class="sidebar">
    <side-list></side-list>
  </div>
</template>

<script>
import SideList from "../ListSide/List";

export default {
  name: "el-sidebar",
  components: {
    SideList,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  background-color: #576574;
}
</style>
