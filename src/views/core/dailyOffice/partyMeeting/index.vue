<template>
  <basic-container  block="true" :bodyStyle="bodyStyle">
    <avue-crud
      :option="option"
      :page.sync="page"
      :data="partyMeeting"
      search.sync="true"
      @search-change="searchChange"
      @on-load="onload"
      @search-reset="searchReset"
    >
      <template slot-scope="scope" slot="menuLeft">
        <!--<el-button-->
          <!--type="primary"-->
          <!--icon="el-icon-plus"-->
          <!--size="small"-->
          <!--@click.stop="addPartMeeting()"-->
        <!--&gt;新增-->
        <!--</el-button>-->
        <el-button type="success"
        size="small"
        plain
        icon="el-icon-upload2"
        @click="handleImport">导入
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-download"
          @click.stop="handleExport"
        >导出(Excel)
        </el-button>
      </template>
    </avue-crud>

    <el-dialog title="党组织会议数据导入"
               append-to-body
               :visible.sync="excelBox"
               width="555px">
      <avue-form :option="excelOption" v-model="excelForm" :upload-after="uploadAfter">
        <template slot="excelTemplate">
          <el-button type="primary" @click="handleTemplate">
            点击下载<i class="el-icon-download el-icon--right"></i>
          </el-button>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>

<script>
  import { mapGetters } from "vuex";
import option from "@/option/dailyOffice/partyMeeting.js";
import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
import { getToken } from "@/util/auth";
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
      partyMeeting: [],
      option: {
        searchShow:false,
        searchMenuSpan: 6,
        column: [
          {
            label: "乡镇-村社",
            prop: "codeSerch",
            minWidth: 100,
            search: true,
            type:"tree",
            dicUrl:'/api/area/areaList',
            props: {
              label: 'name',
              value: 'code',
              children: 'children'
            },
            hide:true
          },{
          label: "乡镇-村社",
          prop: "areaName",
          minWidth: 130,
          type:"tree",
        },
          {
            label: "活动类别",
            prop: "type",
            search: true,
            row: true,
            searchSpan:6,
          },
          {
            label: "活动地点",
            prop: "address",
            row: true
          },
          {
            label: "活动详情",
            prop: "detail",
            row: true
          },
          {
            label: "会议开始时间",
            prop: "startTime",
            type: "datetime",
            search: true,
            searchSpan:10,
            searchRange: true,
            searchLabelWidth: 100,
            row: true
          },
          {
            label: "会议结束时间",
            prop: "endTime",
            type: "datetime",
            row: true
          },
          {
            label: "应参会人数",
            prop: "joinNum",
            row: true
          },
          {
            label: "实际签到人数",
            prop: "actualJoin",
            row: true
          },
          {
            label: "参会率（%）",
            prop: "rate",
            row: true
          },
          {
            label: "状态",
            prop: "status",
            type: "select",
            search: true,
            span: 24,
            searchSpan:6,
            row: false,
            dicData: [ {
              label: "未开始",
              value: "0"
            }, {
              label: "进行中",
              value: "1"
            }, {
              label: "已完成",
              value: "2"
            }, {
              label: "已取消",
              value: "3"
            }]
          },
          {
            label: "创建人",
            prop: "createName",
            span: 24,
            row: true
          },
          {
            label: "创建时间",
            prop: "createTime",
            span: 24,
            row: true
          }
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
        menuWidth: 120,
        editBtn: false, //操作栏编辑按钮是否显示
      },
      params: {},
      excelBox: false,
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: '模板上传',
            prop: 'excelFile',
            type: 'upload',
            drag: true,
            loadText: '模板上传中，请稍等',
            span: 24,
            propsHttp: {
              res: 'data'
            },
            tip: '请上传 .xls,.xlsx 标准格式文件',
            action: "/api/ygj/orgmeet/importOrgMeet"
          },
          {
            label: '模板下载',
            prop: 'excelTemplate',
            formslot: true,
            span: 24,
          }
        ]
      }
    };
  },
  mounted(){
    if(this.userInfo.level==3){
      let code=  this.findObject(this.option.column,"areaName")
      this.$set(code,"search",false)
      let status=  this.findObject(this.option.column,"status")
      this.$set(status,"searchSpan",5)
      let startTime=  this.findObject(this.option.column,"startTime")
      this.$set(startTime,"searchSpan",8)
      let type=  this.findObject(this.option.column,"type")
      this.$set(type,"searchSpan",5)
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },

  methods: {
    handleExport() {
      this.$confirm("是否导出党组织会议数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.open(`/api/ygj/orgmeet/exportMeet?${this.website.tokenHeader}=${getToken()}`);
      });
    },
    addPartMeeting() {
      this.$router.push({ path: "/part/addMeeting" });
    },
    searchChange(params, done) {
      this.params = params;
      if(this.params.startTime){
        this.params.startTimeStr=this.params.startTime[0]
        this.params.endTimeStr=this.params.startTime[1]
        delete this.params.startTime
      }
      this.getTableDtata();
      setTimeout(() => {
        done();
      }, 300);
    },
    searchReset() {
      this.params = {};
      this.onload(this.page);
    },
    onload(page) {
      this.page = page;
      this.getTableDtata();
    },
    getTableDtata() {
      getOrgMeet(this.page.currentPage, this.page.pageSize, this.params).then(
        (res) => {
          this.partyMeeting = res.data.data.records;
          this.page.total = res.data.data.total;
        }
      );
    },
    handleImport() {
      this.excelBox = true;
    },
    handleTemplate() {
      window.open(`/api/ygj/orgmeet/export-template?${this.website.tokenHeader}=${getToken()}`);
    },
    refreshChange() {
      this.onload(this.page);
    },
    uploadAfter(res, done, loading, column) {
      window.console.log(column);
      done();
      if(res==="") {
        this.excelBox = false;
        this.refreshChange();
        this.$message({
          type: "success",
          message: "导入成功!",
        });
      }

    },
  },
};
</script>

<style>
</style>
