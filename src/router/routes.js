import routesHome from "./routesHome";
import TheLayout from "@/components/TheLayout.vue";
import AccountLogin from "@/views/AccountLogin";
import i18n from "@/locales/i18n";

export default [
  {
    path: "/admin/login",
    name: "AccountLogin",
    component: AccountLogin,
    meta: {
      title: `IIOE-${i18n.t("common.pageTitle")}-${i18n.t("common.login")}`
    }
  },
  {
    path: "/admin",
    component: TheLayout,
    redirect: { name: "Home" },
    children: [...routesHome]
  }
];
