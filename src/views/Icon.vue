<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div slot="header" class="card-header">
        <span class="brand-color">{{ $t("icon.name") }}</span>
        <el-link type="primary" :underline="false" @click="goGuide">{{
          $t("icon.operationalGuidelines")
        }}</el-link>
      </div>
      <div class="icon-description">{{ $t("icon.description") }}</div>
      <div class="icon-use">
        <div class="icon-use-title">{{ $t("icon.usage") }}</div>
        <div class="icon-use-demo-box">
          <div class="demo-box-source">
            <div>
              <icon-svg svg-name="iconfont"></icon-svg>
              <i class="el-icon-edit"></i>
              <i class="el-icon-share"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="demo-box-meta" :style="demoMetaStyle">
            <div class="jk-highlight">
              <code class="jkhl">
                <div>
                  <span class="jkhl-tag">
                    <span>&lt;</span>
                    <span class="jkhl-name">icon-svg </span>
                    <span class="jkhl-attr">svg-name</span>
                    <span>=</span>
                    <span class="jkhl-string">"iconfont"</span>
                    <span>&gt;</span>
                  </span>
                  <span class="jkhl-tag">
                    <span>&lt;/</span>
                    <span class="jkhl-name">icon-svg</span>
                    <span>&gt;</span>
                  </span>
                </div>
                <div>
                  <span class="jkhl-tag">
                    <span>&lt;</span>
                    <span class="jkhl-name">i </span>
                    <span class="jkhl-attr">class</span>
                    <span>=</span>
                    <span class="jkhl-string">"el-icon-edit"</span>
                    <span>&gt;</span>
                  </span>
                  <span class="jkhl-tag">
                    <span>&lt;/</span>
                    <span class="jkhl-name">i</span>
                    <span>&gt;</span>
                  </span>
                </div>
                <div>
                  <span class="jkhl-tag">
                    <span>&lt;</span>
                    <span class="jkhl-name">i </span>
                    <span class="jkhl-attr">class</span>
                    <span>=</span>
                    <span class="jkhl-string">"el-icon-share"</span>
                    <span>&gt;</span>
                  </span>
                  <span class="jkhl-tag">
                    <span>&lt;/</span>
                    <span class="jkhl-name">i</span>
                    <span>&gt;</span>
                  </span>
                </div>
                <div>
                  <span class="jkhl-tag">
                    <span>&lt;</span>
                    <span class="jkhl-name">i </span>
                    <span class="jkhl-attr">class</span>
                    <span>=</span>
                    <span class="jkhl-string">"el-icon-delete"</span>
                    <span>&gt;</span>
                  </span>
                  <span class="jkhl-tag">
                    <span>&lt;/</span>
                    <span class="jkhl-name">i</span>
                    <span>&gt;</span>
                  </span>
                </div>
              </code>
            </div>
          </div>
          <div class="demo-box-control" @click="handleCollapse">
            <i
              :class="collapse ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            ></i>
            <span class="demo-box-control-text">{{
              collapse ? $t("icon.showCode") : $t("icon.hiddenCode")
            }}</span>
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
      collapse: true
    };
  },
  computed: {
    demoMetaStyle() {
      return this.collapse
        ? { height: 0, borderTop: "none" }
        : { height: "142px", borderTop: "1px solid #eaeefb" };
    }
  },
  methods: {
    goGuide() {
      this.$router.push({ name: "IconGuide" });
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
.icon-description {
  margin-top: 12px;
  line-height: 1.6;
  text-indent: 2em;
}
.icon-use {
  margin-top: 36px;
  .icon-use-title {
    font-size: 18px;
  }
  .icon-use-demo-box {
    margin-top: 12px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
    .demo-box-source {
      padding: 24px 12px;
      svg,
      i {
        margin: 0 24px;
      }
    }
    .demo-box-meta {
      height: 0;
      background-color: #fafafa;
      border-top: none;
      transition: height 0.2s;
      overflow: hidden;
    }
    .demo-box-control {
      position: relative;
      height: 44px;
      color: #d3dce6;
      text-align: center;
      background-color: #fff;
      border-top: 1px solid #eaeefb;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
      &:hover {
        color: #409eff;
        background-color: #f9fafc;
      }
      i {
        font-size: 16px;
        line-height: 44px;
      }
      .demo-box-control-text {
        margin-left: 10px;
        font-size: 14px;
        line-height: 44px;
      }
    }
  }
}
</style>
