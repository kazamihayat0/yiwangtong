<template>
  <basic-container>
    <avue-crud
      :option="option"
      :page.sync="page"
      :data="meetingData"
      @on-load="selMeeting"
      @search-change="searchChange"
      @search-reset="searchReset"
    >
      <template slot="countNum" slot-scope="scope">
        <el-popover placement="right" width="120" trigger="click">
          <div style="height: 300px; overflow-y: auto">
            <el-row
              v-for="item in scope.row.joinPeople"
              :key="JSON.stringify(item)"
            >
              <el-col span="12">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="item.tx"
                  :fit="contain"
                ></el-image>
              </el-col>
              <el-col span="12">
                <span style="line-height: 50px">{{ item.name }}</span>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="text"
            @click="showPeopleList(scope.row, 0)"
            slot="reference"
          >
            {{ scope.row.countNum }}
          </el-button>
        </el-popover>
      </template>
      <template slot="signNum" slot-scope="scope">
        <el-popover placement="right" width="200" trigger="click">
          <div style="height: 300px; overflow-y: auto">
            <el-row
              v-for="item in scope.row.signPeople"
              :key="JSON.stringify(item)"
            >
              <el-col span="12">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="item.tx"
                  :fit="contain"
                ></el-image>
              </el-col>
              <el-col span="12">
                <span style="line-height: 50px">{{ item.name }}</span>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="text"
            @click="showPeopleList(scope.row, 0)"
            slot="reference"
          >
            {{ scope.row.signNum }}
          </el-button>
        </el-popover>
      </template>
      <template slot="checkNum" slot-scope="scope">
        <el-popover placement="right" width="200" trigger="click">
          <div style="height: 300px; overflow-y: auto">
            <el-row
              v-for="item in scope.row.checkPeople"
              :key="JSON.stringify(item)"
            >
              <el-col span="12">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="item.tx"
                  :fit="contain"
                ></el-image>
              </el-col>
              <el-col span="12">
                <span style="line-height: 50px">{{ item.name }}</span>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="text"
            @click="showPeopleList(scope.row, 0)"
            slot="reference"
          >
            {{ scope.row.checkNum }}
          </el-button>
        </el-popover>
      </template>
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="addMeeting()"
          >新增
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click.stop="handleExport"
          >导出(Excel)
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <!-- 0:未开始 1：进行中 2：已完成 3：已取消 -->
        <router-link :to="{ path: 'editMeeting', query: { id: scope.row.id } }">
          <el-button type="text" size="small" v-if="scope.row.upFlag"
            >上传会议纪要
          </el-button>
        </router-link>
        <router-link :to="{ path: 'editMeeting', query: { id: scope.row.id } }">
          <el-button type="text" size="small" v-if="!scope.row.upFlag"
            >查看
          </el-button>
        </router-link>
        <el-button
          type="text"
          size="small"
          v-if="scope.row.cancelFlag"
          @click.stop="cancelMeeting(scope.row, scope.index)"
          >取消
        </el-button>
        <el-button
          type="text"
          size="small"
          v-if="scope.row.statusName === '已取消'"
          @click.stop="handleEdit(scope.row, scope.index)"
          >删除
        </el-button>
      </template>
    </avue-crud>
    <!-- <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="60%"
    >
      <form-1></form-1>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog> -->
    <el-card class="box-card" v-show="xzs">
      <div class="text item"></div>
    </el-card>
    <el-popover
      placement="left-start"
      title="发起会议"
      width="400"
      trigger="click"
    >
      <div class="text item">
        <div>1.村务联席会议应参会人员：村两委干部、第一书记、联村干部；</div>
        <div>
          2.集中审账会议应参会人员：村两委干部（书记、副书记、党组织成员和村委会主任、副主任、村委会成员）、村监会主任、村监会成员、报账员；
        </div>
        <div>3.村监会会议应参会人员：村两委干部、村监会主任、村监会成员；</div>
        <div>4.村民代表会议应参会人员：所有村干部和所有村民代表；</div>
        <div>5.网格会议应参会人员：所有村干部；</div>
        <div>
          6.村党组织村务监督会议应参会人员：党组织干部和所有村监会成员；
        </div>
        <div>7.其他会议应参会人员：所有村干部；</div>
        <div>8.会议地点固定为各村社村委会。</div>
      </div>
      <!-- <el-button slot="reference">hover 激活</el-button> -->
      <div class="warn-info-f" id="df" slot="reference">
        <img src="/img/06.gif" height="100px" />
      </div>
    </el-popover>
  </basic-container>
</template>

<script>
import { getToken } from "@/util/auth";
import option from "@/option/dailyOffice/meeting.js";
import { cancelMeeting, selMeeting } from "@/api/dailyOffice/partyMeeting";
import form1 from "./meetingForm/form1.vue";
export default {
  components: { form1 },
  data() {
    return {
      dialogFormVisible: true,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      xzs: false,
      meetingData: [],
      params: {},
      option: option,
      cancelFlag: false, //会议是否可以取消
      upFlag: false, //会议是否可以上传
    };
  },
  mounted() {
    this.dragFunc("df");
  },
  methods: {
    showPeopleList(row, type) {},
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
      this.$confirm("是否导出发起会议数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/ygj/meeting/exportMeet?${
            this.website.tokenHeader
          }=${getToken()}`
        );
      });
    },
    addMeeting() {
      this.$router.push({ path: "addMeeting" });
    },
    //是否进行修改操作的拦截
    //取消会议
    cancelMeeting(row) {
      this.$confirm("是否取消会议？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          cancelMeeting(row.id).then((res) => {
            this.$message({
              type: "success",
              message: "取消成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
          });
        });
      console.log(row);
    },
    selMeeting() {
      console.log(this.params.statusName === undefined);
      if (
        this.params.statusName !== "" &&
        this.params.statusName !== undefined
      ) {
        this.params.type = this.params.statusName;
      }
      if (this.params.areaName !== "" && this.params.areaName !== undefined) {
        this.params.codeSerch = this.params.areaName;
      }
      console.log(this.params);
      selMeeting({
        current: this.page.currentPage,
        size: this.page.pageSize,
        ...this.params,
      }).then((res) => {
        this.meetingData = res.data.data.records;
        this.page.total = res.data.data.total;
      });
    },
    searchReset() {
      this.params = {};
      this.selMeeting();
    },
    searchChange(params, done) {
      this.params = params;
      this.selMeeting();
      setTimeout(() => {
        done();
      }, 500);
    },
  },
};
</script>

<style scoped>
.bold {
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
  clear: both;
}

.box-card {
  z-index: 999;
  width: 520px;
  height: 300px;
  position: fixed;
  bottom: 90px;
  right: 70px;
  box-shadow: 0 0 10px #00000050;
}
.el-card.is-always-shadow {
  -webkit-box-shadow: 0 0 10px #00000050;
  box-shadow: 0 0 10px #00000050 !important;
}
.warn-info-f {
  position: fixed;
  bottom: 80px;
  z-index: 999;
  right: 50px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
}
</style>
