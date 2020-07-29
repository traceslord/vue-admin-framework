import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userPhone: "",
    userName: "",
    userAvatar: "",
    authPermissions: []
  },
  getters: {},
  mutations: {
    getUserPhone(state, userPhone) {
      state.userPhone = userPhone;
    },
    getUserName(state, userName) {
      state.userName = userName;
    },
    getUserAvatar(state, userAvatar) {
      state.userAvatar = userAvatar;
    },
    getAuthPermissions(state, authPermissions) {
      state.authPermissions = authPermissions;
    }
  },
  actions: {}
});

export default store;
