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
            @click.stop="addScore()"
          >新增
          </el-button>
        </template>

        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            @click.stop="handleEdit(scope.row, scope.index)"
          >编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-view"
            size="small"
            @click.stop="rowDet(scope.row, scope.index)"
          >删除
          </el-button>
        </template>
      </avue-crud>

    </basic-container>


  </div>
</template>

<script>

  import {getList,remove} from "@/api/system/user";
  import option from "@/option/villageManagement/performanceScore";
  import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
  import { mapGetters } from "vuex";
  import CityList from "@/components/cityList.vue";
  import { getToken } from "@/util/auth";
  export default {
    components: {
      CityList,
    },
    data() {
      return {
        page: {
          total: '',
          currentPage: 1,
          pageSize: 10,
        },
        partyMeeting: [
        ],
        option: {
          searchShow:false,
          searchMenuSpan: 6,
          column: [
            {
              label: "姓名",
              prop: "realName",
              search:true,
            },
            {
              label: "乡镇-村社",
              prop: "areaName",
            },
            {
              label: "乡镇-村社",
              search: true,
              prop: "levelAreaCode",
              hide:true,
              type:"tree",
              dicUrl:'/api/area/areaList',
              props: {
                label: 'name',
                value: 'code',
                children: 'children'
              }
            },
            {
              label: "手机号码",
              prop: "phone",
              search:true,
            },
            {
              label: "职务",
              prop: "post",
            },
            {
              label: "创建人",
              prop:"creater"
            },

            {
              label: "创建时间",
              prop: "createTime",
            },
            {
              label: "userId",
              prop: "userId",
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
      ...mapGetters(["userInfo"])
    },
    mounted(){
      if(this.userInfo.level==3){
        let code=  this.findObject(this.option.column,"levelAreaCode")
        this.$set(code,"search",false)
      }
    },
    methods: {
      refreshChange() {
        this.onload(this.page);
      },
      handleTemplate() {
        window.open(`/api/ygj/judges/export-template?${this.website.tokenHeader}=${getToken()}`);
      },
      handleImport() {
        this.excelBox = true;
      },
      handleEdit(row){
        this.$router.push({path: "/village/addManager",query:{id:row.id}});
      },
      rowDet(row) {
      //  this.$router.push({path: "/performance/judgeLook",query:{id:row.id}});
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
      },
      addScore() {
        this.$router.push({ path: "/village/addManager" });
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
        this.params["isAdmin"]=1;
        getList(this.page.currentPage, this.page.pageSize, this.params,this.params["levelAreaCode"]).then(
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
