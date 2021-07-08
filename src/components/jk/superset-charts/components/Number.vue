<template>
  <div
    class="card-item"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      alignItems: `${chartConfig.jk_align_items}`,
      justifyContent: `${chartConfig.jk_justify_content}`,
      background: `${backgroundColor}`,
      paddingTop: `${Number(chartConfig.jk_padding_top)}px`,
      paddingBottom: `${Number(chartConfig.jk_padding_bottom)}px`,
      paddingLeft: `${Number(chartConfig.jk_padding_left)}px`,
      paddingRight: `${Number(chartConfig.jk_padding_right)}px`
    }"
  >
    <div>
      <div
        :style="{
          fontSize: `${Number(chartConfig.jk_number_font_size)}px`,
          fontWeight: `${chartConfig.jk_number_font_weight}`,
          color: `${numberColor}`
        }"
      >
        {{ val }}
      </div>
      <div
        :style="{
          marginTop: `${Number(chartConfig.jk_spacing)}px`,
          fontSize: `${Number(chartConfig.jk_title_font_size)}px`,
          fontWeight: `${chartConfig.jk_title_font_weight}`,
          color: `${titleColor}`
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
import { formatColor } from "../utils/colors";

export default {
  props: {
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
      default: 150
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
      const metricName =
        config.metric && config.metric.label
          ? config.metric.label
          : config.metric;
      let value = this.chartData[0][metricName];
      if (config.jk_number_formatter)
        value = new Function("num", `return ${config.jk_number_formatter}`)()(
          value
        );
      return value;
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
