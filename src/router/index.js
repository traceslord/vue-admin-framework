import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import userService from "@/global/service/user";
import Store from "@/store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.firstInit = false;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  try {
    const TOKEN = localStorage.getItem("jk_admin_token");
    if (!TOKEN && to.name !== "AccountLogin") {
      next({ name: "AccountLogin", replace: true });
      return;
    }
    if (TOKEN && to.name === "AccountLogin") {
      next({ name: "Home", replace: true });
    }
    if (!router.firstInit && TOKEN) {
      router.firstInit = true;
      // const userInfo = await userService.info();
      // Store.commit("getUserAvatar", userInfo.avatar);
      // Store.commit("getUserName", userInfo.name);
      // Store.commit("getAuthPermissions", userInfo.permissions);
      Store.commit("getUserPhone", TOKEN);
    }
    next();
  } catch {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
