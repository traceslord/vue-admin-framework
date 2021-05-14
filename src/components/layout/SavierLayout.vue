<template>
  <div class="page">
    <div
      class="page-left-container"
      :style="[{ width: siderWidth, backgroundColor: navBackgroundColor }]"
    >
      <div class="page-sidebar">
        <div class="sidebar-header">
          <img class="sidebar-header-logo" src="@/assets/images/logo.png" />
          <span v-show="!collapse" class="sidebar-header-text">{{
            $t("common.brand")
          }}</span>
        </div>
        <div class="sidebar-body">
          <el-scrollbar class="scrollbar-section">
            <el-menu
              :background-color="navBackgroundColor"
              :text-color="navTextColor"
              :active-text-color="navActiveTextColor"
              :default-active="$route.name"
              :router="true"
              :collapse="collapse"
            >
              <template v-for="route in navRoutes">
                <el-menu-item
                  v-if="!haveChildren(route)"
                  :key="route.name"
                  :index="route.name"
                  :route="{ name: route.name }"
                >
                  <i
                    v-if="route.meta.navigation.icon"
                    :class="route.meta.navigation.icon"
                  ></i>
                  <icon-svg
                    v-if="route.meta.navigation.svg"
                    :svg-class="route.meta.navigation.svg.class"
                    :svg-name="route.meta.navigation.svg.name"
                  ></icon-svg>
                  <span class="menu-label" slot="title">{{
                    route.meta.navigation.title
                  }}</span>
                </el-menu-item>

                <div v-else :key="route.name">
                  <div v-show="!collapse" class="menu-group">
                    <span>{{ route.meta.navigation.title }}</span>
                  </div>
                  <template v-for="item in route.children">
                    <el-menu-item
                      v-if="!haveChildren(item)"
                      :key="item.name"
                      :index="item.name"
                      :route="{ name: item.name }"
                    >
                      <i
                        v-if="item.meta.navigation.icon"
                        :class="item.meta.navigation.icon"
                      ></i>
                      <icon-svg
                        v-if="item.meta.navigation.svg"
                        :svg-class="item.meta.navigation.svg.class"
                        :svg-name="item.meta.navigation.svg.name"
                      ></icon-svg>
                      <span v-else class="i-dot"></span>
                      <span class="menu-label" slot="title">{{
                        item.meta.navigation.title
                      }}</span>
                    </el-menu-item>
                    <el-submenu
                      class="menu-group-submenu"
                      v-else
                      :key="item.name"
                      :index="item.name"
                    >
                      <template slot="title">
                        <i
                          v-if="item.meta.navigation.icon"
                          :class="item.meta.navigation.icon"
                        ></i>
                        <icon-svg
                          v-else-if="item.meta.navigation.svg"
                          :svg-class="item.meta.navigation.svg.class"
                          :svg-name="item.meta.navigation.svg.name"
                        ></icon-svg>
                        <span v-else class="i-diamond"></span>
                        <span class="menu-label">{{
                          item.meta.navigation.title
                        }}</span>
                      </template>
                      <el-menu-item
                        v-for="data in item.children"
                        :key="data.name"
                        :index="data.name"
                        :route="{ name: data.name }"
                      >
                        <span class="i-dot"></span>
                        <span class="menu-label">{{
                          data.meta.navigation.title
                        }}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                </div>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="page-right-container">
      <el-scrollbar class="scrollbar-section">
        <div class="page-header-container">
          <div class="page-header">
            <div class="page-header-left" @click="handleCollapse">
              <icon-svg
                svg-class="collapse-icon"
                svg-name="directory"
              ></icon-svg>
            </div>
            <div class="page-header-right">
              <el-dropdown @command="handleCommand">
                <div class="language-icon-container">
                  <icon-svg
                    svg-class="language-icon"
                    svg-name="language"
                  ></icon-svg>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(lang, index) in supportedLangs"
                    :key="index"
                    :command="{ method: 'changeLocale', lang }"
                    :disabled="$i18n.locale === lang ? true : false"
                    >{{ langs[lang] }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleCommand">
                <div class="user-info">
                  <img
                    v-if="userAvatar"
                    class="user-avatar"
                    :src="userAvatar"
                  />
                  <img
                    v-else
                    class="user-avatar"
                    src="@/assets/images/default-avatar.png"
                  />
                  <span class="user-name">{{ userName || userPhone }}</span>
                  <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-video-pause"
                    command="handleLogout"
                    >{{ $t("common.logout") }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="page-content">
          <el-card class="page-content-header" shadow="always">
            <div class="content-title">{{ $route.meta.navigation.title }}</div>
          </el-card>
          <div class="page-content-mainer">
            <router-view />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import routesAll from "@/router/routes";
import { SUPPORTED_LANGS, setLocale } from "@/locales/i18n";

export default {
  data() {
    return {
      navBackgroundColor: "#fff",
      navTextColor: "#78828a",
      navActiveTextColor: "#6777ef",
      navRoutes: [],
      collapse: false,
      supportedLangs: SUPPORTED_LANGS,
      langs: {
        "en-US": "English",
        "zh-CN": "中文",
        "fr-FR": "Français"
      }
    };
  },
  computed: {
    ...mapState(["userPhone", "userName", "userAvatar", "authPermissions"]),
    siderWidth() {
      return this.collapse ? "64px" : "246px";
    }
  },
  created() {
    this.getRoutes();
  },
  methods: {
    getRoutes() {
      let resultRoutes = this.filterPermissionRoutes(
        routesAll,
        this.authPermissions
      );
      this.navRoutes = this.filterRoutes(resultRoutes);
    },
    filterPermissionRoutes(routes, permissions) {
      const filterRoutes = [];
      routes.forEach(data => {
        const route = { ...data };
        const notPermission = !route.permission;
        const hasPermission = permissions.includes(route.permission);
        const passPermission = notPermission || hasPermission;
        let hasPath = true;
        if (route.children) {
          route.children = this.filterPermissionRoutes(
            data.children,
            permissions
          );
          if (route.children.length === 0) {
            hasPath = false;
          }
        }
        if (passPermission && hasPath) {
          filterRoutes.push(route);
        }
      });
      return filterRoutes;
    },
    filterRoutes(routes) {
      let result = [];
      routes.forEach(data => {
        if (data.meta && data.meta.navigation) {
          let item = {
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterRoutes(data.children);
          }
          result.push(item);
        } else if (data.children) {
          this.filterRoutes(data.children).forEach(item => {
            result.push(item);
          });
        }
      });
      return result;
    },
    haveChildren(route) {
      let children = route.children || [];
      return children.length;
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    handleCommand(command) {
      if (typeof command == "string") this[command]();
      else this[command.method](command.lang);
    },
    handleLogout() {
      localStorage.removeItem("jk_admin_token");
      this.$router.replace({ name: "AccountLogin" });
    },
    changeLocale(lang) {
      if (this.$i18n.locale === lang) return;
      // this.$i18n.locale = lang;
      setLocale(lang);
      this.$router.go(0);
    }
  }
};
</script>

<style lang="less" scoped>
.nav-svg {
  margin-right: 5px;
  width: 24px;
  height: 18px;
  vertical-align: middle;
  color: #909399;
}
.page {
  height: 100vh;
  display: flex;
  .page-left-container {
    z-index: 101;
    flex: none;
    display: flex;
    flex-direction: column;
    width: 246px;
    transition: all 0.2s ease-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
    .page-sidebar {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .sidebar-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        .sidebar-header-logo {
          height: 32px;
          transition: all 0.2s linear;
        }
        .sidebar-header-text {
          flex: none;
          margin-left: 8px;
          font-size: 20px;
          font-weight: 600;
          color: #303133;
        }
      }
      .sidebar-body {
        flex: 1;
        height: 0;
        overflow: auto;
        .i-dot {
          display: inline-block;
          margin-right: 6px;
          width: 24px;
          font-size: 30px;
          text-align: center;
          vertical-align: top;
          color: #909399;
          &:before {
            content: "\00b7";
          }
        }
        .i-diamond {
          display: inline-block;
          margin-right: 6px;
          width: 24px;
          font-size: 16px;
          text-align: center;
          vertical-align: top;
          color: #909399;
          transform-origin: center 53%;
          transform: rotateZ(135deg);
          transition: all 0.4s linear;
          &:before {
            content: "\2724";
          }
        }
        .menu-label {
          margin-left: 15px;
        }
        .menu-group {
          margin-top: 12px;
          padding: 4px 16px;
          font-size: 10px;
          font-weight: 600;
          line-height: 28px;
          color: #a1a8ae;
        }
        .menu-group-submenu:hover .i-diamond {
          transform: rotate(0deg);
        }
        .el-menu-item.is-active .i-dot,
        .el-menu-item.is-active svg {
          color: #6777ef;
        }
        /deep/.el-menu.el-menu--collapse .el-submenu__icon-arrow {
          display: none;
        }
        /deep/.el-menu-item,
        /deep/.el-submenu__title {
          font-weight: 500;
        }
        /deep/.menu-group-submenu.is-active .el-submenu__title {
          i {
            color: #6777ef;
          }
          svg {
            color: #6777ef;
          }
          span {
            color: #6777ef;
          }
          .i-diamond {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
  .page-right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 1000px;
    overflow-y: auto;
    .page-header-container {
      z-index: 1;
      position: relative;
      height: 72px;
      background: #6777ef;
      &::after {
        content: "";
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        height: 40px;
        background: #6777ef;
      }
      .page-header {
        z-index: 100;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        height: 72px;
        .page-header-left {
          padding: 0 15px;
          margin-top: 20px;
          height: 32px;
          line-height: 36px;
          cursor: pointer;
          .collapse-icon {
            width: 22px;
            height: 22px;
            color: #fff;
          }
        }
        .page-header-right {
          display: flex;
          margin-top: 20px;
          height: 32px;
          .language-icon-container {
            padding: 0 10px;
            width: 38px;
            height: 100%;
            cursor: pointer;
            .language-icon {
              width: 18px;
              height: 100%;
              color: #fff;
            }
          }
          .user-info {
            display: flex;
            align-items: center;
            padding: 0 10px;
            height: 100%;
            color: #fff;
            cursor: pointer;
            .user-avatar {
              margin-right: 6px;
              width: 30px;
              height: 30px;
              object-fit: cover;
              border-radius: 50%;
            }
            .user-name {
              margin-right: 6px;
              font-size: 14px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .page-content {
      position: relative;
      flex: 1;
      margin: 0 30px;
      background: #f4f6f9;
      .page-content-header {
        z-index: 2;
        position: absolute;
        width: 100%;
        .content-title {
          font-size: 24px;
          font-weight: 700;
          color: #34395e;
        }
      }
      .page-content-mainer {
        padding-top: 100px;
      }
    }
  }
}
</style>
