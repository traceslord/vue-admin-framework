<template>
  <div class="page-content-container">
    <div class="welcome-page">{{ $t("home.title") }}</div>
    <div class="tip">
      <div>{{ $t("home.tip_1", { name: userName || userPhone }) }}</div>
      <p>{{ $t("home.tip_2") }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userPhone", "userName"])
  }
};
</script>

<style lang="less" scoped>
.welcome-page {
  margin: 20px;
  font-size: 36px;
  color: #141f29;
}
.tip {
  margin: 20px;
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-left: 5px solid #50bfff;
  border-radius: 4px;
  div {
    margin: 12px 0;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5em;
    color: #5e6d82;
  }
  p {
    margin: 12px 0;
    font-size: 14px;
    line-height: 1.5em;
    color: #141f29;
  }
}
</style>
