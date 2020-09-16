import routesHome from "./routes-home";
import routesIcon from "./routes-icon";
import routesRoutes from "./routes-routes";
import routesEditor from "./routes-editor";
import routesLearnging from "./routes-learnging";
import AccountLogin from "@/views/AccountLogin";
import AdminLayout from "@/components/layout/AdminLayout.vue";
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
    component: AdminLayout,
    redirect: { name: "Home" },
    children: [...routesHome, ...routesIcon, ...routesRoutes, ...routesEditor]
  },
  ...routesLearnging
];
