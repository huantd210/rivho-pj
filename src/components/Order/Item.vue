<template>
  <div
    class="order-item"
    :style="{ 'background-color': order.color || '#1dd1a1' }"
  >
    <div class="order-item__wrapper" :style="getStyleOrder">
      <div class="order-item__extend">
        <div class="order-item__extend__warning">
          <font-awesome-icon icon="exclamation-triangle" />
        </div>
        <el-button-custom
          :style="{ padding: '4px', borderRadius: '50%' }"
          @click="handleChangeVisibleProcessList"
          class="order-item__action__btn-delete"
          v-if="isVisibleProcessList"
        >
          <i class="el-icon-minus"></i>
        </el-button-custom>
        <el-button-custom
          v-else
          :style="{ padding: '4px', borderRadius: '50%' }"
          @click="handleChangeVisibleProcessList"
        >
          <i class="el-icon-plus"></i>
        </el-button-custom>
      </div>
      <div class="order-item__describe">
        <span>物件ID: {{ order.id }}</span>
        <span>得意先名: {{ order.machineCode }}</span>
        <span>F番: {{ order.quantity }}</span>
        <span>入荷日: {{ getStringTimeStart }}</span>
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
      </div>
    </div>
    <div
      v-if="isVisibleProcessList"
      class="order-item__list-process"
      :style="{ backgroundColor: order.color }"
    >
      <div class="order-item__list-process__describe">
        <span> 品名：NNNNNNNNNNNNNNNNNNNN</span>
        <span>数量：9,999,999</span>
        <span>納期：2021/01/01</span>
      </div>
      <div class="order-item__list-process__table">
        <div class="order-item__list-process__table">
          <div class="order-item__list-process__table-title">
            <span :style="{ fontSize: '9px' }">スケジュール状態</span>
            <span>機械</span>
            <span>ファイル区分</span>
            <span>数量</span>
          </div>
          <div class="order-item__list-process__table-body">
            <div class="order-item__list-process__table-body__group">
              <div class="order-item__list-process__table-body__row">
                <span>完</span>
                <span>NNNNNNN</span>
                <span>NNNNNNN</span>
                <span>999999</span>
              </div>
              <div class="order-item__list-process__table-body__row">
                <span>完</span>
                <span>NNNNNNN</span>
                <span>NNNNNNN</span>
                <span>999999</span>
              </div>
            </div>
            <div class="order-item__list-process__table-body__group">
              <div class="order-item__list-process__table-body__row">
                <span>完</span>
                <span>NNNNNNN</span>
                <span>NNNNNNN</span>
                <span>999999</span>
              </div>
              <div class="order-item__list-process__table-body__row">
                <span>完</span>
                <span>NNNNNNN</span>
                <span>NNNNNNN</span>
                <span>999999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getWindow"]),
    getStringTimeStart() {
      return this.order.startAt.format("YYYY/MM/DD");
    },
    getStringTimeEnd() {
      return this.order.endAt.format("YYYY/MM/DD");
    },
    getStyleOrder() {
      let styleOrder = {
        height: this.getWindow.width <= 1000 ? "80px" : "110px",
      };

      if (this.getWindow.width <= 1000) {
        styleOrder.fontSize = "12px";
      }

      return styleOrder;
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
  padding-top: 2px;
  border-bottom: 2px solid #b33939;
  overflow: hidden;
  display: flex;
}

.order-item__extend {
  padding-bottom: 3px;
  padding-right: 6px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.order-item__describe {
  text-align: left;
  flex-grow: 1;
}

.order-item__extend .order-item__extend__warning {
  color: #feca57;
  font-size: 16px;
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
  text-align: left;
  padding-left: 35px;
}

.order-item__list-process li {
  padding: 6px;
  color: #ffffff;
  background-color: #576574;
}

.order-item__action__btn-delete:hover {
  background-color: #eb2f06;
}

.order-item__list-process__describe {
  display: flex;
  flex-direction: column;
}

.order-item__list-process__table {
  margin-top: 5px;
}

.order-item__list-process__table-title,
.order-item__list-process__table-body__row {
  display: flex;
  justify-content: space-between;
}

.order-item__list-process__table-body__group {
  width: 100%;
  margin-bottom: 6px;
  background-color: #98c6ff;
}

.order-item__list-process__table-title span,
.order-item__list-process__table-body__row span {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
</style>
