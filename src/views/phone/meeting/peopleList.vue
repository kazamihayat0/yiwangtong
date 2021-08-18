<template>
  <div>
    <!-- <van-search v-model="searchValue" placeholder="搜索" /> -->
    <van-checkbox-group
      v-model="peopleResult"
      ref="checkboxGroup"
      @change="peopleChange"
    >
      <van-list
        :immediate-check="false"
        finished-text="没有更多了"
        :offset="10"
      >
        <van-cell v-for="item in peopleList" :key="item.id">
          <van-checkbox :name="item.id + ',' + item.name" disabled>
            <div class="tab-div">
              <img class="tab-img" :src="item.tx" width="33px" height="33px" />
              <div class="tab-span">{{ item.name }}</div>
            </div>
          </van-checkbox>
        </van-cell>
      </van-list>
    </van-checkbox-group>

    <van-submit-bar button-text="确定" @submit="onSubmit" button-type="info">
      <van-checkbox v-model="checked" @change="checkAll" disabled
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { getUser } from "@/api/dailyOffice/partyMeeting";
export default {
  name: "peopleList",
  data() {
    return {
      searchValue: "",
      peopleResult: [],
      checked: true,
      peopleList: [],
    };
  },
  mounted() {
    var meetingUserType = this.$route.query.meetingUserType;
    getUser(meetingUserType)
      .then((res) => {
        this.peopleList = res.data.data;
        this.$nextTick(() => {
          this.checkAll();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onSubmit() {
      console.log("ssss");
      let peopleName = [];
      let peopleId = [];
      this.peopleResult.forEach((el) => {
        let peoArr = el.split(",");
        peopleName.push(peoArr[1]);
        peopleId.push(peoArr[0]);
      });
      this.$router.push({
        path: "addmeeting",
        query: {
          name: peopleName,
          id: peopleId,
        },
      });
      console.log(this.peopleResult);
    },
    peopleChange() {
      console.log(this.peopleResult);
    },
    checkAll(val) {
      this.$refs.checkboxGroup.toggleAll(val);
    },
  },
};
</script>

<style scoped>
.tab-div {
  display: flex;
}
.tab-span {
  height: 33px;
  font-size: 15px;
  line-height: 33px;
  margin-left: 10px;
}
.van-submit-bar__bar {
  display: flex;
  justify-content: space-between;
}
</style>
