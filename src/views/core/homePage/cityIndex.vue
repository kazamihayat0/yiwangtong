 <template>
  <div class="city-index" @click="handle">
    <div class="city-top">
      <div style="float: right">
        <!--<router-link to="/system/user">-->
        <el-button
          type="text"
          size="small"
          style="margin-right: 20px"
          icon="el-icon-s-tools"
          @click="manaClick"
        >
          管理后台
        </el-button>
        <!--</router-link>-->
      </div>
    </div>
    <div class="city-dv">
      <div class="left-dv">
        <p
          style="
            text-align: center;
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 10px;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
          "
          @click="setDialogData(0)"
        >
          村干部履职指数
        </p>
        <el-image-viewer
          v-show="showViewer"
          :on-close="
            () => {
              showViewer = false;
            }
          "
          :url-list="imgList"
        />
        <div class="city-sel">
          <el-cascader
            v-model="areaCode"
            :options="areaOptions"
            size="small"
            style="width: 100%"
            placeholder="街道/乡镇选择"
            :props="{ checkStrictly: true, label: 'name', value: 'code' }"
            clearable
            filterable
          ></el-cascader>
        </div>
        <div class="left1">
          <div class="change-border-box">
            <!--<router-link to="/system/user">-->
              <el-row style="text-align: center; color: #87c4fc">
                <el-col span="8">
                  <div>
                    <span>村社党组织</span>
                  </div>
                  <span>{{ countVillage }}个</span>
                </el-col>
                <el-col  @click.native="toSecretaryType({ postId: '1123598817738675201' })" span="8">
                  <div>
                    <span  >党组织书记</span>
                  </div>
                  <span>{{ countSecretary }}个</span>
                </el-col>
                <el-col span="8">
                  <div>
                    <span>其他两委干部</span>
                  </div>
                  <span>{{ countOther }}个</span>
                </el-col>
              </el-row>
              <el-row style="text-align: center; color: #87c4fc">
                <el-col span="8" @click.native="toSecretaryType({ postId: '1123598817738675202' })">
                  <div>
                    <span>副书记</span>
                  </div>
                  <span>{{ countFsj }}个</span>
                </el-col>
                <el-col span="8" @click.native="toSecretaryType({ postId: '1123598817738675204' })">
                  <div>
                    <span>村委会主任</span>
                  </div>
                  <span>{{ countZr }}个</span>
                </el-col>
                <el-col span="8" @click.native="toSecretaryType({ postId: '1123598817738675205' })">
                  <div>
                    <span>村委会副主任</span>
                  </div>
                  <span>{{ countFzr }}个</span>
                </el-col>
              </el-row>
            <!--</router-link>-->
          </div>
          <div class="change-border-box">
            <span class="box-title">书记类别</span>
            <el-row>
              <el-col
                span="8"
                v-for="item in secretaryType"
                :key="item + uuidNum"
                @click.native="toSecretaryType({ peopleType: item.peoType })"
                style="cursor: pointer"
              >
                <peo-ratio
                  :peoType="item.peoType"
                  :peoNum="item.peoNum"
                  :peoRatio="item.peoRatio"
                >
                </peo-ratio>
              </el-col>
            </el-row>
          </div>

          <div class="change-border-box">
            <span class="box-title">年龄结构</span>
            <el-row>
              <el-col span="8">
                <!-- <el-progress
                  type="circle"
                  :percentage="50"
                  width="90"
                  stroke-width="8"
                ></el-progress> -->
                <div class="square-box">
                  <div
                    class="square-content"
                    @click="toSecretaryType({ ageType: 0 })"
                  >
                    <!--<dv-active-ring-chart :config="ageOption1" style="width:100px;height:100px" />-->
                    <dv-charts :option="ageOption1" />
                  </div>
                </div>
              </el-col>
              <el-col span="8">
                <div class="square-box">
                  <div
                    class="square-content"
                    @click="toSecretaryType({ ageType: 1 })"
                  >
                    <dv-charts :option="ageOption2" />
                  </div>
                </div>
              </el-col>
              <el-col span="8">
                <div class="square-box">
                  <div
                    class="square-content"
                    @click="toSecretaryType({ ageType: 2 })"
                  >
                    <dv-charts :option="ageOption3" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="change-border-box pie-box">
            <span class="box-title">学历分布</span>
            <div style="height: calc(100% - 10px)">
              <education-pie :numObj="eduStructPic"> </education-pie>
            </div>
          </div>

          <div class="change-border-box duties-box">
            <router-link to="/core/cdreManagement/performanceIndex">
              <span class="box-title">履职指数</span>
            </router-link>
            <el-row>
              <el-col
                v-for="item in cadreStaticLabel"
                :key="item.num"
                span="12"
              >
                <cadre-static
                  :areaCode="areaCode"
                  :num="cadreStatic[item.num]"
                  :labelName="item.labelName"
                  :infoArr="cadreStatic[item.infoArr]"
                >
                </cadre-static>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="change-border-box move-text-box">
          <marquee> 村干部履职指数不合格干部：{{ unHealthPeopleStr }} </marquee>
        </div>
      </div>
      <div class="content-dv">
        <div style="text-align: center">
          <p
            style="
              text-align: center;
              font-size: 18px;
              margin-top: 0;
              margin-bottom: 10px;
              font-weight: 600;
              cursor: pointer;
            "
            @click="setDialogData(1)"
          >
            <span style="color: #ffffff"> 村级运行健康指数 </span>
          </p>
        </div>
        <div class="map-box change-border-box">
          <inde-map
            @polygonClick="polygonClick"
            @polygonMouseover="polygonMouseover"
            :meetRadioVal="meetRadioVal"
            ref="meetRadioValRef"
          ></inde-map>
          <div style="text-align: center" class="meet-radio">
            <!--//单选框-->
            <el-radio-group v-model="meetRadioVal">
              <el-radio
                v-for="item in meetRadio"
                :key="item.label"
                :label="item.val"
                style="font-size: 12px!imporant; color: #fff"
                >{{ item.label }}
              </el-radio>
            </el-radio-group>
          </div>
          <div class="community-type">
            <dv-border-box-7
              :color="['#003B51', '#0076F6']"
              style="
                padding: 0 5px 0 8px;
                text-align: center;
                margin-bottom: 5px;
                width: 90px;
              "
            >
              <el-button
                type="text"
                size="small"
                style="color: #87c4fc; padding: 5px 0"
              >
                健康村社 {{ healthyGender.healthTotal }}
              </el-button>
            </dv-border-box-7>
            <dv-border-box-7
              :color="['#003B51', '#0076F6']"
              style="
                width: 90px;
                padding: 0 5px 0 8px;
                text-align: center;
                margin-bottom: 5px;
              "
            >
              <!-- healthyGender.subHealthTotal -->
              <cadre-static
                :areaCode="areaCode"
                :num="healthyGender.subHealthTotal"
                labelName="亚健康村社"
                :infoArr="healthyGender.subHealth"
                direction="right"
              >
                亚健康村社{{ healthyGender.subHealthTotal }}
              </cadre-static>
              <!-- <el-tooltip placement="right">
                <div slot="content">
                  新安江街道 1(17%)<br />更楼街道 2(32%)<br />梅城镇 3(50%)
                </div>
                <el-button type="text" size="small" style="color: #fff">
                  亚健康社区 6
                </el-button>
              </el-tooltip> -->
            </dv-border-box-7>
            <dv-border-box-7
              :color="['#003B51', '#0076F6']"
              style="
                width: 90px;
                padding: 0 5px 0 8px;
                text-align: center;
                margin-bottom: 5px;
              "
            >
              <cadre-static
                :areaCode="areaCode"
                :num="healthyGender.unHealthTotal"
                labelName="不健康村社"
                :infoArr="healthyGender.unHealth"
                direction="right"
              >
                不健康村社{{ healthyGender.unHealthTotal }}
              </cadre-static>
              <!-- <el-tooltip placement="right">
                <div slot="content">
                  新安江街道 1(17%)<br />更楼街道 2(32%)<br />梅城镇 3(50%)
                </div>
                <el-button type="text" size="small" style="color: #fff"
                  >不健康社区
                </el-button>
              </el-tooltip> -->
            </dv-border-box-7>
          </div>
          <div
            style="position: absolute; top: 35%; left: 60%; z-index: 20"
            v-show="cardShow"
          >
            <el-card class="box-card" style="color: #fff">
              <div>
                {{ healthIndex.areaName }}健康指数
                <span style="color: red">{{ healthIndex.param10 }}</span
                >分
              </div>
              <div v-show="healthIndex.param10">
                <el-row>
                  <el-col span="10">类目</el-col>
                  <el-col span="6">分数</el-col>
                  <el-col span="8">占比</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">值坐班</el-col>
                  <el-col span="6">{{ healthIndex.param1 }}</el-col>
                  <el-col span="8">20%</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">村务联席会议</el-col>
                  <el-col span="6">{{ healthIndex.param2 }}</el-col>
                  <el-col span="8">15%</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">党组织会议/主题党日</el-col>
                  <el-col span="6">{{ healthIndex.param3 }}</el-col>
                  <el-col span="8">15%</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">集中审账</el-col>
                  <el-col span="6">{{ healthIndex.param4 }}</el-col>
                  <el-col span="8">15%</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">村监会运行</el-col>
                  <el-col span="6">{{ healthIndex.param5 }}</el-col>
                  <el-col span="8">15%</el-col>
                </el-row>
                <el-row>
                  <el-col span="10">村民代表会议</el-col>
                  <el-col span="6">{{ healthIndex.param6 }}</el-col>
                  <el-col span="8">20%</el-col>
                </el-row>
                <!-- <el-row>
                  <el-col span="10">村民满意度 </el-col>
                  <el-col span="6">{{ healthIndex.param7 }}</el-col>
                  <el-col span="8">10%</el-col>
                </el-row> -->
                <!-- <el-row>
                  <el-col span="10">上级研判分数</el-col>
                  <el-col span="6">{{ healthIndex.param9 }}</el-col>
                  <el-col span="8"></el-col>
                </el-row> -->
              </div>
              <div v-show="!healthIndex.param10">
                <p>暂无健康指数数据</p>
              </div>
            </el-card>
          </div>
          <div class="heath-type">
            <div>
              <div
                style="
                  width: 30px;
                  background: #25c0fe;
                  display: inline-block;
                  height: 10px;
                "
              ></div>
              健康指数80分以上
            </div>
            <div>
              <div
                style="
                  width: 30px;
                  background: #ffb926;
                  display: inline-block;
                  height: 10px;
                "
              ></div>
              健康指数60-80分
            </div>
            <div>
              <div
                style="
                  width: 30px;
                  background: red;
                  display: inline-block;
                  height: 10px;
                "
              ></div>
              健康指数60分以下
            </div>
            <div>
              <div
                style="
                  width: 30px;
                  background: #87c4fc;
                  display: inline-block;
                  height: 10px;
                "
              ></div>
              暂无健康指数数据
            </div>
            <div>
              <div style="width: 30px; display: inline-block; height: 14px">
                <img src="@/styles/icon/hongqi.svg" alt="" height="14px" />
              </div>
              标杆村
            </div>
            <div>
              <div style="width: 30px; display: inline-block; height: 14px">
                <img src="@/styles/icon/xingxing.svg" alt="" height="14px" />
              </div>
              进位村
            </div>
          </div>
        </div>
        <div class="change-border-box move-text-box">
          <marquee
            v-if="healthyGender.unHealth && healthyGender.unHealth.length > 0"
          >
            不健康村社：
            <span v-for="item in healthyGender.unHealth" :key="item.uuid">
              {{ item.streetName }} - {{ item.villageStr }};
            </span>
          </marquee>
          <marquee v-else> 暂无数据 </marquee>
        </div>
      </div>
      <!--右侧开始-->
      <div class="right-dv">
        <p
          style="
            text-align: center;
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 10px;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
          "
          @click="setDialogData(2)"
        >
          重点工作战斗力指数
        </p>
        <div class="right1 change-border-box">
          <div class="box-title">
            <router-link
              to="/core/villageManagement/achievementsList/comprehensiveList"
            >
              <span class="box-title">综合榜</span>
            </router-link>
          </div>

          <div class="table-box">
            <comprehensive-job-tab
              :comprehensiveJob="comprehensiveJob"
            ></comprehensive-job-tab>
          </div>
        </div>
        <div class="right2 change-border-box">
          <div class="box-title">
            <router-link
              to="/core/villageManagement/achievementsList/singleList"
            >
              <span class="box-title">单项榜</span>
            </router-link>
          </div>

          <div class="table-box">
            <single-job-tab
              :singleJob="singleJob"
              @singleJobPopover="singleJobPopover"
            ></single-job-tab>
          </div>
          <div
            style="position: absolute; bottom: 5px; right: 150px; z-index: 20"
            v-show="singleJobCardShow"
          >
            <el-card class="box-card" style="color: #fff">
              <div>
                {{ singleJobPopoverData.headers.title }}
              </div>
              <el-row>
                <el-col span="5">
                  {{ singleJobPopoverData.headers.th1 }}
                </el-col>
                <el-col span="12">
                  {{ singleJobPopoverData.headers.th2 }}
                </el-col>
                <el-col span="7">
                  {{ singleJobPopoverData.headers.th3 }}
                </el-col>
              </el-row>
              <el-row
                v-for="(item, index) in singleJobPopoverData.dataInfo"
                :key="item.param4"
              >
                <el-col span="5">{{ index + 1 }}</el-col>
                <el-col span="12">{{ item.param2 }}</el-col>
                <el-col span="7">{{ item.param3 }}</el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div class="right3 change-border-box">
          <div class="box-title">
            <router-link
              to="/core/villageManagement/fiveYearPlan/fiveYearPlan"
            >
              <span class="box-title">五年规划-创业承诺项目</span>
            </router-link>
          </div>

          <div class="table-box">
            <five-job-tab
              :fiveJob="fiveJob"
            ></five-job-tab>
          </div>
        </div>
      </div>
      <!--右侧结束-->

    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      center
      custom-class="dark-bg"
      :fullscreen="true"
    >
      <div
        v-show="centerDialogVisibleImgType == 0"
        style="width: 100%; height: calc(100vh - 80px)"
      >
        <el-carousel
          arrow="always"
          :autoplay="false"
          height="calc(100vh - 80px)"
        >
          <el-carousel-item>
            <el-image
              style="width: 100%; height: calc(100vh - 80px)"
              src="/img/村干部履职指数22.png"
              z-index="2010"
              fit="contain"
            >
            </el-image>
            <!-- <img src="/img/村干部履职指数21.png" width="100%" height="500px" /> -->
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              style="width: 100%; height: calc(100vh - 80px)"
              src="/img/村干部履职指数21.png"
              z-index="2010"
              fit="contain"
            >
            </el-image>
            <!-- <img src="/img/村干部履职指数22.png" width="100%" height="500px" /> -->
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        style="width: 100%; height: calc(100vh - 80px)"
        v-show="centerDialogVisibleImgType == 1"
      >
        <el-carousel arrow="always" height="calc(100vh - 80px)">
          <el-carousel-item>
            <el-image
              style="width: 100%; height: calc(100vh - 80px)"
              src="/img/村级运行健康指数2.png"
              z-index="2010"
              fit="contain"
            >
            </el-image>
            <!-- <img src="/img/村级运行健康指数2.png" width="100%" height="500px" /> -->
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              style="width: 100%; height: calc(100vh - 80px)"
              src="/img/村级运行健康指数22.png"
              z-index="2010"
              fit="contain"
            >
            </el-image>
            <!-- <img
              src="/img/村级运行健康指数22.png"
              width="100%"
              height="500px"
            /> -->
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        style="width: 100%; height: calc(100vh - 80px)"
        v-show="centerDialogVisibleImgType == 2"
      >
        <el-image
          style="width: 100%; height: calc(100vh - 80px)"
          src="/img/重点工作战斗力排行榜2.png"
          z-index="2010"
          fit="contain"
        >
        </el-image>
        <!-- <img src="/img/重点工作战斗力排行榜2.png" width="100%" height="500px" /> -->
      </div>
    </el-dialog>
  </div>
