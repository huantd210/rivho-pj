<template>
  <div id="app">
    <header class="app__header">
      <el-header></el-header>
    </header>
    <main class="app__main">
      <aside class="app__main__left">
        <el-sidebar></el-sidebar>
      </aside>
      <section class="app__main__right">
        <el-content></el-content>
      </section>
    </main>
    <main></main>
  </div>
</template>

<script>
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Content from "./components/Layout/Content";

export default {
  name: "app",
  components: {
    "el-header": Header,
    "el-sidebar": Sidebar,
    "el-content": Content,
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
  flex: 1 1 20%;
}

.app__main__right {
  flex: 1 1 80%;
}
</style>
