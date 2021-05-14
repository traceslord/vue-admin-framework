import EditorRichTextQuill from "@/views/EditorRichTextQuill";
import EditorMarkdownMavon from "@/views/EditorMarkdownMavon";

import i18n from "@/locales/i18n";

export default [
  {
    path: "editor",
    name: "SavierEditor",
    component: { render: h => h("router-view") },
    meta: {
      navigation: {
        title: i18n.t("nav.editor.name")
      }
    },
    children: [
      {
        path: "rich-text",
        name: "SavierEditorRichText",
        component: { render: h => h("router-view") },
        meta: {
          navigation: {
            svg: {
              class: "nav-svg",
              name: "editor"
            },
            title: i18n.t("nav.editor.children[0].name")
          }
        },
        children: [
          {
            path: "/savier/editor/rich-text/quill",
            name: "SavierEditorRichTextQuill",
            component: EditorRichTextQuill,
            // permission: "",
            meta: {
              title: `${i18n.t(
                "nav.editor.children[0].children[0].name"
              )} - ${i18n.t("nav.editor.children[0].name")} - ${i18n.t(
                "nav.editor.name"
              )}`,
              navigation: {
                title: i18n.t("nav.editor.children[0].children[0].name")
              }
            }
          }
        ]
      },
      {
        path: "markdown",
        name: "SavierEditorMarkdown",
        component: { render: h => h("router-view") },
        meta: {
          navigation: {
            svg: {
              class: "nav-svg",
              name: "editor"
            },
            title: i18n.t("nav.editor.children[1].name")
          }
        },
        children: [
          {
            path: "/savier/editor/markdown/mavon",
            name: "SavierEditorMarkdownMavon",
            component: EditorMarkdownMavon,
            // permission: "",
            meta: {
              title: `${i18n.t(
                "nav.editor.children[1].children[0].name"
              )} - ${i18n.t("nav.editor.children[1].name")} - ${i18n.t(
                "nav.editor.name"
              )}`,
              navigation: {
                title: i18n.t("nav.editor.children[1].children[0].name")
              }
            }
          }
        ]
      }
    ]
  }
];
