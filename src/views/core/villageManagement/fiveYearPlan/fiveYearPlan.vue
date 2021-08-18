<template>
  <div class="performance-index">
    <basic-container block="true" :bodyStyle="bodyStyle">
      <avue-crud
        :option="option"
        :page.sync="page"
        :data="partyMeeting"
        search.sync="true"
        @search-change="searchChange"
        @search-reset="searchReset"
        @on-load="onload"
        class="performance-table"
      >
        <template slot-scope="{disabled,size}" slot="collEconIncomeSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.collEconIncomeMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.collEconIncomeMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="operatingIncomeSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.operatingIncomeMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.operatingIncomeMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="villageDebtSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.villageDebtMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.villageDebtMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="laborExpenditureSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.laborExpenditureMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:100px" v-model="search.laborExpenditureMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="perIncomeSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.perIncomeMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.perIncomeMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="youngPartyMembersSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.youngPartyMembersMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.youngPartyMembersMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="honorsStrivingSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.honorsStrivingMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.honorsStrivingMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="teamNumSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.teamNumMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.teamNumMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="peopleNumSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.peopleNumMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.peopleNumMax"></el-input>
        </template>
        <template slot-scope="{disabled,size}" slot="projectsNumSearch">
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.projectsNumMin"></el-input> -
          <el-input placeholder="" :disabled="disabled" :size="size" style="width:90px" v-model="search.projectsNumMax"></el-input>
        </template>
        <template slot-scope="scope" slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addFive"
            v-if="!level1_btn"
          >新增
          </el-button>
          <el-button type="warning"
                     size="small"
                     plain
                     icon="el-icon-download"
                     @click="handleExport">导出（Excel）
          </el-button>
          <!--<el-button-->
            <!--type="primary"-->
            <!--size="small"-->
            <!--@click.stop="StatReport()"-->
          <!--&gt;统计报表-->
          <!--</el-button>-->
        </template>

        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            icon="el-icon-view"
            size="small"
            v-if="level1_btn"
            @click.stop="handleLook(scope.row, scope.index)"
          >查看
          </el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            v-if="!level1_btn"
            @click.stop="handleEdit(scope.row, scope.index)"
          >编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            size="small"
            v-if="!level1_btn"
            @click.stop="rowDel(scope.row, scope.index)"
          >删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import { getToken } from "@/util/auth";
  import { mapGetters } from "vuex";
  import option from "@/option/villageManagement/fiveYearPlan";
  import { getList,remove } from "@/api/dailyOffice/fiveyearplan";
  import CityList from "@/components/cityList.vue";
  export default {
    components: {
      CityList,
    },
    data() {
      return {
        search:{},
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        },
        partyMeeting: [
        ],
        level1_btn:false,
        option: {
          searchShow:false,
          searchMenuSpan: 6,
          column: [

            {
              label: "规划开始年份",
              prop: "startYear",
              search: true,
              searchLabelWidth:100,
              type: "year",
            },
            {
              label: "规划结束年份",
              prop: "endYear",
            },
            {
              label: "乡镇-村社",
              prop: "areaName",
              search: true,
              type:"tree",
              dicUrl:'/api/area/areaList',
              props: {
                label: 'name',
                value: 'code',
                children: 'children'
              }
            },
            {
              label: "五年规划是否完成",
              prop: "isFinish",
              search: true,
              type: "select",
              searchLabelWidth:150,
              dicData: [
                {
                  label: "是",
                  value: "1"
                },
                {
                  label: "否",
                  value: "0"
                }
              ]
            },{
              label:"集体经济收入（万元）",
              prop:"collEconIncome",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"经营性收入（万元）",
              prop:"operatingIncome",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"村级债务（万元）",
              prop:"villageDebt",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"务工支出（万元）",
              prop:"laborExpenditure",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"农民人均可支配收入（万元）",
              prop:"perIncome",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:200,
            },
            {
              label:"发展年轻党员数（名）",
              prop:"youngPartyMembers",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"争创荣誉次数",
              prop:"honorsStriving",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },{
              label:"“十支队”组织数（支）",
              prop:"teamNum",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },
            {
              label:"“十支队”队员数（支）",
              prop:"peopleNum",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:160,
            },
            {
              label:"“产业试点项目数（个）",
              prop:"projectsNum",
              sortable: true,
              search:true,
              searchSpan:8,
              searchslot:true,
              searchLabelWidth:170,
            },
            {
              label: "创建人",
              prop: "name",
            },
            {
              label: "创建时间",
              prop: "createTime",
            },
          ],
          columnBtn:false,
          refreshBtn:false,
          addBtn: false,
          height: 'auto',
          calcHeight: 0,
          index: true,
          indexLabel: '序号',
          border: true,
          align: 'center',
          editBtn: false, //操作栏编辑按钮是否显示
          delBtn: false, //操作栏删除按钮是否显示
          menu: true,
          menuWidth: 180,
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
    mounted(){
      if(this.userInfo.level==1){
        this.level1_btn=true;
      }
      if(this.userInfo.level==3){
        let code=  this.findObject(this.option.column,"areaName")
        this.$set(code,"search",false)
      }
    },
    methods: {
      handleLook(row){
        this.$router.push({path: "/five/lookYear",query:{id:row.id}});
      },
      handleEdit(row){
        this.$router.push({path: "/five/editYear",query:{id:row.id}});
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.getTableDtata();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      StatReport(){
        this.$router.push({ path: "/five/statReport" });
      },
      addFive(){
        this.$router.push({ path: "/five/addYear" });
      },
      handleExport() {
        this.$confirm("是否导出五年规划数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.open(`/api/ygj/plan/exportPlan?${this.website.tokenHeader}=${getToken()}`);
        });
      },
      searchReset() {
        this.params = {};
        this.search={};
        this.onload(this.page);
      },
      searchChange(params, done) {
        this.params = params;
        if(this.params.startYear){
          this.params.startYear=this.params.startYear.getFullYear();
        }
        for(let key in this.search){
          this.params[key]=this.search[key]
        }
        this.getTableDtata();
        setTimeout(() => {
          done();
        }, 300);
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
  .performance-index,
  .el-row,
  .el-col {
    height: 100%;
    .performance-table {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
