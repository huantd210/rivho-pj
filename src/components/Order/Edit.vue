<template>
  <div class="order-edit">
    <el-dialog
      title="New Order"
      :visible.sync="getVisibleDialogEdit"
      :lock-scroll="true"
    >
      <el-form :model="orderEdit">
        <el-form-item label="Name">
          <el-input v-model="orderEdit.name" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="Describe">
          <el-input
            type="textarea"
            :rows="2"
            v-model="orderEdit.describe"
            placeholder="Place input"
          ></el-input>
        </el-form-item>

        <el-form-item label="Start at">
          <el-date-picker
            type="datetime"
            placeholder="Select date and time"
            v-model="orderEdit.startAt"
            default-value="getDefaultTimeStart"
            default-time="09:00:00"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="End at">
          <el-date-picker
            type="datetime"
            placeholder="Select date and time"
            v-model="orderEdit.endAt"
            default-value="getDefaultTimeEnd"
            default-time="21:00:00"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Machine code">
          <el-input
            v-model="orderEdit.machineCode"
            :clearable="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="Color">
          <el-color-picker v-model="orderEdit.color"></el-color-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleChangeVisibleDialog(false)">Cancel</el-button>
        <el-button type="primary" @click="handleChangeVisibleDialog(false)">
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import _ from "lodash";
import { ORDER_CHANGE_VISIBLE_EDIT } from "../../store/contants/actionTypes";

export default {
  name: "order-edit",
  props: {
    order: Object,
  },
  computed: {
    ...mapGetters("order", ["getVisibleDialogEdit"]),
    getDefaultTimeStart() {
      let timeStart = moment()
        .utcOffset(0)
        .set({ hour: 9, minute: 0, second: 0 });
      return this.orderEdit.startAt
        ? this.orderEdit.startAt
        : new Date(timeStart.toISOString());
    },
    getDefaultTimeEnd() {
      let timeEnd = moment()
        .utcOffset(0)
        .set({ hour: 21, minute: 0, second: 0 });
      return this.orderEdit.endAt
        ? this.orderEdit.endAt
        : new Date(timeEnd.toISOString());
    },
  },
  methods: {
    handleChangeVisibleDialog(isVisibleDialog) {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_EDIT}`, {
        isVisibleDialog,
      });
    },
  },
  data() {
    return {
      orderEdit: {
        name: "",
        describe: "",
        startAt: "",
        endAt: "",
        machineCode: "",
        color: "#409EFF",
      },
    };
  },

  created() {
    if (this.order && !_isEmpty(this.order)) {
      this.orderEdit = this.order;
    }
  },
};
</script>

<style scoped>
</style>
