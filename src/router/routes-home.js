import Home from "@/views/Home";

import i18n from "@/locales/i18n";

export default [
  {
    path: "/admin",
    name: "Home",
    component: Home,
    meta: {
      title: `${i18n.t("common.admin")} - ${i18n.t("common.brand")}`,
      nav: {
        icon: "el-icon-s-home",
        title: i18n.t("nav.home.name")
      }
    }
  }
];
