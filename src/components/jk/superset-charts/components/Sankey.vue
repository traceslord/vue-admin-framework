<template>
  <el-card
    shadow="hover"
    :style="{
      width: `${formatPixel(width)}`,
      height: `${formatPixel(height)}`
    }"
  >
    <export-btn v-if="isExport" :data="chartData" :name="`${chartName}.csv`"
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
      let chartData = config.echarts_data_preprocessing
        ? new Function(
            "params",
            `return ${config.echarts_data_preprocessing}`
          )()(this.chartData)
        : this.chartData;

      const series = {
        type: "sankey",
        lineStyle: {
          color: "gradient"
        },
        emphasis: {
          focus: "adjacency"
        },
        data: chartData[config.echarts_x],
        links: chartData[config.echarts_y]
      };

      this.chart.setOption({
        tooltip: {
          show: config.echarts_tooltip_show,
          trigger: "item",
          triggerOn: config.echarts_tooltip_trigger_on,
          formatter: new Function(
            `return ${config.echarts_tooltip_formatter}`
          )(),
          backgroundColor: formatColor(config.echarts_tooltip_background_color),
          borderColor: formatColor(config.echarts_tooltip_border_color),
          borderWidth: config.echarts_tooltip_border_width,
          padding: [
            config.echarts_tooltip_padding_top,
            config.echarts_tooltip_padding_right,
            config.echarts_tooltip_padding_bottom,
            config.echarts_tooltip_padding_left
          ],
          textStyle: {
            color: formatColor(config.echarts_tooltip_text_style_color)
          }
        },
        toolbox: {
          feature: {
            restore: {
              show: config.echarts_toolbox_feature_restore_show
            },
            saveAsImage: {
              show: config.echarts_toolbox_feature_save_as_image_show
            }
          }
        },
        series,
        backgroundColor: formatColor(config.echarts_background_color)
      });
    }
  }
};
</script>
