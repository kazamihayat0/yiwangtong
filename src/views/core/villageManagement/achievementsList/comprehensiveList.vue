<template>
  <basic-container block="true" :bodyStyle="bodyStyle">
    <avue-crud
      :option="option"
      :page.sync="page"
      :data="partyMeeting"
      search.sync="true"
      @search-change="searchChange"
      @on-load="onload"
      @search-reset="searchReset"
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
          size="small" v-if="!level3_btn"
          @click.stop="addComprehensive()"
        >新增
        </el-button>
        <!--<el-button type="success"-->
                   <!--size="small"-->
                   <!--plain-->
                   <!--icon="el-icon-upload2"-->
                   <!--@click="handleImport">导入-->
        <!--</el-button>-->
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
  </basic-container>
</template>

<script>
  import { getToken } from "@/util/auth";
  import { mapGetters } from "vuex";
  import {getList,remove} from "@/api/dailyOffice/comprensive";
import option from "@/option/villageManagement/comprehensiveList.js";
import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
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
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      partyMeeting: [

      ],
      bodyStyle: {
        height: "100%",
        "box-sizing": "border-box",
        padding: "20px 20px 0px 20px",
      },
      level3_btn:false,
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
            label: "乡镇排名",
            prop: "townSort",
            sortable:true,
          },
          {
            label: "市排名",
            prop: "citySort",
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
        menu:true
      },
      params: {},

    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted(){

    if(this.userInfo.level==3){
      let code=  this.findObject(this.option.column,"code")
      this.$set(code,"search",false)
      this.level3_btn=true;
      this.$set(this.option,"menu",false)
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
      this.$confirm("是否导出综合榜数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.open(`/api/ygj/dutiescompre/exportDuties?${this.website.tokenHeader}=${getToken()}`);
      });
    },
    searchReset() {
      this.params = {};
      this.search={};
      this.onload(this.page);
    },
    handleEdit(row){
      this.$router.push({path: "/Comprehensive/editCompr",query:{id:row.id}});
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
    addComprehensive() {
      this.$router.push({ path: "/Comprehensive/addCompr" });
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

<style lang="scss" scoped>
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
