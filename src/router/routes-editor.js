import EditorRichTextQuill from "@/views/EditorRichTextQuill";
import EditorMarkdownMavon from "@/views/EditorMarkdownMavon";

import i18n from "@/locales/i18n";

export default [
  {
    path: "editor",
    name: "Editor",
    component: { render: h => h("router-view") },
    meta: {
      nav: {
        svg: {
          class: "nav-svg",
          name: "editor"
        },
        title: i18n.t("nav.editor.name")
      },
      breadcrumb: {
        title: i18n.t("nav.editor.name")
      }
    },
    children: [
      {
        path: "rich-text",
        name: "EditorRichText",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            title: i18n.t("nav.editor.children[0].name")
          },
          breadcrumb: {
            title: i18n.t("nav.editor.children[0].name")
          }
        },
        children: [
          {
            path: "/admin/editor/rich-text/quill",
            name: "EditorRichTextQuill",
            component: EditorRichTextQuill,
            // permission: "",
            meta: {
              title: `${i18n.t(
                "nav.editor.children[0].children[0].name"
              )} - ${i18n.t("nav.editor.children[0].name")} - ${i18n.t(
                "nav.editor.name"
              )}`,
              nav: {
                title: i18n.t("nav.editor.children[0].children[0].name")
              },
              breadcrumb: {
                title: i18n.t("nav.editor.children[0].children[0].name")
              }
            }
          }
        ]
      },
      {
        path: "markdown",
        name: "EditorMarkdown",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            title: i18n.t("nav.editor.children[1].name")
          },
          breadcrumb: {
            title: i18n.t("nav.editor.children[1].name")
          }
        },
        children: [
          {
            path: "/admin/editor/markdown/mavon",
            name: "EditorMarkdownMavon",
            component: EditorMarkdownMavon,
            // permission: "",
            meta: {
              title: `${i18n.t(
                "nav.editor.children[1].children[0].name"
              )} - ${i18n.t("nav.editor.children[1].name")} - ${i18n.t(
                "nav.editor.name"
              )}`,
              nav: {
                title: i18n.t("nav.editor.children[1].children[0].name")
              },
              breadcrumb: {
                title: i18n.t("nav.editor.children[1].children[0].name")
              }
            }
          }
        ]
      }
    ]
  }
];
