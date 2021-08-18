<template>
  <div style="height: 100%">
    <div class="top-title" style="text-align: center;height: 45px">
      <span>五年发展规划-创业承诺项目</span>
<br/>
      <span style="font-size: 10px;">完成率:{{villStr}}(完成/全部)</span>
    </div>
    <div class="tab-box">
      <div class="tab-title">
        <dv-border-box-7
          :color="['#1D2744', '#87c4fc']"
          backgroundColor="transparent"
          style="width: 36px; margin: auto"
        >
          <span>完<br />成<br />项<br />目</span>
        </dv-border-box-7>
      </div>
      <div class="tab-content tab-content-border">
        <dv-scroll-board
          :config="config1"
          style="width: 100%; height: 100%; font-size: 12px"
        />
      </div>
      <div class="tab-content" style="">
        <dv-scroll-board
          :config="config2"
          style="width: 100%; height: 100%; font-size: 12px"
        />
      </div>
      <div class="tab-title">
        <dv-border-box-7
          :color="['#1D2744', '#87c4fc']"
          backgroundColor="transparent"
          style="width: 36px; margin: auto"
        >
          <span>未<br />完<br />成<br />项<br />目<br /></span>
        </dv-border-box-7>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    villagePlanFinish: {
      type: Array,
    },
    villagePlanUnfinish: {
      type: Array,
    },
    villStr:String
  },
  data() {
    return {
      config1: {},
      config2: {},
    };
  },
  watch: {
    villagePlanFinish: {
      handler: function (newVal) {
        var datas = [];
        newVal.forEach((el) => {
          datas.push([
            `<span style="color:#87c4fc;font-size:12px">${el.planTime}</span>`,
            `<span style="color:#87c4fc;font-size:12px">${el.projectName}</span>`,
          ]);
        });
        this.config1 = {
          data: datas,
          align: ["center", "left"],
          rowNum: 5,
          columnWidth: [80],
        };
      },
    },
    villagePlanUnfinish: {
      handler: function (newVal) {
        var datas = [];
        newVal.forEach((el) => {
          datas.push([
            `<span style="color:#87c4fc;font-size:12px">${el.planTime}</span>`,
            `<span style="color:#87c4fc;font-size:12px">${el.projectName}</span>`,
          ]);
        });
        this.config2 = {
          data: datas,
          align: ["center", "left"],
          rowNum: 5,
          columnWidth: [80],
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.dv-border-box-7 span {
  display: block;
  padding: 10px 5px;
  font-size: 12px;
}
.tab-box {
  display: flex;
  height: calc(100% - 34px);
  align-items: center;
  justify-content: center;
}
.tab-title {
  width: 10%;
  text-align: center;
}
.tab-content {
  height: 100%;
  width: 40%;
  padding: 5px;
  box-sizing: border-box;
}
.tab-content-border {
  border-right: 1px dashed #87c4fc;
  // border-image: linear-gradient(to bottom, #ffffff, #87c4fc);
}
</style>
