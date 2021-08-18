<template>
  <div id="ageGuage"></div>
</template>

<script>
export default {
  mounted() {
    var chartDom = document.getElementById("ageGuage");
    var myChart = this.$echarts.init(chartDom);

    var option = (option = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              value: 50,
              name: "SCORE",
            },
          ],
          startAngle: 90,
          endAngle: -270,
          splitLine: {
            show: false,
          },
          progress: {
            show: true,
            width: 5,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 5,
            },
          },
        },
      ],
    });
    option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
#ageGuage {
  height: 150px;
}
</style>