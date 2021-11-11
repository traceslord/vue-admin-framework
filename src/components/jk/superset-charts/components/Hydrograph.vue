<template>
  <el-card
    shadow="hover"
    :style="{
      width: `${formatPixel(width)}`,
      height: `${formatPixel(height)}`
    }"
  >
    <export-btn
      v-if="isExport"
      :data="[{ [chartName]: val }]"
      :name="`${chartName}.csv`"
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
import "echarts-liquidfill";
import { formatPixel } from "../utils/format";
import { defaultby } from "../utils/defaultby";
import { formatColor } from "../utils/colors";
import ExportBtn from "./widgets/ExportBtn.vue";
import SkipBtn from "./widgets/SkipBtn.vue";

export default {
  components: {
    ExportBtn,
    SkipBtn
  },
  props: {
    id: [String, Number],
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
      chart: null
    };
  },
  computed: {
    size() {
      const { width, height } = this;
      return { width, height };
    },
    val() {
      const config = this.chartConfig;
      const metricName =
        config.metric && config.metric.label
          ? config.metric.label
          : config.metric;
      let value = this.chartData[0][metricName];
      value = config.echarts_data_preprocessing
        ? new Function(
            "params",
            `return ${config.echarts_data_preprocessing}`
          )()(value)
        : value;
      return value;
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
      const config = defaultby(this.chartConfig);
      const warningThreshold = Number(
        config.echarts_hydrograph_warning_threshold
      );
      const dangerThreshold = Number(
        config.echarts_hydrograph_danger_threshold
      );
      let color = config.echarts_hydrograph_theme_color;
      let gradientColor = config.echarts_hydrograph_theme_color_gradient;
      if (config.echarts_hydrograph_threshold_sort === "升序") {
        if (warningThreshold && warningThreshold > this.val) {
          color = config.echarts_hydrograph_warning_color;
          gradientColor = config.echarts_hydrograph_warning_color_gradient;
        }
        if (dangerThreshold && dangerThreshold > this.val) {
          color = config.echarts_hydrograph_danger_color;
          gradientColor = config.echarts_hydrograph_danger_color_gradient;
        }
      } else {
        if (warningThreshold && warningThreshold < this.val) {
          color = config.echarts_hydrograph_warning_color;
          gradientColor = config.echarts_hydrograph_warning_color_gradient;
        }
        if (dangerThreshold && dangerThreshold < this.val) {
          color = config.echarts_hydrograph_danger_color;
          gradientColor = config.echarts_hydrograph_danger_color_gradient;
        }
      }
      const series = [
        {
          type: "liquidFill",
          data: [this.val],
          shape: config.echarts_hydrograph_shape,
          label: {
            fontSize: config.echarts_hydrograph_font_size,
            fontWeight: config.echarts_hydrograph_font_weight,
            color: formatColor(color),
            insideColor: formatColor(config.echarts_hydrograph_inside_color)
          },
          emphasis: {
            itemStyle: {
              opacity: 0.8
            }
          },
          backgroundStyle: {
            color: formatColor(config.echarts_hydrograph_background_color)
          },
          color: [
            {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 1,
                  color: [formatColor(color)]
                },
                {
                  offset: 0,
                  color: [formatColor(gradientColor)]
                }
              ]
            }
          ],
          outline: {
            show: config.echarts_hydrograph_outline_show,
            borderDistance: config.echarts_hydrograph_outline_border_distance,
            itemStyle: {
              borderColor: formatColor(color),
              borderWidth: config.echarts_hydrograph_outline_border_width
            }
          }
        }
      ];

      this.chart.setOption({
        series,
        backgroundColor: formatColor(config.echarts_background_color)
      });
    }
  }
};
</script>
