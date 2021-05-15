<template>
  <div>
    <el-button
      class="header-btn"
      size="small"
      icon="el-icon-plus"
      @click="addVisible = true"
      >{{ $t("savier.addChart") }}</el-button
    >
    <div class="dashboard-container">
      <div
        class="charts-item"
        v-for="(item, index) in charts"
        :key="item.id || item.tid"
      >
        <div class="charts-item-operation">
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

        <template v-if="item.type === 'table'">
          <jk-table
            :chart-name="item.name"
            :chart-data="item.data"
            :chart-colnames="item.colnames"
            :pagination-page-size="item.paginationPageSize"
            :pagination-total="item.paginationTotal"
            :width="item.width"
            :height="item.height"
          ></jk-table>
        </template>
      </div>
    </div>

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
        <el-form-item :label="$t('savier.chartType')">
          <el-select class="w-90pc" v-model="addInfo.type">
            <el-option :label="$t('savier.table')" value="table"></el-option>
          </el-select>
        </el-form-item>
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
import supersetService from "@/components/jk/superset-charts/service";
import { JkTable } from "@/components/jk/superset-charts/components";

export default {
  components: {
    JkTable
  },
  data() {
    return {
      tid: 100000000,
      charts: [
        {
          id: 1,
          chart_id: 7,
          type: "table",
          width: 600,
          height: 400
        },
        {
          id: 2,
          chart_id: 6,
          type: "table",
          width: 600,
          height: 400
        }
      ],
      addVisible: false,
      addBtnLoading: false,
      addInfo: {
        type: "table",
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
        ? "95px"
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
    this.getData();
  },
  methods: {
    getData() {
      this.charts.forEach(data => {
        if (data.type === "table") {
          supersetService.TableData(data.chart_id).then(res => {
            this.$set(data, "name", res[0]);
            this.$set(data, "data", res[2].result[0].data);
            this.$set(data, "colnames", res[2].result[0].colnames);
            this.$set(data, "paginationPageSize", res[1].page_length);
            this.$set(data, "paginationTotal", res[2].result[0].rowcount);
          });
        }
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
        const type = this.addInfo.type;
        const width = this.addInfo.width;
        const height = this.addInfo.height;
        this.addBtnLoading = true;
        if (type === "table") {
          supersetService
            .TableData(id)
            .then(res => {
              this.charts.push({
                tid: this.tid,
                chart_id: id,
                type,
                width,
                height,
                name: res[0],
                data: res[2].result[0].data,
                colnames: res[2].result[0].colnames,
                paginationPageSize: res[1].page_length,
                paginationTotal: res[2].result[0].rowcount
              });
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
        }
      });
    },
    clearAddInfo() {
      this.addVisible = false;
      this.addInfo.id = null;
      this.addInfo.type = "table";
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
    }
  }
};
</script>

<style lang="less" scoped>
.header-btn {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff !important;
  background-color: #6777ef !important;
  border-color: #6777ef !important;
  box-shadow: 0 2px 6px #acb5f6;
  &:hover {
    background-color: #394eea !important;
    border-color: transparent !important;
  }
}
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .charts-item {
    position: relative;
    margin: 0 10px 20px;
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
    }
  }
}
</style>
