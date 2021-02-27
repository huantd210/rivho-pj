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
    <main></main>
  </div>
</template>

<script>
import TopBar from "./components/TopBar/Main";
import Order from "./components/Order/Main";
import Gantt from "./components/Gantt/Main";

export default {
  name: "app",
  components: {
    TopBar,
    Order,
    Gantt,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
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
  grid-template-columns: 25% 75%;
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
</style>
