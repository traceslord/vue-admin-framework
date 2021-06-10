<template>
  <el-button
    :class="[jkClass, sizeClass, shadowClass]"
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    @click="handleClick"
  >
    <template v-if="text">{{ text }}</template>
  </el-button>
</template>

<script>
export default {
  props: {
    jkClass: String,
    text: String,
    shadow: {
      type: Boolean,
      default: false
    },
    size: String,
    type: String,
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: String
  },
  computed: {
    sizeClass() {
      return this.size ? "mini" : "big";
    },
    shadowClass() {
      return this.shadow ? "shadow" : "";
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style lang="less">
/* 实例：
  **  <jk-button
  **    text="添加学习班"
  **    :shadow="true"
  **    size="mini"
  **    type="primary"
  **    @click="xxx">
  **  </jk-button>

  **  <jk-button
  **    jk-class="jk-btn-round"
  **    text="添加学习班"
  **    :shadow="true"
  **    size="mini"
  **    type="primary"
  **    round
  **    icon="el-icon-plus"
  **    @click="xxx">
  **  </jk-button>
  
  **  <jk-button
  **    jk-class="jk-btn-plain jk-btn-round"
  **    text="添加学习班"
  **    size="mini"
  **    plain
  **    round
  **    icon="el-icon-plus"
  **    @click="xxx">
  **  </jk-button>

  **  <jk-button
  **    jk-class="jk-btn-gradient"
  **    text="添加学习班"
  **    type="primary"
  **    round
  **    @click="xxx">
  **  </jk-button>
*/

.shadow {
  box-shadow: 8px 10px 20px 0px rgba(46, 61, 73, 0.15);
  transition: all 0.6s;
  &:hover {
    box-shadow: 2px 4px 8px 0px rgba(46, 61, 73, 0.2);
  }
}
.jk-btn-gradient {
  background: linear-gradient(25deg, #ff9bfc, #a86dff 80%, #a869ff);
  border: none;
  box-shadow: 0 16px 14px rgba(125, 50, 228, 0.2);
  transition: all 0.6s;
  &:hover {
    background: linear-gradient(
      60deg,
      #ff7efb,
      #9248fe 80%,
      #8a36ff
    ) !important;
    box-shadow: 0 10px 10px rgba(125, 50, 228, 0.2) !important;
  }
}
.jk-btn-round {
  display: flex;
  transition: all 0.6s;
  overflow: hidden;
  i {
    font-weight: 600;
  }
  span {
    overflow: hidden;
  }
}
.jk-btn-round.big {
  padding: 12px;
  max-width: 40px;
  &:hover {
    max-width: 150px;
  }
  span {
    margin: 0 6px 0 8px;
  }
}
.jk-btn-round.mini {
  padding: 8px;
  max-width: 30px;
  &:hover {
    max-width: 120px;
  }
  span {
    margin: 0 4px 0 6px;
  }
}
.jk-btn-plain {
  color: #409eff;
  background: transparent;
  border-color: #409eff;
  &:hover {
    background: transparent !important;
  }
}
</style>
