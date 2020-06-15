import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userAvatar:
      "https://assets.jiker.com/_for_plus_sub_project/2020/0314/admin/GeywtjDfSvcLZgTmQc3PKnVW15N4GXieGsTEK8Lh.jpg",
    userName: "小鞠",
    authPermissions: []
  },
  getters: {},
  mutations: {
    getUserAvatar(state, userAvatar) {
      state.userAvatar = userAvatar;
    },
    getUserName(state, userName) {
      state.userName = userName;
    },
    getAuthPermissions(state, authPermissions) {
      state.authPermissions = authPermissions;
    }
  },
  actions: {
    logout() {
      return;
    }
  }
});

export default store;
