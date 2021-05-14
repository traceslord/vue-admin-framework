import SavierHome from "@/views/savier/Home";

import i18n from "@/locales/i18n";

export default [
  {
    path: "/savier",
    name: "SavierHome",
    component: SavierHome,
    meta: {
      title: `${i18n.t("common.admin")} - ${i18n.t("common.brand")}`,
      navigation: {
        icon: "el-icon-s-home",
        title: i18n.t("nav.home.name")
      }
    }
  }
];
