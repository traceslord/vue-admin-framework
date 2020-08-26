<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <el-card shadow="hover">
      <div slot="header">
        <span class="brand-color">{{ $t("routes.nav_2") }}</span>
      </div>
      <div class="title">{{ $t("routes.onePage") }}</div>
      <demo-box class="nav-demo-box" height="860px" :time="0.3">
        <template v-slot:demo-box-source>
          <div class="demo-box-source">
            <div class="demo-box-source-nav_1 light-green">
              <span>{{ $t("routes.nav_1") }}</span>
              <div class="demo-box-source-nav_2">
                <div class="light-sky-blue">{{ $t("routes.nav_2") }}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:demo-box-meta>
          <div class="jk-highlight">
            <code class="jkhl color-brewer">
              <div>
                <span class="jkhl-keyword">import</span>
                <span> RoutesMenu_2 </span>
                <span class="jkhl-keyword">from</span>
                <span class="jkhl-string"> "@/views/RoutesMenu_2"</span>
                <span>;</span>
              </div>
              <div style="margin-top: 10px"></div>
              <div>
                <span class="jkhl-keyword">export</span>
                <span class="jkhl-keyword"> default</span>
                <span> [</span>
              </div>
              <div style="margin-left: 16px">
                <span>{</span>
              </div>
              <div style="margin-left: 32px">
                <span>path:</span>
                <span class="jkhl-string"> "routes"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>name:</span>
                <span class="jkhl-string"> "Routes"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>component: { render: h => h(</span>
                <span class="jkhl-string">"router-view"</span>
                <span>) },</span>
              </div>
              <div style="margin-left: 32px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 48px">
                <span>nav: {</span>
              </div>
              <div style="margin-left: 64px">
                <span>svg: {</span>
              </div>
              <div style="margin-left: 80px">
                <span>class:</span>
                <span class="jkhl-string"> "nav-svg"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 80px">
                <span>name:</span>
                <span class="jkhl-string"> "menu"</span>
              </div>
              <div style="margin-left: 64px">
                <span>},</span>
              </div>
              <div style="margin-left: 64px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("nav.routes.name") }}"</span>
              </div>
              <div style="margin-left: 48px">
                <span>},</span>
              </div>
              <div style="margin-left: 48px">
                <span>breadcrumb: {</span>
              </div>
              <div style="margin-left: 64px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("nav.routes.name") }}"</span>
              </div>
              <div style="margin-left: 48px">
                <span>}</span>
              </div>
              <div style="margin-left: 32px">
                <span>},</span>
              </div>
              <div style="margin-left: 32px">
                <span>children: [</span>
              </div>
              <div style="margin-left: 48px">
                <span>{</span>
              </div>
              <div style="margin-left: 64px">
                <span>path:</span>
                <span class="jkhl-string"> "/admin/routes/menu_2"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 64px">
                <span>name:</span>
                <span class="jkhl-string"> "RoutesMenu_2"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 64px">
                <span>component: RoutesMenu_2,</span>
              </div>
              <div style="margin-left: 64px">
                <span class="jkhl-comment">// permission: "",</span>
              </div>
              <div style="margin-left: 64px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 80px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("common.brand") }} - {{ $t("nav.routes.name") }} -
                  {{ $t("nav.routes.children[1].name") }}"</span
                >
                <span>,</span>
              </div>
              <div style="margin-left: 80px">
                <span>nav: {</span>
              </div>
              <div style="margin-left: 96px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("nav.routes.children[1].name") }}"</span
                >
              </div>
              <div style="margin-left: 80px">
                <span>},</span>
              </div>
              <div style="margin-left: 80px">
                <span>breadcrumb: {</span>
              </div>
              <div style="margin-left: 96px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("nav.routes.children[1].name") }}"</span
                >
              </div>
              <div style="margin-left: 80px">
                <span>}</span>
              </div>
              <div style="margin-left: 64px">
                <span>}</span>
              </div>
              <div style="margin-left: 48px">
                <span>}</span>
              </div>
              <div style="margin-left: 32px">
                <span>]</span>
              </div>
              <div style="margin-left: 16px">
                <span>}</span>
              </div>
              <div>
                <span>];</span>
              </div>
            </code>
          </div>
        </template>
      </demo-box>
      <div class="title">{{ $t("routes.multipage") }}</div>
      <demo-box class="nav-demo-box" height="1400px" :time="0.5">
        <template v-slot:demo-box-source>
          <div class="demo-box-source">
            <div class="demo-box-source-nav-1 light-green">
              <span>{{ $t("routes.nav_1") }}</span>
              <div class="demo-box-source-nav-2">
                <div class="light-sky-blue">
                  <span>{{ $t("routes.nav_2") }}</span>
                  <div class="demo-box-source-nav-3">
                    <div class="violet">{{ $t("routes.detailsPage") }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:demo-box-meta>
          <div class="jk-highlight">
            <code class="jkhl color-brewer">
              <div>
                <span class="jkhl-keyword">import</span>
                <span> RoutesMenu_2 </span>
                <span class="jkhl-keyword">from</span>
                <span class="jkhl-string"> "@/views/RoutesMenu_2"</span>
                <span>;</span>
              </div>
              <div>
                <span class="jkhl-keyword">import</span>
                <span> RoutesMenu_2Detail </span>
                <span class="jkhl-keyword">from</span>
                <span class="jkhl-string"> "@/views/RoutesMenu_2Detail"</span>
                <span>;</span>
              </div>
              <div style="margin-top: 10px"></div>
              <div>
                <span class="jkhl-keyword">export</span>
                <span class="jkhl-keyword"> default</span>
                <span> [</span>
              </div>
              <div style="margin-left: 16px">
                <span>{</span>
              </div>
              <div style="margin-left: 32px">
                <span>path:</span>
                <span class="jkhl-string"> "routes"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>name:</span>
                <span class="jkhl-string"> "Routes"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 32px">
                <span>component: { render: h => h(</span>
                <span class="jkhl-string">"router-view"</span>
                <span>) },</span>
              </div>
              <div style="margin-left: 32px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 48px">
                <span>nav: {</span>
              </div>
              <div style="margin-left: 64px">
                <span>svg: {</span>
              </div>
              <div style="margin-left: 80px">
                <span>class:</span>
                <span class="jkhl-string"> "nav-svg"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 80px">
                <span>name:</span>
                <span class="jkhl-string"> "menu"</span>
              </div>
              <div style="margin-left: 64px">
                <span>},</span>
              </div>
              <div style="margin-left: 64px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("nav.routes.name") }}"</span>
              </div>
              <div style="margin-left: 48px">
                <span>},</span>
              </div>
              <div style="margin-left: 48px">
                <span>breadcrumb: {</span>
              </div>
              <div style="margin-left: 64px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("nav.routes.name") }}"</span>
              </div>
              <div style="margin-left: 48px">
                <span>}</span>
              </div>
              <div style="margin-left: 32px">
                <span>},</span>
              </div>
              <div style="margin-left: 32px">
                <span>children: [</span>
              </div>
              <div style="margin-left: 48px">
                <span>{</span>
              </div>
              <div style="margin-left: 64px">
                <span>path:</span>
                <span class="jkhl-string"> "menu_2"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 64px">
                <span>name:</span>
                <span class="jkhl-string"> "RoutesMenu_2"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 64px">
                <span>redirect: { name:</span>
                <span class="jkhl-string"> "RoutesMenu_2Self"</span>
                <span> },</span>
              </div>
              <div style="margin-left: 64px">
                <span>component: { render: h => h(</span>
                <span class="jkhl-string">"router-view"</span>
                <span>) },</span>
              </div>
              <div style="margin-left: 64px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 80px">
                <span>breadcrumb: {</span>
              </div>
              <div style="margin-left: 96px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("nav.routes.children[1].name") }}"</span
                >
                <span>,</span>
              </div>
              <div style="margin-left: 96px">
                <span>replace:</span>
                <span class="jkhl-literal"> true</span>
              </div>
              <div style="margin-left: 80px">
                <span>}</span>
              </div>
              <div style="margin-left: 64px">
                <span>},</span>
              </div>
              <div style="margin-left: 64px">
                <span>children: [</span>
              </div>
              <div style="margin-left: 80px">
                <span>{</span>
              </div>
              <div style="margin-left: 96px">
                <span>path:</span>
                <span class="jkhl-string"> "/admin/routes/menu_2"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 96px">
                <span>name:</span>
                <span class="jkhl-string"> "RoutesMenu_2Self"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 96px">
                <span>component: RoutesMenu_2,</span>
              </div>
              <div style="margin-left: 96px">
                <span class="jkhl-comment">// permission: "",</span>
              </div>
              <div style="margin-left: 96px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 112px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("common.brand") }} - {{ $t("nav.routes.name") }} -
                  {{ $t("nav.routes.children[1].name") }}"</span
                >
                <span>,</span>
              </div>
              <div style="margin-left: 112px">
                <span>nav: {</span>
              </div>
              <div style="margin-left: 128px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("nav.routes.children[1].name") }}"</span
                >
              </div>
              <div style="margin-left: 112px">
                <span>}</span>
              </div>
              <div style="margin-left: 96px">
                <span>}</span>
              </div>
              <div style="margin-left: 80px">
                <span>},</span>
              </div>
              <div style="margin-left: 80px">
                <span>{</span>
              </div>
              <div style="margin-left: 96px">
                <span>path:</span>
                <span class="jkhl-string"> "/admin/routes/menu_2/:id"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 96px">
                <span>name:</span>
                <span class="jkhl-string"> "RoutesMenu_2Detail"</span>
                <span>,</span>
              </div>
              <div style="margin-left: 96px">
                <span>component: RoutesMenu_2Detail,</span>
              </div>
              <div style="margin-left: 96px">
                <span class="jkhl-comment">// permission: "",</span>
              </div>
              <div style="margin-left: 96px">
                <span>meta: {</span>
              </div>
              <div style="margin-left: 112px">
                <span>title:</span>
                <span class="jkhl-string">
                  "{{ $t("common.brand") }} - {{ $t("nav.routes.name") }} -
                  {{ $t("nav.routes.children[1].name") }}"</span
                >
                <span>,</span>
              </div>
              <div style="margin-left: 112px">
                <span>breadcrumb: {</span>
              </div>
              <div style="margin-left: 128px">
                <span>title:</span>
                <span class="jkhl-string"> "{{ $t("common.detail") }}"</span>
              </div>
              <div style="margin-left: 112px">
                <span>}</span>
              </div>
              <div style="margin-left: 96px">
                <span>}</span>
              </div>
              <div style="margin-left: 80px">
                <span>}</span>
              </div>
              <div style="margin-left: 64px">
                <span>]</span>
              </div>
              <div style="margin-left: 48px">
                <span>}</span>
              </div>
              <div style="margin-left: 32px">
                <span>]</span>
              </div>
              <div style="margin-left: 16px">
                <span>}</span>
              </div>
              <div>
                <span>];</span>
              </div>
            </code>
          </div>
        </template>
      </demo-box>
    </el-card>
  </div>
