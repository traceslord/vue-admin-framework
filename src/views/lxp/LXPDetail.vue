<template>
  <div class="lxp-detail-page">
    <!-- <el-scrollbar class="scrollbar-section"> -->
    <div class="lxp-detail-page-container" :class="dark" v-loading="loading">
      <div class="lxp-detail-header" :class="dark">
        <div class="header-left">
          <img
            class="header-logo"
            src="@/assets/images/logo.png"
            @click="goHomePage"
          />
          <span class="header-title" :class="dark">{{ title }}</span>
          <span class="header-subtitle" :class="dark">{{ subtitle }}</span>
        </div>
        <el-dropdown style="height: 100%" @command="handleCommand">
          <div class="header-right" :class="dark">
            <img v-if="userAvatar" class="user-avatar" :src="userAvatar" />
            <img
              v-else
              class="user-avatar"
              src="@/assets/images/default-avatar.png"
            />
          </div>
          <el-dropdown-menu :class="dark" slot="dropdown">
            <div class="user-info">
              <img
                v-if="userAvatar"
                class="user-info-avatar"
                :src="userAvatar"
              />
              <img
                v-else
                class="user-info-avatar"
                src="@/assets/images/default-avatar.png"
              />
              <p class="user-info-name" :class="dark">
                {{ userName || userPhone }}
              </p>
              <p class="user-info-line" :class="dark"></p>
            </div>
            <el-dropdown-item style="text-align: center" command="handleLogout">
              {{ $t("common.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="lxp-detail-mainer">
        <markdown-it :class="dark" :md="content"></markdown-it>
      </div>
      <div class="lxp-detail-footer">
        <div v-if="!ending" class="next-btn" :class="dark" @click="goNext">
          {{ $t("lxp.detail.next") }}
        </div>
        <div v-else class="ending" :class="dark">
          {{ $t("lxp.detail.ending") }}
        </div>
      </div>
    </div>
    <!-- </el-scrollbar> -->

    <div class="float-controls">
      <div class="float-btn" :class="dark" @click="showDirectory">
        <icon-svg svg-class="directory-svg" svg-name="directory"></icon-svg>
      </div>
      <div class="float-btn" :class="dark" @click="toggleMode">
        <icon-svg v-if="darkMode" svg-name="sun"></icon-svg>
        <icon-svg v-else svg-name="moon"></icon-svg>
      </div>
    </div>

    <el-dialog
      ref="directoryDialog"
      class="directory-dialog"
      :visible.sync="directoryVisible"
      width="520px"
      :show-close="false"
    >
      <div class="directory-dialog-container" :class="dark">
        <div class="directory-dialog-header">
          <div class="directory-dialog-header-content" :class="dark">
            <div
              class="directory-sort"
              :class="[descending ? 'ascending' : 'descending', dark]"
              @click="toggleSort"
            >
              <icon-svg svg-name="descending"></icon-svg>
            </div>
          </div>
        </div>
        <div class="directory-dialog-mainer">
          <el-scrollbar ref="directoryScrollbar" class="scrollbar-section">
            <div class="directory-dialog-mainer-list">
              <div
                class="directory-dialog-mainer-item"
                :class="dark"
                v-for="(item, index) in contents"
                :key="index"
              >
                <div
                  class="directory-item-content"
                  :class="{ active: item.name === subtitle, dark }"
                  @click="toggleContent(item.uuid)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import lxp from "@/mock/lxp";
import MarkdownIt from "jk-markdown-it/MarkdownIt.vue";

export default {
  components: {
    MarkdownIt
  },
  data() {
    return {
      loading: true,
      darkMode: false,
      title: "",
      subtitle: "",
      contents: [],
      content: "",
      directoryVisible: false,
      descending: false
    };
  },
  computed: {
    ...mapState(["userPhone", "userName", "userAvatar"]),
    dark() {
      return this.darkMode ? "dark" : "";
    },
    ending() {
      const subid = this.$route.query.subid;
      const length = this.contents.length;
      const endId = this.contents[length - 1].uuid;
      return subid === endId ? true : false;
    }
  },
  created() {
    this.getData();
    this.toggleBodyClassName();
  },
  mounted() {
    this.$refs["directoryDialog"].$refs["dialog"].style.marginTop = 0;
  },
  watch: {
    $route: "getContent",
    darkMode: "toggleBodyClassName"
  },
  methods: {
    getData() {
      this.darkMode = localStorage.getItem("jk-mode") === "dark" ? true : false;
      const id = this.$route.params.id;
      const subid = this.$route.query.subid;
      if (!subid) {
        lxp.forEach(data => {
          if (id === data.uuid) {
            const subid = data.contents[0].uuid;
            this.$router.push({
              name: "LXPDetail",
              params: { id },
              query: { subid }
            });
          }
        });
        this.getData();
        return;
      }
      lxp.forEach(data => {
        if (id === data.uuid) {
          this.title = data.name;
          this.contents = data.contents;
        }
      });
      this.getContent();
    },
    getContent() {
      this.loading = true;
      const subid = this.$route.query.subid;
      this.contents.forEach(data => {
        if (subid === data.uuid) {
          this.subtitle = data.name;
          this.content = data.content;
        }
      });
      document.documentElement.scrollTop = 0;
      this.loading = false;
    },
    toggleBodyClassName() {
      if (this.darkMode) document.body.className = "dark";
      else document.body.className = "";
    },
    goHomePage() {
      this.$router.push({ name: "LXP" });
    },
    handleCommand(command) {
      this[command]();
    },
    handleLogout() {
      localStorage.removeItem("jk_admin_token");
      this.$router.replace({ name: "AccountLogin" });
    },
    showDirectory() {
      let currentIndex = null;
      this.contents.forEach((data, index) => {
        if (data.uuid === this.$route.query.subid) currentIndex = index;
      });
      this.directoryVisible = true;
      this.$nextTick(() => {
        this.$refs["directoryScrollbar"].wrap.scrollTop = currentIndex * 52;
      });
    },
    toggleSort() {
      this.descending = !this.descending;
      this.contents.reverse();
      this.contents.forEach((data, index) => {
        if (data.uuid === this.$route.query.subid) {
          this.$refs["directoryScrollbar"].wrap.scrollTop = index * 52;
        }
      });
    },
    toggleContent(uuid) {
      if (this.$route.query.subid === uuid) return;
      this.$router.push({
        name: "LXPDetail",
        query: { subid: uuid }
      });
      this.directoryVisible = false;
    },
    goNext() {
      const subid = this.$route.query.subid;
      this.contents.forEach((data, index, self) => {
        if (data.uuid === subid) {
          const id = self[index + 1].uuid;
          this.$router.push({
            name: "LXPDetail",
            query: { subid: id }
          });
        }
      });
    },
    toggleMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) localStorage.setItem("jk-mode", "dark");
      else localStorage.setItem("jk-mode", "sun");
    }
  }
};
</script>

<style lang="less" scoped>
.lxp-detail-page {
  height: 100%;
  .lxp-detail-page-container {
    margin: 0 auto;
    width: 1000px;
    min-height: 100%;
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    &.dark {
      background-color: #1f2022;
    }
    .lxp-detail-header {
      z-index: 100;
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1000px;
      height: 72px;
      background-color: #fff;
      border-bottom: 1px solid rgba(33, 40, 50, 0.1);
      transition: all 0.2s ease-in-out;
      &.dark {
        background-color: #1f2022;
        border-bottom: 1px solid rgba(238, 240, 244, 0.1);
      }
      .header-logo {
        margin-left: 28px;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        &:hover {
          cursor: pointer;
        }
      }
      .header-title {
        margin-left: 20px;
        vertical-align: middle;
        color: #0d141e;
        opacity: 0.7;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          opacity: 1;
        }
        &.dark {
          color: #fff;
        }
      }
      .header-subtitle {
        margin-left: 8px;
        vertical-align: middle;
        color: #0d141e;
        opacity: 0.7;
        transition: color 0.2s ease-in-out;
        &.dark {
          color: #fff;
        }
      }
      .header-right {
        display: flex;
        align-items: center;
        margin-right: 8px;
        padding: 0 24px;
        height: 100%;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
        &.dark:hover {
          background: #2c2d2f;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .lxp-detail-mainer {
      padding: 100px 80px 0;
      /deep/.jk-markdown-it {
        * {
          transition: all 0.2s ease-in-out;
        }
        &.dark {
          *:not(a) {
            color: #d0d3d8;
          }
          code,
          pre {
            background-color: #3b3838;
          }
          table {
            tr {
              background-color: #3b3838;
            }
            th,
            td {
              border-color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
    .lxp-detail-footer {
      padding: 80px 0 100px;
      .next-btn {
        margin: 0 auto;
        width: 400px;
        height: 60px;
        font-size: 16px;
        font-weight: 500;
        line-height: 60px;
        text-align: center;
        color: #1b88ee;
        background-color: #f6f7f9;
        border-radius: 12px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          background-color: #edeeef;
        }
        &.dark {
          color: #fff;
          background-color: #363739;
        }
        &.dark:hover {
          background-color: #2a2b2d;
        }
      }
      .ending {
        margin: 0 auto;
        width: 200px;
        height: 200px;
        font-size: 32px;
        line-height: 200px;
        text-align: center;
        color: #5d646e;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 100px;
        transition: all 0.2s ease-in-out;
        &.dark {
          color: #b2b4b8;
        }
      }
    }
  }
  .float-controls {
    z-index: 10;
    position: fixed;
    left: 50%;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 548px;
    width: 48px;
    overflow: visible;
    .float-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background-color: #fff;
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(0, 25, 104, 0.1);
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;
      &:not(:first-child) {
        margin-top: 24px;
      }
      &.dark {
        background-color: #27282a;
        svg {
          color: #fff;
        }
      }
      svg {
        width: 24px;
        height: 24px;
        color: #2a2c2d;
        opacity: 0.7;
      }
      &:hover svg {
        opacity: 1;
      }
      svg.directory-svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .directory-dialog {
    height: 100%;
    /deep/.el-dialog {
      left: calc(50% - 20px);
      margin: 0;
      height: 100%;
      border-radius: 0;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 0;
        height: 100%;
        .directory-dialog-container {
          height: 100%;
          &.dark {
            background-color: #1f2022;
          }
          .directory-dialog-header {
            padding: 0 36px;
            .directory-dialog-header-content {
              height: 40px;
              line-height: 40px;
              text-align: right;
              border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
              &:not(.dark) {
                border-bottom-color: rgba(13, 20, 30, 0.05);
              }
              .directory-sort {
                display: inline-block;
                width: 20px;
                height: 38px;
                color: #4a5059;
                opacity: 0.7;
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                &.dark {
                  color: #fff;
                }
                &:hover {
                  opacity: 1;
                }
                &.ascending {
                  transform: rotate(180deg);
                }
                svg {
                  width: 20px;
                  height: 38px;
                }
              }
            }
          }
          .directory-dialog-mainer {
            height: calc(100% - 40px);
            .directory-dialog-mainer-list {
              .directory-dialog-mainer-item {
                padding: 0 36px;
                .directory-item-content {
                  height: 52px;
                  font-size: 15px;
                  line-height: 52px;
                  color: #353c46;
                  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  cursor: pointer;
                  &:not(.dark) {
                    border-bottom-color: rgba(13, 20, 30, 0.05);
                  }
                  &.active:not(.dark) {
                    color: #1b88ee;
                  }
                  &.dark {
                    color: #b2b4b8;
                    &.active {
                      color: #0097ff;
                    }
                  }
                }
                &:hover {
                  background: linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.05),
                    transparent
                  );
                  .directory-item-content:not(.active) {
                    color: #0d141e;
                  }
                }
                &.dark:hover {
                  background: linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.2),
                    transparent
                  );
                  .directory-item-content:not(.active) {
                    color: #eef0f4;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.user-info {
  width: 150px;
  .user-info-avatar {
    display: block;
    margin: 24px auto 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .user-info-name {
    margin-bottom: 24px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    &.dark {
      color: #b2b4b8;
    }
  }
  .user-info-line {
    margin-bottom: 10px;
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    &.dark {
      background-color: rgba(238, 240, 244, 0.1);
    }
  }
}
</style>
