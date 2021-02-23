<template>
  <div class="side-list">
    <div class="side-list__header">
      <div class="side-list__header__input">
        <div class="side-list__header__input__prefix">
          <font-awesome-icon
            icon="pencil-alt"
            :style="{ color: '#01a3a4', 'font-size': '18px' }"
          />
        </div>
        <div class="side-list__header__input__main">
          <input type="text" placeholder="Lorem ipsum" value="Lorem ipsum" />
        </div>
      </div>
      <div class="side-list__header__search">
        <el-button>
          <font-awesome-icon icon="search" />
        </el-button>
      </div>
    </div>
    <div class="side-list__content"></div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";

library.add([faPencilAlt, faSearch]);

export default {
  name: "side-item",
  components: {
    "el-button": Button,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style scoped>
.side-list {
  padding-left: 8px;
  padding-top: 12px;
}

.side-list__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.side-list__header__input {
  display: flex;
}

.side-list__header__input__prefix {
  border-bottom: 2px solid #01a3a4;
}

.side-list__header__input__main input {
  height: 100%;
  width: 120px;
  max-width: 120px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 16px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0);
  color: #c8d6e5;
}

.side-list__content {
  overflow-y: scroll;
}
</style>
