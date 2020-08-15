import RoutesMenu_1 from "@/views/RoutesMenu_1";
import RoutesMenu_2 from "@/views/RoutesMenu_2";
import RoutesMenu_3_1 from "@/views/RoutesMenu_3_1";

// import i18n from "@/locales/i18n";

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
        title: "路由嵌套"
      },
      breadcrumb: {
        title: "路由嵌套"
      }
    },
    children: [
      {
        path: "menu_1",
        name: "RoutesMenu_1",
        component: RoutesMenu_1,
        // permission: "",
        meta: {
          title: "JK - 路由嵌套 - 菜单 1",
          nav: {
            title: "菜单 1"
          },
          breadcrumb: {
            title: "菜单 1"
          }
        }
      },
      {
        path: "menu_2",
        name: "RoutesMenu_2",
        component: RoutesMenu_2,
        // permission: "",
        meta: {
          title: "JK - 路由嵌套 - 菜单 2",
          nav: {
            title: "菜单 2"
          },
          breadcrumb: {
            title: "菜单 2"
          }
        }
      },
      {
        path: "menu_3",
        name: "RoutesMenu_3",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            title: "菜单 3"
          },
          breadcrumb: {
            title: "菜单 3"
          }
        },
        children: [
          {
            path: "menu_3-1",
            name: "RoutesMenu_3_1",
            component: RoutesMenu_3_1,
            // permission: "",
            meta: {
              title: "路由嵌套 - 菜单 3 - 菜单 3-1",
              nav: {
                title: "菜单 3-1"
              },
              breadcrumb: {
                title: "菜单 3-1"
              }
            }
          }
        ]
      }
    ]
  }
];
