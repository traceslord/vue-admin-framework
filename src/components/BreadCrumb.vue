<template>
  <div class="breadcrumb-section">
    <el-breadcrumb
      class="breadcrumb-list"
      v-if="breadcrumbValue.length"
      separator-class="el-icon-arrow-right"
    >
      <template v-for="(item, index) in breadcrumbValue">
        <el-breadcrumb-item
          v-if="item.to"
          :to="item.to"
          :key="index"
          :replace="true"
          >{{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else :key="item.name">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    breadcrumbValue() {
      const { breadcrumb } = this;
      if (breadcrumb.length) {
        return breadcrumb;
      }
      return this.$route.matched
        .filter(data => data.meta && data.meta.breadcrumb)
        .map(data => ({
          name: data.meta.breadcrumb.title,
          to: data.meta.breadcrumb.replace ? { name: data.name } : undefined
        }));
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-left: 4px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 16px;
}
</style>
