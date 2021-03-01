<template>
  <div class="machine-edit">
    <el-dialog
      title="Edit Machine"
      :visible.sync="isVisibleDialog"
      :width="getStyleDialog.width"
      @open="handleOpenDialog"
      @close="handleCloseDialog"
    >
      <el-form
        ref="formMachineEdit"
        :model="machineEdit"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="machineEdit.name" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="Describe" prop="describe">
          <el-input
            type="textarea"
            :rows="2"
            v-model="machineEdit.describe"
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
          @click="handleConfirmEditMachine"
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
  MACHINE_CHANGE_VISIBLE_EDIT,
  MACHINE_EDIT_MACHINE,
} from "../../../store/constants/actionTypes";
import Button from "../../UI/Button";

export default {
  name: "machine-edit",
  components: {
    "el-button-custom": Button,
  },
  computed: {
    ...mapGetters(["getWindow"]),
    ...mapGetters("machine", ["getMachineEdit", "getVisibleDialogEdit"]),
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
      this.$store.dispatch(`machine/${MACHINE_CHANGE_VISIBLE_EDIT}`, {
        isVisibleDialog,
        machine: "", // reset edit machine
      });
    },
    handleOpenDialog() {
      if (this.getMachineEdit && !_.isEmpty(this.getMachineEdit)) {
        this.machineEdit = { ...this.getMachineEdit };
      }
    },
    handleCloseDialog() {
      this.handleChangeVisibleDialog(false);
      this.$refs.formMachineEdit.resetFields();
    },
    handleConfirmEditMachine() {
      this.$refs.formMachineEdit.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch(`machine/${MACHINE_EDIT_MACHINE}`, {
              machine: this.machineEdit,
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
      machineEdit: {
        name: "",
        describe: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input Name", trigger: "blur" },
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
