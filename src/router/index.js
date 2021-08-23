import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import supersetService from "@/components/jk/superset-charts/service";
// import userService from "@/global/service/user";
import Store from "@/store/index";

NProgress.configure({ showSpinner: false });

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
    const timeLog = localStorage.getItem("jk_now");
    const dateDiff = Date.now() - Number(timeLog);
    const SUPERSETTOKEN = localStorage.getItem("jk_superset_token");
    if (!SUPERSETTOKEN || !timeLog || dateDiff > 600000) {
      const params = {
        username: "vip",
        password: "123456",
        provider: "db",
        refresh: true
      };
      const res = await supersetService.securityLogin(params);
      localStorage.setItem("jk_superset_token", res.access_token);
      localStorage.setItem("jk_now", Date.now().toString());
    }
    const TOKEN = localStorage.getItem("jk_admin_token");
    if (!TOKEN && to.name !== "AccountLogin") {
      next({ name: "AccountLogin", replace: true });
      return;
    }
    if (TOKEN && to.name === "AccountLogin") {
      next({ name: "Home", replace: true });
      return;
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
