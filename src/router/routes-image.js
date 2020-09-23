import Image from "@/views/Image";

import i18n from "@/locales/i18n";

export default [
  {
    path: "image",
    name: "Image",
    component: Image,
    meta: {
      title: `${i18n.t("nav.image.name")} - ${i18n.t("common.brand")}`,
      nav: {
        svg: {
          class: "nav-svg",
          name: "image"
        },
        title: i18n.t("nav.image.name")
      }
    }
  }
];
