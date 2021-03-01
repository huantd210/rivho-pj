<template>
  <el-button
    :class="['btn', disabled ? 'btn--disabled' : '']"
    :style="customStyle"
    :disabled="disabled"
    @click="callback"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "el-header",
  props: {
    customStyle: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    callback: function (event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
  padding: 6px 12px;
  border: 1px solid var(--color);
  border-bottom-width: 2px;
  color: var(--color);
  background-color: #222f3e;
  border-radius: 4px;
  cursor: pointer;
  --color: #01a3a4;
}

.btn:hover {
  --color: #ffffff;
  background-color: #feca57;
}

.btn:focus {
  outline: none;
}

.btn--disabled {
  cursor: not-allowed;
}
</style>
