import Dashboard from "@/views/Dashboard";

import i18n from "@/locales/i18n";

export default [
  {
    path: "dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: `${i18n.t("nav.dashboard.name")} - ${i18n.t("common.brand")}`,
      nav: {
        svg: {
          class: "nav-svg",
          name: "dashboard"
        },
        title: i18n.t("nav.dashboard.name")
      }
    }
  }
];
