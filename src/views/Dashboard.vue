<template>
  <div
    ref="dashboard-page"
    class="page-content-container min-h-600"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <jk-btn
      class="update-btn"
      jk-class="jk-btn-round"
      style="position: fixed"
      :text="editing ? $t('savier.save') : $t('savier.edit')"
      :shadow="true"
      :type="editing ? 'danger' : 'primary'"
      round
      :icon="editing ? 'el-icon-document-checked' : 'el-icon-edit'"
      :loading="btnLoading"
      @click="toggleEdit"
    >
    </jk-btn>
    <jk-btn
      v-if="editing"
      class="add-btn"
      jk-class="jk-btn-round"
      style="position: fixed"
      :text="$t('savier.addChart')"
      :shadow="true"
      type="primary"
      round
      icon="el-icon-plus"
      @click="addVisible = true"
    >
    </jk-btn>
    <draggable
      class="dashboard-container"
      ghost-class="ghost-class"
      drag-class="drag-class"
      handle=".charts-item-draggable"
      filter=".charts-item-operation"
      v-model="charts"
      :animation="150"
      :forceFallback="true"
      :disabled="!editing"
    >
      <div
        class="charts-item"
        v-for="(item, index) in charts"
        :key="item.id || item.tid"
        :style="{
          width: `${formatWidth(item.width)}px`,
          height: `${item.height}px`
        }"
      >
        <div class="charts-item-mask" v-show="editing"></div>
        <div class="charts-item-draggable" v-show="editing"></div>
        <div
          class="charts-item-resize-row"
          :data-index="index"
          v-show="editing"
        ></div>
        <div
          class="charts-item-resize-col"
          :data-index="index"
          v-show="editing"
        ></div>
        <div
          class="charts-item-resize-se"
          :data-index="index"
          v-show="editing"
        ></div>
        <div class="charts-item-operation" v-show="editing">
          <el-dropdown @command="handleCommand" size="small" trigger="click">
            <el-link icon="el-icon-more" :underline="false"></el-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                :command="{ method: 'getEditInfo', index }"
                >{{ $t("savier.editChart") }}</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                :command="{ method: 'deleteChart', index }"
                >{{ $t("common.delete") }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-show="!editing" @click="skip(item.chart_id)">
          <icon-svg svg-name="skip" svg-class="charts-item-skip"></icon-svg>
        </div>

        <template v-if="item.type === 'echarts_bar'">
          <jk-bar
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-bar>
        </template>

        <template v-if="item.type === 'echarts_gantt'">
          <jk-gantt
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-gantt>
        </template>

        <template v-if="item.type === 'echarts_hydrograph'">
          <jk-hydrograph
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-hydrograph>
        </template>

        <template v-if="item.type === 'echarts_line'">
          <jk-line
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-line>
        </template>

        <template v-if="item.type === 'echarts_line_bar'">
          <jk-line-bar
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-line-bar>
        </template>

        <template v-if="item.type === 'jk_number'">
          <jk-number
            v-loading="item.loading"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-number>
        </template>

        <template v-if="item.type === 'echarts_pie'">
          <jk-pie
            v-loading="item.loading"
            :id="item.id || item.tid"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-config="item.config"
            :chart-data="item.data"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-pie>
        </template>

        <template v-if="item.type === 'table'">
          <jk-table
            v-loading="item.loading"
            :chart-name="item.name"
            :chart-description="item.description"
            :chart-data="item.data"
            :chart-colnames="item.colnames"
            :pagination-page-size="item.paginationPageSize"
            :pagination-total="item.paginationTotal"
            :width="formatWidth(item.width)"
            :height="item.height"
          ></jk-table>
        </template>

        <template v-if="!item.type">
          <el-card
            v-loading="item.loading"
            shadow="hover"
            :style="{
              width: `${formatWidth(item.width)}px`,
              height: `${item.height}px`
            }"
          ></el-card>
        </template>
      </div>
    </draggable>

    <el-dialog
      :title="`${$t('savier.addChart')}：`"
      :visible.sync="addVisible"
      width="500px"
      :before-close="clearAddInfo"
    >
      <el-form
        :label-width="addInfoLabelWidth"
        :model="addInfo"
        :rules="rules"
        ref="addInfo"
      >
        <el-form-item :label="$t('savier.chartId')" prop="id">
          <el-input class="w-90pc" v-model.number="addInfo.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('savier.width')" prop="width">
          <el-input class="w-90pc" v-model.number="addInfo.width"></el-input>
        </el-form-item>
        <el-form-item :label="$t('savier.height')" prop="height">
          <el-input class="w-90pc" v-model.number="addInfo.height"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="addChart"
            :loading="addBtnLoading"
            >{{ $t("savier.immediatelyAdd") }}</el-button
          >
          <el-button size="medium" @click="clearAddInfo">{{
            $t("common.cancel")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="`${$t('savier.editChart')}：`"
      :visible.sync="editVisible"
      width="400px"
      :before-close="clearEditInfo"
    >
      <el-form
        :label-width="editInfolabelWidth"
        :model="editInfo"
        :rules="rules"
        ref="editInfo"
      >
        <el-form-item :label="$t('savier.width')" prop="width">
          <el-input class="w-90pc" v-model.number="editInfo.width"></el-input>
        </el-form-item>
        <el-form-item :label="$t('savier.height')" prop="height">
          <el-input class="w-90pc" v-model.number="editInfo.height"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="editChart">{{
            $t("common.save")
          }}</el-button>
          <el-button size="medium" @click="clearEditInfo">{{
            $t("common.cancel")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import Draggable from "@/plugins/draggable";
import supersetService from "@/components/jk/superset-charts/service";
import {
  JkBar,
  JkGantt,
  JkHydrograph,
  JkLine,
  JkLineBar,
  JkNumber,
  JkPie,
  JkTable
} from "@/components/jk/superset-charts";

export default {
  components: {
    Draggable,
    JkBar,
    JkGantt,
    JkHydrograph,
    JkLine,
    JkLineBar,
    JkNumber,
    JkPie,
    JkTable
  },
  data() {
    return {
      tid: 100000000,
      loading: false,
      btnLoading: false,
      editing: false,
      charts: [
        {
          id: 1,
          chart_id: 13,
          width: 290,
          height: 150
        },
        {
          id: 2,
          chart_id: 13,
          width: 290,
          height: 150
        },
        {
          id: 3,
          chart_id: 13,
          width: 290,
          height: 150
        },
        {
          id: 4,
          chart_id: 13,
          width: 290,
          height: 150
        },
        {
          id: 5,
          chart_id: 1,
          width: 1220,
          height: 500
        },
        {
          id: 6,
          chart_id: 9,
          width: 1220,
          height: 500
        },
        {
          id: 7,
          chart_id: 14,
          width: 1220,
          height: 500
        },
        {
          id: 8,
          chart_id: 15,
          width: 1220,
          height: 800
        },
        {
          id: 9,
          chart_id: 10,
          width: 600,
          height: 400
        },
        {
          id: 10,
          chart_id: 12,
          width: 600,
          height: 400
        }
      ],
      resizeRowIndex: null,
      resizeColIndex: null,
      resizeSeIndex: null,
      pageWidth: null,
      addVisible: false,
      addBtnLoading: false,
      addInfo: {
        id: null,
        width: 600,
        height: 400
      },
      editVisible: false,
      editInfo: {
        index: null,
        width: null,
        height: null
      },
      rules: {
        id: [
          {
            required: true,
            trigger: "blur",
            message: this.$i18n.t("error.format", {
              attribute: this.$i18n.t("savier.chartId"),
              message: this.$i18n.t("error.notEmpty")
            })
          },
          {
            type: "integer",
            trigger: ["blur", "change"],
            message: this.$i18n.t("error.format", {
              attribute: this.$i18n.t("savier.chartId"),
              message: this.$i18n.t("error.integer")
            })
          }
        ],
        width: {
          required: true,
          trigger: ["blur", "change"],
          validator: (rule, value, callback) => {
            if (!value && value !== 0) {
              return callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.width"),
                    message: this.$i18n.t("error.notEmpty")
                  })
                )
              );
            }
            if (typeof value !== "number") {
              callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.width"),
                    message: this.$i18n.t("error.number")
                  })
                )
              );
            } else if (value < 100) {
              callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.width"),
                    message: this.$i18n.t("error.minLimit", { limit: 100 })
                  })
                )
              );
            } else {
              callback();
            }
          }
        },
        height: {
          required: true,
          trigger: ["blur", "change"],
          validator: (rule, value, callback) => {
            if (!value && value !== 0) {
              return callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.height"),
                    message: this.$i18n.t("error.notEmpty")
                  })
                )
              );
            }
            if (typeof value !== "number") {
              callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.height"),
                    message: this.$i18n.t("error.number")
                  })
                )
              );
            } else if (value < 100) {
              callback(
                new Error(
                  this.$i18n.t("error.format", {
                    attribute: this.$i18n.t("savier.height"),
                    message: this.$i18n.t("error.minLimit", { limit: 100 })
                  })
                )
              );
            } else {
              callback();
            }
          }
        }
      }
    };
  },
  computed: {
    addInfoLabelWidth() {
      return this.$i18n.locale === "zh-CN"
        ? "90px"
        : this.$i18n.locale === "en-US"
        ? "100px"
        : "150px";
    },
    editInfolabelWidth() {
      return this.$i18n.locale === "zh-CN"
        ? "70px"
        : this.$i18n.locale === "en-US"
        ? "80px"
        : "85px";
    }
  },
  created() {
    this.getDashboard();
  },
  mounted() {
    const erd = elementResizeDetectorMaker();
    erd.listenTo(
      this.$refs["dashboard-page"],
      el => (this.pageWidth = el.offsetWidth)
    );
  },
  destroyed() {
    this.unbind();
  },
  methods: {
    skip(id) {
      window.open(
        `https://superset.zhuhuajian.com/superset/explore/?form_data=%7B%22slice_id%22%3A%20${id}%7D`
      );
    },
    getDashboard() {
      this.loading = true;
      this.charts.forEach(data => {
        this.$set(data, "loading", true);
      });
      this.getData();
      this.loading = false;
    },
    getData() {
      this.charts.forEach(data => {
        supersetService
          .getData(data.chart_id)
          .then(res => {
            this.$set(data, "type", res[2].viz_type);
            this.$set(data, "name", res[0]);
            this.$set(data, "description", res[1]);
            this.$set(data, "data", res[3].result[0].data);
            if (res[2].viz_type === "table") {
              this.$set(data, "colnames", res[3].result[0].colnames);
              this.$set(data, "paginationPageSize", res[2].page_length);
              this.$set(data, "paginationTotal", res[3].result[0].rowcount);
            } else {
              this.$set(data, "config", res[2]);
            }
          })
          .finally(() => {
            data.loading = false;
          });
      });
    },
    deleteChart(index) {
      this.charts.splice(index, 1);
    },
    addChart() {
      this.$refs["addInfo"].validate(val => {
        if (!val) {
          this.$message.error(this.$i18n.t("error.missing"));
          return;
        }
        const id = this.addInfo.id;
        const width = this.addInfo.width;
        const height = this.addInfo.height;
        this.addBtnLoading = true;
        supersetService
          .getData(id)
          .then(res => {
            if (res[2].viz_type === "table") {
              this.charts.push({
                tid: this.tid,
                chart_id: id,
                width,
                height,
                type: res[2].viz_type,
                name: res[0],
                description: res[1],
                data: res[3].result[0].data,
                colnames: res[3].result[0].colnames,
                paginationPageSize: res[2].page_length,
                paginationTotal: res[3].result[0].rowcount
              });
            } else {
              this.charts.push({
                tid: this.tid,
                chart_id: id,
                width,
                height,
                type: res[2].viz_type,
                name: res[0],
                description: res[1],
                data: res[3].result[0].data,
                config: res[2]
              });
            }
            this.tid++;
            this.clearAddInfo();
            this.$message.success(
              this.$i18n.t("success.format", {
                attribute: this.$i18n.t("savier.add")
              })
            );
          })
          .finally(() => {
            this.addBtnLoading = false;
          });
      });
    },
    clearAddInfo() {
      this.addVisible = false;
      this.addInfo.id = null;
      this.addInfo.width = 600;
      this.addInfo.height = 400;
      this.$refs["addInfo"].clearValidate();
    },
    getEditInfo(index) {
      this.editInfo.index = index;
      this.editInfo.width = this.charts[index].width;
      this.editInfo.height = this.charts[index].height;
      this.editVisible = true;
    },
    editChart() {
      this.$refs["editInfo"].validate(val => {
        if (!val) {
          this.$message.error(this.$i18n.t("error.missing"));
          return;
        }
        const index = this.editInfo.index;
        this.charts[index].width = this.editInfo.width;
        this.charts[index].height = this.editInfo.height;
        this.clearEditInfo();
        this.$message.success(
          this.$i18n.t("success.format", {
            attribute: this.$i18n.t("common.save")
          })
        );
      });
    },
    clearEditInfo() {
      this.editVisible = false;
      this.$refs["editInfo"].clearValidate();
    },
    handleCommand(command) {
      this[command.method](command.index);
    },
    toggleEdit() {
      if (!this.editing) {
        this.editing = true;
        this.bind();
      } else {
        this.upDateInfo();
      }
    },
    upDateInfo() {
      if (this.btnLoading) return;
      this.btnLoading = true;
      this.editing = false;
      this.$message.success(this.$i18n.t("savier.saveSuccess"));
      this.btnLoading = false;
      this.unbind();
    },
    bind() {
      window.addEventListener("dragstart", this.preventDefault);
      window.addEventListener("dragend", this.preventDefault);
      window.addEventListener("mousedown", this.getInfo);
      window.addEventListener("mousemove", this.move);
      window.addEventListener("mouseup", this.release);
    },
    unbind() {
      window.removeEventListener("dragstart", this.preventDefault);
      window.removeEventListener("dragend", this.preventDefault);
      window.removeEventListener("mousedown", this.getInfo);
      window.removeEventListener("mousemove", this.move);
      window.removeEventListener("mouseup", this.release);
    },
    preventDefault(e) {
      e.preventDefault();
    },
    getInfo(e) {
      const className = e.target.className;
      if (className === "charts-item-resize-row") {
        const index = (this.resizeRowIndex = Number(e.target.dataset.index));
        this.charts[index].y = e.y;
      }
      if (className === "charts-item-resize-col") {
        const index = (this.resizeColIndex = Number(e.target.dataset.index));
        this.charts[index].x = e.x;
      }
      if (className === "charts-item-resize-se") {
        const index = (this.resizeSeIndex = Number(e.target.dataset.index));
        this.charts[index].x = e.x;
        this.charts[index].y = e.y;
      }
    },
    move(e) {
      const rowIndex = this.resizeRowIndex;
      const colIndex = this.resizeColIndex;
      const seIndex = this.resizeSeIndex;
      if (rowIndex || rowIndex === 0) {
        this.charts[rowIndex].height += e.y - this.charts[rowIndex].y;
        this.charts[rowIndex].y = e.y;
      }
      if (colIndex || colIndex === 0) {
        this.charts[colIndex].width += e.x - this.charts[colIndex].x;
        this.charts[colIndex].x = e.x;
      }
      if (seIndex || seIndex === 0) {
        this.charts[seIndex].width += e.x - this.charts[seIndex].x;
        this.charts[seIndex].height += e.y - this.charts[seIndex].y;
        this.charts[seIndex].x = e.x;
        this.charts[seIndex].y = e.y;
      }
    },
    release() {
      this.resizeRowIndex = null;
      this.resizeColIndex = null;
      this.resizeSeIndex = null;
    },
    formatWidth(num) {
      return num > this.pageWidth - 40 ? this.pageWidth - 40 : num;
    }
  }
};
</script>

