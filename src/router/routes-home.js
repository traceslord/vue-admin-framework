import Home from "@/views/Home";

import i18n from "@/locales/i18n";

export default [
  {
    path: "/admin",
    name: "Home",
    component: Home,
    meta: {
      title: `${i18n.t("common.brand")}-${i18n.t("common.admin")}`,
      nav: {
        icon: "el-icon-s-home",
        title: i18n.t("nav.home.name")
      }
    }
  }
];
