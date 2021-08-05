<template>
  <el-card
    shadow="hover"
    :style="{ width: `${width}px`, height: `${height}px` }"
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
        width: width - 40 + 'px',
        height: height - 72 + 'px'
      }"
    ></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { defaultby } from "../utils/defaultby";
import { formatColor } from "../utils/colors";

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
    drawChart() {
      const config = defaultby(this.chartConfig);
      const metricName =
        config.metric && config.metric.label
          ? config.metric.label
          : config.metric;
      const val = this.chartData[0][metricName];

      const warningThreshold = Number(
        config.echarts_hydrograph_warning_threshold
      );
      const dangerThreshold = Number(
        config.echarts_hydrograph_danger_threshold
      );
      let color = config.echarts_hydrograph_theme_color;
      let gradientColor = config.echarts_hydrograph_theme_color_gradient;
      if (config.echarts_hydrograph_threshold_sort === "升序") {
        if (warningThreshold && warningThreshold > val) {
          color = config.echarts_hydrograph_warning_color;
          gradientColor = config.echarts_hydrograph_warning_color_gradient;
        }
        if (dangerThreshold && dangerThreshold > val) {
          color = config.echarts_hydrograph_danger_color;
          gradientColor = config.echarts_hydrograph_danger_color_gradient;
        }
      } else {
        if (warningThreshold && warningThreshold < val) {
          color = config.echarts_hydrograph_warning_color;
          gradientColor = config.echarts_hydrograph_warning_color_gradient;
        }
        if (dangerThreshold && dangerThreshold < val) {
          color = config.echarts_hydrograph_danger_color;
          gradientColor = config.echarts_hydrograph_danger_color_gradient;
        }
      }
      const series = [
        {
          type: "liquidFill",
          data: [val],
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
