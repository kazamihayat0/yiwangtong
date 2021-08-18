<template>
  <basic-container block="true" :bodyStyle="bodyStyle">
    <avue-crud :option="option" :page.sync="page" :data="data"
               search.sync="true"
               @search-change="searchChange"
               @on-load="onload"
               @search-reset="searchReset">
      <template slot-scope="scope" slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click.stop="handleExport"
        >导出(Excel)
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import { getToken } from "@/util/auth";
  import {getStatistics} from "@/api/dailyOffice/satisfaction";
  import option from "@/option/dailyOffice/satisfyCount.js";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        bodyStyle: {
          height: "100%",
          "box-sizing": "border-box",
          padding: "20px 20px 0px 20px",
        },
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        },
        data: [

        ],
        option: {
          searchShow:false,
          searchMenuSpan: 6,
          column: [
            {
            label: "年份",
            prop: "year",
            search: true,
            type: "year",
            row: false
          },
            {
              label: "乡镇-村社",
              search: true,
              prop: "code",
              type: "tree",
              dicUrl: '/api/area/areaList',
              props: {
                label: 'name',
                value: 'code',
                children: 'children'
              },
              hide:true
            },
            {
              label:"乡镇-村社",
              prop:"areaName"
            },
            {
              label: "姓名",
              prop: "userName",
              search: true,
              searchLabelWidth: 100,
              row: true
            },
            {
              label: "参与评价人数",
              prop: "peopleNum",
              row: true,
              sortable:true,
            },
            {
              label: "满意度（%）",
              prop: "score",
              row: true,
              sortable:true,
            },
            {
              label: "最新换届得票率（%）",
              prop: "percent",
              type: "select",
              row: true,
              sortable:true,
            },
            {
              label: "村社排名",
              prop: "rowNum",
              span: 24,
              row: false,
              sortable:true,
            },
            {
              label: "创建时间",
              prop: "createTime",
              span: 24,
              row: true
            }
          ],
          addBtn: false,
          height: 'auto',
          calcHeight: 0,
          index: true,
          indexLabel: '序号',
          border: true,
          align: 'center',
          menu: false,
          columnBtn: false,
          refreshBtn: false,
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"])
    },
    mounted() {
      if (this.userInfo.level == 3) {
        let code = this.findObject(this.option.column, "code")
        this.$set(code, "search", false)
      }
    },
    methods: {
      handleExport() {
        this.$confirm("是否导出满意度统计分析数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.open(`/api/ygj/satisfaction/exportSatis?${this.website.tokenHeader}=${getToken()}`);
        });
      },
      searchReset() {
        this.params = {};
        this.onload(this.page);
      },
      searchChange(params, done) {
        this.params = params;
        if(this.params.year){
          this.params.year=this.params.year.getFullYear();
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
        getStatistics(this.page.currentPage, this.page.pageSize, this.params).then(
          (res) => {
            this.data = res.data.data.records;
            this.page.total = res.data.data.total;
          }
        );
      },
      addMeeting() {
        this.$router.push({path: "addMeeting"});
      },
    },
  };
</script>

<style>
</style>
