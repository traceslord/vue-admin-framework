<template>
  <div>
    <div
      class="jk-image-editor"
      id="jk-image-editor"
      :style="{ width, height, backgroundColor }"
    >
      <slot name="editor-content"></slot>
    </div>
    <el-dialog
      class="preview-dialog"
      :visible.sync="previewVisible"
      append-to-body
      :show-close="false"
    >
      <img class="preview-image-url" :src="previewImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

const options = {
  useCORS: true,
  backgroundColor: "transparent"
};

export default {
  props: {
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "700px"
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImageUrl: ""
    };
  },
  methods: {
    previewImage() {
      html2canvas(document.getElementById("jk-image-editor"), options).then(
        canvas => {
          this.previewImageUrl = canvas.toDataURL();
          this.previewVisible = true;
        }
      );
    },
    downloadImage() {
      html2canvas(document.getElementById("jk-image-editor"), options).then(
        canvas => {
          canvas.toBlob(blob => {
            const currentTimestamp = new Date().getTime();
            const imgUrl = URL.createObjectURL(blob);
            const aElement = document.createElement("a");
            document.body.appendChild(aElement);
            aElement.href = imgUrl;
            aElement.download = `image_${currentTimestamp}`;
            aElement.target = "_blank";
            aElement.click();
            document.body.removeChild(aElement);
          });
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.jk-image-editor {
  width: 500px;
  height: 700px;
  background-color: transparent;
  overflow: hidden;
}
.preview-dialog {
  /deep/.el-dialog {
    width: 500px;
    height: 700px;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      width: 100%;
      height: 100%;
      .preview-image-url {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
