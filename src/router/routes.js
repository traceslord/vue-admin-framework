import routesHome from "./routesHome";

import TheLayout from "@/components/TheLayout.vue";

export default [
  {
    path: "/admin",
    component: TheLayout,
    redirect: { name: "Home" },
    children: [...routesHome]
  }
];