</template>

<script>
import DemoBox from "@/components/DemoBox.vue";

export default {
  components: {
    DemoBox
  }
};
</script>

<style lang="less" scoped>
.title {
  margin-top: 12px;
  font-size: 18px;
  color: #1f2f3d;
}
.nav-demo-box {
  margin-top: 12px;
  margin-bottom: 36px;
  .demo-box-source {
    padding: 24px;
    .demo-box-source-nav_1 {
      position: relative;
      padding: 24px 48px;
      height: 140px;
      color: #13ce66;
      .demo-box-source-nav_2 {
        position: absolute;
        left: 50%;
        display: inline-block;
        width: 40%;
        height: 92px;
        background-color: #fff;
        div {
          padding: 16px 24px;
          width: 100%;
          height: 100%;
          color: #409eff;
        }
      }
    }
    .demo-box-source-nav-1 {
      position: relative;
      padding: 24px 48px;
      height: 170px;
      color: #13ce66;
      .demo-box-source-nav-2 {
        position: absolute;
        left: 50%;
        display: inline-block;
        width: 40%;
        height: 122px;
        background-color: #fff;
        div {
          padding: 16px 24px;
          width: 100%;
          height: 100%;
          color: #409eff;
          .demo-box-source-nav-3 {
            position: absolute;
            left: 50%;
            display: inline-block;
            padding: 0;
            width: 40%;
            height: 90px;
            background-color: #fff;
            div {
              width: 100%;
              height: 100%;
              color: rgb(238, 130, 238);
            }
          }
        }
      }
    }
  }
}
</style>
