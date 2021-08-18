<template>
  <div class="village-dv">
    <div class="top-dv">
      <div style="float: right">
        <div v-if="toType === 0">
          <router-link to="/cityIndex">
            <el-button
              type="text"
              size="small"
              style="margin-right: 20px"
              icon="el-icon-s-home"
            >
              返回首页
            </el-button>
          </router-link>
        </div>
        <div v-else>
          <el-button
            type="text"
            size="small"
            style="margin-right: 20px"
            icon="el-icon-s-tools"
            @click="manaClick"
          >
            管理后台
          </el-button>
        </div>
      </div>
    </div>
    <div class="container-dv" @click="containerClick">
      <div class="left-dv">
        <div class="left1 content-box content-title">
          <span>村干部履职指数</span>
        </div>
        <div class="left2 content-box">
          <div class="content-border-box">
            <cadre-info
              :cadreInfoArray="cadreInfoArray"
              @cadreParamsChange="cadreParamsChange"
            ></cadre-info>
          </div>
        </div>
        <div class="left3 content-box">
          <div class="content-border-box">
            <duties-index
              :dutiesIndexArray="dutiesIndexArray"
              ref="dutiesIndex"
            ></duties-index>
          </div>
        </div>
      </div>
      <div class="middle-dv">
        <div
          class="middle1 content-box content-title"
          style="padding-top: 2.5%"
        >
          <span>村级运行健康指数</span>
        </div>
        <div class="middle2 content-box">
          <div class="content-border-box">
            <village-info :villageInfoObj="villageInfoObj"></village-info>
          </div>
        </div>

        <div class="middle3 content-box">
          <div class="content-border-box">
            <healthy-index :healthIndexObj="healthIndexObj"></healthy-index>
          </div>
        </div>
        <div class="middle4 content-box">
          <div class="content-border-box">
            <develop-plan
              :villagePlanFinish="villagePlanFinish"
              :villStr="villStr"
              :villagePlanUnfinish="villagePlanUnfinish"
            ></develop-plan>
          </div>
        </div>
      </div>
      <div class="right-dv">
        <div class="right1 content-box content-title">
          <span>重点工作战斗力排行榜</span>
        </div>
        <div class="right2 content-box">
          <div class="content-border-box">
            <comprehensive-job
              :dutiesCompreBoardArray="dutiesCompreBoardArray"
              :areaName="villageCompreBoard.areaName"
              :sort="villageCompreBoard.sort"
            ></comprehensive-job>
          </div>
        </div>
        <div class="right3 content-box">
          <div class="content-border-box">
            <single-job :singleJob="singleJob"></single-job>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-dv"></div>
  </div>
</template>

<script>
import {
  villageUser,
  healthBoardIndex,
  villageInfo,
  dutiesCompreBoard,
  dutiesBoard,
  villageHealthIndex,
  villagePlan,
} from "@/api/homePage/villageIndex";
import cadreInfo from "./villageIndex/cadreInfo.vue";
import ComprehensiveJob from "./villageIndex/comprehensiveJob.vue";
import DevelopPlan from "./villageIndex/developPlan.vue";
import DutiesIndex from "./villageIndex/dutiesIndex.vue";
import HealthyIndex from "./villageIndex/healthyIndex.vue";
import SingleJob from "./villageIndex/singleJob.vue";
import VillageInfo from "./villageIndex/villageInfo.vue";

