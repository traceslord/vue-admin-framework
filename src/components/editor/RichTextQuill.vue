<template>
  <div v-loading="loading">
    <quillEditor
      ref="editor"
      v-model="content"
      :options="editorOption"
    ></quillEditor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { HuaweiObsService } from "@/global/service/huawei";
// import qiniuService from "@/global/service/qiniu";

const uploadConfig = {
  accept: "image/jpeg image/gif image/png",
  uploadLimit: 4096
};

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  // [{ indent: "-1" }, { indent: "+1" }],
  // [{ direction: "rtl" }],
  // [{ size: ["small", false, "large", "huge"] }],
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];

const handlers = function(that) {
  return {
    image() {
      // const space = that.space;
      // const folder = that.folder;
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", uploadConfig.accept);
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        fileInput.value = "";
        if (file.size > uploadConfig.uploadLimit * 1024) {
          if (uploadConfig.uploadLimit < 1024) {
            that.$message.error(
              that.$i18n.t("error.uploadLimit", {
                limit: uploadConfig.uploadLimit + "KB"
              })
            );
          } else {
            that.$message.error(
              that.$i18n.t("error.uploadLimit", {
                limit: uploadConfig.uploadLimit / 1024 + "MB"
              })
            );
          }
          return;
        }
        that.loading = true;
        const huaweiService = new HuaweiObsService();
        huaweiService
          .upload(file, that.platform)
          .then(res => {
            let length = this.quill.getSelection(true).index;
            this.quill.insertEmbed(length, "image", res.host + res.filepath);
            this.quill.setSelection(length + 1);
          })
          .finally(() => {
            that.loading = false;
          });
        // qiniuService
        //   .upload({ space, folder, file }, () => {})
        //   .then(res => {
        //     let length = this.quill.getSelection(true).index;
        //     this.quill.insertEmbed(length, "image", res.url);
        //     this.quill.setSelection(length + 1);
        //   })
        //   .finally(() => {
        //     that.loading = false;
        //   });
      });
      fileInput.click();
    }
  };
};

export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // huawei
    platform: {
      type: String,
      default: ""
    },

    // qiniu
    space: {
      type: String,
      default: ""
    },
    folder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      content: this.value || "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers(this)
          }
        },
        placeholder: this.$i18n.t("editor.components.placeholder")
      }
    };
  },
  mounted() {
    const val = this.disabled;
    this.changeDisabled(val);
  },
  watch: {
    content(val) {
      this.$emit("update:value", val);
    },
    value(val) {
      this.content = val;
    },
    disabled(val) {
      this.changeDisabled(val);
    }
  },
  methods: {
    changeDisabled(val) {
      this.$refs["editor"].quill.enable(!val);
    }
  }
};
</script>