</template>

 <script>
import { meetRadio, ageOption } from "@/option/homePage/cityIndex";

import {
  areaInfo,
  countVillage,
  countSecretary,
  countOther,
  secretaryType,
  ageStruct,
  eduStruct,
  cadreStatic,
  dutiesCompreList,
  fiveJobList,
  dutiesSort,
  healthyGender,
  unHealthPeople,
} from "@/api/homePage/cityIndex";
import { randomLenNum } from "@/util/util";
import CadreStatic from "./cityIndex/cadreStatic.vue";
import IndeMap from "./cityIndex/indeMap.vue";
import AgeGauage from "./cityIndex/ageGauage.vue";
import fiveJobTab from "./cityIndex/fiveJobTab.vue";
import ComprehensiveJobTab from "./cityIndex/comprehensiveJobTab.vue";
import EducationPie from "./cityIndex/educationPie.vue";
import PeoRatio from "./cityIndex/peoRatio.vue";
import singleJobTab from "./cityIndex/singleJobTab.vue";
import Dict from "@/views/system/dict.vue";
import { mapGetters } from "vuex";
import elImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  components: {
    singleJobTab,
    ComprehensiveJobTab,
    PeoRatio,
    EducationPie,
    CadreStatic,
    IndeMap,
    AgeGauage,
    Dict,
    elImageViewer,
    fiveJobTab
  },
  data() {
    return {
      showViewer: false,
      imgList: ["/img/村干部履职指数21.png"],
      singleJobPopoverData: { headers: {}, dataInfo: [] }, //单项榜弹出数据
      ageOption1: {},
      ageOption2: {},
      ageOption3: {},
      meetRadio: meetRadio,
      meetRadioVal: "10",   //？
      cardShow: false,
      singleJobCardShow: false,
      centerDialogVisible: false,
      centerDialogVisibleImgType: 0,
      areaCode: "", //街道/村镇选择值
      areaOptions: "", //街道/村镇下拉框
      countVillage: 0, //村级组织
      countSecretary: 0, //村书记
      countOther: 0, //其他村两委
      countFsj:0,//副书记
      countFzr:0,//村委副主任
      countZr:0,//村委主任
      healthIndex: {
        areaName: "",
        param1: "",
        param2: "",
        param3: "",
        param4: "",
        param5: "",
        param6: "",
        param7: "",
        param8: "",
        param9: "",
        param10: "",
      }, //健康指数
      cadreStatic: {
        removal: [], //累计免职
        removalTotal: 0, //累计免职总量
        suspe: [], //当前停职
        suspeAll: [], //累计停职
        suspeAllTotal: 0, //累计停职总量
        suspeTotal: 0, //当前停职总量
        taken: [],
        takenTotal: 0, //新进总量
        vacSecTotal: 0, //空缺书记(计算村的个数)
        vacantSecretary: [],
        vacantTotal: 0, //空缺职位总量(计算村的个数)
        vacant: [],
      },
      cadreStaticLabel: [
        { num: "suspeTotal", labelName: "当前停职干部", infoArr: "suspe" },
        {
          num: "suspeAllTotal",
          labelName: "累计停职干部",
          infoArr: "suspeAll",
        },
        { num: "removalTotal", labelName: "累计免职干部", infoArr: "removal" },
        { num: "takenTotal", labelName: "累计新进", infoArr: "taken" },
        { num: "vacantTotal", labelName: "空缺职位", infoArr: "vacant" },
        {
          num: "vacSecTotal",
          labelName: "书记空缺",
          infoArr: "vacantSecretary",
        },
        { num: "removalTotal", labelName: "后备干部", infoArr: "removal" },
      ],

      secretaryType: [
        { peoType: "致富带头人", peoNum: 0, peoRatio: 0 },
        { peoType: "返乡大学生", peoNum: 0, peoRatio: 0 },
        { peoType: "乡贤", peoNum: 0, peoRatio: 0 },
        { peoType: "经商办企业", peoNum: 0, peoRatio: 0 },
        { peoType: "退伍军人", peoNum: 0, peoRatio: 0 },
        { peoType: "其他", peoNum: 0, peoRatio: 0 },
      ],
      eduStructPic: {
        num1: 2,
        num2: 3,
        num3: 4,
      },
      comprehensiveJob: [], //综合榜
      fiveJob:[],//五年规划
      singleJob: [], //单项榜
      healthyGender: {},
      unHealthPeopleStr: "",
    };
  },
  watch: {
    areaCode: function (val, oldVal) {
      console.log(val);
      debugger
      if (val.length === 3) {
        let queryObj = JSON.stringify({ areaCode: val[2] });
        this.$router.push({
          path: "/villageIndex",
          query: {
            obj: queryObj,
          },
        });
      } else  if (this.userInfo.level==2&&val.length === 2) {
        let queryObj = JSON.stringify({ areaCode: val[1] });
        this.$router.push({
          path: "/villageIndex",
          query: {
            obj: queryObj,
          },
        });
      } else {
        this.init(val.slice(-1)[0]);
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.getAreaInfo();
    this.init("");
    this.$store.dispatch("GetMenu").then((data) => {
      if (data.length !== 0) {
        this.$router.$avueRouter.formatRoutes(data, true);
      }
    });
  },
  mounted() {
    //  this.$router.push({path:'/warn/warning'});
    this.$router.$avueRouter.setTitle("村事云管家");
  },

  methods: {
    toSecretaryType(e) {
      console.log(e);
      let datas = JSON.stringify(e);
      this.$router.push({
        path: "/system/user",
        query: { datas: datas },
      });
    },
    setDialogData(type) {
      // this.centerDialogVisible = true;
      this.centerDialogVisibleImgType = type;
      if (type == 0) {
        this.imgList = [
          "/img/村干部履职指数21.png",
          "/img/村干部履职指数22.png",
        ];
      } else if (type == 1) {
        this.imgList = [
          "/img/村级运行健康指数2.png",
          "/img/村级运行健康指数22.png",
        ];
      } else if (type == 2) {
        this.imgList = ["/img/重点工作战斗力排行榜2.png"];
      }
      this.showViewer = true;
    },
    manaClick() {
      this.$router.push({ path: "/system/user" });
    },
    //生成随机数
    uuidNum() {
      return randomLenNum(14);
    },
    getindeMapByAreaCode(areaCode){
      if(areaCode!="") {
        this.$refs.meetRadioValRef.getindeMapByAreaCode(areaCode)
      }
    },
    //查询街道/村信息
    init(areaCode) {
      this.getindeMapByAreaCode(areaCode);//市首页选择镇也显示镇地图
      this.getCountVillage(areaCode); //查询村级组织个数
      this.getCountSecretary(areaCode); //查询村书记个数
      this.getCountOther(areaCode); //查询其他村两委个数
      this.getSecretaryType(areaCode); //查询村书记类别
      //查询年龄结构
      this.getAgeStruct(areaCode);
      //查询历结构
      this.getEduStruct(areaCode);
      //履职指数统计
      this.getCadreStatic(areaCode);
      this.getDutiesCompreList(areaCode);
      //五年规划
      this.getFiveJobList(areaCode);
      //17.	重点工作榜-单项
      this.getDutiesSort(areaCode);
      //健康村分布
      this.getHealthyGender(areaCode);
      this.getUnHealthPeople();
    },
    getAreaInfo() {
      console.log(this.userInfo.areaCode);
      areaInfo(this.userInfo.areaCode).then((res) => {
        this.areaOptions = res.data.data[0];
      });
    },
    //查询村级组织个数
    getCountVillage(areaCode) {
      countVillage(areaCode).then((res) => {
        this.countVillage = res.data.data;
      });
    },
    //查询村书记个数
    getCountSecretary(areaCode) {
      countSecretary(areaCode).then((res) => {
        this.countSecretary = res.data.data;
      });
    },
    //查询其他干部个数
    getCountOther(areaCode) {
      countOther(areaCode).then((res) => {
        this.countOther = res.data.data.other;
        this.countFsj= res.data.data.fsj;//副书记
        this.countFzr=res.data.data.fzr;//村委副主任
        this.countZr=res.data.data.zr;//村委主任
      });
    },
    //查询村书记类别
    getSecretaryType(areaCode) {
      secretaryType(areaCode).then((res) => {
        var typeArr = [
          "致富带头人",
          "返乡大学生",
          "乡贤",
          "经商办企业",
          "退伍军人",
          "其他",
        ];
        let secretaryType = [
          { peoType: "致富带头人", peoNum: 0, peoRatio: 0 },
          { peoType: "返乡大学生", peoNum: 0, peoRatio: 0 },
          { peoType: "乡贤", peoNum: 0, peoRatio: 0 },
          { peoType: "经商办企业", peoNum: 0, peoRatio: 0 },
          { peoType: "退伍军人", peoNum: 0, peoRatio: 0 },
          { peoType: "其他", peoNum: 0, peoRatio: 0 },
        ];
        res.data.data.forEach((el) => {
          var i = typeArr.indexOf(el.postName);

          if (i !== -1) {
            secretaryType[i].peoNum = el.num;
            secretaryType[i].peoRatio = el.per;
          }
        });
        // console.log(secretaryType);
        this.secretaryType = secretaryType;
      });
    },
    //查询年龄结构
    getAgeStruct(areaCode) {
      ageStruct(areaCode).then((res) => {
        var str1 = `≤35岁\n${res.data.data.num}人\n{value}%`;
        var str2 = `35-59岁\n${res.data.data.num1}人\n{value}%`;
        var str3 = `≥60岁\n${res.data.data.num2}人\n{value}%`;
        this.ageOption1 = ageOption(parseFloat(res.data.data.per), str1);
        this.ageOption2 = ageOption(parseFloat(res.data.data.per1), str2);
        this.ageOption3 = ageOption(parseFloat(res.data.data.per2), str3);
      });
    },
    //查询学历结构
    getEduStruct(areaCode) {
      eduStruct(areaCode).then((res) => {
        this.eduStructPic = {
          num1: res.data.data.num,
          num2: res.data.data.num1,
          num3: res.data.data.num2,
        };
      });
    },
    //履职指数统计
    getCadreStatic(areaCode) {
      cadreStatic(areaCode)
        .then((res) => {
          let result = res.data.data;
          let cadreStatic = {
            removal: [], //累计免职
            removalTotal: 0, //累计免职总量
            suspe: [], //当前停职
            suspeAll: [], //累计停职
            suspeAllTotal: 0, //累计停职总量
            suspeTotal: 0, //当前停职总量
            taken: [],
            takenTotal: 0, //新进总量
            vacSecTotal: 2, //空缺书记(计算村的个数)
            vacant: [],
            vacantSecretary: [],
            vacantTotal: 0, //空缺职位总量(计算村的个数)
          };
          for (var key in result) {
            cadreStatic[key] = result[key];
          }
          this.cadreStatic = cadreStatic;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //17.	重点工作榜-综合
    getDutiesCompreList(areaCode) {
      dutiesCompreList(areaCode).then((res) => {
        this.comprehensiveJob = res.data.data;
      });
    },
    //五年规划
    getFiveJobList(areaCode) {
      fiveJobList(areaCode).then((res) => {
        this.fiveJob = res.data.data;
      });
    },
    //17.	重点工作榜-单项
    getDutiesSort(areaCode) {
      dutiesSort(areaCode).then((res) => {
        this.singleJob = res.data.data;
      });
    },
    //健康村分布
    getHealthyGender(areaCode) {
      healthyGender(areaCode).then((res) => {
        this.healthyGender = res.data.data;
        console.log(this.healthyGender);
      });
    },
    //获取履职指数不合格村干部
    getUnHealthPeople() {
      unHealthPeople().then((res) => {
        this.unHealthPeopleStr = res.data.data.join(";");
      });
    },
    //单项榜点击事件
    singleJobPopover(rows) {
      if (rows.type === 1) {
        this.singleJobCardShow = true;
        this.singleJobPopoverData = rows;
      } else {
        this.singleJobCardShow = false;
      }

      console.log(rows);
    },
    //子组件地图镂空面点击事件
    polygonClick(code) {
      this.healthIndex = code;
    },
    //子组件地图镂空面移入事件
    polygonMouseover(code) {
      if (!this.cardShow) {
        this.cardShow = true;
      }
      for (const key in this.healthIndex) {
        console.log(1111);
        this.$set(this.healthIndex, key, code[key]);
        // this.healthIndex[key] = code[key];
      }
    },
    //首页点击事件
    handle() {
      this.cardShow = false;
      this.singleJobCardShow = false;
    },
  },
};
</script>

<style lang="scss">
.city-dv {
  .city-sel {
    margin-bottom: 5px;
    // border: 1px solid;
    // border-image: linear-gradient(to right, #ffffff, #87c4fc) 1 10;
    border: 2px solid rgba(200, 200, 200, 0.25);
    border-radius: 5px;
    input {
      background: transparent;
      border: none;
    }
  }
}
.meet-radio .el-radio__label {
  font-size: 12px !important;
}
</style>

<style lang="scss" scoped>
$top-height: 28px;
.dark-bg {
  height: 100%;
}
.box-card {
  width: 260px;
  background-color: rgba(1, 27, 49, 80%);
  font-size: 12px;
}
.meet-radio {
  position: absolute;
  top: 10px;
}
.move-text-box {
  height: 30px;
  line-height: 30px;
}
.pie-box {
  height: 19%;
}
.map-box {
  position: relative;
  height: calc(100% - 90px);
  .community-type {
    position: absolute;
    top: 70px;
    left: 10px;
    z-index: 20;
  }
  .heath-type {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 20;
  }
}

.box-title {
  font-size: 14px;
  font-weight: bolder;
  color: #ffffff;
}
.city-index {
  background: url("/img/dataV/city1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  // overflow-y: auto;
}
.city-top {
  height: $top-height;
  overflow: hidden;
}
.change-border-box {
  // border: 1px solid;
  // border-image: linear-gradient(to right, #ffffff, #87c4fc) 1 10;
  border: 2px solid rgba(200, 200, 200, 0.25);
  margin-bottom: 7px;
  padding: 0 5px;
  border-radius: 5px;
}
.city-dv {
  font-size: 12px;
  display: flex;
  color: #87c4fc;
  height: calc(100% - #{$top-height});
  .left-dv {
    width: 23%;
    padding: 0 12px 0 12px;
    .left1 {
      height: calc(100% - 110px);
    }
    .el-col {
      margin-bottom: 0;
    }
    .square-box {
      width: 100%;
      padding-bottom: 100%;
      height: 100%;
      position: relative;
      .square-content {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
    .duties-box {
    }
  }
  .content-dv {
    width: 55%;
    margin-top: 1%;
    height: 99%;
  }
  .right-dv {
    width: 22%;
    padding: 0 12px 0 12px;
    height: 100%;
    box-sizing: border-box;
    .right1 {
      margin-bottom: 10px;
      height: calc(50% - 194px);//54
    }
    .right2 {
      height: 50%;
      position: relative;
    }
    .right3{
      height:184px; ;
    }
  }
  .table-box {
    height: calc(100% - 19px);
    padding: 5px;
    box-sizing: border-box;
  }
  .icon-box {
    width: 40px;
    height: 40px;
    border: 1px solid #909399;
    margin: auto;
  }
}
</style>
