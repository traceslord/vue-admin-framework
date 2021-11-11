<template>
  <el-card
    shadow="hover"
    :style="{
      width: `${formatPixel(width)}`,
      height: `${formatPixel(height)}`
    }"
  >
    <export-btn v-if="isExport" :data="chartList" :name="`${chartName}.csv`"
      ><slot name="export"></slot
    ></export-btn>
    <skip-btn v-if="isSkip && chartId" :id="chartId"
      ><slot name="skip"></slot
    ></skip-btn>
    <div class="superset-charts-title">
      {{ chartName }}
      <el-popover v-if="chartDescription" placement="right" trigger="hover">
        <pre>{{ chartDescription }}</pre>
        <el-link
          icon="el-icon-info superset-charts-description"
          :underline="false"
          slot="reference"
        ></el-link>
      </el-popover>
    </div>
    <el-input
      v-if="chartConfig.include_search"
      style="margin-bottom: 12px; width: 180px"
      v-model="search"
      placeholder="输入关键字搜索..."
      size="mini"
      clearable
    ></el-input>
    <el-table
      border
      :data="tableList[paginationCurrentPage - 1]"
      :max-height="
        chartConfig.include_search
          ? formatPixel(height, 150)
          : formatPixel(height, 110)
      "
      :stripe="true"
      @sort-change="sortChange"
    >
      <el-table-column
        v-for="(data, index) in chartColnames"
        :key="index"
        :label="data"
        :prop="data"
        sortable="custom"
      ></el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="total, prev, pager, next, jumper"
      :current-page.sync="paginationCurrentPage"
      :page-size="paginationPageSize"
      :total="chartList.length"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { formatPixel } from "../utils/format";
import { sort } from "../utils/sort";
import ExportBtn from "./widgets/ExportBtn.vue";
import SkipBtn from "./widgets/SkipBtn.vue";

export default {
  components: {
    ExportBtn,
    SkipBtn
  },
  props: {
    chartId: [String, Number],
    chartName: {
      type: String,
      default: ""
    },
    chartDescription: {
      type: String,
      default: ""
    },
    chartConfig: {
      type: Object,
      default: () => {}
    },
    chartData: {
      type: Array,
      default: () => []
    },
    chartColnames: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: 600
    },
    height: {
      type: [String, Number],
      default: 400
    },
    isSkip: {
      type: Boolean,
      default: false
    },
    isExport: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: "",
      chartList: JSON.parse(JSON.stringify(this.chartData)),
      paginationCurrentPage: 1,
      paginationPageSize: Number(this.chartConfig.page_length) || 20
    };
  },
  computed: {
    tableList() {
      const length = this.chartList.length;
      const result = [];
      for (let i = 0; i < length; i += this.paginationPageSize) {
        result.push(this.chartList.slice(i, i + this.paginationPageSize));
      }
      return result;
    }
  },
  watch: {
    search(val) {
      this.chartList = this.chartData.filter(
        data => !val || this.haveSearch(data)
      );
      this.paginationCurrentPage = 1;
    }
  },
  methods: {
    formatPixel(val, num) {
      return formatPixel(val, num);
    },
    haveSearch(obj) {
      return this.chartColnames
        .map(data =>
          String(obj[data])
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
        .includes(true);
    },
    sortChange(obj) {
      switch (obj.order) {
        case "ascending":
          sort(this.chartList, obj.prop, "升序");
          break;
        case "descending":
          sort(this.chartList, obj.prop, "降序");
          break;
        default:
          this.chartList = JSON.parse(JSON.stringify(this.chartData));
      }
    }
  }
};
</script>

<style lang="less">
.superset-charts-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.superset-charts-description {
  margin-left: 2px;
  color: #909399;
}
</style>
