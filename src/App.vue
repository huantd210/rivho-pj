<template>
  <div id="app">
    <header class="app__header">
      <top-bar></top-bar>
    </header>
    <main class="app__main">
      <div class="app__main__wrapper">
        <aside class="app__main__left">
          <order></order>
        </aside>
        <section class="app__main__right">
          <gantt></gantt>
        </section>
      </div>
    </main>
    <div class="app__dialog">
      <order-create></order-create>
      <order-edit></order-edit>
      <machine-create></machine-create>
      <machine-edit></machine-edit>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { WINDOW_RESIZE } from "./store/constants/actionTypes";
import TopBar from "./components/TopBar/Main";
import Order from "./components/Order/Main";
import Gantt from "./components/Gantt/Main";
import OrderCreate from "./components/Order/Create";
import OrderEdit from "./components/Order/Edit";
import MachineCreate from "./components/Gantt/Machine/Create";
import MachineEdit from "./components/Gantt/Machine/Edit";

export default {
  name: "app",
  components: {
    TopBar,
    Order,
    Gantt,
    OrderCreate,
    OrderEdit,
    MachineCreate,
    MachineEdit,
  },

  methods: {
    onResize() {
      console.log("B", window.innerWidth);

      this.$store.dispatch(WINDOW_RESIZE, {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
@font-face {
  font-family: "Yu Gothic";
  src: local("Yu Gothic"), url("/assets/fonts/yugothib.ttf") format("truetype");
}

* {
  margin: 0;
  padding: 0;
  font-family: "Yu Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  min-width: 1000px;
  text-align: center;
  font-size: 16px;
  background-color: #222f3e;
  color: #ffffff;
  display: grid;
  grid-template-rows: 60px minmax(90vh, auto);
}

.app__header {
  height: 100%;
  width: 100%;
  padding: 8px 12px;
  min-width: 1000px;
  grid-row: 1 / 2;
}

.app__main {
  min-width: 1000px;
  height: 100%;
  padding: 8px 12px;
  grid-row: 2 / 3;
}

.app__main__wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(200px, 20%) minmax(500px, 80%);
  grid-template-rows: 100%;
}

.app__main__left {
  margin-right: 10px;
  padding-top: 24px;
  padding-left: 8px;
  background-color: #576574;
  grid-column: 1 / 2;
}

.app__main__right {
  padding-left: 8px;
  padding-top: 1px;
  background-color: #576574;
  grid-column: 2 / 3;
}

.el-dialog__wrapper {
  margin: auto;
  width: 100%;
  overflow: hidden;
}

.app__dialog {
  width: 100%;
}

/* Scroll */
::-webkit-scrollbar {
  background: #454e59;
  width: 12px;
  height: 12px;
}

/* Track Scroll */
::-webkit-scrollbar-track {
  background: #454e59;
}
/* Handle Scroll */
::-webkit-scrollbar-thumb {
  height: 150px;
  background: #8395a7;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #8395a7;
}

/* Custom Style Theme */

/* Custom Style Element UI */
.el-input__inner,
.el-textarea__inner {
  --color: #01a3a4;
  background-color: #222f3e;
  color: var(--color);
  border: 1px solid var(--color);
  border-color: var(--color);
  border-bottom-width: 2px;
}

.el-input__inner > input,
.el-textarea__inner {
  outline: none;
}

.el-input__inner > input:focus,
.el-textarea__inner:focus {
  outline: none;
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #01a3a4;
}

.el-input__prefix,
.el-input__suffix {
  color: #01a3a4;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #01a3a4;
}

.el-select .el-input__inner:focus {
  border-color: #01a3a4;
}

.el-select-dropdown__item {
  color: #01a3a4;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #feca57;
}

.popper-for-input {
  --color: #01a3a4;
  background-color: #222f3e;
  color: var(--color);
  border: 1px solid var(--color);
  border-bottom-width: 2px;
}

.el-date-table td.current:not(.disabled) span {
  background-color: #feca57;
}

.el-date-table td.available:hover {
  color: #feca57;
}

.el-date-table td.today span {
  color: #feca57;
}

.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #01a3a4;
  opacity: 0.5;
}

.el-popover,
.el-picker-panel {
  background-color: #222f3e;
  border-color: #576574;
}

.el-popper[x-placement^="top"] .popper__arrow::after,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-top-color: #222f3e;
  border-bottom-color: #222f3e;
}

.el-picker-panel {
  border-color: #222f3e;
}

.el-picker-panel__footer {
  border-bottom-color: #222f3e;
  background-color: #222f3e;
}

.el-date-picker__time-header,
.el-date-picker__header,
.el-picker-panel__footer {
  border-color: #576574;
}

.el-dialog {
  --color: #01a3a4;
  background-color: #222f3e;
  color: var(--color);
}

.el-color-picker__trigger {
  --color: #01a3a4;
  border: 1px solid var(--color);
  border-color: var(--color);
  border-bottom-width: 2px;
}

.el-form-item__label {
  color: #01a3a4;
}

.el-date-table th {
  border-color: #576574;
}

@media screen and (max-width: 320px) {
  #app {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
}
</style>
