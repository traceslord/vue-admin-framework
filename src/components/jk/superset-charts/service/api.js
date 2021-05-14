const PREFIX = "http://127.0.0.1:8088/api/v1";

export default {
  securityLogin: `${PREFIX}/security/login`,

  chartItem: id => `${PREFIX}/chart/${id}`,
  chartData: `${PREFIX}/chart/data`
};
