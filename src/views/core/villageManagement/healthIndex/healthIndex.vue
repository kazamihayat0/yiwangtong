<template>
  <div class="healthIndex">
    <el-row>
      <el-col span="4" v-if="userInfo.level != 3">
        <basic-container block="true">
          <city-list @areaCode="areaCode" />
        </basic-container>
      </el-col>
      <el-col el-col :span="userInfo.level == 3 ? 24 : 20">
        <basic-container block="true" :bodyStyle="bodyStyle">
          <avue-crud
            :option="option"
            :page.sync="page"
            :data="partyMeeting"
            search.sync="true"
            @search-change="searchChange"
            @search-reset="searchReset"
            @on-load="onload"
            class="health-table"
          >
            <template slot-scope="scope" slot="menuLeft">
              <el-button
                type="primary"
                icon="el-icon-download"
                size="small"
                @click.stop="handleExport(scope)"
                >导出(Excel)
              </el-button>
            </template>
          </avue-crud>
        </basic-container>
      </el-col>
    </el-row>

    <el-card class="box-card"  v-show="xzs">
      <div slot="header" class="clearfix">
        <span>健康指数计算规则</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="xzs=false">X</el-button>
      </div>
      <div class="text item" >
        <div>1.值坐班评分规则：一天只能值坐班打卡1次，若当天既有值坐班打卡又有会议签到打卡，则只记1次打卡（个人），一个月内若打卡13次及以上满分100分，13次以下则N次得分为100-100/13*(13-N)（个人）
        </div><div>
        （村社）个体值坐班评分的平均值
      </div><div>
        2.村务联席会议评分规则：1个月开4次及以上且参加会议人数大于等于应参加会议人数的三分之二，且联村干部下村次数大于等于4次/月为100分，若不满其一条件，则一项条件扣30分（村社）
      </div><div>
        3.集中审账评分规则：若1月有审账会议，且每年有1次村务财务监督问询会议，且工程项目不规范数据（从清廉乡村抓取）为0，则为100分；若不满其一条件，则一项条件扣30分；若1年没到则财务监督问询不扣分
      </div><div>
        4.村监会运行评分规则：若1月有开例会，且半年有开1次村党组织村务监督汇报会议，且1年有开村民（代表）会议报告1次，则为100分，若不满其一条件，则一项条件扣30分；若1年或半年没到则对应项不扣分
      </div><div>
        5.村民代表会议评分规则：若1季度有召开1次会议，且参加会议人数大于等于应参加会议人数三分之二，则为100分，若不满其一条件，则一项条件扣50分；若1季度没到则不扣分
      </div><div>
        6.主题党日/党组织会议评分规则：每月25日西湖先锋数据导入，若1月未开，则为0分，开则N*100/0.8（N为到会率，到会率80%以上，则为100分）
      </div>
        <!--<div>-->
        <!--7.权重占比：值坐班（20%）、村务联席会议（15%）、集中审账（15%）、村监会运行（15%）、村民代表大会（20%）、党组织会议/主题党日（15%） </div>-->
      </div>
    </el-card>
    <div class="warn-info-f" id="df" @click="xzs=true"> <img src="/img/06.gif" height="100px"/></div>
  </div>
  <!-- <avue-crud
      :option="option"
      :page.sync="page"
      :data="partyMeeting"
      search.sync="true"
      @search-change="searchChange"
      @on-load="onload"
    >
      <template slot-scope="scope" slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="addMeeting()"
          >导入
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="handleAdd(scope)"
          >导出(Excel)
        </el-button>
      </template>
    </avue-crud> -->
</template>

