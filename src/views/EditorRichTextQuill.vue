<template>
  <div class="page-content-container" id="quill-page">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div class="quill-container">
        <div class="quill-header">
          <div class="quill-header-introduction_1">
            {{ $t("editor.views.quill.introduction_1") }}
          </div>
          <div class="quill-header-introduction_2">
            {{ $t("editor.views.quill.introduction_2") }}
          </div>
        </div>
        <div class="quill-mainer" :class="{ flex }">
          <rich-text
            class="quill-mainer-editor"
            :value.sync="value"
          ></rich-text>
          <div class="quill-mainer-html">
            <div class="quill-html-container" v-html="value"></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichText from "@/components/editor/RichTextQuill";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  components: {
    RichText
  },
  data() {
    return {
      value: "",
      flex: false
    };
  },
  mounted() {
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("quill-page"), element => {
      const width = element.offsetWidth;
      if (width > 1560) this.flex = true;
      else this.flex = false;
    });
  }
};
</script>

<style lang="less" scoped>
.quill-container {
  margin: 16px 32px;
  min-height: 550px;
  .quill-header {
    margin-bottom: 24px;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    border-radius: 4px;
    .quill-header-introduction_1 {
      margin: 12px 0;
      font-size: 20px;
      font-weight: 300;
      line-height: 1.5em;
      color: #5e6d82;
    }
    .quill-header-introduction_2 {
      margin: 12px 0;
      font-size: 14px;
      line-height: 1.5em;
      color: #141f29;
    }
  }
  .quill-mainer {
    .quill-mainer-editor {
      margin-bottom: 24px;
      /deep/.ql-toolbar,
      /deep/.ql-container {
        border: 1px solid #ebeef5;
      }
      /deep/.ql-container {
        border-top: 0px;
        /deep/.ql-editor {
          padding: 24px 40px;
          min-height: 300px;
          &:before {
            left: 40px;
          }
        }
      }
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
    .quill-mainer-html {
      margin-bottom: 24px;
      min-height: 300px;
      border: 1px solid #ebeef5;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .quill-html-container {
        padding: 24px 40px;
      }
    }
    &.flex {
      display: flex;
      .quill-mainer-editor,
      .quill-mainer-html {
        flex: 1;
        margin: 0 10px 8px;
      }
      /deep/.ql-editor,
      .quill-mainer-html {
        min-height: 600px !important;
      }
    }
  }
}
</style>
