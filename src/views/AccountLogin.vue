<template>
  <div class="login-page">
    <div class="login-page-header">
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
    <div class="login-page-mainer">
      <div class="login-logo-box">
        <img class="login-logo" src="@/assets/images/logo.png" />
        <div class="login-logo_text">{{ $t("common.brand") }}</div>
      </div>
      <el-form
        class="login-info"
        :model="loginInfo"
        :rules="loginRules"
        ref="loginInfo"
        status-icon
      >
        <el-form-item
          prop="phone_number"
          :rules="[
            {
              required: true,
              message: ' ',
              trigger: 'blur'
            },
            {
              pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              message: $t('error.login'),
              trigger: 'blur'
            }
          ]"
        >
          <el-input
            v-model="loginInfo.phone_number"
            :placeholder="$t('login.form.phone')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" :show-message="false">
          <el-input
            v-model="loginInfo.password"
            type="password"
            :placeholder="$t('login.form.password')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            plain
            @click="login"
            :loading="btnLoading"
            >{{ $t("common.login") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { SUPPORTED_LANGS, setLocale } from "@/locales/i18n";
// import userService from "@/global/service/user";

export default {
  data() {
    return {
      btnLoading: false,
      supportedLangs: SUPPORTED_LANGS,
      langs: {
        "en-US": "English",
        "zh-CN": "中文",
        "fr-FR": "Français"
      },
      loginInfo: {
        phone_number: "",
        password: ""
      },
      loginRules: {
        password: { required: true, trigger: "blur" }
      }
    };
  },
  methods: {
    changeLocale(lang) {
      if (this.$i18n.locale === lang) return;
      this.$i18n.locale = lang;
      setLocale(lang);
    },
    login() {
      this.$refs["loginInfo"].validate(val => {
        if (!val) return;
        localStorage.setItem("jk_admin_token", this.loginInfo.phone_number);
        this.$message.success(
          this.$i18n.t("success.format", {
            attribute: this.$i18n.t("common.login")
          })
        );
        this.$router.go(0);
        // this.btnLoading = true;
        // userService
        //   .login(this.loginInfo, { withCredentials: true })
        //   .then(res => {
        //     localStorage.setItem("jk_admin_token", res.token);
        //     this.$message.success(
        //       this.$i18n.t("success.format", {
        //         attribute: this.$i18n.t("common.login")
        //       })
        //     );
        //     this.$router.go(0);
        //   })
        //   .finally(() => {
        //     this.btnLoading = false;
        //   });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  height: 100%;
  .login-page-header {
    position: absolute;
    top: 40px;
    right: 60px;
    .el-link--inner {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .login-page-mainer {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    text-align: center;
    .login-logo-box {
      display: flex;
      justify-content: center;
      .login-logo {
        height: 60px;
        width: auto;
      }
      .login-logo_text {
        margin-left: 24px;
        height: 60px;
        font-size: 36px;
        line-height: 60px;
      }
    }
    .login-info {
      margin-top: 36px;
      .el-form-item {
        margin-bottom: 30px;
      }
      .login-btn {
        margin-top: 12px;
        width: 100%;
      }
    }
  }
}
</style>
