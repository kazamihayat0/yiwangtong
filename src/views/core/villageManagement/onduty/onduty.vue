<template>
  <div class="performance-index">
    <basic-container block="true" :bodyStyle="bodyStyle">
      <avue-crud
        :option="option"
        :page.sync="page"
        :data="partyMeeting"
        search.sync="true"
        :table-loading="loading"
        @search-change="searchChange"
        @on-load="onload"
        @search-reset="searchReset"
        @sort-change="sortChange"
        class="performance-table"
      >
        <template slot="sum" slot-scope="scope">
          <el-button
            slot="reference"
            type="text"
            @click="openCalendar(scope.row.userId)"
          >
            {{ scope.row.sum }}
          </el-button>
        </template>

        <template slot-scope="scope" slot="menuLeft">
          <!-- <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            v-if="userInfo.level != 3"
            @click.stop="addScore()"
            >新增
          </el-button> -->
          <!-- <el-button
            type="success"
            size="small"
            plain
            v-if="userInfo.level != 3"
            icon="el-icon-upload2"
            @click="handleImport"
            >导入
          </el-button> -->
          <el-button
            type="warning"
            size="small"
            plain
            icon="el-icon-download"
            @click="handleExport"
            >导出（Excel）
          </el-button>
        </template>

        <!-- <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            v-if="userInfo.level != 3"
            @click.stop="handleEdit(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            size="small"
            v-if="userInfo.level != 3"
            @click.stop="rowDel(scope.row, scope.index)"
            >删除
          </el-button>
        </template> -->
      </avue-crud>
      <el-dialog
        title="日历"
        :visible.sync="calendarVisibleShow"
        width="30%"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <div style="padding: 0 auto">
          <v-calendar :userId="userId"></v-calendar>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getList, remove } from "@/api/dailyOffice/villagejudge";
import option from "@/option/villageManagement/villageJudge";
import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
import CityList from "@/components/cityList.vue";
import VCalendar from "@/components/vCalendar.vue";
import { getToken } from "@/util/auth";

export default {
  components: {
    CityList,
    VCalendar,
  },
  data() {
    return {
      userId: "",
      loading: false,
      calendarVisibleShow: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 50, 100, 200, 500, 1000, 2000, 5000],
      },
      partyMeeting: [],
      option: {
        searchMenuSpan: 6,
        column: [
          {
            label: "年份",
            prop: "year",
            search: true,
            minWidth: 50,
          },
          {
            label: "乡镇-村社",
            prop: "areaName",
            minWidth: 120,
          },
          {
            hide: true,
            label: "乡镇-村社",
            prop: "code",
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
            label: "姓名",
            prop: "name",
            minWidth: 70,
          },
          {
            label: "1月",
            prop: "one",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "2月",
            prop: "two",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "3月",
            prop: "three",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "4月",
            prop: "four",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "5月",
            prop: "five",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "6月",
            prop: "six",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "7月",
            prop: "seven",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "8月",
            prop: "eight",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "9月",
            prop: "nine",
            minWidth: 67,
            sortable: true,
          },
          {
            label: "10月",
            prop: "ten",
            minWidth: 75,
            sortable: true,
          },
          {
            label: "11月",
            prop: "eleven",
            minWidth: 75,
            sortable: true,
          },
          {
            label: "12月",
            prop: "twelve",
            minWidth: 75,
            sortable: true,
          },
          {
            label: "全年累计",
            prop: "sum",
            slot: true,
            minWidth: 90,
            sortable: true,
            fixed: "right",
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
        menu: false,
        editBtn: false, //操作栏编辑按钮是否显示
        delBtn: false, //操作栏删除按钮是否显示
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
      let code = this.findObject(this.option.column, "code");
      this.$set(code, "search", false);
      this.$set(this.option, "menu", false);
    }
  },
  methods: {
    handleExport() {
      this.$confirm("是否导出值坐班打卡信息数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/ygj/clockrecord/exportClock?${
            this.website.tokenHeader
            }=${getToken()}`
        );

      });
    },
    sortChange(val) {
      console.log(val);
    },
    openCalendar(userId) {
      this.userId = userId;
      this.calendarVisibleShow = true;
    },
    handleEdit(row) {
      this.$router.push({
        path: "/village/editVillage",
        query: { id: row.id },
      });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.getTableDtata();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    addScore() {
      this.$router.push({
        path: "/village/addVillage",
        query: { code: this.userInfo.areaCode },
      });
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
      0;
      this.getTableDtata();
    },
    getTableDtata() {
      this.loading = true;
      getList(this.page.currentPage, this.page.pageSize, this.params).then(
        (res) => {
          this.loading = false;
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
.el-button--small.is-circle {
  visibility: hidden !important;
}
</style>
