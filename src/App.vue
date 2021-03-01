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
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  text-align: center;
  font-size: 16px;
  background-color: #222f3e;
  color: #ffffff;
}

.app__header {
  padding: 8px 12px;
}

.app__main {
  height: 90vh;
  width: 100vw;
  padding: 8px 12px;
}

.app__main__wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
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
}

.el-popper[x-placement^="top"] .popper__arrow::after,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-top-color: #222f3e;
  border-bottom-color: #222f3e;
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
</style>
