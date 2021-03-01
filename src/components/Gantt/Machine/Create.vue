<template>
  <div class="machine-create">
    <el-dialog
      title="New Machine"
      :visible.sync="isVisibleDialog"
      :width="getStyleDialog.width"
      @close="handleCloseDialog"
    >
      <el-form
        ref="formMachineCreate"
        :model="machineCreate"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item label="Code" prop="code">
          <el-input v-model="machineCreate.code" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="Name" prop="name">
          <el-input v-model="machineCreate.name" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="Describe" prop="describe">
          <el-input
            type="textarea"
            :rows="2"
            v-model="machineCreate.describe"
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
          @click="handleConfirmCreateMachine"
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
  MACHINE_CHANGE_VISIBLE_CREATE,
  MACHINE_CREATE_MACHINE,
} from "../../../store/constants/actionTypes";
import Button from "../../UI/Button";

export default {
  name: "machine-create",
  components: {
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters(["getWindow"]),
    ...mapGetters("machine", ["getVisibleDialogCreate"]),
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
      this.$store.dispatch(`machine/${MACHINE_CHANGE_VISIBLE_CREATE}`, {
        isVisibleDialog,
      });
    },
    handleCloseDialog() {
      this.handleChangeVisibleDialog(false);
      this.$refs.formMachineCreate.resetFields();
    },
    handleConfirmCreateMachine() {
      this.$refs.formMachineCreate.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch(`machine/${MACHINE_CREATE_MACHINE}`, {
              machine: this.machineCreate,
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
      machineCreate: {
        name: "",
        code: "",
        describe: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input Name", trigger: "blur" },
        ],
        code: [
          { required: true, message: "Please input Code", trigger: "blur" },
        ],
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