<style lang="less" scoped>
.min-h-600 {
  min-height: 600px;
}
.update-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
.add-btn {
  position: fixed;
  bottom: 84px;
  right: 24px;
  z-index: 10;
}
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .charts-item {
    position: relative;
    margin-bottom: 20px;
    margin-right: 20px;
    .el-card {
      transition-property: box-shadow;
    }
    .charts-item-mask {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      border: 1px dashed #e0e0e0;
      border-radius: 4px;
    }
    .charts-item-draggable {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      cursor: move;
    }
    .charts-item-resize-row {
      z-index: 3;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      cursor: row-resize;
    }
    .charts-item-resize-col {
      z-index: 3;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      cursor: col-resize;
    }
    .charts-item-resize-se {
      z-index: 4;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
    }
    .charts-item-operation {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 22px;
      height: 22px;
      font-size: 16px;
      text-align: center;
      transform: rotate(90deg);
      overflow: hidden;
      .el-dropdown,
      .el-link {
        width: 100%;
        height: 100%;
      }
    }
    .charts-item-skip {
      position: absolute;
      top: 15px;
      right: 15px;
      display: none;
      width: 20px;
      height: 20px;
      color: #909399;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    &:hover .charts-item-mask {
      border: 1px dashed #409eff;
      background: rgba(255, 255, 255, 0);
    }
    &:hover .charts-item-operation {
      z-index: 3;
    }
    &:hover .charts-item-skip {
      display: block;
    }
  }
  .ghost-class .charts-item-mask,
  .drag-class .charts-item-mask {
    border: 1px dashed #409eff;
  }
  .ghost-class .charts-item-mask {
    background: rgba(255, 255, 255, 0);
  }
}
</style>
