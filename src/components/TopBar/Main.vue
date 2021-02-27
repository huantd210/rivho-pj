<template>
  <div class="top-bar">
    <div class="top-bar__brand">
      <span>RIVHO PJ</span>
    </div>
    <div class="top-bar__navigation">
      <div class="top-bar__navigation__select">
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
        <el-button-custom @click="handleCreateOrder">新規注文</el-button-custom>

        <el-button-custom @click="handleCreateMachine"
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
} from "../../store/contants/actionTypes";

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
            date: new Date(this.dateFilter),
          },
        });
      }
    },
    handleCreateOrder() {
      console.log("A");

      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog: true,
      });
    },
    handleCreateMachine() {},
  },
  data() {
    return {
      dateFilter: moment().utcOffset(0).format("YYYY-MM-DD"),
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
          date: new Date(this.dateFilter),
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

.top-bar__brand span {
  font-size: 24px;
  font-weight: bold;
}

.top-bar__navigation {
  color: #01a3a4;
  font-size: 16px;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.top-bar__navigation__filter-date {
  margin-left: 10px;
}

.top-bar__navigation__btn-action {
  margin-left: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
