<template>
  <div class="vant-content">
    <div class="vant-content1">
      <div class="vant-top">
        <div class="vant-status">
          <div>
            {{ startTime }}-{{endTime}}
          </div>

        </div>
        <div class="vant-status">
          <div>
            已提交测评<span class="vant-wd">{{ people }}</span
          >人
          </div>
          <div class="status">{{ statusName }}</div>
        </div>
        <div class="vant-title">
          <div>姓名</div>
          <div>评分</div>
        </div>
      </div>
      <div class="vant-mid">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10"
        >
          <van-cell v-for="item in satisMxList" :key="item.id">
            <div class="vant-list">
              <div class="vant-left">
                <img :src="item.tx" width="60px" height="60px"/>
                <div class="vant-left-content">
                  <div>{{ item.userName }}</div>
                  <div>{{ item.postName }}</div>
                </div>
              </div>
              <div class="vant-right">
                <van-rate v-model="item.score"/>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
    <div
      v-if="btnShow"
      style="
        margin-top: 36px;
        position: fixed;
        bottom: 0px;
        right: 0px;
        left: 0px;
        background-color: #ffffff;
      "
    >
      <van-button
        block
        type="info"
        native-type="submit"
        position="bottom"
        @click="sub"
      >提交
      </van-button
      >
    </div>
  </div>
</template>

<script>
  import * as dd from "dingtalk-jsapi";
  import {Notify} from "vant";
  // import { mapGetters, mapState } from "vuex";
  import {detail, saveScore, getMobile} from "@/api/dailyOffice/satisfaction";

  export default {
    name: "satisfactionDetail",
    data() {
      return {
        value: 3,
        loading: false,
        finished: true,
        page: 1, //请求第几页
        pageSize: 10, //每页请求的数量
        total: 0, //总共的数据条数
        itemList: [],
        people: "",
        statusName: "",
        satisMxList: [],
        data: undefined,
        btnShow: true,
        isManager: "",
        mobile: "",
        corpId: "",
        startTime: "",
        endTime: ""
      };
    },
    // computed: {
    //   ...mapGetters(["corpId"]),
    // },
    mounted() {
      this.$router.$avueRouter.setTitle("满意度评分");
      let that = this;
      (this.corpId = this.$route.query.corpId), //企业id
        dd.runtime.permission.requestAuthCode({
          corpId: that.corpId, //企业id
          onSuccess: function (result) {
            var requestAuthCode = result.code;
            var corpId = that.corpId;
            getMobile(requestAuthCode, corpId).then((res) => {
              console.log(res);
              that.mobile = res.data.mobile;
              that.isManager = res.data.isManager;
              if (that.isManager == 1) {
                that.btnShow = false;
              }
              detail(that.$route.query.id, that.mobile).then((res) => {
                that.people = res.data.data.peopleNum;
                that.statusName = res.data.data.statusName;
                that.startTime = res.data.data.startTime;
                that.endTime = res.data.data.endTime;
                if (that.statusName == "已结束") {
                  that.btnShow = false;
                }
                if (res.data.data.satisUserList.length > 0) {
                  that.satisMxList = res.data.data.satisUserList;
                  that.btnShow = false;
                } else {
                  that.satisMxList = res.data.data.satisMxList;
                  that.satisMxList.forEach((_) => {
                    delete _["id"];
                    that.$set(_, "score", 0);
                  });
                }
                that.data = {
                  id: res.data.data.id,
                };
              });
            });
          },
        });
    },
    methods: {
      sub() {
        this.satisMxList.forEach((_) => {
          _.phone = this.mobile;
        });
        this.data["satisUserList"] = this.satisMxList;
        saveScore(this.data).then((res) => {
          Notify({type: "success", message: "满意度调查评分成功"});
          this.$router.push({path: "/phone/satisfaction"});
        });
      },
      getroadList() {
        let params = {
          current: this.page,
          size: this.pageSize,
        };

        // selMeeting(params).then((result) => {
        //   this.total = result.data.data.total;
        //   var rows = result.data.data.records;
        //   this.loading = false;
        //
        //   if (rows == null || rows.length === 0) {
        //     // 加载结束
        //     this.finished = true;
        //     return;
        //   }
        //   console.log(rows);
        //   // 将新数据与老数据进行合并
        //   this.itemList = this.itemList.concat(rows);
        //
        //   //如果列表数据条数>=总条数，不再触发滚动加载
        //   if (this.itemList.length >= this.total) {
        //     this.finished = true;
        //   }
        // });
      },

      //滚动加载时触发，list组件定义的方法
      onLoad() {
        this.page++;
        this.getroadList();
      },
    },
  };
</script>

<style scoped>
  .vant-top {
    position: fixed;
    top: 0px;
    z-index: 999;
    background-color: #fff;
    width: 100%;
  }

  .vant-mid {
    margin-top: 130px;
  }

  .vant-content {
    height: 99vh;
    overflow-y: auto;
  }

  .vant-content1 {
    margin-bottom: 50px;
  }

  .vant-right {
    margin-right: 20px;
  }

  .vant-left-content {
    margin-left: 10px;
  }

  .vant-left-content div {
    line-height: 30px;
    height: 30px;
  }

  .vant-left {
    padding-left: 30px;
    display: flex;
    justify-content: flex-start;
  }

  .vant-list {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .vant-title {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .vant-title div {
    padding-left: 50px;
    padding-right: 70px;
  }

  .vant-status {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
  }

  .status {
    color: #0076f6;
    background-color: #f2f2f2;
  }

  .vant-wd {
    font-size: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .vant-status div {
    margin-left: 15px;
    margin-right: 15px;
  }
</style>
