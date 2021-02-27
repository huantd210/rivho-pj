<template>
  <div class="order-search">
    <div class="order-search__left">
      <span>オーダーリスト</span>
    </div>
    <div class="order-search__right">
      <div class="order-search__input">
        <div class="order-search__input__prefix">
          <i
            class="el-icon-edit"
            :style="{ color: '#01a3a4', 'font-size': '16px' }"
          />
        </div>
        <div class="order-search__input__main">
          <input type="text" v-model="terms" placeholder="かいたく" />
        </div>
      </div>
      <div class="order-search__action">
        <el-button :style="{ padding: '2px 10px', margin: 0 }">
          <i class="el-icon-search" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button";

export default {
  name: "order-list",
  components: {
    "el-button": Button,
  },
  data() {
    return {
      terms: "",
    };
  },
};
</script>

<style scoped>
.order-search {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}

.order-search__left span {
  min-width: 100px;
  font-size: 16px;
  font-weight: bold;
}

.order-search__right {
  padding-left: 12px;
  padding-right: 6px;
  align-items: center;
  display: flex;
}

.order-search__input {
  display: flex;
  align-items: center;
}

.order-search__input__prefix {
  border-bottom: 2px solid #01a3a4;
}

.order-search__input__main {
  height: 100%;
  width: 70%;
  max-width: 120px;
  flex-grow: 1;
}

.order-search__input__main input {
  height: 100%;
  width: 100%;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 16px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0);
  color: #c8d6e5;
}
</style>
