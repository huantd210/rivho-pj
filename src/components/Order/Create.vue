<template>
  <div class="order-create">
    <el-dialog
      title="New Order"
      :visible.sync="isVisibleDialog"
      :width="getStyleDialog.width"
      @close="handleCloseDialog"
    >
      <el-form
        ref="formOrderCreate"
        :model="orderCreate"
        :rules="rules"
        label-width="110px"
        :label-position="getStyleDialog.labelPosition"
      >
        <el-form-item
          label="Machine"
          class="el-form-item--align-left"
          prop="machineCode"
        >
          <el-input
            v-model="orderCreate.machineCode"
            :clearable="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="Name" class="el-form-item--align-left" prop="name">
          <el-input v-model="orderCreate.name" :clearable="true"></el-input>
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
            v-model="orderCreate.startAt"
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
            v-model="orderCreate.endAt"
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
          <el-color-picker v-model="orderCreate.color"></el-color-picker>
        </el-form-item>

        <el-form-item
          label="Describe"
          class="el-form-item--align-left"
          prop="describe"
        >
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
          @click="handleCloseDialog"
          :style="{ padding: '6px 12px', opacity: '0.5' }"
          >Cancel</el-button-custom
        >
        <el-button-custom
          @click="handleConfirmCreateOrder"
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
import {
  ORDER_CHANGE_VISIBLE_CREATE,
  ORDER_CREATE_ORDER,
} from "../../store/constants/actionTypes";
import Button from "../UI/Button";

export default {
  name: "order-create",
  components: {
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters(["getWindow"]),
    ...mapGetters("order", ["getVisibleDialogCreate"]),
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
        return this.getVisibleDialogCreate;
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
      this.$store.dispatch(`order/${ORDER_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog,
      });
    },
    handleCloseDialog() {
      this.handleChangeVisibleDialog(false);
      this.$refs.formOrderCreate.resetFields();
    },
    handleConfirmCreateOrder() {
      this.$refs.formOrderCreate.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch(`order/${ORDER_CREATE_ORDER}`, {
              order: this.orderCreate,
            })
            .then(() => {
              this.handleCloseDialog();
            });
        } else {
          return false;
        }
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
