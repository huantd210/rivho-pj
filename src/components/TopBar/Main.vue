<template>
  <div class="top-bar">
    <div class="top-bar__brand">
      <span>スケジュール登録</span>
    </div>
    <div class="top-bar__navigation">
      <div class="top-bar__navigation__select">
        <div class="top-bar__navigation__label">
          <span>工程</span>
        </div>
        <el-select
          v-model="idFilterProcess"
          filterable
          placeholder="工程"
          size="small"
          popper-class="popper-for-input"
          :style="{ width: '120px' }"
          @change="handleSelectIdFilterProcess"
        >
          <el-option key="'item-non" label="すべて" value=""> </el-option>
          <el-option
            v-for="item in getProcessIdList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="top-bar__navigation__filter-date">
        <div class="top-bar__navigation__label">
          <span>日付</span>
        </div>
        <el-date-picker
          v-model="dateFilterOrder"
          type="date"
          placeholder="Pick a day"
          @change="handleInputDateOrderFilter"
          size="small"
          :style="{ width: '140px' }"
          popper-class="popper-for-input"
        >
        </el-date-picker>

        <div class="top-bar__navigation__select-day">
          <span
            class="top-bar__navigation__select-day__btn-double"
            @click="increaseDateFilterOrder(-2)"
          >
            <i class="el-icon-d-arrow-left"></i>
          </span>
          <span
            class="top-bar__navigation__select-day__btn"
            @click="increaseDateFilterOrder(-1)"
          >
            <i class="el-icon-arrow-left"></i>
          </span>
          <span class="top-bar__navigation__select-day__text">{{
            getDayFilterDate
          }}</span>
          <span
            class="top-bar__navigation__select-day__btn"
            @click="increaseDateFilterOrder(1)"
          >
            <i class="el-icon-arrow-right"></i>
          </span>
          <span
            class="top-bar__navigation__select-day__btn-double"
            @click="increaseDateFilterOrder(2)"
          >
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </div>
      </div>
      <div class="top-bar__navigation__select">
        <div class="top-bar__navigation__label">
          <span>スケール</span>
        </div>
        <el-select
          v-model="scaleValue"
          placeholder="スケール"
          size="small"
          popper-class="popper-for-input"
          :style="{ width: '100px' }"
        >
          <el-option key="'item-non" label="NNNNNN" value=""> </el-option>
        </el-select>
      </div>

      <div class="top-bar__navigation__btn-action">
        <el-button-custom :style="{ height: '32px' }" @click="handleCreateOrder"
          >登録</el-button-custom
        >

        <el-button-custom
          :style="{ height: '32px' }"
          @click="handleRefreshWebApp"
          >画面更新</el-button-custom
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import {
  ORDER_CHANGE_FILTER_ORDER,
  ORDER_CHANGE_VISIBLE_CREATE,
  ORDER_CHANGE_FILTER_PROCESS,
  MACHINE_CHANGE_VISIBLE_CREATE,
} from "../../store/constants/actionTypes";

export default {
  name: "top-bar",
  components: {
    "el-button-custom": Button,
    "el-modal": Modal,
  },
  computed: {
    ...mapGetters(["getWindow"]),
    ...mapGetters("machine", ["getCodeMachineList"]),
    ...mapGetters("order", ["getFilterOrder", "getProcessIdList"]),
    getDayFilterDate() {
      if (this.getFilterOrder && this.getFilterOrder.date) {
        return this.getFilterOrder.date.date();
      }

      return "日";
    },
  },
  methods: {
    handleInputDateOrderFilter() {
      if (this.dateFilterOrder) {
        this.$store.dispatch(`order/${ORDER_CHANGE_FILTER_ORDER}`, {
          filterOrder: {
            date: moment(new Date(this.dateFilterOrder), "YYYY-MM-DD"),
          },
        });
      }
    },
    handleSelectIdFilterProcess() {
      this.$store.dispatch(`order/${ORDER_CHANGE_FILTER_PROCESS}`, {
        filterProcess: {
          id: this.idFilterProcess,
        },
      });
    },
    handleCreateOrder() {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog: true,
      });
    },
    handleCreateMachine() {
      this.$store.dispatch(`machine/${MACHINE_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog: true,
      });
    },
    handleRefreshWebApp() {
      location.reload();
    },
    increaseDateFilterOrder(num) {
      if (this.dateFilterOrder) {
        this.dateFilterOrder = this.getFilterOrder.date.add(num, "days");
        this.$store.dispatch(`order/${ORDER_CHANGE_FILTER_ORDER}`, {
          filterOrder: {
            date: moment(new Date(this.dateFilterOrder), "YYYY-MM-DD"),
          },
        });
      }
    },
  },
  data() {
    return {
      dateFilterOrder: moment().format("YYYY-MM-DD"),
      idFilterProcess: "",
      scaleValue: "",
    };
  },
  async created() {
    if (this.dateFilterOrder) {
      await this.$store.dispatch(`order/${ORDER_CHANGE_FILTER_ORDER}`, {
        filterOrder: {
          date: moment(new Date(this.dateFilterOrder), "YYYY-MM-DD"),
        },
      });
    }
  },
};
</script>

<style scoped>
.top-bar {
  height: 100%;
  width: 100%;
  display: flex;
}

.top-bar__brand {
  text-align: left;
  flex: 1 1 20%;
}

.top-bar__brand span {
  font-size: 24px;
  font-weight: bold;
}

.top-bar__navigation {
  color: #01a3a4;
  font-size: 16px;
  flex: 1 1 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.top-bar__navigation__filter-date {
  margin-left: 10px;
}

.top-bar__navigation__select-day {
  width: 80px;
  height: 32px;
  margin-left: 5px;
  font-size: 14px;
  border: 1px solid #01a3a4;
  border-bottom-width: 2px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar__navigation__select-day__text {
  flex: 1;
}

.top-bar__navigation__select-day__btn,
.top-bar__navigation__select-day__btn-double {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar__navigation__select-day__btn:hover,
.top-bar__navigation__select-day__btn-double:hover {
  opacity: 0.5;
}

.top-bar__navigation__select,
.top-bar__navigation__filter-date {
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar__navigation__label {
  margin-right: 10px;
}

.top-bar__navigation__btn-action {
  margin-left: 10px;
  display: flex;
}
</style>
