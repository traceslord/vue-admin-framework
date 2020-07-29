<template>
  <div class="page">
    <div
      class="page-left-container"
      :style="[{ width: siderWidth, backgroundColor: navBackgroundColor }]"
    >
      <div class="page-sidebar">
        <div class="sidebar-header">
          <img
            class="sidebar-header-logo"
            :style="collapse ? 'margin-left: 16px' : 'margin-left: 20px'"
            src="@/assets/images/logo.png"
          />
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
                    v-if="route.meta.nav.icon"
                    :class="route.meta.nav.icon"
                  ></i>
                  <icon-svg
                    v-if="route.meta.nav.svg"
                    :svg-class="route.meta.nav.svg.class"
                    :svg-name="route.meta.nav.svg.name"
                  ></icon-svg>
                  <span slot="title">{{ route.meta.nav.title }}</span>
                </el-menu-item>
                <el-submenu
                  class="el-submenu-level_1"
                  v-else
                  :key="route.name"
                  :index="route.name"
                >
                  <template slot="title">
                    <i
                      v-if="route.meta.nav.icon"
                      :class="route.meta.nav.icon"
                    ></i>
                    <icon-svg
                      v-if="route.meta.nav.svg"
                      :svg-class="route.meta.nav.svg.class"
                      :svg-name="route.meta.nav.svg.name"
                    ></icon-svg>
                    <span>{{ route.meta.nav.title }}</span>
                  </template>

                  <template v-for="item in route.children">
                    <el-menu-item
                      v-if="!haveChildren(item)"
                      :key="item.name"
                      :index="item.name"
                      :route="{ name: item.name }"
                    >
                      <span class="fa-dot"></span>
                      <span>{{ item.meta.nav.title }}</span>
                    </el-menu-item>
                    <el-submenu
                      class="el-submenu-level_2"
                      v-else
                      :key="item.name"
                      :index="item.name"
                    >
                      <template slot="title">
                        <i
                          v-if="item.meta.nav.icon"
                          :class="item.meta.nav.icon"
                        ></i>
                        <icon-svg
                          v-else-if="item.meta.nav.svg"
                          :svg-class="item.meta.nav.svg.class"
                          :svg-name="item.meta.nav.svg.name"
                        ></icon-svg>
                        <span v-else class="fa-diamond"></span>
                        <span>{{ item.meta.nav.title }}</span>
                      </template>
                      <el-menu-item
                        v-for="data in item.children"
                        :key="data.name"
                        :index="data.name"
                        :route="{ name: data.name }"
                      >
                        <span class="fa-dot"></span>
                        <span>{{ data.meta.nav.title }}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="sidebar-footer">
          <div class="collapse-icon-container" @click="handleCollapse">
            <img
              class="collapse-icon"
              :class="{ unfold: collapse }"
              src="@/assets/images/fold.svg"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="page-right-container">
      <div class="page-header">
        <div class="page-header-left"></div>
        <div class="page-header-middle">
          <span v-for="(lang, index) in supportedLangs" :key="index">
            <el-link
              :type="$i18n.locale === lang ? 'primary' : ''"
              :underline="false"
              @click="changeLocale(lang)"
            >
              {{ langs[lang] }}
            </el-link>
            <el-divider
              direction="vertical"
              v-if="index !== supportedLangs.length - 1"
            ></el-divider>
          </span>
        </div>
        <el-dropdown style="height: 100%" @command="handleCommand">
          <div class="page-header-right">
            <img v-if="userAvatar" class="user-avatar" :src="userAvatar" />
            <img
              v-else
              class="user-avatar"
              src="@/assets/images/default-avatar.png"
            />
            <span class="user-name">{{ userName || userPhone }}</span>
            <i class="el-icon-arrow-down"></i>
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
      <div class="page-content">
        <el-scrollbar class="scrollbar-section">
          <router-view />
        </el-scrollbar>
      </div>
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
      navBackgroundColor: "#141f29",
      navTextColor: "#EEE",
      navActiveTextColor: "",
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
      return this.collapse ? "64px" : "227px";
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
        if (data.meta && data.meta.nav) {
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
      this[command]();
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

<style lang="less">
.page {
  .scrollbar-section {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      min-height: 100%;
    }
    .el-scrollbar__view {
      min-height: 100%;
    }
  }
}
</style>
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
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    .page-sidebar {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .sidebar-header {
        display: flex;
        align-items: center;
        height: 48px;
        .sidebar-header-logo {
          margin: 8px 8px 8px 20px;
          height: 32px;
          transition: all 0.2s linear;
        }
        .sidebar-header-text {
          flex: none;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
        }
      }
      .sidebar-body {
        flex: 1;
        height: 0;
        overflow: auto;
      }
      .sidebar-footer {
        flex: none;
        padding: 8px;
        height: 48px;
        background: #141f29;
        overflow: hidden;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        .collapse-icon-container {
          height: 32px;
          text-align: center;
          background-color: #1d2b3a;
          border-radius: 3px;
          cursor: pointer;
          &:hover {
            background-color: #273849;
          }
          .collapse-icon {
            margin-top: 6px;
            width: 20px;
            height: 20px;
            transition: all 0.2s ease-out;
            &.unfold {
              transform: rotate(-180deg);
            }
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
    overflow: hidden;
    .page-header {
      z-index: 100;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 48px;
      font-size: 12px;
      line-height: 48px;
      font-weight: 400;
      color: #606266;
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(9, 18, 26, 0.06),
        0 4px 8px 0 rgba(39, 56, 73, 0.08);
      .page-header-right {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 100%;
        transition: all 0.2s ease;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
        .user-avatar {
          margin: 0 8px;
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 50%;
        }
        .user-name {
          margin-right: 8px;
          font-size: 12px;
          vertical-align: middle;
        }
      }
    }
    .page-content {
      position: relative;
      flex: 1;
      overflow-y: auto;
      background: #f0f2f5;
    }
  }
}
</style>
