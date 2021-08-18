<template>
  <div>
    <p>{{ peoType }}</p>
    <slot>
      <span>{{ peoNum }}</span>
    </slot>
    <el-progress :percentage="ratioNum"></el-progress>
  </div>
</template>

<script>
export default {
  props: {
    peoType: {
      type: String,
    },
    peoNum: {
      type: Number,
    },
    peoRatio: {
      type: Number,
    },
  },
  computed: {
    ratioNum: function () {
      var result = Number(this.peoRatio).toFixed(1);
      return result;
    },
  },
};
</script>

<style lang="scss">
.el-progress__text {
  color: #87c4fc !important;
}
</style>

<style lang="scss" scoped>
p {
  margin: 0;
}
</style>