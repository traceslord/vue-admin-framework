<template>
  <div
    class="demo-box"
    @mouseenter="showDemoControlText = true"
    @mouseleave="showDemoControlText = false"
  >
    <div>
      <slot name="demo-box-source"></slot>
    </div>
    <div class="demo-box-meta" :style="demoMetaStyle">
      <slot name="demo-box-meta"></slot>
    </div>
    <div class="demo-box-control" @click="handleCollapse">
      <div class="demo-box-control-container">
        <i :class="collapse ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
        <transition name="el-fade-in-linear">
          <span class="demo-box-control-text" v-show="showDemoControlText">{{
            collapse ? $t("icon.showCode") : $t("icon.hiddenCode")
          }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "142px"
    },
    time: {
      type: Number,
      default: 0.2
    }
  },
  data() {
    return {
      collapse: true,
      showDemoControlText: false
    };
  },
  computed: {
    demoMetaStyle() {
      return this.collapse
        ? {
            height: 0,
            borderTop: "none",
            transition: `height ${this.time}s linear`
          }
        : {
            height: this.height,
            borderTop: "1px solid #eaeefb",
            transition: `height ${this.time}s linear`
          };
    }
  },
  methods: {
    handleCollapse() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="less" scoped>
.demo-box {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    .demo-box-control-container {
      padding-left: 62px !important;
    }
  }
  .demo-box-meta {
    height: 0;
    background-color: #fafafa;
    border-top: none;
    transition: height 0.2s linear;
    overflow: hidden;
  }
  .demo-box-control {
    height: 44px;
    color: #d3dce6;
    text-align: center;
    background-color: #fff;
    border-top: 1px solid #eaeefb;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    .demo-box-control-container {
      display: inline-block;
      padding-left: 92px;
      width: 200px;
      height: 100%;
      text-align: left;
      transition: padding-left 0.2s linear;
      overflow: hidden;
      i {
        font-size: 16px;
        line-height: 43px;
      }
      .demo-box-control-text {
        margin-left: 10px;
        font-size: 14px;
        line-height: 43px;
      }
    }
  }
}
</style>
