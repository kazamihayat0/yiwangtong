<template>
  <div style="height: 100%">
    <div class="top-title">
      <router-link
        to="/core/villageManagement/achievementsList/singleList"
      >
        <div class="box-title">
      <span>单项榜</span>
        </div>
      </router-link>
    </div>
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: calc(100% - 34px); font-size: 12px"
    />
  </div>
</template>

<script>
export default {
  props: {
    singleJob: {
      type: Object,
    },
  },
  data() {
    return {
      config: {},
    };
  },
  watch: {
    singleJob: {
      handler: function (val) {
        if (val !== null) {
          let incomeUp =
            val.incomeUp == null ? "暂无数据" : `增幅${val.incomeUp}%`;
          let debtDown =
            val.debtDown == null ? "暂无数据" : `降幅${val.debtDown}%`;
          let expenDown =
            val.expenDown == null ? "暂无数据" : `降幅${val.expenDown}%`;
          let petitionNum =
            val.petitionNum == null ? "暂无数据" : `${val.petitionNum}信访`;
          let project = val.project == null ? "暂无数据" : `${val.petitionNum}`;
          let experCommun =
            val.experCommun == null ? "暂无数据" : `${val.petitionNum}`;
          let pilotReform =
            val.pilotReform == null ? "暂无数据" : `${val.pilotReform}`;
          this.config = {
            data: [
              [
                '<span style="color:#ffffff;font-size:12px">经营性收入</span>',
                `<span style="color:#ffffff;font-size:12px">${
                  val.inComeSort == 1 ? "👑" : ""
                }${val.inComeSort}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${incomeUp}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村集体负债</span>',
                `<span style="color:#ffffff;font-size:12px">${
                  val.debtDownSort == 1 ? "👑" : ""
                }${val.debtDownSort}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${debtDown}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村级误工开支</span>',
                `<span style="color:#ffffff;font-size:12px">${
                  val.expenDownSort == 1 ? "👑" : ""
                }${val.expenDownSort}</span>`,
                `<span style="color:#87c4fc;font-size:12px">${expenDown}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">村级落地项目</span>',
                `<span style="color:#ffffff;font-size:12px"></span>`,
                `<span style="color:#87c4fc;font-size:12px">${project}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">数字治理</span>',
                `<span style="color:#ffffff;font-size:12px"></span>`,
                `<span style="color:#87c4fc;font-size:12px"></span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">信访情况</span>',
                `<span style="color:#ffffff;font-size:12px"></span>`,
                `<span style="color:#87c4fc;font-size:12px">${petitionNum}</span>`,
              ],
              [
                '<span style="color:#ffffff;font-size:12px">标杆进位</span>',
                `<span style="color:#ffffff;font-size:12px"></span>`,
                `<span style="color:#87c4fc;font-size:12px"></span>`,
              ],
            ],
            align: ["center"],
            rowNum: 7,
            columnWidth: [120, 80],
            // oddRowBGC: "transparent",
            // evenRowBGC: "transparent",
          };
        }
      },
      deep: true,
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
</style>
