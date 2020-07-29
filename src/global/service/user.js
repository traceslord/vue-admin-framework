import axios from "@/global/request/axios";
import API from "@/global/request/api";

const userService = {
  info() {
    return axios.get(API.userInfo);
  },
  login(params = {}, config = {}) {
    return axios.post(API.userLogin, params, config);
  }
};

export default userService;
