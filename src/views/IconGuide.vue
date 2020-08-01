<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div class="card-container">
        <div class="guide-tips">
          <div>{{ $t("icon.guide.tips_1") }}</div>
          <p>
            {{ $t("icon.guide.tips_2")
            }}<span class="iconfont-link" @click="openLink">iconfont.cn</span
            >{{ $t("icon.guide.tips_3") }}
          </p>
          <p>{{ $t("icon.guide.tips_4") }}@/plugins/icons/svg</p>
        </div>
        <div class="guide-content">
          <div class="guide-content-title">{{ $t("icon.guide.title") }}</div>
          <div class="guide-content-text">
            {{ $t("icon.guide.text_1")
            }}<span class="iconfont-link" @click="openLink">iconfont.cn</span
            >{{ $t("icon.guide.text_2") }}
          </div>
          <img
            class="guide-content-img"
            src="@/assets/images/icon-guide_1.png"
          />
          <div class="guide-content-text">{{ $t("icon.guide.text_3") }}</div>
          <img
            class="guide-content-img"
            src="@/assets/images/icon-guide_2.png"
          />
          <div class="guide-content-text">{{ $t("icon.guide.text_4") }}</div>
          <img
            class="guide-content-img"
            src="@/assets/images/icon-guide_3.png"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    openLink() {
      window.open("https://www.iconfont.cn");
    }
  }
};
</script>

<style lang="less" scoped>
.iconfont-link {
  margin: 0 6px;
  color: #409eff;
  cursor: pointer;
  &:hover {
    color: #66b1ff;
    border-bottom: 1px solid #409eff;
  }
}
.card-container {
  width: 900px;
  min-height: 600px;
  margin: 12px auto 60px;
  .guide-tips {
    margin-top: 24px;
    padding: 8px 16px 16px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    border-radius: 4px;
    div {
      margin: 12px 0;
      font-size: 18px;
      font-weight: 300;
      line-height: 1.6;
      color: #5e6d82;
    }
    p {
      margin: 4px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #141f29;
    }
  }
  .guide-content {
    margin-top: 48px;
    .guide-content-title {
      font-size: 20px;
      line-height: 2;
      border-bottom: 1px solid #eaecef;
    }
    .guide-content-text {
      margin-top: 20px;
      line-height: 1.6;
      text-indent: 2em;
    }
    .guide-content-img {
      margin-top: 8px;
      width: 100%;
    }
  }
}
</style>
