<template>
  <div class="village-content">
    <van-tabs
      v-model="active"
      @click="tabClick"
      :ellipsis="false"
      background="#0076F6"
      color="#fff"
      title-active-color="#fff"
    >
      <van-tab name="2">
        <template #title>
          <div class="tab-content">
            <div>{{ city }}</div>
            <div>街道乡镇排名</div>
          </div>
        </template>
        <div class="tab-content-list">
          <div class="tab-content-title">
            <div class="tab-title tab-b">本季度村社运行排名</div>
            <div class="tab-title">
              本乡镇 <span class="tab-b">{{ vill.length }}</span
              >个村社参与排名
            </div>
          </div>
          <div class="tab-content-pmlist" v-for="(item, index) in vill">
            <div class="tab-content-item">
              <div class="tab-order">{{ index + 1 }}</div>
              <div>{{ item.name }}</div>
            </div>
            <div class="tab-red">{{ item.param10 }}分</div>
          </div>
        </div>
      </van-tab>
      <van-tab name="1">
        <template #title>
          <div class="tab-content">
            <div>{{ villageSort }}</div>
            <div>全市排名</div>
          </div>
        </template>
        <div class="tab-content-list">
          <div class="tab-content-title">
            <div class="tab-title tab-b">本季度村社运行排名</div>
            <div class="tab-title">
              本市 <span class="tab-b">{{ vill.length }}</span
              >个村社参与排名
            </div>
          </div>
          <div class="tab-content-pmlist" v-for="(item, index) in vill">
            <div class="tab-content-item">
              <div class="tab-order">{{ index + 1 }}</div>
              <div>{{ item.name }}</div>
            </div>
            <div class="tab-red">{{ item.param10 }}分</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { villageBoard } from "@/api/dailyOffice/villageopration";
export default {
  name: "villageOperation",
  data() {
    return {
      active: 2,
      vill: [],
      city: "",
      villageSort: "",
    };
  },
  methods: {
    init(type) {
      villageBoard(type)
        .then((res) => {
          this.vill = res.data.data.voList;
          this.city =
            res.data.data.streetSort == 0 ? "无" : res.data.data.streetSort;
          this.villageSort =
            res.data.data.citySort == 0 ? "无" : res.data.data.citySort;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tabClick() {
      if (this.active == "1") {
        this.init(1);
      }
      if (this.active == "2") {
        this.init(2);
      }
    },
  },
  mounted() {
    this.$router.$avueRouter.setTitle("村社运行排行榜");
    this.init(2);
  },
};
</script>

<style>
.village-content .van-tabs--line .van-tabs__wrap {
  height: 118px !important;
  width: 95%;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 10px;
}
.village-content .van-tab {
  color: #fff;
}
  .village-content{
    height: 99vh !important;
    overflow-y: auto;}
</style>
<style scoped>
.tab-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tab-red {
  color: red;
}
.tab-content-item {
  display: flex;
  justify-content: space-between;
}
.tab-content-item div {
  margin-right: 20px;
}
.tab-content-pmlist {
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
  line-height: 50px;
}
.tab-b {
  font-size: 14px;
  font-weight: 500;
}
.tab-content-list .tab-content-title {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 10px 20px;
}
.village-content {
  height: 100%;
  background-color: #fff;
}
.tab-content {
  text-align: center;
  font-size: 13px;
}
.tab-order {
  font-size: 16px;
}
</style>