<script>
import { getToken } from "@/util/auth";
import { mapGetters } from "vuex";
import option from "@/option/villageManagement/healthindex";
import { getList } from "@/api/dailyOffice/heathindex";
import CityList from "@/components/cityList.vue";
export default {
  components: {
    CityList,
  },
  data() {
    return {
      xzs:false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 50, 100, 200, 500, 1000, 2000, 5000],
      },
      levelareaCode: "",
      partyMeeting: [],
      option: {
        searchShow: false,
        searchMenuSpan: 6,
        column: [
          {
            label: "年份",
            prop: "year",
            search: true,
            type: "year",
          },
          {
            label: "月度",
            prop: "month",
            search: true,
            type: "select",
            dicData: [
              {
                label: "1月",
                value: 1,
              },
              {
                label: "2月",
                value: 2,
              },
              {
                label: "3月",
                value: 3,
              },
              {
                label: "4月",
                value: 4,
              },
              {
                label: "5月",
                value: 5,
              },
              {
                label: "6月",
                value: 6,
              },
              {
                label: "7月",
                value: 7,
              },
              {
                label: "8月",
                value: 8,
              },
              {
                label: "9月",
                value: 9,
              },
              {
                label: "10月",
                value: 10,
              },
              {
                label: "11月",
                value: 11,
              },
              {
                label: "12月",
                value: 12,
              },
            ],
          },
          {
            label: "乡镇-村社",
            width: 100,
            prop: "areaName",
          },
          {
            hide: true,
            label: "乡镇-村社",
            prop: "areaCode",
            search: true,
            type: "tree",
            dicUrl: "/api/area/areaList",
            props: {
              label: "name",
              value: "code",
              children: "children",
            },
          },
          {
            label: "值坐班分数",
            prop: "param1",
            sortable: true,
          },
          {
            label: "村务联席会议分数",
            prop: "param2",
            sortable: true,
          },
          {
            label: "主题党日/党组织会议分数",
            prop: "param3",
            sortable: true,
          },
          {
            label: "集中审账分数",
            prop: "param4",
            sortable: true,
          },
          {
            label: "村监会运行分数",
            prop: "param5",
            sortable: true,
          },
          {
            label: "村民代表会议分数",
            prop: "param6",
            sortable: true,
          },
          // {
          //   label: "村民满意度分数",
          //   prop: "param7",
          //   sortable: true,
          // },
          {
            label: "上级研判分数",
            prop: "param9",
            sortable: true,
          },
          {
            label: "健康指数",
            prop: "param10",
            sortable: true,
          },
          {
            label: "类型",
            prop: "searchType",
            search: true,
            hide: true,
            type: "select",
            dicData: [
              {
                label: "值坐班分数",
                value: 1,
              },

              {
                label: "村务联席会议分数",
                value: 2,
              },
              {
                label: "党组织会议/主题党日分数",
                value: 3,
              },
              {
                label: "集中审账分数",
                value: 4,
              },
              {
                label: "村监会运行分数",
                value: 5,
              },
              {
                label: "村民代表会议分数",
                value: 6,
              },
              {
                label: "村民满意度分数",
                value: 7,
              },
              {
                label: "上级研判分数",
                value: 9,
              },
              {
                label: "健康指数",
                value: 10,
              },
            ],
          },
          {
            label: "分值",
            prop: "type",
            search: true,
            hide: true,
            type: "select",
            dicData: [
              {
                label: "60分以下",
                value: 0,
              },
              {
                label: "60-80分",
                value: 1,
              },
              {
                label: "80分以上",
                value: 2,
              },
            ],
          },
        ],
        columnBtn: false,
        refreshBtn: false,
        addBtn: false,
        height: "auto",
        calcHeight: 30,
        index: true,
        indexLabel: "序号",
        border: true,
        align: "center",
        editBtn: false, //操作栏编辑按钮是否显示
        delBtn: false, //操作栏删除按钮是否显示
        menu: false,
      },
      params: {},
      bodyStyle: {
        height: "100%",
        "box-sizing": "border-box",
        padding: "20px 20px 0px 20px",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    if (this.userInfo.level == 3) {
      let code = this.findObject(this.option.column, "areaCode");
      this.$set(code, "search", false);
    }
    this.dragFunc("df");
  },
  methods: {
    dragFunc(id) {
      var Drag = document.getElementById(id);
      Drag.onmousedown = function (event) {
        var ev = event || window.event;
        event.stopPropagation();
        var disX = ev.clientX - Drag.offsetLeft;
        var disY = ev.clientY - Drag.offsetTop;
        document.onmousemove = function (event) {
          var ev = event || window.event;
          Drag.style.left = ev.clientX - disX + "px";
          Drag.style.top = ev.clientY - disY + "px";
          Drag.style.cursor = "move";
        };
      };
      Drag.onmouseup = function () {
        document.onmousemove = null;
        this.style.cursor = "default";
      };
    },
    handleExport() {
      this.$confirm("是否导出健康指数数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/ygj/healthy/exportHealth-jk?${
            this.website.tokenHeader
          }=${getToken()}`
        );
      });
    },
    addMeeting() {
      this.$router.push({ path: "addMeeting" });
    },
    searchChange(params, done) {
      this.params = params;
      if (this.params.year) {
        this.params.year = this.params.year.getFullYear();
      }
      this.getTableDtata();
      setTimeout(() => {
        done();
      }, 300);
    },
    areaCode(areaCode) {
      this.levelareaCode = areaCode;
      this.params["areaCode"] = areaCode;
      this.page.currentPage = 1;
      this.onload(this.page);
    },
    searchReset() {
      this.params = {};
      this.params["areaCode"] = this.levelareaCode;
      this.onload(this.page);
    },
    onload(page) {
      this.page = page;
      this.getTableDtata();
    },
    getTableDtata() {
      getList(this.page.currentPage, this.page.pageSize, this.params).then(
        (res) => {
          this.partyMeeting = res.data.data.records;
          this.page.total = res.data.data.total;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  .bold{
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card{
    width: 620px;
    height: 460px;
    position: fixed;
    bottom: 80px;
    right: 100px;
    z-index: 999;
    box-shadow: 0 0 10px #00000050;

  }
  .el-card.is-always-shadow{
    -webkit-box-shadow: 0 0 10px #00000050;
    box-shadow: 0 0 10px #00000050!important;

  }
  .warn-info-f{
    position: fixed;
    bottom: 80px;
    z-index: 999;
    right: 50px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
  }
.healthIndex,
.el-row,
.el-col {
  height: 100%;
  .health-table {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
