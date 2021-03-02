<template>
  <div class="order-search">
    <div class="order-search__left">
      <span>オーダーリスト</span>
    </div>
    <div class="order-search__right">
      <el-button-custom
        :style="{ padding: '8px 24px', margin: 0, width: '100%' }"
      >
        検索
      </el-button-custom>
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button";

export default {
  name: "order-list",
  components: {
    "el-button-custom": Button,
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
  margin-bottom: 3px;
  padding-right: 6px;
  display: flex;
}

.order-search__left {
  text-align: left;
  min-width: 150px;
  flex: 1 1 30%;
}

.order-search__left span {
  font-size: 20px;
}

.order-search__right {
  padding-left: 12px;
  padding-right: 6px;
  align-items: center;
  flex: 1 1 70%;
  justify-content: flex-end;
  display: flex;
  max-width: 125px;
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
