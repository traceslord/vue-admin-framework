<template>
  <div class="image-common-page">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="previewImage"
        >图片预览</el-button
      >
      <el-button plain size="small" @click="downloadImage">下载图片</el-button>
    </div>
    <div class="drawing-container">
      <div class="drawing-mainer">
        <div class="drawing-mainer-container">
          <div class="drawing-content">
            <image-editor
              ref="imageEditor"
              :width="`${width}px`"
              :height="`${height}px`"
              :background-color="backgroundColor"
            >
              <template v-slot:editor-content>
                <span
                  :ref="`font_${index}`"
                  v-for="(item, index) in fonts"
                  :key="'font_' + index"
                  :style="
                    `zIndex: ${item.zIndex}; position: absolute; top: ${item.y}px; left: ${item.x}px; font-size: ${item.size}; font-weight: ${item.weight}; color: ${item.color}; cursor: default`
                  "
                  @mousedown="selectFont(index)"
                >
                  {{ item.content }}
                </span>
                <img
                  :ref="`image_${index}`"
                  class="drawing-image"
                  :style="
                    `zIndex: ${
                      item.zIndex
                    }; top: ${0}; left: ${0}; width: 200px`
                  "
                  v-for="(item, index) in images"
                  :key="'image_' + index"
                  :src="item.src"
                  @mousedown="selectImage(index)"
                  @dblclick="editImage(index)"
                />
              </template>
            </image-editor>
          </div>
        </div>
        <div class="fold-icon-wrapper" :class="fold" @click="handleFold">
          <icon-svg svg-class="fold-icon" svg-name="fold_2"></icon-svg>
        </div>
      </div>
      <div
        class="drawing-sidebar"
        :style="{ width: sidebarWidth, boxShadow: sidebarBoxShadow }"
      >
        <el-scrollbar class="scrollbar-section">
          <div class="drawing-sidebar-title">尺寸</div>
          <div class="drawing-sidebar-divider"></div>
          <div class="drawing-sidebar-size">
            <div class="size-item">
              宽度：<el-input
                class="w-90"
                v-model="width"
                size="mini"
                clearable
              ></el-input>
              px
            </div>
            <div class="size-item">
              高度：<el-input
                class="w-90"
                v-model="height"
                size="mini"
                clearable
              ></el-input>
              px
            </div>
          </div>
          <div class="drawing-sidebar-title">背景色</div>
          <div class="drawing-sidebar-divider"></div>
          <el-color-picker
            class="drawing-sidebar-swatches"
            v-model="backgroundColor"
            :predefine="predefineColors"
            show-alpha
          ></el-color-picker>
          <div class="drawing-sidebar-title">文案</div>
          <div class="drawing-sidebar-divider"></div>
          <div class="drawing-sidebar-font">
            <el-button
              icon="el-icon-circle-plus-outline"
              plain
              size="small"
              @click="addFont"
              >添加文案</el-button
            >
            <div class="font-list">
              <div
                class="font-item"
                v-for="(item, index) in fonts"
                :key="index"
              >
                <div>
                  <span class="label">内容：</span>
                  <el-input
                    style="width: 80%"
                    v-model="item.content"
                    size="mini"
                  ></el-input>
                </div>
                <div class="mt-12">
                  <span class="label">大小：</span>
                  <el-autocomplete
                    style="width: 74px"
                    v-model="item.size"
                    size="mini"
                    :fetch-suggestions="querySearch"
                  ></el-autocomplete>
                </div>
                <div class="flex mt-12">
                  <div class="flex_1">
                    <span class="label">x：</span>
                    <el-input
                      style="width: 60px"
                      v-model.number="item.x"
                      size="mini"
                    ></el-input>
                  </div>
                  <div class="flex_1">
                    <span class="label">字重：</span>
                    <el-select
                      style="width: 70px"
                      v-model="item.weight"
                      size="mini"
                    >
                      <el-option :value="100"></el-option>
                      <el-option :value="200"></el-option>
                      <el-option :value="300"></el-option>
                      <el-option :value="400"></el-option>
                      <el-option :value="500"></el-option>
                      <el-option :value="600"></el-option>
                      <el-option :value="700"></el-option>
                      <el-option :value="800"></el-option>
                      <el-option :value="900"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="flex mt-12">
                  <div class="flex_1">
                    <span class="label">y：</span>
                    <el-input
                      style="width: 60px"
                      v-model.number="item.y"
                      size="mini"
                    ></el-input>
                  </div>
                  <div class="flex_1">
                    <span class="label">颜色：</span>
                    <el-color-picker
                      v-model="item.color"
                      size="mini"
                      show-alpha
                    ></el-color-picker>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="drawing-sidebar-title">图片</div>
          <div class="drawing-sidebar-divider"></div>
          <el-upload
            class="material-upload"
            ref="upload"
            accept="image/*"
            action=""
            multiple
            :before-upload="handleBeforeUpload"
          >
            <el-button icon="el-icon-upload" plain size="small"
              >选择本地图片</el-button
            >
          </el-upload>
          <div class="image-list">
            <div
              v-for="(item, index) in fileList"
              :key="index"
              class="image-item"
            >
              <img :src="item.url" />
              <div>{{ item.name }}</div>
              <i class="el-icon-circle-plus" @click="addImage(item)"></i>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <el-dialog
      class="edit-dialog"
      :visible.sync="editVisible"
      append-to-body
      :show-close="false"
      :before-close="cancelEdit"
    >
      <div class="edit-dialog-content">
        <div class="edit-dialog-content-input">
          宽度：<el-input
            class="w-170"
            v-model="editWidth"
            size="small"
            clearable
          ></el-input>
          px
        </div>
        <div class="edit-dialog-content-input">
          高度：<el-input
            class="w-170"
            v-model="editHeight"
            size="small"
            clearable
          ></el-input>
          px
        </div>
        <div class="edit-dialog-content-btn">
          <el-button size="medium" @click="cancelEdit">取 消</el-button>
          <el-button size="medium" type="primary" @click="saveImage"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageEditor from "../index";
