<template>
  <div class="error-page">
    <div class="img" style="background-image: url('/img/bg/404.svg')"></div>
    <div class="content">
      <div class="desc">抱歉，您的钉钉账号免登失败。</div>
      <div class="actions">
        <router-link :to="{ path: '/' }">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-101",
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
