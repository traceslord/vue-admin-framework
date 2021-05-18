<template>
  <el-card
    shadow="hover"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div class="superset-charts-title">{{ chartName }}</div>
    <el-select
      v-if="chartConfig.echarts_select"
      v-model="selectIndex"
      size="small"
      placeholder="请选择"
      multiple
      clearable
      filterable
      collapse-tags
    >
      <el-option
        v-for="(item, index) in selectOptions"
        :key="item"
        :label="item"
        :value="index"
      >
      </el-option>
    </el-select>
    <div
      :ref="id"
      :style="{
        width: width - 40 + 'px',
        height: chartConfig.echarts_select
          ? height - 104 + 'px'
          : height - 72 + 'px'
      }"
    ></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import { defaultby } from "../utils/defaultby";
import { groupby } from "../utils/groupby";
import { sort } from "../utils/sort";
import { formatColor } from "../utils/colors";
import { formatDate } from "../utils/dates";

export default {
  props: {
    id: [String, Number],
    chartName: {
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
      chart: null,
      selectIndex: [0]
    };
  },
  computed: {
    size() {
      const { width, height } = this;
      return { width, height };
    },
    selectOptions() {
      const options = [];
      this.chartData.forEach(data => {
        if (options.indexOf(data[this.chartConfig.echarts_select]) === -1) {
          options.push(data[this.chartConfig.echarts_select]);
        }
      });
      return options;
    },
    selectData() {
      const selected = [];
      const datas = this.selectOptions.map(t =>
        this.chartData.filter(d => d[this.chartConfig.echarts_select] === t)
      );
      this.selectIndex.forEach(index => {
        selected.push(datas[index]);
      });
      return selected.flat();
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
    },
    selectIndex() {
      this.drawChart();
    }
  },
  methods: {
    drawChart() {
      const config = defaultby(this.chartConfig);
      let chartData = this.chartData;
      if (config.echarts_select) {
        chartData = this.selectData;
      }
      if (config.echarts_groupby) {
        chartData = groupby(
          chartData,
          config.echarts_groupby,
          config.echarts_groupby_aggregate,
          config.echarts_x
        );
      }
      if (config.echarts_sort) {
        sort(chartData, config.echarts_sort, config.echarts_order);
      }

      const legendNotSelected = {};
      config.echarts_legend_not_selected.forEach(data => {
        legendNotSelected[data] = false;
      });
      const xAxis = {
        show: config.echarts_x_axis_show,
        type: "category",
        name: config.echarts_x_axis_name,
        nameLocation: config.echarts_x_axis_name_location,
        nameGap: config.echarts_x_axis_name_gap,
        nameRotate: config.echarts_x_axis_name_rotate,
        inverse: config.echarts_x_axis_inverse,
        axisLabel: {
          interval: config.echarts_x_axis_label_interval,
          rotate: config.echarts_x_axis_label_rotate
        },
        data: chartData.map(data => {
          if (config.echarts_x_axis_data_format) {
            return formatDate.formatBox(
              config.echarts_x_axis_data_format_type,
              data[config.echarts_x]
            );
          }
          return data[config.echarts_x];
        })
      };
      const yAxis = {
        show: config.echarts_y_axis_show,
        type: "value",
        name: config.echarts_y_axis_name,
        nameLocation: config.echarts_y_axis_name_location,
        nameGap: config.echarts_y_axis_name_gap,
        nameRotate: config.echarts_y_axis_name_rotate,
        inverse: config.echarts_y_axis_inverse,
        axisLabel: {
          rotate: config.echarts_y_axis_label_rotate
        }
      };
      const series = config.echarts_indicators.map(item => ({
        type: "bar",
        name: item,
        stack: config.echarts_series_stack,
        barWidth: config.echarts_series_bar_width,
        barMaxWidth: config.echarts_series_bar_max_width,
        barMinWidth: config.echarts_series_bar_min_width,
        barMinHeight: config.echarts_series_bar_min_height,
        barGap: config.echarts_series_bar_gap,
        barCategoryGap: config.echarts_series_bar_category_gap,
        legendHoverLink: config.echarts_series_legend_hover_link,
        data: chartData.map(data => data[item])
      }));
      this.chart.setOption({
        legend: {
          show: config.echarts_legend_show,
          type: config.echarts_legend_type,
          top: config.echarts_legend_top,
          bottom: config.echarts_legend_bottom,
          left: config.echarts_legend_left,
          right: config.echarts_legend_right,
          width: config.echarts_legend_width,
          height: config.echarts_legend_height,
          orient: config.echarts_legend_orient,
          align: config.echarts_legend_align,
          padding: [
            config.echarts_legend_padding_top,
            config.echarts_legend_padding_right,
            config.echarts_legend_padding_bottom,
            config.echarts_legend_padding_left
          ],
          itemGap: config.echarts_legend_item_gap,
          itemWidth: config.echarts_legend_item_width,
          itemHeight: config.echarts_legend_item_height,
          icon: config.echarts_legend_icon,
          selected: legendNotSelected,
          data: config.echarts_indicators
        },
        grid: {
          show: config.echarts_grid_show,
          top: config.echarts_grid_top,
          bottom: config.echarts_grid_bottom,
          left: config.echarts_grid_left,
          right: config.echarts_grid_right,
          width: config.echarts_grid_width,
          height: config.echarts_grid_height,
          borderWidth: config.echarts_grid_border_width,
          borderColor: formatColor(config.echarts_grid_border_color),
          backgroundColor: formatColor(config.echarts_grid_background_color),
          containLabel: config.echarts_grid_contain_label
        },
        xAxis: config.echarts_axis_swap ? yAxis : xAxis,
        yAxis: config.echarts_axis_swap ? xAxis : yAxis,
        tooltip: {
          show: config.echarts_tooltip_show,
          trigger: config.echarts_tooltip_trigger,
          axisPointer: {
            type: config.echarts_tooltip_axis_pointer_type
          },
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
            magicType: {
              show: config.echarts_toolbox_feature_magic_type_show,
              type: ["line", "bar", "stack", "tiled"]
            },
            dataZoom: {
              show: config.echarts_toolbox_feature_data_zoom_show,
              title: {
                zoom: "缩放",
                back: "还原"
              }
            },
            restore: {
              show: config.echarts_toolbox_feature_restore_show
            },
            dataView: {
              show: config.echarts_toolbox_feature_data_view_show
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