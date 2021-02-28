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
          v-model="codeFilterMachine"
          filterable
          placeholder="Machine"
          size="small"
          popper-class="popper-for-input"
          @change="handleSelectCodeFilterMachine"
        >
          <el-option key="'item-non" label="All" value=""> </el-option>
          <el-option
            v-for="item in getCodeMachineList"
            :key="item.id"
            :label="item.code"
            :value="item.code"
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
          popper-class="popper-for-input"
        >
        </el-date-picker>
      </div>

      <div class="top-bar__navigation__btn-action">
        <el-button-custom :style="{ height: '32px' }" @click="handleCreateOrder"
          >新規注文</el-button-custom
        >

        <el-button-custom
          :style="{ height: '32px' }"
          @click="handleCreateMachine"
          >新しいマシン</el-button-custom
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
  MACHINE_CHANGE_FILTER_MACHINE,
  MACHINE_CHANGE_VISIBLE_CREATE,
} from "../../store/constants/actionTypes";

export default {
  name: "top-bar",
  components: {
    "el-button-custom": Button,
    "el-modal": Modal,
  },
  computed: {
    ...mapGetters("machine", ["getCodeMachineList"]),
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
    handleSelectCodeFilterMachine() {
      this.$store.dispatch(`machine/${MACHINE_CHANGE_FILTER_MACHINE}`, {
        filterMachine: {
          code: this.codeFilterMachine,
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
  },
  data() {
    return {
      dateFilterOrder: moment("2021-02-28").format("YYYY-MM-DD"),
      codeFilterMachine: "",
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

.top-bar__navigation__select,
.top-bar__navigation__filter-date {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar__navigation__label {
  margin-right: 10px;
}

.top-bar__navigation__btn-action {
  margin-left: 20px;
}
</style>
