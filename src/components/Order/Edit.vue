<template>
  <div class="order-edit">
    <el-dialog
      title="New Order"
      :visible.sync="isVisibleDialog"
      :width="getStyleDialog.width"
      @open="handleOpenDialog"
      @close="handleCloseDialog"
    >
      <el-form
        ref="formOrderEdit"
        :model="orderEdit"
        :label-position="getStyleDialog.labelPosition"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item
          label="Machine"
          class="el-form-item--align-left"
          prop="machineCode"
        >
          <el-input
            v-model="orderEdit.machineCode"
            :clearable="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="Name" class="el-form-item--align-left" prop="name">
          <el-input v-model="orderEdit.name" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item
          label="Time start"
          class="el-form-item--align-left"
          prop="startAt"
        >
          <el-date-picker
            type="datetime"
            placeholder="Select date and time start"
            style="width: 100%"
            v-model="orderEdit.startAt"
            :default-value="getDefaultTimeStart"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Time end"
          class="el-form-item--align-left"
          prop="endAt"
        >
          <el-date-picker
            type="datetime"
            placeholder="Select date and time end"
            style="width: 100%"
            v-model="orderEdit.endAt"
            :default-value="getDefaultTimeEnd"
            :clearable="true"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="Color"
          class="el-form-item--align-left"
          prop="color"
        >
          <el-color-picker v-model="orderEdit.color"></el-color-picker>
        </el-form-item>

        <el-form-item
          label="Describe"
          class="el-form-item--align-left"
          prop="describe"
        >
          <el-input
            type="textarea"
            :rows="2"
            v-model="orderEdit.describe"
            placeholder="Place input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button-custom
          @click="handleCloseDialog"
          :style="{ padding: '6px 12px', opacity: '0.5' }"
          >Cancel</el-button-custom
        >
        <el-button-custom
          @click="handleConfirmEditOrder"
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
import _ from "lodash";
import {
  ORDER_CHANGE_VISIBLE_EDIT,
  ORDER_EDIT_ORDER,
} from "../../store/constants/actionTypes";
import Button from "../UI/Button";

export default {
  name: "order-edit",
  components: {
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters(["getWindow"]),
    ...mapGetters("order", ["getVisibleDialogEdit", "getOrderEdit"]),
    getDefaultTimeStart() {
      let timeStart = moment().set({ hour: 9, minute: 0, second: 0 });
      return new Date(timeStart.toISOString());
    },
    getDefaultTimeEnd() {
      let timeEnd = moment().set({ hour: 21, minute: 0, second: 0 });
      return new Date(timeEnd.toISOString());
    },
    isVisibleDialog: {
      get() {
        return this.getVisibleDialogEdit;
      },
      set(isVisibleDialog) {
        return isVisibleDialog;
      },
    },
    getStyleDialog() {
      let styleDialog = {
        width: "30%",
        labelPosition: "left",
      };

      if (this.getWindow.width <= 1000) {
        styleDialog.width = "80%";
        styleDialog.labelPosition = "top";
      }

      return styleDialog;
    },
  },
  methods: {
    handleChangeVisibleDialog(isVisibleDialog) {
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_EDIT}`, {
        isVisibleDialog,
        order: "", // reset edit order
      });
    },
    handleOpenDialog() {
      if (this.getOrderEdit && !_.isEmpty(this.getOrderEdit)) {
        this.orderEdit = { ...this.getOrderEdit };
      }
    },
    handleCloseDialog() {
      this.handleChangeVisibleDialog(false);
    },
    handleConfirmEditOrder() {
      this.$store
        .dispatch(`order/${ORDER_EDIT_ORDER}`, {
          order: this.orderEdit,
        })
        .then(() => {
          this.handleCloseDialog();
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
      rules: {
        name: [
          { required: true, message: "Please input Name", trigger: "blur" },
        ],
        startAt: [
          {
            required: true,
            type: "date",
            message: "Please input Time start",
            trigger: "blur",
          },
        ],
        endAt: [
          {
            required: true,
            type: "date",
            message: "Please input Time end",
            trigger: "blur",
          },
        ],
        machineCode: [
          {
            required: true,
            message: "Please input Machine code",
            trigger: "blur",
          },
        ],
        color: [{ required: false }],
        describe: [{ required: false }],
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
