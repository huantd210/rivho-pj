<template>
  <div class="header">
    <div class="header__brand">
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
    </div>
    <div class="header__navigation">
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
      <el-button>
        <font-awesome-icon icon="play-circle" />
      </el-button>
      <el-button :style="{ 'margin-right': '0px' }">
        <font-awesome-icon icon="play-circle" />
      </el-button>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";

library.add(faPlayCircle);

export default {
  name: "el-header",
  components: {
    "el-button": Button,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
}

.header__navigation {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
