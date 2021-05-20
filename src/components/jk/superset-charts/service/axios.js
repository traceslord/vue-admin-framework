import axios from "axios";
import { Message } from "element-ui";
import i18n from "@/locales/i18n";

const supersetAxios = axios.create();

supersetAxios.defaults.timeout = 20000;

supersetAxios.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = localStorage.getItem("jk_superset_token");
    if (TOKEN) {
      newConfig.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;

  if (response) {
    const { data } = response;
    const message = data.msg || i18n.t("api.serverError");
    if (status === 401) {
      localStorage.removeItem("jk_superset_token");
    } else if (status === 403) {
      Message.error(i18n.t("api.forbidden"));
    } else if (status === 419) {
      // 页面过期;
      localStorage.clear();
      sessionStorage.clear();
    } else {
      Message.error(message);
    }
  } else {
    Message.error(i18n.t("api.timeout"));
  }
};

supersetAxios.interceptors.response.use(
  res => res.data,
  error => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

export default {
  post(url = "", data = {}, config = {}) {
    return supersetAxios.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return supersetAxios.put(url, data, config);
  },
  patch(url = "", data = {}, config = {}) {
    return supersetAxios.patch(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return supersetAxios.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return supersetAxios.delete(url, OPTIONS);
  }
};
