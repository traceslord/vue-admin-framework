<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div slot="header">
        <span class="brand-color">一级导航</span>
      </div>
      <div class="title">单页</div>
      <div
        class="demo-box"
        @mouseenter="showDemoControlText = true"
        @mouseleave="showDemoControlText = false"
      >
        <div class="demo-box-source">
          <div class="demo-box-source-nav_1 light-green">一级导航</div>
        </div>
        <div class="demo-box-meta" :style="demoMetaStyle">
          <div class="jk-highlight">
            <code class="jkhl color-brewer">
              <div>
                <span class="jkhl-keyword">import</span>
                <span> Home </span>
                <span class="jkhl-keyword">from</span>
                <span class="jkhl-string"> "@/views/Home"</span>
                <span>;</span>
              </div>
              <div style="margin-top: 10px"></div>
              <div>
                <span class="jkhl-keyword">export</span>
                <span class="jkhl-keyword"> default</span>
                <span> [</span>
              </div>
              <div style="margin-left: 16px">
                <span>{</span>
              </div>
              <div style="margin-left: 32px">
                <span>path:</span>
                <span class="jkhl-string"> "/admin"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>name:</span>
                <span class="jkhl-string"> "Home"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>component: Home,</span>
              </div>
              <div style="margin-left: 32px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 48px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("common.brand") }} - {{ $t("common.admin") }}"</span
                >
                <span>,</span>
              </div>
              <div style="margin-left: 48px">
                <span>nav: {</span>
              </div>
              <div style="margin-left: 64px">
                <span>icon:</span>
                <span class="jkhl-string"> "el-icon-s-home"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 64px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("nav.home.name") }}"</span>
              </div>
              <div style="margin-left: 48px">
                <span>}</span>
              </div>
              <div style="margin-left: 32px">
                <span>}</span>
              </div>
              <div style="margin-left: 16px">
                <span>}</span>
              </div>
              <div>
                <span>];</span>
              </div>
            </code>
          </div>
        </div>
        <div class="demo-box-control" @click="handleCollapse">
          <div class="demo-box-control-container">
            <i
              :class="collapse ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            ></i>
            <transition name="el-fade-in-linear">
              <span
                class="demo-box-control-text"
                v-show="showDemoControlText"
                >{{
                  collapse ? $t("icon.showCode") : $t("icon.hiddenCode")
                }}</span
              >
            </transition>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: true,
      showDemoControlText: false
    };
  },
  computed: {
    demoMetaStyle() {
      return this.collapse
        ? { height: 0, borderTop: "none" }
        : { height: "380px", borderTop: "1px solid #eaeefb" };
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
.title {
  margin-top: 12px;
  font-size: 18px;
  color: #1f2f3d;
}
.demo-box {
  margin-top: 12px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    .demo-box-control-container {
      padding-left: 62px !important;
    }
  }
  .demo-box-source {
    padding: 24px;
    .demo-box-source-nav_1 {
      padding: 24px 48px;
      height: 100px;
      color: #13ce66;
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
