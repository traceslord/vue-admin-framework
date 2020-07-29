import axios from "axios";
import { Message } from "element-ui";
import i18n from "@/locales/i18n";

const axiosInstance = axios.create();

axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = localStorage.getItem("jk_admin_token");
    const lang = localStorage.getItem("jk_locale");
    // const offset = -new Date().getTimezoneOffset() / 60;
    // const timezone = offset < 0 ? "UTC" + offset : "UTC+" + offset;
    if (TOKEN) {
      newConfig.headers.Authorization = `Bearer ${TOKEN}`;
    }
    newConfig.headers["Accept-Language"] = lang ? lang : "en-US";
    // newConfig.headers["Client-Timezone"] = timezone;
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;

  if (response) {
    const { data } = response;
    const { errors } = data;
    const message = data.message || i18n.t("api.serverError");
    if (status === 401) {
      localStorage.removeItem("jk_admin_token");
    } else if (status === 403) {
      Message.error(i18n.t("api.forbidden"));
    } else if (status === 419) {
      // 页面过期;
      localStorage.clear();
      sessionStorage.clear();
    } else if (status === 422 || status === 423 || status === 429) {
      let errorObj = errors ? errors : data;
      Object.keys(errorObj).forEach(errorKey => {
        const errorValue = errorObj[errorKey].join("\n");
        Message.error(errorValue);
      });
    } else {
      Message.error(message);
    }
  } else {
    Message.error(i18n.t("api.timeout"));
  }
};

axiosInstance.interceptors.response.use(
  res => {
    switch (true) {
      case res.status === 200:
        return res.data;
      case res.data.code === 200:
        return res.data.data;
      case res.data.error_code === 0:
        return res.data.data;
      // case !!res.status:
      //   Message.error({
      //     dangerouslyUseHTMLString: true,
      //     message: `<pre>${res.data.message}</pre>`
      //   });
      //   return Promise.reject(res.data);
      default:
        return res.data;
    }
  },
  error => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

export default {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  patch(url = "", data = {}, config = {}) {
    return axiosInstance.patch(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  }
};
