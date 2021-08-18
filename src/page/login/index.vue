<template>
  <div
    class="login-container avue-home"
    ref="login"
    @keyup.enter.native="handleLogin"
  >
    <div class="avue-home__main" v-show="!loading">
      <img
        class="avue-home__loading"
        src="/svg/loading-spin.svg"
        alt="loading"
      />
      <div class="avue-home__title">正在加载资源</div>
    </div>
    <top-color></top-color>
    <div class="login-weaper animated bounceInDown" v-show="loading">
      <top-color v-show="false"></top-color>
      <div class="login-weaper animated bounceInDown" v-if="true">
        <div class="login-left">
          <div class="login-time">
            {{ time }}
          </div>
          <img class="img" src="/img/logo.png" alt="" />
          <p class="title">{{ $t("login.info") }}</p>
        </div>
        <div class="login-border">
          <div class="login-main">
            <h4 class="login-title">
              {{ $t("login.title") }}{{ website.title }}
              <top-lang></top-lang>
            </h4>
            <userLogin v-if="activeName === 'user'"></userLogin>
            <codeLogin v-else-if="activeName === 'code'"></codeLogin>
            <thirdLogin v-else-if="activeName === 'third'"></thirdLogin>
            <div class="login-menu">
              <a href="#" @click.stop="activeName = 'user'">{{
                $t("login.userLogin")
              }}</a>
              <!--<a href="#" @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>-->
              <a href="#" @click.stop="activeName = 'third'">{{
                $t("login.thirdLogin")
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
import { validatenull } from "@/util/validate";
import topLang from "@/page/index/top/top-lang";
import topColor from "@/page/index/top/top-color";
import { getQueryString, getTopUrl } from "@/util/util";
import Vue from "vue";

export default {
  name: "login",
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topLang,
    topColor,
  },
  data() {
    return {
      loading: true,
      time: "",
      activeName: "user",
      socialForm: {
        tenantId: "000000",
        source: "",
        code: "",
        state: "",
      },
    };
  },
  // watch: {
  //   $route() {
  //     this.handleLogin();
  //   },
  // },
  created() {
    // this.handleLogin();
    // this.getTime();
  },
  mounted() {
    this.loading = false;
    let that = this;
    var querys = {};

    if (this.$route.query.pathInfo != undefined) {
      var pathInfo = JSON.parse(this.$route.query.pathInfo);
      for (const key in pathInfo) {
        if (key != "corpId") {
          querys[key] = pathInfo[key];
        }
      }
    }
    setTimeout(() => {
      this.loading = true;
    }, 2000);
    Vue.prototype.mapData1=[];
    Vue.prototype.mapData2=[];

    dd.runtime.permission.requestAuthCode({
      corpId: that.corpId, //企业id
      onSuccess: function (result) {
        let type = 1;
        console.log("that.firstPath---", that.firstPath);
        // alert(that.firstPath)
        switch (that.firstPath) {
          case "/phone/meetingList":
            type = 4;
            break;
          case "/meeting":
            type = 4;
            break;
          case "/phone/villageOperation":
            type = 2;
            break;
          case "/villageOperation":
            type = 2;
            break;
          case "/phone/cadrePerform":
            type = 3;
            break;
          case "/cadrePerform":
            type = 3;
            break;
          case "/phone/attendance":
            type = 5;
            break;
          case "/attendance":
            type = 5;
            break;
          case "/phone/satisfaction":
            type = 6;
            break;
          case "/satisfaction":
            type = 6;
            break;
          default:
            break;
        }
        console.log("type", type);
        // alert(type)
        // alert(that.firstPath)
        var requestAuthCode = result.code;
        var corpId = that.corpId;
        that.$store
          .dispatch("nologin", { requestAuthCode, corpId, type })
          .then(() => {
            console.log("that.firstPath1111", that.firstPath);
            that.$router.push({ path: that.firstPath, query: querys });
          })
          .catch((res) => {
            console.log("res", res);
            that.$router.push({ path: "/101" });
          });
      },
      onFail: function (err) {
        console.log("res", res);
        that.$router.push({ path: "/101" });
      },
    });
  },
  computed: {
    ...mapGetters(["website", "tagWel", "corpId", "firstPath"]),
  },
  props: [],
  methods: {
    getTime() {
      setInterval(() => {
        this.time = dateFormat(new Date());
      }, 1000);
    },
    handleLogin() {
      const topUrl = getTopUrl();
      const redirectUrl = "/oauth/redirect/";
      this.socialForm.source = getQueryString("source");
      this.socialForm.code = getQueryString("code");
      this.socialForm.state = getQueryString("state");
      if (
        validatenull(this.socialForm.source) &&
        topUrl.includes(redirectUrl)
      ) {
        let source = topUrl.split("?")[0];
        source = source.split(redirectUrl)[1];
        this.socialForm.source = source;
      }
      if (
        !validatenull(this.socialForm.source) &&
        !validatenull(this.socialForm.code) &&
        !validatenull(this.socialForm.state)
      ) {
        const loading = this.$loading({
          lock: true,
          text: "第三方系统登录中,请稍后。。。",
          spinner: "el-icon-loading",
        });
        this.$store
          .dispatch("LoginBySocial", this.socialForm)
          .then(() => {
            window.location.href = topUrl.split(redirectUrl)[0];
            this.$router.push({ path: this.tagWel.value });
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);
  },
};
</script>

<style lang="scss">
@import "@/styles/login.scss";
</style>
