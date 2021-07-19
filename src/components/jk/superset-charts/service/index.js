import axios from "./axios";
import API from "./api";

const service = {
  securityLogin(params = {}) {
    return axios.post(API.securityLogin, params);
  },
  chartShow(id) {
    return axios.get(API.chartItem(id));
  },
  chartData(params = {}) {
    return axios.post(API.chartData, params);
  },
  async getData(id) {
    const res = await axios.get(API.chartItem(id));
    const config = JSON.parse(res.result.params);
    const ds = config.datasource.split("__");
    const params = {
      datasource: { id: Number(ds[0]), type: ds[1] },
      force: false,
      queries: [
        {
          annotation_layers: [],
          applied_time_extras: {},
          columns: [],
          custom_params: {},
          extras: {
            having: "",
            having_druid: [],
            time_grain_sqla: config.time_grain_sqla,
            time_range_endpoints: config.time_range_endpoints
          },
          filters: [],
          granularity: config.granularity_sqla,
          metrics: config.metrics || [],
          order_desc: true,
          orderby: [],
          time_range: config.time_range,
          timeseries_limit: 0,
          url_params: {}
        }
      ],
      result_format: "json",
      result_type: "full"
    };
    config.adhoc_filters.forEach(data => {
      if (data.expressionType === "SIMPLE") {
        params.queries[0].filters.push({
          col: data.subject,
          op: data.operator,
          val: data.comparator
        });
      } else if (data.clause === "WHERE") {
        params.queries[0].extras.where = params.queries[0].extras.where
          ? params.queries[0].extras.where + ` AND (${data.sqlExpression})`
          : `(${data.sqlExpression})`;
      } else {
        params.queries[0].extras.having = params.queries[0].extras.having
          ? params.queries[0].extras.having + ` AND (${data.sqlExpression})`
          : `(${data.sqlExpression})`;
      }
    });
    const type = config.viz_type;
    if (type === "table") {
      const isGroupby = config.groupby.length !== 0;
      params.queries[0].columns = isGroupby
        ? config.groupby
        : config.all_columns;
      params.queries[0].metrics = isGroupby ? config.metrics : [];
      params.queries[0].orderby = isGroupby
        ? [[config.timeseries_limit_metric, true]]
        : config.order_by_cols.map(data => JSON.parse(data));
      params.queries[0].order_desc = config.order_desc;
      params.queries[0].post_processing = [];
      params.queries[0].row_limit = config.row_limit;
      params.queries[0].timeseries_limit_metric =
        config.timeseries_limit_metric;
    } else {
      const echartsIndicator = config.echarts_indicator
        ? [config.echarts_indicator]
        : [];
      const echartsIndicators = config.echarts_indicators || [];
      const echartsX = config.echarts_x ? [config.echarts_x] : [];
      const echartsY = config.echarts_y ? [config.echarts_y] : [];
      const echartsYLeft = config.echarts_y_left || [];
      const echartsYRight = config.echarts_y_right || [];

      const echartsSelect = config.echarts_select
        ? [config.echarts_select]
        : [];
      const echartsPicker = config.echarts_picker
        ? [config.echarts_picker]
        : [];
      const echartsGroupby = config.echarts_groupby
        ? [config.echarts_groupby]
        : [];
      const echartsSort = config.echarts_sort ? [config.echarts_sort] : [];

      const echartsStartTime = config.echarts_start_time
        ? [config.echarts_start_time]
        : [];
      const echartsEndTime = config.echarts_end_time
        ? [config.echarts_end_time]
        : [];

      const tempArr = [
        ...echartsIndicator,
        ...echartsIndicators,
        ...echartsX,
        ...echartsY,
        ...echartsYLeft,
        ...echartsYRight,
        ...echartsSelect,
        ...echartsPicker,
        ...echartsGroupby,
        ...echartsSort,
        ...echartsStartTime,
        ...echartsEndTime
      ];
      tempArr.forEach(data => {
        if (params.queries[0].columns.indexOf(data) === -1)
          params.queries[0].columns.push(data);
      });
      if (!tempArr.length) params.queries[0].metrics = [config.metric];
    }
    return await Promise.all([
      Promise.resolve(res.result.slice_name),
      Promise.resolve(res.result.description),
      Promise.resolve(config),
      axios.post(API.chartData, params)
    ]);
  }
};

export default service;
