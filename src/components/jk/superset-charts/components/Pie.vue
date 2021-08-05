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
      const seriesValues = config.echarts_indicators.map(
        data => chartData[0][data]
      );
      const series = [
        {
          type: "pie",
          legendHoverLink: config.echarts_series_legend_hover_link,
          clockwise: config.echarts_pie_clockwise,
          startAngle: config.echarts_pie_start_angle,
          minAngle: config.echarts_pie_min_angle,
          minShowLabelAngle: config.echarts_pie_min_show_label_angle,
          roseType: config.echarts_pie_rose_type,
          avoidLabelOverlap: config.echarts_pie_avoid_label_overlap,
          stillShowZeroSum: config.echarts_pie_still_show_zero_sum,
          top: config.echarts_pie_top,
          bottom: config.echarts_pie_bottom,
          left: config.echarts_pie_left,
          right: config.echarts_pie_right,
          width: config.echarts_pie_width,
          height: config.echarts_pie_height,
          label: {
            show: config.echarts_pie_label_show,
            position: config.echarts_pie_label_position
          },
          center: [
            config.echarts_series_center_1,
            config.echarts_series_center_2
          ],
          radius: [
            config.echarts_series_radius_1,
            config.echarts_series_radius_2
          ],
          data: config.echarts_indicators.map((data, index) => ({
            name: data,
            value: seriesValues[index]
          }))
        }
      ];
      if (config.echarts_series_name) {
        series[0].name = config.echarts_series_name;
      }

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
        tooltip: {
          show: config.echarts_tooltip_show,
          trigger: config.echarts_tooltip_trigger,
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
