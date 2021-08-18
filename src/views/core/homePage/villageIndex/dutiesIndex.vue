<template>
  <div style="height: 100%">
    <div class="top-title">
      <span>履职指数</span>
    </div>
    <div
      style="width: 100%; height: calc(100% - 34px); font-size: 12px"
      @click="dvClick"
    >
      <dv-scroll-board
        :config="config"
        style="width: 100%; height: 100%; font-size: 12px"
        @click="handleClick"
      />
    </div>
    <div class="duties-pop" v-show="dutiesPopShow">
      <el-card class="box-card">
        <duties-index-info
          :dutiesIndexPopData="dutiesIndexPopData"
        ></duties-index-info>
      </el-card>
    </div>
  </div>
</template>

<script>
import dutiesIndexInfo from "./villageInfo/dutiesIndexInfo.vue";
export default {
  components: { dutiesIndexInfo },
  props: {
    dutiesIndexArray: {
      type: Array,
    },
  },
  data() {
    return {
      config: {},
      dutiesIndexPopData: {},
      dutiesPopShow: false,
    };
  },
  watch: {
    dutiesIndexArray: {
      handler: function (val) {
        if (val instanceof Array && val.length >= 1) {
          var datas = [];
          val.forEach((el, index) => {
            datas.push([
              `<span style="color:#ffffff;font-size:12px">${index + 1}</span>`,
              `<span style="color:#ffffff;font-size:12px">${el.name}</span>`,
              `<span style="color:#87c4fc;font-size:12px">${el.postStr}</span>`,
              `<span style="color:#87c4fc;font-size:12px">${el.param10}</span>`,
            ]);
          });
          this.config = {
            data: datas,
            align: ["center", "center", "left", "center"],
            rowNum: 5,
            columnWidth: [30, 80, 200, 60],
          };
        }
      },
    },
  },
  methods: {
    handleClick(rows) {
      this.dutiesIndexPopData = this.dutiesIndexArray[rows.rowIndex];
      this.dutiesPopShow = true;
      console.log(this.dutiesIndexPopData);
    },
    closePop() {
      this.dutiesPopShow = false;
    },
    dvClick(e) {
      if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
      //否则，我们需要使用IE的方式来取消事件冒泡
      else window.event.cancelBubble = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dv-scroll-board {
  cursor: pointer;
}
.duties-pop {
  position: absolute;
  bottom: 10px;
  left: 25%;
  z-index: 20;
}
.box-card {
  width: 220px;
  background-color: rgba(1, 27, 49, 80%);
  font-size: 12px;
}
</style>