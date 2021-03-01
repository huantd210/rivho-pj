<template>
  <div
    class="order-item"
    :style="{ 'background-color': order.color || '#1dd1a1' }"
  >
    <div class="order-item__wrapper">
      <div class="order-item__describe">
        <span>{{ order.name }}</span>
        <span>{{ order.describe }}</span>
        <span>{{ getStringTimeStart }}</span>
        <span>{{ getStringTimeEnd }}</span>
      </div>
      <div class="order-item__action">
        <el-button-custom :style="{ padding: '2px' }" @click="handleEditOrder">
          <i class="el-icon-setting"></i>
        </el-button-custom>

        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="handleDeleteOrder"
        >
          <el-button-custom slot="reference" :style="{ padding: '2px' }">
            <i class="el-icon-delete"></i>
          </el-button-custom>
        </el-popconfirm>

        <el-button-custom
          :style="{ padding: '2px' }"
          @click="handleChangeVisibleProcessList"
        >
          <i v-if="isVisibleProcessList" class="el-icon-caret-top"></i>
          <i v-else class="el-icon-caret-bottom"></i>
        </el-button-custom>
      </div>
    </div>
    <div v-if="isVisibleProcessList" class="order-item__list-process">
      <ul>
        <li>{{ order.name }}-1</li>
        <li>{{ order.name }}-2</li>
        <li>{{ order.name }}-3</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_DELETE_ORDER,
} from "../../store/constants/actionTypes";
import Button from "../UI/Button";

export default {
  name: "order-item",
  components: {
    "el-button-custom": Button,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getStringTimeStart() {
      return this.order.startAt.format("DD MM YYYY HH:mm:ss");
    },
    getStringTimeEnd() {
      return this.order.endAt.format("DD MM YYYY HH:mm:ss");
    },
  },
  methods: {
    handleEditOrder() {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_EDIT}`, {
        order: this.order,
        isVisibleDialog: true,
      });
    },
    handleDeleteOrder() {
      this.$store.dispatch(`order/${ORDER_DELETE_ORDER}`, {
        orderId: this.order.id,
      });
    },
    handleChangeVisibleProcessList() {
      this.isVisibleProcessList = !this.isVisibleProcessList;
    },
  },
  data() {
    return {
      isVisibleProcessList: false,
    };
  },
};
</script>

<style scoped>
.order-item {
  padding-top: 2px;
  padding-left: 8px;
  padding-bottom: 2px;
  margin-bottom: 3px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  color: #000000;
}

.order-item__wrapper {
  width: 100%;
  height: 110px;
  padding-top: 2px;
  border-bottom: 2px solid #b33939;
  overflow: hidden;
  display: flex;
}

.order-item__describe {
  text-align: left;
  flex-grow: 1;
}

.order-item__describe span {
  display: block;
}

.order-item__action {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  background-color: #222f3e;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.order-item__list-process {
  background-color: #98c6ff;
  text-align: left;
}

.order-item__list-process li {
  padding: 6px;
  background-color: #576574;
}
</style>
