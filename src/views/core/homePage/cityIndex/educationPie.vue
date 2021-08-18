<template>
  <div id="educationPie"></div>
</template>

<script>
export default {
  props: {
    numObj: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  watch: {
    numObj: {
      handler: function () {
        if (this.numObj.num1 !== undefined) {
          this.setEducationPie();
        }
      },
      deep: true,
    },
  },
  methods: {
    setEducationPie() {
      var chartDom = document.getElementById("educationPie");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        // title: {
        //   text: "某站点用户访问来源",
        //   subtext: "纯属虚构",
        //   left: "center",
        // },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          show: false,
          // top: "5%",
          // left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "70%",
            data: [
              { name: "初中及以下", value: this.numObj.num1 },
              { name: "高中", value: this.numObj.num2 },
              { name: "大专及以上", value: this.numObj.num3 },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              color: "#87C4FC",
              formatter: "{b}\n{c}\n{d}%",
            },
          },
        ],
        color: ["#9BA7D4", "#23B7E5", "#83BFF6"],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
#educationPie {
  height: 100%;
}
</style>