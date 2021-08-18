<template>
  <div class="main">
    <div class="content">
      <div class="icon-li">
        <img src="@/styles/icon/renkou.svg" alt="" height="25%" />
        <div class="text-box">
          <!-- <el-popover
            placement="right"
            width="30"
            trigger="click"
            popper-class="pop-bg"
            :visible-arrow="false"
            ><div>
              <p style="">人口分布</p>
              <el-row>
                <el-col span="12">年龄</el-col>
                <el-col span="12">人数(占比)</el-col>
              </el-row>
              <el-row>
                <el-col span="12">≤35岁</el-col>
                <el-col span="12">346(56%)</el-col>
              </el-row>
              <el-row>
                <el-col span="12">35~59岁</el-col>
                <el-col span="12">346(56%)</el-col>
              </el-row>
              <el-row>
                <el-col span="12">≥60岁</el-col>
                <el-col span="12">346(56%)</el-col>
              </el-row>
            </div>
            <el-button slot="reference" type="text" class="text-btn">
              <span>人口</span>
              <span>{{ villageInfoObj.people }}人</span>
            </el-button>
          </el-popover> -->
          <village-info-popover>
            <template v-slot:content>
              <population-distribution></population-distribution>
            </template>
            <template v-slot:footerBtn>
              <span>人口</span>
              <span class="txt-params">{{ villageInfoObj.population }}人</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>党员数</span>
              <span class="txt-params">{{ villageInfoObj.partyMembers }}</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>经营性收入</span>
              <span class="txt-params"
                >{{ villageInfoObj.operatIncome }}万</span
              >
            </template>
          </village-info-popover>
        </div>
      </div>
      <div class="icon-li">
        <img src="@/styles/icon/tudi.svg" alt="" height="25%" />
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>面积</span>
              <span class="txt-params">{{ villageInfoObj.area }}亩</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>村（居）民小组数量</span>
              <span class="txt-params">{{ villageInfoObj.villageGroups }}</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>上年农民人均收入</span>
              <span class="txt-params"
                >{{ villageInfoObj.farmersIncome }}万</span
              >
            </template>
          </village-info-popover>
        </div>
      </div>
      <div class="icon-li">
        <img src="@/styles/icon/shouru.svg" alt="" height="25%" />
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>村集体经济收入</span>
              <span class="txt-params">{{ villageInfoObj.incomeUp }}万</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>村(居)民代表数量</span>
              <span class="txt-params">{{
                villageInfoObj.villagerRepresentatives
              }}</span>
            </template>
          </village-info-popover>
        </div>
        <div class="text-box">
          <village-info-popover>
            <template v-slot:footerBtn>
              <span>村级负债</span>
              <span class="txt-params">{{ villageInfoObj.villageDebt }}万</span>
            </template>
          </village-info-popover>
        </div>
      </div>
    </div>
    <div>
      <div style="font-size: 12px; height: 18px; line-height: 18px">
        <span>主要经济来源 </span>
      </div>
      <div style="font-size: 14px; height: 22px; line-height: 22px">
        <span>{{ villageInfoObj.mianIncome }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PopulationDistribution from "./villageInfo/populationDistribution.vue";
import VillageInfoPopover from "./villageInfo/villageInfoPopover.vue";
export default {
  components: { VillageInfoPopover, PopulationDistribution },
  props: {
    villageInfoObj: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  text-align: center;
  .content {
    display: flex;
    height: calc(100% - 40px);
    .icon-li {
      width: 33.33%;
      .text-box {
        margin-bottom: 5px;
        height: calc(25% - 5px);
        span {
          display: block;
          font-size: 12px;
        }
        .txt-params {
          font-weight: bolder;
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>