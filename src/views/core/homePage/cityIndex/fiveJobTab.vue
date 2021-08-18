<template>
  <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
</template>

<script>
  export default {
    props: {
      fiveJob: {
        type: Array,
      },
    },
    data() {
      return {
        config: {
          data: [],
          align: ["center"],
          rowNum: 9,
        },
      };
    },
    watch: {
      fiveJob: {
        handler: function (val, oldVal) {
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
                `<span style="${textStyle}">${index + 1}</span>`,
                `<span style="color:#ffffff;font-size:12px">${el.areaName}</span>`,
                `<span style="color:#ffffff;font-size:12px">${el.finish}/${el.total}</span>`
              ]);
            });
            this.config = {
              data: data,
              align: ["center"],
              rowNum: 7,
              columnWidth: [65, 120,60],
              // oddRowBGC: "transparent",
              // evenRowBGC: "transparent",
            };
          }
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    display: block;
  }
  .span1-style {
    color: #ffffff;
    font-size: 12px;
    background: #ff9f7f;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
  }
  .span2-style {
    color: #ffffff;
    font-size: 12px;
    background: #ff9f7f;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
  }
  .span3-style {
    color: #ffffff;
    font-size: 12px;
    background: #ff9f7f;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
  }
</style>
