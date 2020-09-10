<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div class="mavon-container">
        <div class="mavon-introduction-container">
          <div class="mavon-introduction">
            {{ $t("editor.views.mavon.introduction") }}
          </div>
        </div>
        <markdown :value.sync="value" video></markdown>
        <div class="markdown-it-introduction-container">
          <div class="markdown-it-name">
            {{ $t("editor.views.mavon.markdownIt") }}
          </div>
          <div class="markdown-it-introduction">
            {{ $t("editor.views.mavon.markdownItIntroduction") }}
          </div>
        </div>
        <div class="markdown-it-card">
          <markdown-it :md="value"></markdown-it>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Markdown from "@/components/editor/MarkdownMavon";
import MarkdownIt from "jk-markdown-it/MarkdownIt.vue";

export default {
  components: {
    Markdown,
    MarkdownIt
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style lang="less" scoped>
.mavon-container {
  margin: 16px 32px;
  .mavon-introduction-container {
    margin-bottom: 24px;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    border-radius: 4px;
    .mavon-introduction {
      margin: 12px 0;
      line-height: 1.6em;
      color: #5e6d82;
      // text-indent: 2em;
    }
  }
  .markdown-it-introduction-container {
    margin: 36px 0 24px;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    border-radius: 4px;
    .markdown-it-name {
      margin: 12px 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5em;
      color: #5e6d82;
    }
    .markdown-it-introduction {
      margin: 12px 0;
      font-size: 14px;
      line-height: 1.5em;
      color: #606266;
    }
  }
  .markdown-it-card {
    min-height: 260px;
    padding: 8px 25px 15px 25px;
    background-color: rgb(251, 251, 251);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  }
}
</style>
