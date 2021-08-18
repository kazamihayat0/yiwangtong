<template>
  <div style="height: 100%; position: relative">
    <div class="top-title" style="text-align: center">
      <span>健康指数</span>
    </div>

    <div
      style="height: calc(100% - 34px); font-size: 14px"
      v-show="radio1 == 4"
    >
      <el-row style="color: #ffffff">
        <el-col span="8">
          月度：{{ realTimedata.month }}月 截止时间：{{ realTimedata.dateStr }}
        </el-col>
        <el-col span="8" style="text-align: center">
          <span style="color: #87c4fc">实时/</span>
          <span>期望</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col span="6">
          <div class="box1">
            <p>值坐班</p>
            <p>
              <span>{{ realTimedata.zzb }}</span>
              <span style="color: #ffffff">/13</span>
            </p>
          </div>
        </el-col>
        <el-col span="6">
          <div class="box1">
            <p>村务联席会议</p>
            <p>
              <span>{{ realTimedata.cw }}</span>
              <span style="color: #ffffff">/4</span>
            </p>
          </div>
        </el-col>
        <el-col span="6">
          <div class="box1">
            <p>集中审账</p>
            <p>
              <span>{{ realTimedata.jzsz }}</span>
              <span style="color: #ffffff">/1</span>
            </p>
          </div>
        </el-col>
        <el-col span="6">
          <div class="box1">
            <p>村监会运行</p>
            <p>
              <span>{{ realTimedata.cjh }}</span>
              <span style="color: #ffffff">/1</span>
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col span="6">
          <div class="box1">
            <p>村党组织村务监督会议</p>
            <p>
              <span>{{ realTimedata.jdhy }}</span>
              <span style="color: #ffffff">/1</span>
            </p>
          </div>
        </el-col>
        <el-col span="6">
          <div class="box1">
            <p>村民代表会议</p>
            <p>
              <span>{{ realTimedata.cmdb }}</span>
              <span style="color: #ffffff">/1</span>
            </p>
          </div>
        </el-col>
        <el-col span="6">
          <div class="box1">
            <p>主题党日/党组织会议</p>
            <p>
              <span>{{ realTimedata.dzz }}</span>
              <span style="color: #ffffff">/1</span>
            </p>
          </div>
        </el-col>
        <el-col span="6"></el-col>
      </el-row>
    </div>
    <div
      id="healthyPie"
      style="height: calc(100% - 34px)"
      v-show="radio1 != 4"
    ></div>
    <div
      v-show="radio1 != 4"
      style="
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 22px;
        font-weight: bolder;
      "
    >
      <span v-if="this.healthIndexObj !== null"
        >{{ this.healthIndexObj.param10 }}分</span
      >
    </div>
    <div
      style="
        position: absolute;
        top: 0px;
        right: 5px;
        color: #fff;
        font-size: 14px;
      "
    >
      <label class="radios">
        <input
          name="timeRadio"
          type="radio"
          :value="4"
          v-model="radio1"
          hidden
        />
        <span>实时</span>
      </label>
      <label class="radios">
        <input
          name="timeRadio"
          type="radio"
          :value="1"
          v-model="radio1"
          hidden
        />
        <span>上月</span>
      </label>
      <label class="radios">
        <input
          name="timeRadio"
          type="radio"
          :value="2"
          v-model="radio1"
          hidden
        />
        <span>全年</span>
      </label>
      <label class="radios">
        <input
          name="timeRadio"
          type="radio"
          :value="3"
          v-model="radio1"
          hidden
        />
        <span>累计</span>
      </label>
      <!-- <dv-border-box-7
        :color="['#0B618D', '#B78C32']"
        backgroundColor="transparent"
        style="color: #4afdfd; width: 40px; padding: 2px; text-align: center"
      >
        <span> 实时</span>
      </dv-border-box-7> -->
    </div>
  </div>
</template>

<script>
import peoRatio from "../cityIndex/peoRatio.vue";
export default {
  components: { peoRatio },
  props: {
    healthIndexObj: {
      type: Object,
    },
  },
  data() {
    return {
      radio1: 4,
      realTimedata: {},
    };
  },
  watch: {
    healthIndexObj: {
      handler: function (newVal) {
        if (newVal !== null) {
          if (this.radio1 != 4) {
            this.$nextTick(() => {
              this.setHealthyPie();
            });
          }

          this.setRealTimeData(newVal);
        }
      },
      deep: true,
    },
    radio1: function (newVal) {
      console.log(newVal);
      console.log(typeof newVal);
      this.$parent.getVillageHealthIndex(newVal);
    },
  },

  mounted() {
    console.log(this.$parent);
  },
  methods: {
    setHealthyPie() {
      console.log("aaaa");
      var chartDom = document.getElementById("healthyPie");
      let myChart = this.$echarts.getInstanceByDom(chartDom);
      if (myChart == null) {
        // 如果不存在，就进行初始化
        myChart = this.$echarts.init(chartDom);
      }
      console.log(myChart);
      var option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c}({d}%)",
              color: "#87c4fc",
            },
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: "20",
              //   fontWeight: "bold",
              // },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: this.healthIndexObj.param1, name: "值坐班" },
              { value: this.healthIndexObj.param2, name: "联席会议" },
              {
                value: this.healthIndexObj.param3,
                name: "党组织会议/主题党日",
              },
              { value: this.healthIndexObj.param4, name: "集中审账" },
              { value: this.healthIndexObj.param5, name: "村监会运行" },
              { value: this.healthIndexObj.param6, name: "村民代表会议" },
              // { value: this.healthIndexObj.param7, name: "村民满意度" },
            ],
          },
        ],
        color: [
          "#90BDF0",
          "#59B5E1",
          "#9DA7D0",
          "#438BE9",
          "#544A9E",
          "#ff9f7f",
          "#0076F6",
        ],
      };
      console.log(option);
      myChart.setOption(option);
    },
    setRealTimeData(datas) {
      console.log(datas);
      if (datas.tempVO != null && datas.tempVO != "null") {
        this.realTimedata = datas.tempVO;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box1 {
  width: 100%;
  text-align: center;
  p {
    margin: 0 0 10px 0;
    span {
      font-size: 18px;
      font-weight: bolder;
    }
  }
}
.radios {
  display: inline-block;
  span {
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    background: #0a2732;
    color: #ffffff;
    font-size: 12px;
    // border: ridge #0b618d;
  }
}

.radios input[type="radio"]:checked + span {
  display: block;
  color: #4afdfd;
  background-color: #0a618d;
}
</style>