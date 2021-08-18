<template>
  <div class="avue-home">
    <div class="avue-home__main">
      <img
        class="avue-home__loading"
        src="/svg/loading-spin.svg"
        alt="loading"
      />
      <div class="avue-home__title">正在加载资源</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    console.log(this.userInfo);
    if (this.userInfo.level === 1 || this.userInfo.level === 2) {
      this.$router.push("/cityIndex");
    } else {
      var areaCode = this.userInfo.areaCode || "";
      let queryObj = JSON.stringify({ areaCode: areaCode, type: 1 });
      this.$router.push({
        path: "/villageIndex",
        query: { obj: queryObj },
      });
    }
  },
};
</script>

<style>
</style>