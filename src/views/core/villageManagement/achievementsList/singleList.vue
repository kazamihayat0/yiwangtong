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
      <template slot-scope="{disabled,size}" slot="quarterSearch">
        <mark
          class="_mark"
          v-show="showSeason"
          @click.stop="showSeason=false"
        ></mark>
        <el-input placeholder="请选择季度" v-model="search.quarter" style="width:96%" @focus="showSeason=true" size="small">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
        <el-card
          class="box-card"
          v-show="showSeason"
        >
          <div slot="header" class="clearfix yearBtn">
            <button
              type="button"
              aria-label="前一年"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
              @click="prev"
            ></button>
            <span role="button" class="el-date-picker__header-label">{{year}}年</span>
            <button
              type="button"
              aria-label="后一年"
              @click="next"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
            ></button>
          </div>
          <div class="text item">
            <el-button
              type="text"
              size="medium"
              class="_left"
              @click="selectSeason(0)"
            >第一季度
            </el-button>
            <el-button
              type="text"
              size="medium"
              class="_right"
              @click="selectSeason(1)"
            >第二季度
            </el-button>
          </div>
          <div class="text item">
            <el-button
              type="text"
              size="medium"
              class="_left"
              @click="selectSeason(2)"
            >第三季度
            </el-button>
            <el-button
              type="text"
              size="medium"
              class="_right"
              @click="selectSeason(3)"
            >第四季度
            </el-button>
          </div>
        </el-card>
      </template>
      <template slot-scope="scope" slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="addSingle()"
        >新增
        </el-button>
        <el-button type="success"
                   size="small"
                   plain
                   icon="el-icon-upload2"
                   @click="handleImport">导入
        </el-button>
        <el-button type="warning"
                   size="small"
                   plain
                   icon="el-icon-download"
                   @click="handleExport">导出（Excel）
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
          icon="el-icon-delete"
          size="small"
          @click.stop="rowDel(scope.row, scope.index)"
        >删除
        </el-button>
      </template>
    </avue-crud>
    <el-dialog title="单项榜数据导入"
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
  </div>
</template>

<script>

  import { mapGetters } from "vuex";
  import {getList,remove} from "@/api/dailyOffice/single";
  import option from "@/option/villageManagement/singleList.js";
  import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
  import { getToken } from "@/util/auth";
export default {
  props: {
    valueArr: {
      default: () => {
        return ['01-03', '04-06', '07-09', '10-12']
      },
      type: Array
    },
    getValue: {
      default: () => {},
      type: Function
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      search:{},
      season: '',
      showSeason: false,
      year: new Date().getFullYear(),
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
            action: "/api/ygj/duties/importDuties"
          },
          {
            label: '模板下载',
            prop: 'excelTemplate',
            formslot: true,
            span: 24,
          }
        ]
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 500,
        pageSizes: [500, 1000, 2000, 5000],
      },
      partyMeeting: [
      ],
      option: {
        searchShow:false,
        searchMenuSpan: 6,
        column: [
          {
          label: "季度",
          prop: "quarter",
          search: true,
          searchslot:true,
         },
          {
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
            label: "招引服务产业项目",
            prop: "project",
          },
          {
            label: "村集体经营性收入（万元）",
            prop: "incomeUp",
            sortable:true,

          },
          {
            label: "农村居民人均可支配收入（元）",
            prop: "dispIncome",
            sortable:true,
          },
          {
            label: "人居环境",
            prop: "envir",
          },
          {
            label: "数字治理",
            prop: "digitalGover",

          },
          {
            label: "改革试点",
            prop: "pilotReform",
          },
          {
            label: "标杆进位",
            prop: "benCarry",
          },
          {
            label: "省市荣誉经验交流",
            prop: "experCommun",
          },
          {
            label: "基础工作",
            prop: "baseWork",
          },
          {
            label: "村级负债（万元）",
            prop: "debtDown",
            sortable:true,
          },
          {
            label: "误工开支（万元）",
            prop: "expenDown",
            sortable:true,
          },
          {
            label: "信访上访数（次）",
            prop: "petitionNum",
            sortable:true,
          },
          {
            label: "排名",
            prop: "sort",
            sortable:true,
          },
          {
            label: "创建人",
            prop: "createName",
          },
          {
            label: "创建时间",
            prop: "createTime",
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
    ...mapGetters(["userInfo"]),
  },
  mounted(){

    if(this.userInfo.level==3){
      let code=  this.findObject(this.option.column,"code")
      this.$set(code,"search",false)
    }
  },
  methods: {
    one() {
      this.showSeason = false
    },
    prev() {
      this.year = this.year * 1 - 1
    },
    next() {
      this.year = this.year * 1 + 1
    },
    selectSeason(i) {
      let that = this
      that.season = i + 1
      let arr = that.valueArr[i].split('-')
      that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
      that.showSeason = false
      let seasonValue="";
      if(this.season==1){
        seasonValue="一"
      }
      if(this.season==2){
        seasonValue="二"
      }
      if(this.season==3){
        seasonValue="三"
      }
      if(this.season==4){
        seasonValue="四"
      }
      this.search.quarter = `${this.year}年第${seasonValue}季度`
    },
    handleExport() {
      this.$confirm("是否导出单项榜数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.open(`/api/ygj/duties/exportDuties?${this.website.tokenHeader}=${getToken()}`);
      });
    },
    handleImport() {
      this.excelBox = true;
    },
    uploadError(error, column) {
      this.$message.success('上传失败')
      console.log(error, column)
    },
    uploadAfter(res, done, loading, column) {
      this.excelBox = false;
      done();
      if(res===""||res==="操作成功") {
        this.excelBox = false;
        this.refreshChange();
        this.$message({
          type: "success",
          message: "导入成功!",
        });
      }else{
        window.open(
          `/api/blade-user/export-err-info?${
            this.website.tokenHeader
            }=${getToken()}&type=2`
        );
      }

    },
    refreshChange() {
      this.onload(this.page);
    },
    handleTemplate() {
      window.open(`/api/ygj/duties/export-template?${this.website.tokenHeader}=${getToken()}`);
    },
    searchReset() {
      this.params = {};
      this.search={};
      this.onload(this.page);
    },
    handleEdit(row){
      this.$router.push({path: "/single/editSingle",query:{id:row.id}});
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
    addSingle() {
      this.$router.push({ path: "/single/addSingle",query:{code:this.userInfo.areaCode} });
    },
    searchChange(params, done) {
      this.params = params;
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
<style>
  .avue-view{
    height: 100%;
  }
</style>
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

<style scoped>

  ._mark {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
  }

  .yearBtn {
    text-align: center;
    padding: 0
  }

  .box-card {
    width: 322px;
    padding: 0 3px 20px;
    margin-top: 10px;
    position: fixed;
    z-index: 9999;
    box-shadow: 0 0 10px #00000050!important;
  }

  .text.item {
    text-align: center;
  }

  .text.item >>> .el-button {
    width: 40%;
    color: #606266;
  }

  .text.item ._left {
    float: left;
  }

  .text.item ._right {
    float: right;
  }
</style>
