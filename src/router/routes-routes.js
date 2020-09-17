import RoutesMenu_1 from "@/views/RoutesMenu_1";
import RoutesMenu_2 from "@/views/RoutesMenu_2";
import RoutesMenu_3_1 from "@/views/RoutesMenu_3_1";

import i18n from "@/locales/i18n";

export default [
  {
    path: "routes",
    name: "Routes",
    component: { render: h => h("router-view") },
    meta: {
      nav: {
        svg: {
          class: "nav-svg",
          name: "menu"
        },
        title: i18n.t("nav.routes.name")
      },
      breadcrumb: {
        title: i18n.t("nav.routes.name")
      }
    },
    children: [
      {
        path: "/admin/routes/menu_1",
        name: "RoutesMenu_1",
        component: RoutesMenu_1,
        // permission: "",
        meta: {
          title: `${i18n.t("nav.routes.children[0].name")} - ${i18n.t(
            "nav.routes.name"
          )} - ${i18n.t("common.brand")}`,
          nav: {
            title: i18n.t("nav.routes.children[0].name")
          },
          breadcrumb: {
            title: i18n.t("nav.routes.children[0].name")
          }
        }
      },
      {
        path: "/admin/routes/menu_2",
        name: "RoutesMenu_2",
        component: RoutesMenu_2,
        // permission: "",
        meta: {
          title: `${i18n.t("nav.routes.children[1].name")} - ${i18n.t(
            "nav.routes.name"
          )} - ${i18n.t("common.brand")}`,
          nav: {
            title: i18n.t("nav.routes.children[1].name")
          },
          breadcrumb: {
            title: i18n.t("nav.routes.children[1].name")
          }
        }
      },
      {
        path: "menu_3",
        name: "RoutesMenu_3",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            title: i18n.t("nav.routes.children[2].name")
          },
          breadcrumb: {
            title: i18n.t("nav.routes.children[2].name")
          }
        },
        children: [
          {
            path: "/admin/routes/menu_3/menu_3-1",
            name: "RoutesMenu_3_1",
            component: RoutesMenu_3_1,
            // permission: "",
            meta: {
              title: `${i18n.t(
                "nav.routes.children[2].children[0].name"
              )} - ${i18n.t("nav.routes.children[2].name")} - ${i18n.t(
                "nav.routes.name"
              )}`,
              nav: {
                title: i18n.t("nav.routes.children[2].children[0].name")
              },
              breadcrumb: {
                title: i18n.t("nav.routes.children[2].children[0].name")
              }
            }
          }
        ]
      }
    ]
  }
];