import materialArray from "@/assets/images/image-editor";

export default {
  components: {
    ImageEditor
  },
  data() {
    return {
      width: "500",
      height: "700",
      backgroundColor: "rgba(255, 255, 255, 0)",
      predefineColors: [
        "#1F295B",
        "#5565B1",
        "#99AFCA",
        "#7E4EA5",
        "#8B74D6",
        "#AB8FCB",
        "#526D73",
        "#8FBEC8",
        "#9DBBB3",
        "#81807E",
        "#A29476",
        "#C8B389",
        "#C40063",
        "#F68C8E",
        "#FFB980",
        "#734815",
        "#FAB202",
        "#ECCA58"
      ],
      zIndex: 1,
      images: [],
      currentIndex: null,
      fold: "",
      sidebarWidth: "",
      sidebarBoxShadow: "",
      fileList: [],
      editVisible: false,
      editIndex: null,
      editWidth: "",
      editHeight: "",
      fonts: [],
      fontIndex: null
    };
  },
  created() {
    this.getData();
    this.bind();
  },
  destroyed() {
    window.removeEventListener("dragstart", this.preventDefault);
    window.removeEventListener("dragend", this.preventDefault);
    window.removeEventListener("mousedown", this.getInfo);
    window.removeEventListener("mousemove", this.move);
    window.removeEventListener("mouseup", this.release);
  },
  methods: {
    getData() {
      materialArray.forEach(data => {
        const name = data.substr(5, 11);
        this.fileList.push({ name, url: data });
      });
    },
    bind() {
      window.addEventListener("dragstart", this.preventDefault);
      window.addEventListener("dragend", this.preventDefault);
      window.addEventListener("mousedown", this.getInfo);
      window.addEventListener("mousemove", this.move);
      window.addEventListener("mouseup", this.release);
    },
    preventDefault(e) {
      e.preventDefault();
    },
    previewImage() {
      this.$refs["imageEditor"].previewImage();
    },
    downloadImage() {
      this.$refs["imageEditor"].downloadImage();
    },
    handleFold() {
      if (this.fold) {
        this.fold = "";
        this.sidebarWidth = "360px";
        this.sidebarBoxShadow =
          "0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12)";
      } else {
        this.fold = "fold";
        this.sidebarWidth = 0;
        this.sidebarBoxShadow = "none";
      }
    },
    handleBeforeUpload(file) {
      const index = file.name.lastIndexOf(".");
      const name = file.name.slice(0, index);
      const url = URL.createObjectURL(file);
      this.fileList.unshift({ name, url });
      return false;
    },
    addImage(item) {
      this.images.push({ name: item.name, src: item.url, zIndex: this.zIndex });
      this.zIndex++;
    },
    addFont() {
      this.fonts.unshift({
        zIndex: this.zIndex,
        content: "新文案",
        size: "20px",
        color: "#303133",
        weight: 400,
        x: 0,
        y: 0
      });
      this.zIndex++;
    },
    selectImage(index) {
      this.currentIndex = index;
      this.$refs[`image_${index}`][0].style.zIndex = this.zIndex;
      this.zIndex++;
    },
    editImage(index) {
      this.editIndex = index;
      this.editWidth = this.$refs[`image_${index}`][0].width;
      this.editHeight = this.$refs[`image_${index}`][0].height;
      this.editVisible = true;
    },
    saveImage() {
      const index = this.editIndex;
      this.$refs[`image_${index}`][0].style.width = this.editWidth + "px";
      this.$refs[`image_${index}`][0].style.height = this.editHeight + "px";
      this.cancelEdit();
    },
    cancelEdit() {
      this.editVisible = false;
      this.editIndex = null;
    },
    selectFont(index) {
      this.fontIndex = index;
      this.fonts[index].zIndex = this.zIndex;
      this.zIndex++;
    },
    getInfo(e) {
      const index = this.currentIndex;
      const fontIndex = this.fontIndex;
      if (index || index === 0) {
        this.images[index].x = e.x;
        this.images[index].y = e.y;
        this.images[index].offsetTop = this.$refs[
          `image_${index}`
        ][0].offsetTop;
        this.images[index].offsetLeft = this.$refs[
          `image_${index}`
        ][0].offsetLeft;
      }
      if (fontIndex || fontIndex === 0) {
        this.fonts[fontIndex].mouseX = e.x;
        this.fonts[fontIndex].mouseY = e.y;
        this.fonts[fontIndex].oldX = this.fonts[fontIndex].x;
        this.fonts[fontIndex].oldY = this.fonts[fontIndex].y;
      }
    },
    move(e) {
      const index = this.currentIndex;
      const fontIndex = this.fontIndex;
      if (index || index === 0) {
        const top = e.y - this.images[index].y + this.images[index].offsetTop;
        const left = e.x - this.images[index].x + this.images[index].offsetLeft;
        this.$refs[`image_${index}`][0].style.top = top + "px";
        this.$refs[`image_${index}`][0].style.left = left + "px";
      }
      if (fontIndex || fontIndex === 0) {
        const maxWidth =
          this.width - this.$refs[`font_${fontIndex}`][0].offsetWidth;
        const maxHeight =
          this.height - this.$refs[`font_${fontIndex}`][0].offsetHeight;
        let x = e.x - this.fonts[fontIndex].mouseX + this.fonts[fontIndex].oldX;
        let y = e.y - this.fonts[fontIndex].mouseY + this.fonts[fontIndex].oldY;
        x = x > maxWidth ? maxWidth : x;
        x = x < 0 ? 0 : x;
        y = y > maxHeight ? maxHeight : y;
        y = y < 0 ? 0 : y;
        this.fonts[fontIndex].x = x;
        this.fonts[fontIndex].y = y;
      }
    },
    release() {
      this.currentIndex = null;
      this.fontIndex = null;
    },
    querySearch(queryString, cb) {
      cb([
        { value: "12px" },
        { value: "14px" },
        { value: "16px" },
        { value: "20px" },
        { value: "24px" },
        { value: "28px" },
        { value: "36px" },
        { value: "48px" },
        { value: "60px" }
      ]);
    }
  }
};
</script>

