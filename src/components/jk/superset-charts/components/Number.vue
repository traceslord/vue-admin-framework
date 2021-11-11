<template>
  <div
    class="card-item"
    :style="{
      width: `${formatPixel(width)}`,
      height: `${formatPixel(height)}`,
      alignItems: `${chartConfig.jk_align_items}`,
      justifyContent: `${chartConfig.jk_justify_content}`,
      backgroundColor,
      paddingTop: `${formatPixel(chartConfig.jk_padding_top)}`,
      paddingBottom: `${formatPixel(chartConfig.jk_padding_bottom)}`,
      paddingLeft: `${formatPixel(chartConfig.jk_padding_left)}`,
      paddingRight: `${formatPixel(chartConfig.jk_padding_right)}`
    }"
  >
    <export-btn
      v-if="isExport"
      :data="[{ [chartConfig.jk_title]: val }]"
      :name="`${chartConfig.jk_title}.csv`"
      ><slot name="export"></slot
    ></export-btn>
    <skip-btn v-if="isSkip && chartId" :id="chartId"
      ><slot name="skip"></slot
    ></skip-btn>
    <div>
      <div
        :style="{
          fontSize: `${formatPixel(chartConfig.jk_number_font_size)}`,
          fontWeight: `${chartConfig.jk_number_font_weight}`,
          color: numberColor
        }"
      >
        {{ val }}
      </div>
      <div
        :style="{
          marginTop: `${formatPixel(chartConfig.jk_spacing)}`,
          fontSize: `${formatPixel(chartConfig.jk_title_font_size)}`,
          fontWeight: `${chartConfig.jk_title_font_weight}`,
          color: titleColor
        }"
      >
        {{ chartConfig.jk_title }}
        <el-tooltip v-if="chartDescription" :content="chartDescription">
          <el-link
            icon="el-icon-info superset-charts-description"
            :underline="false"
          ></el-link>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPixel } from "../utils/format";
import { formatColor } from "../utils/colors";
import ExportBtn from "./widgets/ExportBtn.vue";
import SkipBtn from "./widgets/SkipBtn.vue";

export default {
  components: {
    ExportBtn,
    SkipBtn
  },
  props: {
    chartId: [String, Number],
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
      default: 150
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
      backgroundColor: formatColor(this.chartConfig.jk_background_color),
      numberColor: formatColor(this.chartConfig.jk_number_color),
      titleColor: formatColor(this.chartConfig.jk_title_color)
    };
  },
  computed: {
    val() {
      const config = this.chartConfig;
      let value = this.chartData;
      value = config.echarts_data_preprocessing
        ? new Function(
            "params",
            `return ${config.echarts_data_preprocessing}`
          )()(value)
        : value;
      if (config.jk_number_formatter)
        value = new Function("num", `return ${config.jk_number_formatter}`)()(
          value
        );
      return value;
    }
  },
  methods: {
    formatPixel(val, num) {
      return formatPixel(val, num);
    }
  }
};
</script>

<style lang="less" scoped>
.card-item {
  display: flex;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.5s;
  &:nth-child(-n + 5) {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  &:nth-child(5n + 1) {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }
  &:hover {
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
}
</style>
