<template>
  <div class="side-item">
    <h1>Item Side</h1>
  </div>
</template>

<script>
export default {
  name: "side-item",
  props: {
    describe: {
      type: Object,
      //   required: true,
    },
  },
};
</script>

<style scoped>
.side-item {
  background-color: yellow;
}
</style>
