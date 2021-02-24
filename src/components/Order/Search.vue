<template>
  <div class="order-search">
    <div class="order-search">
      <div class="order-search__input">
        <div class="order-search__input__prefix">
          <font-awesome-icon
            icon="pencil-alt"
            :style="{ color: '#01a3a4', 'font-size': '18px' }"
          />
        </div>
        <div class="order-search__input__main">
          <input type="text" v-model="terms" />
        </div>
      </div>
      <div class="order-search__action">
        <el-button>
          <font-awesome-icon icon="search" />
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
      terms: "かいたく",
    };
  },
};
</script>

<style scoped>
.order-search {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.order-search__input {
  display: flex;
}

.order-search__input__prefix {
  border-bottom: 2px solid #01a3a4;
}

.order-search__input__main input {
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
</style>
