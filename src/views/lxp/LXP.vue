<template>
  <div class="lxp-page">
    <div class="lxp-page-header">
      <div class="header-top">
        <el-dropdown style="height: 100%" @command="handleCommand">
          <div class="header-avatar" :class="mode">
            <img v-if="userAvatar" class="user-avatar" :src="userAvatar" />
            <img
              v-else
              class="user-avatar"
              src="@/assets/images/default-avatar.png"
            />
          </div>
          <el-dropdown-menu :class="mode" slot="dropdown">
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
              <p class="user-info-name" :class="mode">
                {{ userName || userPhone }}
              </p>
              <p class="user-info-line" :class="mode"></p>
            </div>
            <el-dropdown-item style="text-align: center" command="handleLogout">
              {{ $t("common.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-logo-box">
        <img class="header-logo-logo" src="@/assets/images/logo.png" />
        <div class="header-logo-logo_text" :class="mode">
          {{ $t("lxp.name") }}
        </div>
      </div>
      <div class="header-search" :class="mode">
        <icon-svg svg-class="svg-search" svg-name="search"></icon-svg>
        <input type="text" placeholder="搜索" class="header-search-input" />
        <div class="svg-enter-container">
          <icon-svg svg-class="svg-enter" svg-name="enter"></icon-svg>
        </div>
      </div>
    </div>
    <div class="lxp-page-mainer" :class="mode">
      <div class="mainer-container">
        <div class="my_favorite">
          <div class="my_favorite-top">
            <div class="my_favorite-title" :class="mode">
              {{ $t("lxp.index.myFavorite") }}
            </div>
            <div class="my_favorite-link" :class="mode">
              {{ $t("lxp.index.myFavoriteMore") }}
            </div>
          </div>
          <div class="my_favorite-list">
            <div
              class="my_favorite-item"
              :class="mode"
              v-for="(item, index) in myFavorite"
              :key="index"
              @click="goDetail(item.uuid)"
            >
              <div class="my_favorite-item-image">
                <img :src="item.url" />
              </div>
              <div class="my_favorite-item-content">
                <div class="item-title">{{ item.name }}</div>
                <div class="item-description">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="guess_you_like">
          <div class="guess_you_like-top">
            <div class="guess_you_like-title" :class="mode">
              {{ $t("lxp.index.recommend") }}
            </div>
            <div
              class="guess_you_like-link"
              :class="mode"
              @click="getGuessYouLike"
            >
              {{ $t("lxp.index.InBatch") }}
            </div>
          </div>
          <div class="guess_you_like-list">
            <div
              class="guess_you_like-item"
              :class="mode"
              v-for="(item, index) in guessYouLike"
              :key="index"
              @click="goDetail(item.uuid)"
            >
              <div class="item-image">
                <img :src="item.url" />
              </div>
              <div class="item-title">{{ item.name }}</div>
              <div class="item-description">
                共 {{ item.contents.length }} 章
              </div>
              <div class="item-reason">
                <span v-if="Math.random() > 0.5"
                  >阅读《{{
                    myFavorite[Math.floor(Math.random() * myFavorite.length)]
                      .name
                  }}》的人也在读</span
                >
                <span v-else
                  >{{ Math.floor(Math.random() * 100) / 10 + 1 }} 万人阅读</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lxp-page-footer" :class="mode">
      Copyright © 2020 {{ $t("common.brand") }}. All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import lxp from "@/mock/lxp";

export default {
  data() {
    return {
      mode: "sun",
      myFavorite: [],
      guessYouLike: []
    };
  },
  computed: {
    ...mapState(["userPhone", "userName", "userAvatar"])
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const mode = localStorage.getItem("jk-mode");
      this.mode = mode ? mode : "sun";
      if (this.mode === "dark") document.body.className = "dark";
      else document.body.className = "";
      this.getRandomArray(3).forEach((data, index) => {
        this.myFavorite[index] = lxp[data];
        this.myFavorite[index].description = `已学习 ${Math.floor(
          Math.random() * 60
        )} 分钟`;
      });
      this.getGuessYouLike();
    },
    getGuessYouLike() {
      const arr = [];
      this.getRandomArray(4).forEach((data, index) => {
        arr[index] = lxp[data];
      });
      this.guessYouLike = arr;
    },
    getRandomArray(val) {
      if (typeof val !== "number") return;
      const arr = [];
      while (arr.length < val) {
        const randomValue = Math.floor(Math.random() * lxp.length);
        if (arr.indexOf(randomValue) === -1) arr.push(randomValue);
      }
      return arr;
    },
    goDetail(id) {
      this.$router.push({
        name: "LXPDetail",
        params: { id }
      });
    },
    handleCommand(command) {
      this[command]();
    },
    handleLogout() {
      localStorage.removeItem("jk_admin_token");
      this.$router.replace({ name: "AccountLogin" });
    }
  }
};
</script>

<style lang="less" scoped>
.lxp-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .lxp-page-header {
    flex: none;
    margin: 0 auto;
    width: 1332px;
    height: 386px;
    .header-top {
      height: 72px;
      text-align: right;
      .header-avatar {
        display: flex;
        align-items: center;
        padding: 0 24px;
        height: 100%;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          background: #f6f7f9;
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
    .header-logo-box {
      display: flex;
      justify-content: center;
      margin-top: 72px;
      .header-logo-logo {
        height: 40px;
        width: auto;
      }
      .header-logo-logo_text {
        margin-left: 12px;
        height: 40px;
        font-size: 24px;
        line-height: 40px;
        color: #0d141e;
        &.dark {
          color: #fff;
        }
      }
    }
    .header-search {
      position: relative;
      margin: 48px auto 0;
      width: 840px;
      .svg-search {
        position: absolute;
        top: 15px;
        left: 20px;
        width: 22px;
        height: 22px;
        color: #868c95;
      }
      .svg-enter-container {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: #f5f5f5;
        border-radius: 50%;
        .svg-enter {
          color: #868c95;
        }
      }
      .header-search-input {
        padding: 0 52px;
        width: 100%;
        height: 52px;
        font-size: 16px;
        color: #212832;
        background-color: #fff;
        border: 0;
        border-radius: 26px;
        box-shadow: 0 4px 20px rgba(0, 25, 104, 0.05);
        outline: none;
        &::placeholder {
          font-weight: 300;
          color: #868c95;
        }
      }
      &.dark {
        .svg-search {
          color: #b2b4b8;
        }
        .svg-enter-container {
          background-color: #404143;
          .svg-enter {
            color: #b2b4b8;
          }
        }
        .header-search-input {
          color: #eef0f4;
          background-color: rgba(238, 240, 244, 0.1);
          &::placeholder {
            font-weight: 400;
            color: #8a8c90;
          }
        }
      }
    }
  }
  .lxp-page-mainer {
    flex: 1;
    padding: 40px 0 80px;
    background-color: #fff;
    &.dark {
      background-color: #1f2022;
    }
    .mainer-container {
      margin: 0 auto;
      width: 1332px;
      .my_favorite {
        margin-bottom: 40px;
        .my_favorite-top {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          .my_favorite-title {
            font-size: 20px;
            color: #212832;
            &.dark {
              color: #eef0f4;
            }
          }
          .my_favorite-link {
            font-size: 15px;
            color: #5d646e;
            cursor: pointer;
            &:hover {
              color: #212832;
            }
            &.dark {
              color: #b2b4b8;
              &:hover {
                color: #eef0f4;
              }
            }
          }
        }
        .my_favorite-list {
          display: flex;
          flex-wrap: wrap;
          .my_favorite-item {
            display: flex;
            align-items: center;
            margin-left: 24px;
            padding: 24px;
            width: 315px;
            height: 169px;
            background-color: #f6f7f9;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            &:nth-child(4n + 1) {
              margin-left: 0;
            }
            &:nth-child(n + 5) {
              margin-top: 24px;
            }
            &:hover {
              background-color: #edeeef;
            }
            .my_favorite-item-image {
              flex: none;
              width: 84px;
              height: 121px;
              background-color: #d8d8d8;
              box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .my_favorite-item-content {
              flex: none;
              width: 183px;
              padding-left: 24px;
              .item-title {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: auto;
                max-height: 48px;
                font-size: 16px;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .item-description {
                margin-top: 8px;
                height: 22px;
                font-size: 14px;
                line-height: 22px;
                color: #858c96;
                overflow: hidden;
              }
            }
            &.dark {
              background-color: #27282a;
              &:hover {
                background-color: #1a1b1c;
              }
              .my_favorite-item-content {
                .item-title {
                  color: #eef0f4;
                }
                .item-description {
                  color: #8a8c90;
                }
              }
            }
          }
        }
      }
      .guess_you_like {
        margin-bottom: 40px;
        .guess_you_like-top {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          .guess_you_like-title {
            font-size: 20px;
            color: #212832;
            &.dark {
              color: #eef0f4;
            }
          }
          .guess_you_like-link {
            font-size: 15px;
            color: #5d646e;
            cursor: pointer;
            &:hover {
              color: #212832;
            }
            &.dark {
              color: #b2b4b8;
              &:hover {
                color: #eef0f4;
              }
            }
          }
        }
        .guess_you_like-list {
          display: flex;
          flex-wrap: wrap;
          .guess_you_like-item {
            margin-left: 24px;
            padding: 0 18px;
            width: 315px;
            height: 352px;
            text-align: center;
            background-color: #f6f7f9;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              background-color: #edeeef;
            }
            .item-image {
              margin: 40px auto 0;
              width: 96px;
              height: 139px;
              background-color: #d8d8d8;
              box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .item-title {
              margin-top: 24px;
              font-size: 18px;
              color: #0d141e;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .item-description {
              margin-top: 12px;
              font-size: 14px;
              color: #858c96;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .item-reason {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-top: 10px;
              padding: 0 10px;
              height: auto;
              max-height: 42px;
              font-size: 13px;
              color: #858c96;
              line-height: 21px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            &.dark {
              background-color: #27282a;
              &:hover {
                background-color: #1a1b1c;
              }
              .item-title {
                color: #eef0f4;
              }
              .item-description,
              .item-reason {
                color: #8a8c90;
              }
            }
          }
        }
      }
    }
  }
  .lxp-page-footer {
    flex: none;
    padding-bottom: 20px;
    height: 42px;
    font-size: 13px;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    color: #858c96;
    background-color: #fff;
    overflow: hidden;
    &.dark {
      color: #8a8c90;
      background-color: #1f2022;
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
