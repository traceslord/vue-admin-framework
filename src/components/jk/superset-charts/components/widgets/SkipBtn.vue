<template>
  <div :id="`skip_${Date.now()}`" @click="skip">
    <el-tooltip :content="`跳转（${id}）`" placement="top">
      <slot><div class="skip-btn"></div></slot>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number]
  },
  methods: {
    skip() {
      if (!this.id) return;
      window.open(
        `http://127.0.0.1:8088/superset/explore/?form_data=%7B%22slice_id%22%3A%20${this.id}%7D`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.skip-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  background-color: #909399;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #409eff;
  }
  &::after {
    content: "\27A4";
    position: absolute;
    top: 2px;
    left: 5px;
    font-size: 12px;
    color: #fff;
    transform: rotate(-45deg);
  }
}
</style>
