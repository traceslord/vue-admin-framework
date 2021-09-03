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
    <div style="display: flex">
      <el-select
        v-if="chartConfig.echarts_select"
        style="margin-right: 10px"
        v-model="selectIndex"
        size="small"
        placeholder="请选择"
        multiple
        clearable
        filterable
        collapse-tags
        @change="changeSelect"
      >
        <el-option
          v-for="(item, index) in selectOptions"
          :key="item"
          :label="item"
          :value="index"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-if="chartConfig.echarts_picker"
        type="datetimerange"
        v-model="selectTime"
        :picker-options="pickerOptions"
        size="small"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        range-separator="至"
        value-format="timestamp"
        @change="changeSelect"
      >
      </el-date-picker>
    </div>
    <div
      :ref="id"
      :style="{
        width: formatPixel(width, 40),
        height: chartConfig.echarts_select
          ? formatPixel(height, 104)
          : formatPixel(height, 72)
      }"
    ></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import { formatPixel } from "../utils/format";
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
      chart: null,
      selectIndex: [0],
      selectTime: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
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
    }
  },
  methods: {
    formatPixel(val, num) {
      return formatPixel(val, num);
    },
    drawChart() {
      const config = defaultby(this.chartConfig);
      let chartData = this.chartData;
      if (config.echarts_select) {
        chartData = this.selectData;
      }
      if (this.selectTime) {
        chartData = chartData.filter(
          d =>
            d[config.echarts_picker] >= this.selectTime[0] &&
            d[config.echarts_picker] <= this.selectTime[1]
        );
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
      let legendData = config.echarts_y_left.concat(config.echarts_y_right);
      const series = config.echarts_y_left
        .map(item => ({
          type: "line",
          name: item,
          showSymbol: config.echarts_series_show_symbol,
          showAllSymbol: config.echarts_series_show_all_symbol,
          symbol: config.echarts_series_symbol,
          symbolSize: [
            config.echarts_series_symbol_size_width,
            config.echarts_series_symbol_size_height
          ],
          symbolRotate: config.echarts_series_symbol_rotate,
          symbolOffset: [
            config.echarts_series_symbol_offset_horizontal,
            config.echarts_series_symbol_offset_vertical
          ],
          step: config.echarts_series_step,
          lineStyle: {
            type: config.echarts_series_line_style_type,
            width: config.echarts_series_line_style_width,
            opacity: config.echarts_series_line_style_opacity
          },
          areaStyle: {
            opacity: config.echarts_series_area_style_opacity
          },
          legendHoverLink: config.echarts_series_legend_hover_link,
          stack: config.echarts_series_stack,
          smooth: config.echarts_series_smooth,
          connectNulls: config.echarts_series_connect_nulls,
          data: chartData.map(data => data[item])
        }))
        .concat(
          config.echarts_y_right.map(item => ({
            type: "line",
            name: item,
            yAxisIndex: 1,
            showSymbol: config.echarts_series_show_symbol_2,
            showAllSymbol: config.echarts_series_show_all_symbol_2,
            symbol: config.echarts_series_symbol_2,
            symbolSize: [
              config.echarts_series_symbol_size_width_2,
              config.echarts_series_symbol_size_height_2
            ],
            symbolRotate: config.echarts_series_symbol_rotate_2,
            symbolOffset: [
              config.echarts_series_symbol_offset_horizontal_2,
              config.echarts_series_symbol_offset_vertical_2
            ],
            step: config.echarts_series_step_2,
            lineStyle: {
              type: config.echarts_series_line_style_type_2,
              width: config.echarts_series_line_style_width_2,
              opacity: config.echarts_series_line_style_opacity_2
            },
            areaStyle: {
              opacity: config.echarts_series_area_style_opacity_2
            },
            legendHoverLink: config.echarts_series_legend_hover_link_2,
            stack: config.echarts_series_stack_2,
            smooth: config.echarts_series_smooth_2,
            connectNulls: config.echarts_series_connect_nulls_2,
            data: chartData.map(data => data[item])
          }))
        );

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
          data: legendData
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
        xAxis: {
          show: config.echarts_x_axis_show,
          type: "category",
          name: config.echarts_x_axis_name,
          nameLocation: config.echarts_x_axis_name_location,
          nameGap: config.echarts_x_axis_name_gap,
          nameRotate: config.echarts_x_axis_name_rotate,
          inverse: config.echarts_x_axis_inverse,
          boundaryGap: false,
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
        },
        yAxis: [
          {
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
          },
          {
            show: config.echarts_y_axis_show_2,
            type: "value",
            name: config.echarts_y_axis_name_2,
            nameLocation: config.echarts_y_axis_name_location_2,
            nameGap: config.echarts_y_axis_name_gap_2,
            nameRotate: config.echarts_y_axis_name_rotate_2,
            inverse: config.echarts_y_axis_inverse_2,
            axisLabel: {
              rotate: config.echarts_y_axis_label_rotate_2
            }
          }
        ],
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
    },
    changeSelect() {
      this.drawChart();
    }
  }
};
</script>
