import axios from "./axios";
import API from "./api";

const supersetService = {
  securityLogin(params = {}) {
    return axios.post(API.securityLogin, params);
  },
  chartShow(id) {
    return axios.get(API.chartItem(id));
  },
  chartData(params = {}) {
    return axios.post(API.chartData, params);
  },
  TableData(id) {
    return axios
      .get(API.chartItem(id))
      .then(res => {
        return {
          name: res.result.slice_name,
          params: JSON.parse(res.result.params)
        };
      })
      .then(res => {
        const ds = res.params.datasource.split("__");
        const columns =
          res.params.groupby.length === 0
            ? res.params.all_columns
            : res.params.groupby;
        const orderby =
          res.params.groupby.length === 0
            ? res.params.order_by_cols.map(data => JSON.parse(data))
            : [[res.params.timeseries_limit_metric, true]];
        const metrics =
          res.params.groupby.length === 0 ? [] : res.params.metrics;
        const params = {
          datasource: { id: Number(ds[0]), type: ds[1] },
          force: false,
          queries: [
            {
              annotation_layers: [],
              applied_time_extras: {},
              columns,
              custom_params: {},
              extras: {
                having: "",
                having_druid: [],
                time_grain_sqla: res.params.time_grain_sqla,
                time_range_endpoints: res.params.time_range_endpoints
              },
              filters: [],
              granularity: res.params.granularity_sqla,
              metrics,
              order_desc: res.params.order_desc,
              orderby,
              post_processing: [],
              row_limit: res.params.row_limit,
              time_range: res.params.time_range,
              timeseries_limit: 0,
              timeseries_limit_metric: res.params.timeseries_limit_metric,
              url_params: res.params.url_params
            }
          ],
          result_format: "json",
          result_type: "full"
        };
        return Promise.all([
          Promise.resolve(res.name),
          Promise.resolve(res.params),
          axios.post(API.chartData, params)
        ]);
      });
  }
};

export default supersetService;
