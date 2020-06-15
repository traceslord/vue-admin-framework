import svg from "./index.vue";

export default {
  install: function(Vue) {
    const requireAll = requireContext =>
      requireContext.keys().map(requireContext);
    const req = require.context("./svg", false, /\.svg$/);
    requireAll(req);
    Vue.component(svg.name, svg);
  }
};
