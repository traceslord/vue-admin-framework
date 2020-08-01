import Icon from "@/views/Icon";
import IconGuide from "@/views/IconGuide";

import i18n from "@/locales/i18n";

export default [
  {
    path: "icon",
    name: "Icon",
    redirect: { name: "IconSelf" },
    component: { render: h => h("router-view") },
    meta: {
      breadcrumb: {
        title: i18n.t("nav.icon.name"),
        replace: true
      }
    },
    children: [
      {
        path: "/admin/icon",
        name: "IconSelf",
        component: Icon,
        // permission: "",
        meta: {
          title: `${i18n.t("common.brand")}-${i18n.t("nav.icon.name")}`,
          nav: {
            svg: {
              class: "nav-svg",
              name: "iconfont"
            },
            title: i18n.t("nav.icon.name")
          }
        }
      },
      {
        path: "/admin/icon/guide",
        name: "IconGuide",
        component: IconGuide,
        // permission: "",
        meta: {
          breadcrumb: {
            title: i18n.t("common.guide")
          }
        }
      }
    ]
  }
];
