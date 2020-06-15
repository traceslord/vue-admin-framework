import axios from "@/global/request/axios";
import API from "@/global/request/api";

const userService = {
  info() {
    return axios.get(API.userInfo);
  }
};

export default userService;
