<template>
  <div style="height: 100%">
    <div class="top-title">

      <router-link
        to="/core/villageManagement/achievementsList/comprehensiveList"
      >
        <div class="box-title">
      <span>全镇综合榜</span>
        </div>
      </router-link>

    </div>
    <el-row
      style="
        font-size: 12px;
        color: #ffffff;
        background: #0a2732;
        height: 34px;
        line-height: 34px;
      "
    >
      <el-col
        span="12"
        style="text-align: center; padding: 0 10px; margin: 5px 0"
      >
        <span class="span-style">{{ sort }}</span>
      </el-col>
      <el-col span="12" style="padding: 0 10px; margin: 0">{{
        areaName
      }}</el-col>
    </el-row>
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: calc(100% - 68px)"
    />
  </div>
</template>

<script>
export default {
  props: {
    dutiesCompreBoardArray: {
      type: Array,
    },
    areaName: {
      type: String,
    },

    sort: {
      type: Number,
    },
  },
  data() {
    return {
      config: {},
    };
  },
  watch: {
    dutiesCompreBoardArray: {
      handler: function (val) {
        console.log(val);
        if (val instanceof Array && val.length >= 1) {
          var data = [];
          val.forEach((el, index) => {
            var textStyle =
              "color:#ffffff;font-size:12px;background:#0076F6;width:20px;height:20px;border-radius:50%;display: inline-block;line-height: 20px;";
            if (index === 0) {
              textStyle =
                "color:#ffffff;font-size:12px;background:#ff9f7f;width:20px;height:20px;border-radius:50%;display: inline-block;line-height: 20px;";
            }
            if (index === 1) {
              textStyle =
                "color:#ffffff;font-size:12px;background:#0076F6;width:20px;height:20px;border-radius:50%;display: inline-block;line-height: 20px;";
            }
            if (index === 2) {
              textStyle =
                "color:#ffffff;font-size:12px;background:#0076F6;width:20px;height:20px;border-radius:50%;display: inline-block;line-height: 20px;";
            }
            data.push([
              `<span style="${textStyle}">${el.townSort}</span>`,
              `<span style="color:#ffffff;font-size:12px">${el.areaName}</span>`,
            ]);
          });
          this.config = {
            data: data,
            align: ["center"],
            rowNum: 7,
          };
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .box-title {
    font-size: 14px;
    font-weight: bolder;
    color: #ffffff;
  }
.span-style {
  color: #ffffff;
  font-size: 12px;
  background: #0076f6;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: block;
  line-height: 20px;
  margin: 0px auto;
}
</style>
