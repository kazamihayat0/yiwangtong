<template>
  <el-popover
    placement="right"
    width="30"
    trigger="click"
    popper-class="pop-bg"
    :visible-arrow="false"
  >
    <slot name="content"></slot>
    <el-button slot="reference" type="text" class="text-btn">
      <slot name="footerBtn"></slot>
    </el-button>
  </el-popover>
</template>

<script>
export default {};
</script>

<style lang="scss">
.pop-bg {
  background: #030b32;
  border: 1px solid #030b32;
}
</style>

<style lang="scss" scoped>
.el-button {
  color: #87c4fc;
  padding: 0;
  span {
    display: block;
    font-size: 12px;
  }
}
</style>