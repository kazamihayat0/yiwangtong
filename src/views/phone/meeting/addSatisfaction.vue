<template>
  <div class="satis-content">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="year"
        :value="sat.year"
        label="年度"
        placeholder="点击选择时间"
        @click="timeshowPicker = true"
        :rules="[{ required: true, message: '请选择年度' }]"
      />
      <van-popup v-model="timeshowPicker" position="bottom">
        <van-datetime-picker
          type="year"
          @confirm="timeonConfirm"
          @cancel="timeshowPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="startTime"
        :value="sat.startTime"
        label="测评开始时间"
        placeholder="点击选择时间"
        @click="timeshowPicker2 = true"
        :rules="[{ required: true, message: '请选择测评开始时间' }]"
      />
      <van-popup v-model="timeshowPicker2" position="bottom">
        <van-datetime-picker
          type="datetime"
          title="选择完整时间"
          @confirm="timeonConfirm2"
          :min-date="minDate"
          @cancel="timeshowPicker2 = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="endTime"
        :value="sat.endTime"
        label="测评结束时间"
        placeholder="点击选择时间"
        @click="timeshowPicker3 = true"
        :rules="[
          {
            validator: endTimevalidator,
            message: '会议结束时间要大于会议开始时间',
          },
          { required: true, message: '请选择测评结束时间' },
        ]"
      />
      <van-popup v-model="timeshowPicker3" position="bottom">
        <van-datetime-picker
          type="datetime"
          title="选择完整时间"
          @confirm="timeonConfirm3"
          @cancel="timeshowPicker3 = false"
          :min-date="minDate"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="userIds"
        :value="sat.userNames"
        label="参加测评干部"
        placeholder="点击选择参加测评干部"
        @click="userClick"
        :rules="[{ required: true, message: '请选择参加测评干部' }]"
      />
      <div
        style="
          margin: 16px;
          position: absolute;
          bottom: 0px;
          right: 0px;
          left: 0px;
        "
      >
        <van-button
          round
          block
          type="info"
          native-type="submit"
          position="bottom"
          >发起测评</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Notify } from "vant";
import { save, getCode } from "@/api/dailyOffice/satisfaction";
export default {
  data() {
    return {
      timeshowPicker: false,
      timeshowPicker2: false,
      timeshowPicker3: false,
      minDate: new Date(),
      sat: {
        year: "",
        startTime: "",
        endTime: "",
        userNames: "",
        userIds: "",
        code: "",
        title: "",
        mobile: "",
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["corpId"]),
  },
  mounted() {
    this.$router.$avueRouter.setTitle("创建满意度测评");
    this.sat.code = this.$route.query.code;
    this.$set(this.sat, "mobile", this.$route.query.mobile);
    console.log("this.$route.query.mobile", this.$route.query.code);
    console.log("this.$route.query.mobile", this.$route.query.mobile);
    console.log("this.$route.query.mobile", this.sat.mobile);
    this.data = this.$route.query.data;
    this.sat.year = this.$route.query.year;
    if (!this.sat.year) {
      this.sat.year = new Date().getFullYear();
    }
    this.sat.startTime = this.$route.query.startTime;
    this.sat.endTime = this.$route.query.endTime;
    if (this.data) {
      this.sat.userNames = this.data;
      this.sat.userIds = this.$route.query.userIds;
    }
  },
  methods: {
    onSubmit(value) {
      if (!this.sat.code) {
        getCode(this.corpId).then((res) => {
          debugger;
          this.sat.code = res.data.data;
          this.saveS();
        });
      } else {
        this.saveS();
      }
    },
    saveS() {
      this.sat.title = this.sat.year + "年村干部满意度测评";
      let satisUserList = [];
      let users = this.sat.userIds.split(",");
      for (let i = 0; i < users.length; i++) {
        satisUserList.push({ userId: users[i] });
      }
      this.sat["satisMxList"] = satisUserList;
      save(this.sat).then((res) => {
        Notify({ type: "success", message: "满意度调查新增成功" });
        this.$router.push({ path: "/phone/satisfaction" });
      });
    },
    userClick() {
      this.$router.push({
        path: "/phone/choose",
        query: {
          code: this.sat.code,
          year: this.sat.year,
          startTime: this.sat.startTime,
          endTime: this.sat.endTime,
          mobile: this.sat.mobile,
        },
      });
    },
    endTimevalidator() {
      if (new Date(this.sat.startTime) >= new Date(this.sat.endTime)) {
        return false;
      }
      if (new Date(this.sat.startTime) < new Date(this.sat.endTime)) {
        return true;
      }
    },
    timeonConfirm3(time) {
      this.sat.endTime = new Date(time).format("yyyy-MM-dd hh:mm");
      this.timeshowPicker3 = false;
    },
    timeonConfirm2(time) {
      this.sat.startTime = new Date(time).format("yyyy-MM-dd hh:mm");
      this.timeshowPicker2 = false;
    },
    timeonConfirm(time) {
      this.sat.year = time.getFullYear();
      this.timeshowPicker = false;
    },
  },
};
</script>

<style scoped>
.satis-content {
  background: #fff;
  height: 100%;
}
</style>
