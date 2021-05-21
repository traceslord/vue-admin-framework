<template>
  <el-card
    shadow="hover"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div class="superset-charts-title">{{ chartName }}</div>
    <el-table
      border
      :data="chartDataArr[paginationCurrentPage - 1]"
      :max-height="height - 120"
      :stripe="true"
    >
      <el-table-column
        v-for="(data, index) in chartColnames"
        :key="index"
        :label="data"
        :prop="data"
      ></el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="total, prev, pager, next, jumper"
      :current-page.sync="paginationCurrentPage"
      :page-size="paginationPageSize"
      :total="paginationTotal"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  props: {
    chartName: {
      type: String,
      default: ""
    },
    chartData: {
      type: Array,
      default: () => []
    },
    chartColnames: {
      type: Array,
      default: () => []
    },
    paginationPageSize: {
      type: Number,
      default: 20
    },
    paginationTotal: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      paginationCurrentPage: 1,
      maxHeight: 280
    };
  },
  computed: {
    chartDataArr() {
      const length = this.chartData.length;
      const result = [];
      for (let i = 0; i < length; i += this.paginationPageSize) {
        result.push(this.chartData.slice(i, i + this.paginationPageSize));
      }
      return result;
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
</style>
