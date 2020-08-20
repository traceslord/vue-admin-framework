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
        <div class="icon-title">{{ $t("icon.usage") }}</div>
        <demo-box class="icon-use-demo-box">
          <template v-slot:demo-box-source>
            <div class="demo-box-source">
              <i class="el-icon-s-home"></i>
              <i class="el-icon-menu"></i>
              <icon-svg svg-name="iconfont"></icon-svg>
              <icon-svg svg-name="menu"></icon-svg>
            </div>
          </template>
          <template v-slot:demo-box-meta>
            <div class="jk-highlight">
              <code class="jkhl color-brewer">
                <div>
                  <span class="jkhl-tag">
                    <span>&lt;</span>
                    <span class="jkhl-name">i </span>
                    <span class="jkhl-attr">class</span>
                    <span>=</span>
                    <span class="jkhl-string">"el-icon-s-home"</span>
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
                    <span class="jkhl-string">"el-icon-menu"</span>
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
                    <span class="jkhl-name">icon-svg </span>
                    <span class="jkhl-attr">svg-name</span>
                    <span>=</span>
                    <span class="jkhl-string">"menu"</span>
                    <span>&gt;</span>
                  </span>
                  <span class="jkhl-tag">
                    <span>&lt;/</span>
                    <span class="jkhl-name">icon-svg</span>
                    <span>&gt;</span>
                  </span>
                </div>
              </code>
            </div>
          </template>
        </demo-box>
      </div>
      <div class="icon-icons" id="icons">
        <div class="icon-title">{{ $t("icon.icons") }}</div>
        <el-tabs v-model="activeName" class="mt-8">
          <el-tab-pane label="Element-UI" name="el">
            <div class="icon-list" :style="{ width: iconListWidth }">
              <div
                class="icon-item"
                v-for="(icon, index) in elIcons"
                :key="index"
              >
                <i :class="icon"></i>
                <span>{{ icon }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('icon.diy')" name="svg">
            <div class="icon-list" :style="{ width: iconListWidth }">
              <div
                class="icon-item"
                v-for="(icon, index) in svgIcons"
                :key="index"
              >
                <icon-svg :svg-name="icon"></icon-svg>
                <span>{{ icon }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import icon from "@/data/icon";
import elementResizeDetectorMaker from "element-resize-detector";
import DemoBox from "@/components/DemoBox.vue";

export default {
  components: {
    DemoBox
  },
  data() {
    return {
      activeName: "el",
      iconListWidth: "",
      elIcons: icon["el-icons"],
      svgIcons: icon["svg-icons"]
    };
  },
  mounted() {
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("icons"), element => {
      const width = element.offsetWidth;
      if (width < 1016) {
        this.iconListWidth = "871px";
      } else if (width < 1161) {
        this.iconListWidth = "1016px";
      } else if (width < 1306) {
        this.iconListWidth = "1161px";
      } else if (width < 1451) {
        this.iconListWidth = "1306px";
      } else if (width < 1596) {
        this.iconListWidth = "1451px";
      } else if (width < 1741) {
        this.iconListWidth = "1596px";
      } else if (width < 1886) {
        this.iconListWidth = "1741px";
      } else if (width < 2031) {
        this.iconListWidth = "1886px";
      } else {
        this.iconListWidth = width + "px";
      }
    });
  },
  methods: {
    goGuide() {
      this.$router.push({ name: "IconGuide" });
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
.icon-title {
  font-size: 18px;
  color: #1f2f3d;
}
.icon-use {
  margin-top: 48px;
  .icon-use-demo-box {
    margin-top: 12px;
    .demo-box-source {
      padding: 24px 12px;
      svg,
      i {
        margin: 0 24px;
        font-size: 24px;
      }
    }
  }
}
.icon-icons {
  margin-top: 48px;
  min-height: 1000px;
  .icon-list {
    margin-top: 4px;
    margin-bottom: 36px;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    .icon-item {
      flex: none;
      width: 145px;
      height: 120px;
      text-align: center;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      i,
      svg {
        display: block;
        margin: 24px auto 12px;
        font-size: 32px;
        color: #606266;
        transition: color 0.15s linear;
      }
      span {
        padding: 0 3px;
        font-size: 13px;
        font-family: icomoon;
        color: #99a9bf;
        transition: color 0.15s linear;
      }
      &:hover {
        z-index: 2;
        box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.1);
        i,
        svg,
        span {
          color: #5cb6ff;
        }
      }
    }
  }
}
</style>
