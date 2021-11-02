<template>
  <el-card
    shadow="hover"
    :style="{
      width: `${formatPixel(width)}`,
      height: `${formatPixel(height)}`
    }"
  >
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
    <div
      :ref="id"
      :style="{
        width: formatPixel(width, 40),
        height: formatPixel(height, 72)
      }"
    ></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import { formatPixel } from "../utils/format";

export default {
  props: {
    id: [String, Number],
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
    width: {
      type: [String, Number],
      default: 600
    },
    height: {
      type: [String, Number],
      default: 400
    }
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    size() {
      const { width, height } = this;
      return { width, height };
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs[this.id]);
    this.drawChart();
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    size() {
      this.$nextTick(() => {
        this.chart.resize();
      });
    }
  },
  methods: {
    formatPixel(val, num) {
      return formatPixel(val, num);
    },
    drawChart() {
      const option = this.chartConfig.echarts_data_preprocessing
        ? new Function(
            "params",
            `return ${this.chartConfig.echarts_data_preprocessing}`
          )()(this.chartData)
        : {};
      this.chart.setOption(option);
    }
  }
};
</script>
