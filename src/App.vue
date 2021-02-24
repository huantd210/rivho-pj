<template>
  <div id="app">
    <header class="app__header">
      <el-header></el-header>
    </header>
    <main class="app__main">
      <aside class="app__main__left">
        <order></order>
      </aside>
      <section class="app__main__right">
        <gantt></gantt>
      </section>
    </main>
    <main></main>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faListAlt,
  faPencilAlt,
  faPlayCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import Order from "./components/Order/Main";
import Gantt from "./components/Gantt/Main";

library.add(faCog, faListAlt, faPlayCircle, faPencilAlt, faSearch);

export default {
  name: "app",
  components: {
    "el-header": Header,
    Order,
    Gantt,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
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
  padding: 8px 12px;
  display: flex;
}

.app__main__left {
  margin-right: 10px;
  padding-top: 24px;
  padding-left: 8px;
  flex: 1 1 20%;
  background-color: #576574;
}

.app__main__right {
  padding-left: 8px;
  padding-top: 2px;
  flex: 1 1 80%;
  background-color: #576574;
}
</style>
