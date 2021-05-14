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
      <div class="charts-item" v-for="(item, index) in charts" :key="index">
        <el-link
          icon="el-icon-delete"
          :underline="false"
          type="danger"
          @click="deleteChart(index)"
        ></el-link>

        <template v-if="item.type === 'table'">
          <jk-table
            :chart-name="item.name"
            :chart-data="item.data"
            :chart-colnames="item.colnames"
            :pagination-page-size="item.paginationPageSize"
            :pagination-total="item.paginationTotal"
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
      <el-form :label-width="labelWidth" :model="addInfo" ref="addInfo">
        <el-form-item :label="$t('savier.chartType')">
          <el-select class="w-90pc" v-model="addInfo.type">
            <el-option :label="$t('savier.table')" value="table"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('savier.chartId')"
          :rules="{
            required: true,
            message: ' ',
            trigger: 'blur'
          }"
          prop="id"
        >
          <el-input class="w-90pc" v-model="addInfo.id"></el-input>
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
      charts: [
        {
          chart_id: 7,
          type: "table"
        },
        {
          chart_id: 6,
          type: "table"
        }
      ],
      addVisible: false,
      addBtnLoading: false,
      addInfo: {
        type: "table",
        id: null
      }
    };
  },
  computed: {
    labelWidth() {
      return this.$i18n.locale === "zh-CN"
        ? "95px"
        : this.$i18n.locale === "en-US"
        ? "100px"
        : "150px";
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
        this.addBtnLoading = true;
        if (type === "table") {
          supersetService
            .TableData(id)
            .then(res => {
              this.charts.push({
                chart_id: id,
                type,
                name: res[0],
                data: res[2].result[0].data,
                colnames: res[2].result[0].colnames,
                paginationPageSize: res[1].page_length,
                paginationTotal: res[2].result[0].rowcount
              });
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
      this.$refs["addInfo"].clearValidate();
      this.addInfo.id = null;
      this.addInfo.type = "table";
      this.addVisible = false;
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
    .el-link {
      position: absolute;
      top: 20px;
      right: 20px;
      height: 0;
      font-size: 16px;
      overflow: hidden;
    }
    &:hover .el-link {
      height: 22px;
    }
  }
}
</style>
