import LXPDetail from "@/views/lxp/LXPDetail";

import i18n from "@/locales/i18n";

export default [
  {
    path: "/lxp/:id",
    name: "LXPDetail",
    component: LXPDetail,
    meta: {
      title: `${i18n.t("lxp.name")} - ${i18n.t("common.brand")}`
    }
  }
];