<style lang="less" scoped>
.image-common-page {
  .btn-box {
    z-index: 100;
    position: absolute;
    margin: 20px;
  }
  .drawing-container {
    display: flex;
    .drawing-mainer {
      position: relative;
      flex: 1;
      min-height: 910px;
      .drawing-mainer-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .drawing-content {
          position: relative;
          background-image: url("../../../../assets/images/image-editor/transparent.png");
          box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
            0 16px 24px 2px rgba(0, 0, 0, 0.14),
            0 6px 30px 5px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          .drawing-image {
            position: absolute;
          }
        }
      }
      .fold-icon-wrapper {
        position: absolute;
        top: 49px;
        right: -20px;
        z-index: 10;
        width: 20px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #dee0e3;
        border-radius: 4px;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        transform: rotate(180deg);
        transition: all 0.2s ease-out;
        cursor: pointer;
        &.fold {
          right: 0;
          border: 1px solid #dee0e3;
          border-right: none;
          transform: rotate(0);
        }
        &:hover .fold-icon {
          color: #409eff;
        }
        .fold-icon {
          color: #656a72;
        }
      }
    }
    .drawing-sidebar {
      position: relative;
      flex: none;
      margin: 25px 0;
      width: 360px;
      height: 860px;
      background-color: #fff;
      border-radius: 12px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
        0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
      transition: all 0.2s ease-out;
      overflow: hidden;
      .drawing-sidebar-title {
        margin-top: 28px;
        margin-left: 40px;
        color: #303133;
      }
      .drawing-sidebar-divider {
        margin: 8px 40px 12px;
        width: 280px;
        height: 1px;
        background-color: #dcdfe6;
      }
      .drawing-sidebar-size {
        margin-left: 40px;
        font-size: 14px;
        color: #606266;
        .size-item {
          margin-bottom: 10px;
        }
      }
      .drawing-sidebar-swatches {
        margin-left: 40px;
      }
      .drawing-sidebar-font {
        margin-left: 40px;
        margin-bottom: 40px;
        .font-list {
          .font-item {
            margin: 20px 40px 20px 0;
            padding: 16px 24px;
            height: 186px;
            font-size: 13px;
            color: #606266;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            .flex {
              display: flex;
              .flex_1 {
                flex: 1;
                .label {
                  display: inline-block;
                  width: 40px;
                  text-align: right;
                }
              }
            }
            .el-color-picker {
              vertical-align: middle;
            }
          }
        }
      }
      .material-upload {
        margin-left: 40px;
      }
      .image-list {
        margin-bottom: 60px;
        .image-item {
          display: flex;
          align-items: center;
          margin: 20px 40px;
          padding: 10px 10px 10px 90px;
          height: 92px;
          background-color: #f6f7f9;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          overflow: hidden;
          &:hover {
            background-color: #e6e6e6;
          }
          img {
            margin-left: -80px;
            width: 70px;
            height: 70px;
            object-fit: contain;
          }
          div {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding-left: 10px;
            width: 135px;
            height: auto;
            font-size: 14px;
            line-height: 24px;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i {
            margin-left: 20px;
            font-size: 20px;
            color: #409eff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.edit-dialog {
  /deep/.el-dialog {
    width: 400px;
    height: 220px;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      .edit-dialog-content {
        padding: 40px 80px;
        .edit-dialog-content-input {
          margin-bottom: 16px;
        }
        .edit-dialog-content-btn {
          margin-top: 24px;
          margin-left: 20px;
          .el-button {
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>
