import routesHome from "./routes-home";
import routesIcon from "./routes-icon";
import routesRoutes from "./routes-routes";
import routesEditor from "./routes-editor";
import routesImage from "./routes-image";
import routesLXP from "./routes-lxp";
import routesSavierHome from "./savier/home";
import routesSavierIcon from "./savier/icon";
import routesSavierRoutes from "./savier/routes";
import routesSavierEditor from "./savier/editor";
import AccountLogin from "@/views/AccountLogin";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import SavierLayout from "@/components/layout/SavierLayout.vue";
import i18n from "@/locales/i18n";

export default [
  {
    path: "/",
    redirect: { name: "Home" }
  },
  {
    path: "/admin/login",
    name: "AccountLogin",
    component: AccountLogin,
    meta: {
      title: `${i18n.t("common.login")} - ${i18n.t("common.admin")} - ${i18n.t(
        "common.brand"
      )}`
    }
  },
  {
    path: "/admin",
    component: AdminLayout,
    redirect: { name: "Home" },
    children: [
      ...routesHome,
      ...routesIcon,
      ...routesRoutes,
      ...routesEditor,
      ...routesImage
    ]
  },
  ...routesLXP,
  {
    path: "/savier",
    component: SavierLayout,
    redirect: { name: "SavierHome" },
    children: [
      ...routesSavierHome,
      ...routesSavierIcon,
      ...routesSavierRoutes,
      ...routesSavierEditor
    ]
  }
];
