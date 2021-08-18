<template>
  <div class="basic-container" :class="{ 'basic-container--block': block }">
    <el-card :body-style="bodyStyle" class="card-box">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer",
  props: {
    radius: {
      type: [String, Number],
      default: 10,
    },
    background: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
    bodyStyle: {
      type: Object,
      default: function () {
        return {
          height: "100%",
          "box-sizing": "border-box",
        };
      },
    },
  },
  computed: {
    styleName() {
      return {
        borderRadius: this.setPx(this.radius),
        background: this.background,
      };
    },
  },
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  box-sizing: border-box;
  &--block {
    height: 100%;
    .card-box {
      height: 100%;
    }
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
