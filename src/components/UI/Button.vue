<template>
  <button
    :class="['btn', disabled ? 'btn--disabled' : '']"
    :style="customStyle"
    :disabled="disabled"
    @click="callback"
  >
    <slot></slot>
  </button>
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
  padding: 1px 24px;
  border: 1px solid var(--color);
  border-bottom-width: 2px;
  color: var(--color);
  background-color: #222f3e;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  --color: #01a3a4;
}

.btn:hover {
  opacity: 0.8;
}

.btn:focus {
  outline: none;
}

.btn--disabled {
  cursor: not-allowed;
}
</style>
