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
      let chartData = config.echarts_data_preprocessing
        ? new Function(
            "params",
            `return ${config.echarts_data_preprocessing}`
          )()(this.chartData)
        : this.chartData;
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

      const planData = chartData.map(item => {
        const startTime = new Date(item[config.echarts_start_time]).getTime();
        const endTime = new Date(item[config.echarts_end_time]).getTime();
        return {
          yAxis: item[config.echarts_y],
          startTime,
          endTime: item[config.echarts_end_time]
            ? endTime
            : startTime + 86400000 * config.echarts_plan_period,
          progress: item[config.echarts_x]
        };
      });
      const currentProgress = planData.map(
        data =>
          ((data.endTime - data.startTime) * data.progress) / 100 +
          data.startTime
      );
      const otherData = chartData.map(item => {
        const obj = {};
        config.echarts_indicators.forEach(data => {
          obj[data] = item[data];
        });
        return obj;
      });

      const series = [
        {
          type: "bar",
          name: "计划开始时间",
          stack: "time",
          itemStyle: {
            color: formatColor(config.echarts_gantt_hidden),
            borderColor: formatColor(config.echarts_gantt_hidden)
          },
          emphasis: {
            itemStyle: {
              color: formatColor(config.echarts_gantt_hidden),
              borderColor: formatColor(config.echarts_gantt_hidden)
            }
          },
          barWidth: 15,
          zlevel: -1,
          z: 4,
          data: planData.map(item => item.startTime)
        },
        {
          type: "bar",
          name: "计划结束时间",
          stack: "time",
          itemStyle: {
            color: formatColor(config.echarts_gantt_period),
            borderColor: formatColor(config.echarts_gantt_hidden)
          },
          emphasis: {
            itemStyle: {
              color: formatColor(config.echarts_gantt_period),
              borderColor: formatColor(config.echarts_gantt_hidden)
            }
          },
          barWidth: 15,
          zlevel: -1,
          z: 2,
          data: planData.map(item => item.endTime),
          markLine: {
            symbol: ["none", "none"],
            label: {
              formatter: params =>
                config.echarts_series_mark_line_formatter_prefix +
                formatDate.formatDay(params.value)
            },
            lineStyle: {
              color: "#909399"
            },
            data: [
              {
                xAxis:
                  new Date().getTime() +
                  config.echarts_series_mark_line_formatter_num * 86400000
              }
            ]
          }
        },
        {
          type: "bar",
          name: "当前进度",
          stack: "time",
          itemStyle: {
            color: formatColor(config.echarts_gantt_progress),
            borderColor: formatColor(config.echarts_gantt_hidden)
          },
          emphasis: {
            itemStyle: {
              color: formatColor(config.echarts_gantt_progress),
              borderColor: formatColor(config.echarts_gantt_hidden)
            }
          },
          barWidth: 15,
          zlevel: -1,
          z: 3,
          data: currentProgress
        },
        {
          type: "bar",
          name: "其他指标",
          data: otherData
        }
      ];

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
          data: ["当前进度", "计划结束时间"]
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
          type: "time",
          name: config.echarts_x_axis_name,
          nameLocation: config.echarts_x_axis_name_location,
          nameTextStyle: {
            color: "#303133"
          },
          nameGap: config.echarts_x_axis_name_gap,
          nameRotate: config.echarts_x_axis_name_rotate,
          inverse: config.echarts_x_axis_inverse,
          axisLine: {
            lineStyle: {
              color: formatColor(config.echarts_grid_border_color),
              width: 0
            }
          },
          axisLabel: {
            rotate: config.echarts_x_axis_label_rotate,
            margin: 12,
            formatter: value => formatDate.formatDay(value),
            color: "#303133"
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          show: config.echarts_y_axis_show,
          type: "category",
          name: config.echarts_y_axis_name,
          nameLocation: config.echarts_y_axis_name_location,
          nameTextStyle: {
            color: "#303133"
          },
          nameGap: config.echarts_y_axis_name_gap,
          nameRotate: config.echarts_y_axis_name_rotate,
          inverse: config.echarts_y_axis_inverse,
          axisLine: {
            lineStyle: {
              color: formatColor(config.echarts_grid_border_color),
              width: 0
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: config.echarts_y_axis_label_rotate,
            formatter: new Function(
              `return ${config.echarts_y_axis_label_formatter}`
            )(),
            color: "#303133"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eaeaea"
            }
          },
          data: chartData.map(item => {
            const obj = JSON.parse(JSON.stringify(item));
            const startTime = obj[config.echarts_start_time];
            const endTime = obj[config.echarts_end_time];
            obj[config.echarts_start_time] = formatDate.formatDay(startTime);
            obj[config.echarts_end_time] = endTime
              ? formatDate.formatDay(endTime)
              : formatDate.formatDay(
                  startTime + 86400000 * config.echarts_plan_period
                );
            obj[config.echarts_x] =
              Math.round(obj[config.echarts_x] * 100) / 100;
            let str = `${config.echarts_y}：${obj[config.echarts_y]}`;
            Object.keys(obj).forEach(data => {
              if (data === config.echarts_y) return;
              str += `|||${data}：${obj[data]}`;
            });
            return str;
          })
        },
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
