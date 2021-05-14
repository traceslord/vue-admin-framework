import Icon from "@/views/Icon";

import i18n from "@/locales/i18n";

export default [
  {
    path: "icon",
    name: "SavierIcon",
    redirect: { name: "SavierIconSelf" },
    component: { render: h => h("router-view") },
    meta: {
      breadcrumb: {
        title: i18n.t("nav.icon.name"),
        replace: true
      }
    },
    children: [
      {
        path: "/savier/icon",
        name: "SavierIconSelf",
        component: Icon,
        // permission: "",
        meta: {
          title: `${i18n.t("nav.icon.name")} - ${i18n.t("common.brand")}`,
          navigation: {
            svg: {
              class: "nav-svg",
              name: "iconfont"
            },
            title: i18n.t("nav.icon.name")
          }
        }
      }
    ]
  }
];
