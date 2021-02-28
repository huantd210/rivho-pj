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
          v-model="valueOne"
          placeholder="Select"
          size="small"
          popper-class="popper-for-input"
        >
          <el-option
            v-for="item in optionsOne"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="top-bar__navigation__filter-date">
        <div class="top-bar__navigation__label">
          <span>日付</span>
        </div>
        <el-date-picker
          v-model="dateFilter"
          type="date"
          placeholder="Pick a day"
          @change="handleInputdateFilter"
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
import moment from "moment";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import {
  ORDER_GET_LIST,
  ORDER_CHANGE_VISIBLE_CREATE,
  MACHINE_CHANGE_VISIBLE_CREATE,
} from "../../store/constants/actionTypes";

export default {
  name: "top-bar",
  components: {
    "el-button-custom": Button,
    "el-modal": Modal,
  },
  methods: {
    handleInputdateFilter() {
      if (this.dateFilter) {
        this.$store.dispatch(`order/${ORDER_GET_LIST}`, {
          filter: {
            date: moment(new Date(this.dateFilter), "YYYY-MM-DD"),
          },
        });
      }
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
      dateFilter: moment().format("YYYY-MM-DD"),
      optionsOne: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      valueOne: "",
      showModal: false,
    };
  },
  async created() {
    if (this.dateFilter) {
      await this.$store.dispatch(`order/${ORDER_GET_LIST}`, {
        filter: {
          date: moment(new Date(this.dateFilter), "YYYY-MM-DD"),
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