export default {
  components: {
    cadreInfo,
    DutiesIndex,
    ComprehensiveJob,
    SingleJob,
    VillageInfo,
    HealthyIndex,
    DevelopPlan,
  },
  data() {
    return {
      dutiesIndexArray: [], //履职指数
      cadreInfoCurrent: 1, //村干部信息分页页数
      type: 1, //党组织和村委会
      cadreInfoArray: [], //村干部信息
      dutiesCompreBoardArray: [], //综合榜数据
      villageCompreBoard: {
        areaName: "",
        sort: 1,
      }, //当前村综合榜排名
      singleJob: {}, //单项榜数据
      areaCode: "",
      villageInfoObj: {}, //村信息
      healthIndexObj: {}, //健康指数
      villagePlanFinish: [],
      villagePlanUnfinish: [],
      villStr:"",//完成/全部
      toType: 0,
    };
  },
  created() {
    this.$store.dispatch("GetMenu").then((data) => {
      if (data.length !== 0) {
        this.$router.$avueRouter.formatRoutes(data, true);
      }
    });
  },

  mounted() {
    this.$router.$avueRouter.setTitle("村事云管家");
    let queryObj = JSON.parse(this.$route.query.obj);
    this.areaCode = queryObj.areaCode;
    if (queryObj.type === 1) {
      this.toType = 1;
    } else {
      this.toType = 0;
    }
    this.init();
  },
  methods: {
    init() {
      this.getVillageUser();
      this.getHealthBoardIndex();
      this.getVillageInfo();
      this.getDutiesCompreBoard();
      this.getDutiesBoard();
      this.getVillageHealthIndex(4);
      this.getVillagePlan();
    },
    manaClick() {
      this.$router.push({ path: "/system/user" });
    },

    getVillageUser() {
      villageUser(this.cadreInfoCurrent, 0, this.areaCode).then((res) => {
        this.cadreInfoArray = res.data.data;
      });
    },

    getHealthBoardIndex() {
      healthBoardIndex(this.areaCode).then((res) => {
        this.dutiesIndexArray = res.data.data;
      });
    },
    getVillageInfo() {
      villageInfo(this.areaCode).then((res) => {
        this.villageInfoObj = res.data.data;
      });
    },
    getDutiesCompreBoard() {
      dutiesCompreBoard(this.areaCode).then((res) => {
        this.dutiesCompreBoardArray = res.data.data.vo;
        this.villageCompreBoard.areaName = res.data.data.areaName; //当前村名称
        this.villageCompreBoard.sort = res.data.data.sort; //当前村综合榜排名
      });
    },
    getDutiesBoard() {
      dutiesBoard(this.areaCode).then((res) => {
        this.singleJob = res.data.data;
      });
    },
    getVillageHealthIndex(type) {
      villageHealthIndex(this.areaCode, type).then((res) => {
        this.healthIndexObj = res.data.data;
      });
    },
    getVillagePlan() {
      villagePlan(this.areaCode).then((res) => {
        this.villagePlanFinish = res.data.data.finishMx;
        this.villagePlanUnfinish = res.data.data.unFinishMx;
        this.villStr=res.data.data.finish+"/"+res.data.data.total
      });
    },
    cadreParamsChange(params) {
      this.cadreInfoCurrent = params.current; //村干部信息分页页数
      this.type = params.type; //党组织和村委会
      this.getVillageUser();
    },
    //页面点击事件响应
    containerClick() {
      this.$refs.dutiesIndex.closePop(); //关闭履职指数弹出框
    },
  },
};
</script>

<style lang="scss">
.village-dv .top-title {
  color: #ffffff;
  font-weight: bolder;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.content-border-box {
  // border: 1px solid;
  // border-image: linear-gradient(to right, #ffffff, #87c4fc) 1 10;
  border: 2px solid rgba(200, 200, 200, 0.25);
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}
.content-title {
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: bolder;
}
.content-box {
  box-sizing: border-box;
  padding: 5px;
}
.village-dv {
  background: url("/img/dataV/city1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  color: #87c4fc;
}
.top-dv {
  height: 30px;
  overflow: hidden;
}
.footer-dv {
  height: 5px;
}
.container-dv {
  height: calc(100% - 35px);
  display: flex;
}
.left-dv {
  height: 100%;
  width: 25%;
  .left1 {
    height: 5%;
    width: 100%;
  }
  .left2 {
    height: 65%;
    width: 100%;
  }
  .left3 {
    height: 30%;
    width: 100%;
  }
}
.middle-dv {
  height: 100%;
  width: 50%;
  .middle1 {
    height: 7%;
  }
  .middle2 {
    height: 31%;
  }
  .middle3 {
    height: 32%;
  }
  .middle4 {
    height: 30%;
  }
}
.right-dv {
  height: 100%;
  width: 25%;
  .right1 {
    height: 5%;
  }
  .right2 {
    height: 45%;
  }
  .right3 {
    height: 50%;
  }
}
</style>
