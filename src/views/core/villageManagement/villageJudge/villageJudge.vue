<template>
  <div class="performance-index">
    <basic-container block="true" :bodyStyle="bodyStyle">
      <avue-crud
        :option="option"
        :page.sync="page"
        :data="partyMeeting"
        search.sync="true"
        @search-change="searchChange"
        @on-load="onload"
        @search-reset="searchReset"
        class="performance-table"
      >
        <template slot-scope="scope" slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            v-if="userInfo.level!=3"
            @click.stop="addScore()"
          >新增
          </el-button>
          <el-button type="success"
                     size="small"
                     plain  v-if="userInfo.level!=3"
                     icon="el-icon-upload2"
                     @click="handleImport">导入
          </el-button>
          <!--<el-button type="warning"-->
                     <!--size="small"-->
                     <!--plain-->
                     <!--icon="el-icon-download"-->
                     <!--@click="handleExport">导出（Excel）-->
          <!--</el-button>-->
        </template>

        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            v-if="userInfo.level!=3"
            @click.stop="handleEdit(scope.row, scope.index)"
          >编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            size="small"
            v-if="userInfo.level!=3"
            @click.stop="rowDel(scope.row, scope.index)"
          >删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import {getList1,remove} from "@/api/dailyOffice/villagejudge";
  import option from "@/option/villageManagement/villageJudge";
  import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
  import CityList from "@/components/cityList.vue";
  export default {
    components: {
      CityList,
    },
    data() {
      return {
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        },
        partyMeeting: [

        ],
        option: {
          searchShow:false,
          searchMenuSpan: 6,
          column: [{
            label: "季度",
            prop: "quarter",
            search:true,
          },
            {
              label: "乡镇-村社",
              prop: "areaName",
              width:250
            },
            {
              hide:true,
              label: "乡镇-村社",
              prop: "code",
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
              label: "党委评价等级",
              prop: "partyAssessLevel",

            },
            {
              label: "研判评分",
              prop: "judgeScore",
            },
            {
              label: "研判评分",
              prop: "type",
              search:true,
              hide:true,
              type:"select",
              dicData:[
                {
                  label:"60分以下",
                  value:1
                },
                {
                  label:"60-80分",
                  value:2
                },
                {
                  label:"80分以上",
                  value:3
                },
              ]

            }
          ],
          columnBtn:false,
          refreshBtn:false,
          addBtn: false,
          height: 'auto',
          calcHeight: 30,
          index: true,
          indexLabel: '序号',
          border: true,
          align: 'center',
          editBtn: false, //操作栏编辑按钮是否显示
          delBtn: false, //操作栏删除按钮是否显示
          menuWidth: 180,
        }
        ,
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
      if(this.userInfo.level==3){
        let code=  this.findObject(this.option.column,"code")
        this.$set(code,"search",false)
        this.$set(this.option,"menu",false)
      }
    },
    methods: {

      handleEdit(row){
        this.$router.push({path: "/village/editVillage",query:{id:row.id}});
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
      addScore() {
        this.$router.push({ path: "/village/addVillage",query:{code:this.userInfo.areaCode} });
      },
      searchReset() {
        this.params = {};
        this.onload(this.page);
      },
      searchChange(params, done) {
        this.params = params;
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
        getList1(this.page.currentPage, this.page.pageSize, this.params).then(
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
  .el-button--small.is-circle{
    visibility: hidden!important;
  }

</style>
