<template>
  <div style="width: 100%; height: 100%; font-size: 12px" @click="boxClick">
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: 100%; font-size: 12px"
      @click="onClick"
    />
  </div>
</template>

<script>
import param from "@/mock/param";
import singleJobPopover from "./singleJobPopover/singleJobPopover.vue";
export default {
  components: { singleJobPopover },
  props: {
    singleJob: {
      type: Object,
    },
  },
  data() {
    return {
      config: {
        data: [],
        align: ["center"],
        rowNum: 7,
        columnWidth: [100, 80],
        oddRowBGC: "transparent",
        evenRowBGC: "transparent",
      },
    };
  },
  watch: {
    singleJob: {
      handler: function (val) {
        if (typeof val === "object" && val.compreTop !== "undefined") {
          this.config = {
            data: [
              [
                '<span style="color:#ffffff;font-size:12px">经营性收入</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.incomeUpTop.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.incomeUpTop.incomeUp}万元</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">数字治理</span>',
                `<span style="color:#ffffff;font-size:12px">👑</span>`,
                `<span style="color:#87c4fc;font-size:12px"></span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村级落地项目</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.compreTop.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.compreTop.project}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">标杆进位</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.benCarryTop.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.benCarryTop.benCarry}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村集体负债</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.debtDownTOP.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.debtDownTOP.debtDown}万元</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村级误工开支</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.expenDownTop.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.expenDownTop.expenDown}万元</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">信访情况</span>',
                `<span style="color:#ffffff;font-size:12px">👑${val.letterTop.areaName}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${val.letterTop.petitionNum}信访</span>`,
              ],

            ],
            align: ["center"],
            rowNum: 7,
            columnWidth: [104, 85],
            // oddRowBGC: "transparent",
            // evenRowBGC: "transparent",
          };
        }
      },
    },
  },
  methods: {
    onClick(row) {
      //村集体经济收入榜前十 0
      //村集体负债榜 1
      //村级误工开支 2
      //信访情况榜 6
      console.log(row);
      var singleJobType = [0, 1, 3, 4,5, 6];

      let benCarryTopList=[];
      this.singleJob.benCarryTopList.forEach((el) => {
        benCarryTopList.push({
          param1: el.sort,
          param2: el.areaName,
          param3: el.benCarry,
          param4: el.id,
        });
      });
      var debtDownTOPList = [];
      debugger
      this.singleJob.debtDownTOPList.forEach((el) => {
        debtDownTOPList.push({
          param1: el.sort,
          param2: el.areaName,
          param3: el.debtDown + "万元",
          param4: el.id,
        });
      });
      var expenDownTopList = [];
      this.singleJob.expenDownTopList.forEach((el) => {
        expenDownTopList.push({
          param1: el.sort,
          param2: el.areaName,
          param3: el.expenDown + "万元",
          param4: el.id,
        });
      });
      //经营性收入
      var incomeUpTopList = [];
      this.singleJob.incomeUpTopList.forEach((el) => {
        incomeUpTopList.push({
          param1: el.sort,
          param2: el.areaName,
          param3: el.incomeUp + "万元",
          param4: el.id,
        });
      });
      //信访
      var letterTopList = [];
      this.singleJob.letterTopList.forEach((el) => {
        letterTopList.push({
          param1: el.sort,
          param2: el.areaName,
          param3: el.petitionNum,
          param4: el.id,
        });
      });
      var singleJobTypeData = [
        incomeUpTopList,
        incomeUpTopList,
        benCarryTopList,
        debtDownTOPList,
        expenDownTopList,
        letterTopList,
      ];
      var titleArry = [
        { title: "村集体经营性收入", th1: "排名", th2: "村社", th3: "金额" },
        { title: "数字治理", th1: "排名", th2: "村社", th3: "活跃度" },
        { title: "标杆进位", th1: "排名", th2: "村社", th3: "标杆进位" },
        { title: "村集体负债", th1: "排名", th2: "村社", th3: "金额" },
        { title: "村级误工开支", th1: "排名", th2: "村社", th3: "金额" },
        { title: "信访情况", th1: "排名", th2: "村社", th3: "信访量" },
      ];
      var index = singleJobType.indexOf(row.rowIndex);
      if (index != -1) {
        this.$emit("singleJobPopover", {
          headers: titleArry[index],
          dataInfo: singleJobTypeData[index],
          type: 1,
        });
      } else {
        this.$emit("singleJobPopover", {
          type: 2,
        });
      }
    },
    boxClick(e) {
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
</style>
