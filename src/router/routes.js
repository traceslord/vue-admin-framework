import routesHome from "./routes-home";
import routesIcon from "./routes-icon";
import TheLayout from "@/components/TheLayout.vue";
import AccountLogin from "@/views/AccountLogin";
import i18n from "@/locales/i18n";

export default [
  {
    path: "/admin/login",
    name: "AccountLogin",
    component: AccountLogin,
    meta: {
      title: `${i18n.t("common.brand")}-${i18n.t("common.admin")}-${i18n.t(
        "common.login"
      )}`
    }
  },
  {
    path: "/admin",
    component: TheLayout,
    redirect: { name: "Home" },
    children: [...routesHome, ...routesIcon]
  }
];
