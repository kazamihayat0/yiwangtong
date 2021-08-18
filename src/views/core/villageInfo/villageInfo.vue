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
        <template slot-scope="{ disabled, size }" slot="populationSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.populationStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.populationEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="areaSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.areaStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.areaEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="incomeUpSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.incomeUpStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.incomeUpEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="partyMembersSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.partyMembersStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.partyMembersEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="villageGroupsSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villageGroupsStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villageGroupsEnd"
          ></el-input>
        </template>
        <template
          slot-scope="{ disabled, size }"
          slot="villagerRepresentativesSearch"
        >
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villagerRepresentativesStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villagerRepresentativesEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="operatIncomeSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.operatIncomeStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.operatIncomeEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="farmersIncomeSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.farmersIncomeStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.farmersIncomeEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="villageDebtSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villageDebtStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.villageDebtEnd"
          ></el-input>
        </template>
        <template slot-scope="{ disabled, size }" slot="projectsNumSearch">
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.projectsNumStart"
          ></el-input>
          -
          <el-input
            placeholder=""
            :disabled="disabled"
            :size="size"
            style="width: 70px"
            v-model="search.projectsNumeEnd"
          ></el-input>
        </template>
        <template slot-scope="scope" slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addFive"
            >新增
          </el-button>
          <el-button
            type="warning"
            size="small"
            plain
            icon="el-icon-download"
            @click="handleExport"
            >导出（Excel）
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
  </div>
</template>

<script>
import { getToken } from "@/util/auth";
import { mapGetters } from "vuex";
import option from "@/option/villageManagement/fiveYearPlan";
import { getList, remove } from "@/api/dailyOffice/villageinfo";
import CityList from "@/components/cityList.vue";
export default {
  components: {
    CityList,
  },
  data() {
    return {
      search: {},
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      partyMeeting: [],
      option: {
        searchShow: false,
        searchMenuSpan: 6,
        column: [
          {
            label: "年份",
            prop: "year",
            search: true,
          },
          {
            label: "乡镇-村社",
            prop: "areaName",
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
            label: "人口",
            prop: "population",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 160,
          },
          {
            label: "面积（亩）",
            prop: "area",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 160,
          },
          {
            label: "村集体经济收入（万元）",
            prop: "incomeUp",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 180,
          },
          {
            label: "党员数（人）",
            prop: "partyMembers",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 160,
          },
          {
            label: "村（居）民小组数量（个）",
            prop: "villageGroups",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 190,
          },
          {
            label: "村（居）民小组数量（人）",
            prop: "villagerRepresentatives",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 200,
          },
          {
            label: "经营性收入（万元）",
            prop: "operatIncome",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 150,
          },
          {
            label: "上年农民人均收入（万元）",
            prop: "farmersIncome",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 190,
          },
          {
            label: "村级负债（万元）",
            prop: "villageDebt",
            sortable: true,
            search: true,
            searchSpan: 8,
            searchslot: true,
            searchLabelWidth: 160,
          },
          {
            label: "主要经济来源",
            prop: "mianIncome",
          },
          {
            label: "创建人",
            prop: "createName",
          },
          {
            label: "创建时间",
            prop: "createTime",
          },
        ],
        columnBtn: false,
        refreshBtn: false,
        addBtn: false,
        height: "auto",
        calcHeight: 0,
        index: true,
        indexLabel: "序号",
        border: true,
        align: "center",
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
  mounted() {
    if (this.userInfo.level == 3) {
      let code = this.findObject(this.option.column, "areaName");
      this.$set(code, "search", false);
    }
  },
  methods: {
    handleEdit(row) {
      this.$router.push({
        path: "/village/addVillageInfo",
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
    StatReport() {
      this.$router.push({ path: "/five/statReport" });
    },
    addFive() {
      this.$router.push({ path: "/village/addVillageInfo" });
    },
    handleExport() {
      this.$confirm("是否导出五年规划数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/ygj/plan/exportPlan?${this.website.tokenHeader}=${getToken()}`
        );
      });
    },
    searchReset() {
      this.params = {};
      this.search = {};
      this.onload(this.page);
    },
    searchChange(params, done) {
      this.params = params;
      if (this.params.startYear) {
        this.params.startYear = this.params.startYear.getFullYear();
      }
      for (let key in this.search) {
        this.params[key] = this.search[key];
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

