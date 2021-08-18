<template>
  <div class="satis-content">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <van-cell v-for="item in itemList" :key="item.id">
        <!--<router-link :to="{ path: 'satisfactionDetail', query: { id: item.id ,mobile,mobile} }">-->
        <div class="card-info" @click="itemClick(item.id, item.statusName)">
          <div>{{ item.title }}</div>
          <div class="card-item">
            <div class="card-title">测评时间</div>
            <div class="card-gree-content">
              {{ item.startTime }} - {{ item.endTime }}
            </div>
          </div>
          <div class="card-item">
            <div class="card-title">状态</div>
            <div class="card-red-content">{{ item.statusName }}</div>
          </div>
        </div>
        <!--</router-link>-->
      </van-cell>
    </van-list>
    <!--<router-link :to="{path:'/phone/addSatisfaction',query:{code:code,mobile:mobile}}">-->
    <van-button
      round
      type="info"
      class="btn-circle"
      @click="sub"
      v-if="isManager == 1"
      >+</van-button
    >
    <!--</router-link>-->
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { mapGetters, mapState } from "vuex";
import { getList, getCode, getMobile } from "@/api/dailyOffice/satisfaction";
export default {
  created() {
    //创建组件时，加载第1页数据
    this.getroadList();
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [],
      mobile: "",
      code: "",
      isManager: 0,
    };
  },
  computed: {
    ...mapGetters(["corpId"]),
  },
  mounted() {
    this.$router.$avueRouter.setTitle("满意度测评");
    this.itemList = [];
    let that = this;
    dd.runtime.permission.requestAuthCode({
      corpId: that.corpId, //企业id
      onSuccess: function (result) {
        var requestAuthCode = result.code;
        var corpId = that.corpId;
        getMobile(requestAuthCode, corpId).then((res) => {
          console.log(res);
          that.mobile = res.data.mobile;
          that.isManager = res.data.isManager;
        });
      },
    });
  },
  methods: {
    itemClick(id, status) {
      if (this.mobile) {
        this.$router.push({
          path: "/phone/satisfactionDetail",
          query: { id: id, corpId: this.corpId, },
        });
      }
    },
    sub() {
      this.$router.push({
        path: "/phone/addSatisfaction",
        query: { code: this.code, mobile: this.mobile },
      });
    },
    getroadList() {
      let params = {
        current: this.page,
        size: this.pageSize,
        corpId: this.corpId,
      };
      getList(params).then((result) => {
        this.total = result.data.data.total;
        var rows = result.data.data.records;
        this.loading = false;

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        console.log(rows);
        // 将新数据与老数据进行合并
        this.itemList = this.itemList.concat(rows);

        //如果列表数据条数>=总条数，不再触发滚动加载
        if (this.itemList.length >= this.total) {
          this.finished = true;
        }
      });

      getCode(this.corpId).then((res) => {
        this.code = res.data.data;
        console.log(this.code);
      });
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
.satis-content {
  height: 99vh !important;
  overflow-y: auto !important;
}
.btn-circle {
  position: fixed;
  right: 40px;
  height: 50px;
  width: 50px;
  font-size: 25px;
  bottom: 60px;
}
.card-gree-content {
  color: #353335;
}

.card-red-content {
  color: #d9001b;
}

.satis-content {
  background: #fff;
  height: 100%;
}

.card-info {
  padding-top: 10px;
  padding-left: 5px;
  font-size: 14px;
  height: 100px;
  line-height: 25px;
}

.card-item {
  display: flex;
  justify-content: flex-start;
}

.card-title {
  width: 70px;
  color: rgba(0, 0, 0, 0.349019607843137);
}
</style>
