<template>
  <div class="order-create">
    <el-dialog
      title="New Order"
      :visible.sync="isVisibleDialog"
      width="30%"
      @open="handleChangeVisibleDialog(true)"
      @close="handleChangeVisibleDialog(false)"
    >
      <el-form :model="orderCreate" label-width="100px">
        <el-form-item label="Machine code">
          <el-input
            v-model="orderCreate.machineCode"
            :clearable="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="orderCreate.name" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="Time start">
          <el-date-picker
            type="datetime"
            placeholder="Select date and time start"
            style="width: 100%"
            v-model="orderCreate.startAt"
            :default-value="getDefaultTimeStart"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Time end">
          <el-date-picker
            type="datetime"
            placeholder="Select date and time end"
            style="width: 100%"
            v-model="orderCreate.endAt"
            :default-value="getDefaultTimeEnd"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Color" class="el-form-item--align-left">
          <el-color-picker v-model="orderCreate.color"></el-color-picker>
        </el-form-item>

        <el-form-item label="Describe">
          <el-input
            type="textarea"
            :rows="2"
            v-model="orderCreate.describe"
            placeholder="Place input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button-custom
          @click="handleChangeVisibleDialog(false)"
          :style="{ padding: '6px 12px', opacity: '0.5' }"
          >Cancel</el-button-custom
        >
        <el-button-custom
          @click="handleChangeVisibleDialog(false)"
          :style="{ padding: '6px 12px' }"
          >Confirm</el-button-custom
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { ORDER_CHANGE_VISIBLE_CREATE } from "../../store/contants/actionTypes";
import Button from "../UI/Button";

export default {
  name: "order-create",
  components: {
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters("order", ["getVisibleDialogCreate"]),
    getDefaultTimeStart() {
      let timeStart = moment()
        .utcOffset(0)
        .set({ hour: 9, minute: 0, second: 0 });
      console.log(timeStart.format("YYYY-MM-DD HH:mm:ss"));
      return new Date(timeStart.toISOString());
    },
    getDefaultTimeEnd() {
      let timeEnd = moment()
        .utcOffset(0)
        .set({ hour: 21, minute: 0, second: 0 });
      return new Date(timeEnd.toISOString());
    },
    isVisibleDialog: {
      get() {
        return this.getVisibleDialogCreate;
      },
      set(isVisibleDialog) {
        return isVisibleDialog;
      },
    },
  },
  methods: {
    handleChangeVisibleDialog(isVisibleDialog) {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog,
      });
    },
  },
  data() {
    return {
      orderCreate: {
        name: "",
        describe: "",
        startAt: "",
        endAt: "",
        machineCode: "",
        color: "#409EFF",
      },
    };
  },
};
</script>

<style scoped>
.el-form-item--align-left {
  text-align: left;
}
</style>
