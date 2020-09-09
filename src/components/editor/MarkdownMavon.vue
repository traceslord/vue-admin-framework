<template>
  <div v-loading="mdLoading">
    <mavon-editor
      ref="md"
      class="md"
      :toolbars="toolbars[option]"
      v-model="content"
      :subfield="false"
      :defaultOpen="defaultOpen"
      :placeholder="placeholder"
      :editable="!disabled"
      @imgAdd="imgAdd"
    ></mavon-editor>

    <div ref="diy" style="display: inline-block" v-if="video">
      <span class="op-icon-divider"></span>
      <button
        class="op-icon fa fa-mavon-video"
        type="button"
        aria-hidden="true"
        :title="$t('editor.components.uploadVideo')"
        :disabled="disabled"
        @click="videoVisible = true"
      ></button>
    </div>

    <el-dialog
      :title="$t('editor.components.uploadVideo')"
      :visible.sync="videoVisible"
      :width="dialogWidth"
      :before-close="clearVideoInfo"
      center
    >
      <el-button
        style="margin: 0 0 24px 24px"
        size="small"
        plain
        @click="linksVisible = true"
      >
        {{ $t("editor.components.obtainLink") }}
      </el-button>
      <el-form
        :label-width="dialogLabelWidth"
        :model="videoInfo"
        :rules="videoRules"
        ref="videoInfo"
      >
        <el-form-item
          :label="$t('editor.components.videoLink')"
          prop="src"
          :show-message="false"
        >
          <el-input
            style="width: 90%"
            v-model="videoInfo.src"
            :placeholder="$t('editor.components.videoLinkPlaceholder')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('editor.components.coverLink')"
          prop="poster"
          :show-message="false"
        >
          <el-input
            style="width: 90%"
            v-model="videoInfo.poster"
            :placeholder="$t('editor.components.coverLinkPlaceholder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadVideo">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>

    <el-drawer size="450px" :visible.sync="linksVisible" :with-header="false">
      <div style="padding: 36px; text-align: left">
        <el-alert
          :title="$t('editor.components.copyLink')"
          type="warning"
          show-icon
        ></el-alert>
        <el-upload
          style="margin-top: 16px"
          ref="upload"
          action=""
          :on-preview="handleOnPreview"
          :before-upload="handleBeforeUpload"
          :file-list="fileList"
        >
          <el-button
            size="small"
            plain
            :loading="btnLoading"
            icon="el-icon-upload"
          >
            {{ $t("editor.components.selectFile") }}
          </el-button>
        </el-upload>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import qiniuService from "@/global/service/qiniu";
// import { HuaweiObsService } from "@/global/service/huawei";
import i18n from "@/locales/i18n";

export default {
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    option: {
      type: String,
      default: "all"
    },
    defaultOpen: {
      type: String,
      default: "edit"
    },
    placeholder: {
      type: String,
      default: i18n.t("editor.components.placeholder")
    },
    disabled: {
      type: Boolean,
      default: false
    },
    video: {
      type: Boolean,
      default: false
    },

    // qiniu
    space: {
      type: String,
      default: ""
    },
    folder: {
      type: String,
      default: ""
    },

    // huawei
    platform: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      btnLoading: false,
      mdLoading: false,
      content: this.value || "",
      videoVisible: false,
      videoInfo: {
        src: "",
        poster: ""
      },
      videoRules: {
        src: { required: true, trigger: "blur" },
        poster: { required: true, trigger: "blur" }
      },
      linksVisible: false,
      fileList: [],
      toolbars: {
        all: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          // navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        assign_topic: {
          bold: true, // 粗体
          italic: true, // 斜体
          // header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          // mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          // htmlcode: true, // 展示html源码
          help: true, // 帮助
          // undo: true, // 上一步
          // redo: true, // 下一步
          // trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          // navigation: true, // 导航目录
          // alignleft: true, // 左对齐
          // aligncenter: true, // 居中
          // alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        readmodel: { readmodel: true }
      }
    };
  },
  computed: {
    dialogWidth() {
      return i18n.locale === "zh-CN"
        ? "600px"
        : i18n.locale === "en-US"
        ? "600px"
        : "650px";
    },
    dialogLabelWidth() {
      return i18n.locale === "zh-CN"
        ? "120px"
        : i18n.locale === "en-US"
        ? "120px"
        : "180px";
    }
  },
  mounted() {
    if (!this.video) return;
    const toolbar_left = this.$refs.md.$refs.toolbar_left;
    const diy = this.$refs.diy;
    toolbar_left.$el.append(diy);
  },
  watch: {
    value(val) {
      this.content = val;
    },
    content(val) {
      this.$emit("update:value", val);
    }
  },
  methods: {
    imgAdd(pos, file) {
      const space = this.space;
      const folder = this.folder;
      this.mdLoading = true;
      qiniuService
        .upload({ space, folder, file }, () => {})
        .then(res => {
          this.$refs.md.$img2Url(pos, res.url);
        })
        .finally(() => {
          this.mdLoading = false;
        });
      // const huaweiService = new HuaweiObsService();
      // huaweiService
      //   .upload(file, this.platform)
      //   .then(res => {
      //     this.$refs.md.$img2Url(pos, res.host + res.filepath);
      //   })
      //   .finally(() => {
      //     this.mdLoading = false;
      //   });
    },
    handleOnPreview(file) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", file.url);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$message.success(
          i18n.t("success.format", {
            attribute: i18n.t("editor.components.copy")
          })
        );
      }
      document.body.removeChild(input);
    },
    handleBeforeUpload(file) {
      if (!file || this.btnLoading) {
        return false;
      }
      const space = this.space;
      const folder = this.folder;
      this.btnLoading = true;
      qiniuService
        .upload({ space, folder, file }, () => {})
        .then(res => {
          this.$message.success(
            i18n.t("success.format", {
              attribute: i18n.t("editor.components.obtainLink")
            })
          );
          this.fileList.unshift({ name: res.name, url: res.url });
        })
        .finally(() => {
          this.btnLoading = false;
        });
      // const huaweiService = new HuaweiObsService();
      // huaweiService
      //   .upload(file, this.platform)
      //   .then(res => {
      //     this.$message.success(
      //       i18n.t("success.format", {
      //         attribute: i18n.t("editor.components.obtainLink")
      //       })
      //     );
      //     this.fileList.unshift({
      //       name: res.name,
      //       url: res.host + res.filepath
      //     });
      //   })
      //   .finally(() => {
      //     this.btnLoading = false;
      //   });
      return false;
    },
    uploadVideo() {
      this.$refs["videoInfo"].validate(val => {
        if (!val) {
          this.$message.error(i18n.t("error.missing"));
          return;
        }
        const md = this.$refs.md;
        md.insertText(md.getTextareaDom(), {
          prefix: `<video src="${this.videoInfo.src}" controls="controls" poster="${this.videoInfo.poster}"></video>`,
          subfix: "",
          str: ""
        });
        this.clearVideoInfo();
      });
    },
    clearVideoInfo() {
      this.$refs["videoInfo"].resetFields();
      this.videoVisible = false;
    }
  }
};
</script>

<style lang="less">
.md {
  video {
    width: 100%;
  }
  .op-image.popup-dropdown .dropdown-item:first-child {
    display: none;
  }
  .fa-mavon-video::before {
    content: "\1F4F9";
  }
}
</style>
