<template>
  <div class="meeting-content">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <van-cell v-for="item in itemList" :key="item.id">
        <router-link :to="{ path: 'meetingDetail', query: { id: item.id } }">
          <div class="card-info">
            <div>{{ item.createName }}发起的会议</div>
            <div class="card-item">
              <div class="card-title">会议类别</div>
              <div class="card-gree-content">{{ item.meetingType }}</div>
            </div>
            <div class="card-item">
              <div class="card-title">会议起止时间</div>
              <div class="card-gree-content">
                {{ item.startTime }}-{{ item.endTime }}
              </div>
            </div>
            <div class="card-item">
              <div class="card-title">会议内容</div>
              <div class="card-gree-content">{{ item.meetTitle }}</div>
            </div>
            <div class="card-item">
              <div class="card-title">参会人员</div>
              <div class="card-gree-content">
                <span v-for="(item, index) in item.joinPeople" :key="item.name">
                  <span v-if="index < 4"> {{ item.name }},</span>
                </span>
                等共{{ item.joinPeople.length }}人
              </div>
            </div>
            <div class="card-item">
              <div class="card-title">状态</div>
              <div style="color: #d9001b" v-if="item.statusName === '未开始'">
                {{ item.statusName }}
              </div>
              <div style="color: #27b59c" v-if="item.statusName === '进行中'">
                {{ item.statusName }}
              </div>
              <div style="color: #0076f6" v-if="item.statusName === '已完成'">
                {{ item.statusName }}
              </div>
              <div
                style="color: rgba(0, 0, 0, 0.349019607843137)"
                v-if="item.statusName === '已取消'"
              >
                {{ item.statusName }}
              </div>
            </div>
          </div>
        </router-link>
      </van-cell>
    </van-list>
    <router-link to="/phone/addmeeting">
      <van-button round type="info" class="btn-circle">+</van-button>
    </router-link>
  </div>
</template>

<script>
import { selMeeting } from "@/api/dailyOffice/partyMeeting";
export default {
  created() {
    //创建组件时，加载第1页数据
    this.getroadList();
    this.$router.$avueRouter.setTitle("发起会议");
  },

  data() {
    return {
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [],
    };
  },

  methods: {
    getroadList() {
      let params = {
        current: this.page,
        size: this.pageSize,
      };

      selMeeting(params).then((result) => {
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
.meeting-content {
  height: 99vh;
  overflow-y: auto;
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
  line-height: 25px;
}

.card-item {
  display: flex;
  justify-content: flex-start;
}

.card-title {
  width: 90px;
  color: rgba(0, 0, 0, 0.349019607843137);
}
</style>
