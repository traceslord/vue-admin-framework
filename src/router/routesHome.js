import Home from "@/views/Home";

export default [
  {
    path: "/admin",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      nav: {
        icon: "el-icon-s-home",
        title: "首页"
      }
    }
  }
];
