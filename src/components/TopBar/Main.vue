<template>
  <div class="top-bar">
    <div class="top-bar__brand">
      <el-button>
        <font-awesome-icon icon="play-circle" />
        RIVHO PJ
      </el-button>
    </div>
    <div class="top-bar__navigation">
      <input
        type="date"
        class="top-bar__navigation__input-filter"
        v-model="dateFilter"
        @change="handleInputdateFilter"
      />
      <el-button>Create</el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Button from "../UI/Button";
import { ORDER_GET_LIST } from "../../store/contants/actionTypes";

export default {
  name: "top-bar",
  components: {
    "el-button": Button,
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
  },
  data() {
    return { dateFilter: moment().format("YYYY-MM-DD") };
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

.top-bar__navigation {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.top-bar__navigation__input-filter {
  margin-right: 5px;
  padding: 1px 24px;
  border: 1px solid var(--color);
  border-bottom-width: 2px;
  border-radius: 4px;
  outline: none;
  color: var(--color);
  background-color: #222f3e;
  font-size: 16px;
  cursor: pointer;
  --color: #01a3a4;
}
</style>
