<template>
  <div style="height: 100vh">
    <!-- 签到 -->
    <div v-show="active === 0">
      <van-field
        readonly
        clickable
        required
        v-model="meetingType"
        label="选择会议"
        placeholder="点击选择会议"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择会议' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="Columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div>
        <span>{{ nowAdress }}</span>
      </div>
      <div id="map"></div>
      <div>会议时间 {{ meetingTime }}</div>
      <div>会议地址 {{ meetingAdress }}</div>
      <div class="radius-box">
        <div class="m-btn" :class="{ disable: isDisable }" @click="onSign">
          <div class="m-btn-txt">
            <span> 签到 </span>
            <span> {{ nowTime }} </span>
          </div>
        </div>
      </div>
      <div style="color: #c0c4cc">
        <div>签到说明：</div>
        <div>
          1.只有进行中状态的会议可以签到，未开始、已结束状态的会议无法签到；
        </div>
        <div>
          2.需确保签到定位距会议地点（村委会）200米范围内才可以签到成功；
        </div>
        <div>
          3.只有参会人员才可以进行签到，具体参会人员为发起会议页面所选【参会人员】。
        </div>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="list-meeting-box" v-show="active === 1">
      <div class="list-items" v-for="item in signHistory" :key="item.id">
        <div class="list-meeting-item">
          <label>会议标题</label>
          <span>{{ item.meetingType }}:{{ item.meetTitle }}</span>
        </div>
        <div class="list-meeting-item">
          <label>会议时间</label>
          <span>{{ item.startTime }}-{{ item.endTime }}</span>
        </div>
        <div class="list-meeting-item">
          <label>会议地址</label>
          <span>{{ item.address }}</span>
        </div>
        <div class="list-meeting-item">
          <label>签到时间</label>
          <span>{{ item.signTime }}</span>
        </div>
        <!-- <div class="list-meeting-item">
          <label>签到地址</label>
          <span>{{ item.meetingType }}</span>
        </div> -->
        <van-divider />
      </div>
    </div>
    <!-- 底部标签 -->
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item>签到</van-tabbar-item>
        <van-tabbar-item>历史记录</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import {
  meetingList,
  saveSignedMeeting,
  signedMeetingList,
} from "@/api/dailyOffice/partyMeeting";
import { getDate } from "@/util/date";

export default {
  data() {
    return {
      active: 0,
      Columns: [],
      meetingColumns: [],
      showPicker: false,
      meetingType: "",
      map: "",
      nowAdress: "",
      nowLatlng: {},
      meetingInfo: {},
      meetingTime: "",
      meetingAdress: "",
      nowTime: "00:00:00",
      isDisable: false,
      signHistory: [],
    };
  },
  created() {
    this.$router.$avueRouter.setTitle("会议签到");
    meetingList().then((result) => {
      this.meetingColumns = result.data.data;
      result.data.data.forEach((element) => {
        this.Columns.push(element.meetTitle);
      });
      console.log(this.Columns);
    });
    if (this.Columns.length > 0) {
      this.onConfirm(this.Columns[0], 0);
    }
  },
  mounted() {
    this.map = new BMap.Map("map", { enableMapClick: false }); // 创建Map实例
    this.init();
    this.getSignedMeetingList();
    setInterval(() => {
      var myDate = new Date();
      var hh = myDate.getHours(); //获取当前小时数(0-23)
      var mm = myDate.getMinutes(); //获取当前分钟数(0-59)
      var ss = myDate.getSeconds(); //获取当前秒数(0-59)
      this.nowTime = hh + ":" + mm + ":" + ss;
    }, 1000);
  },
  methods: {
    init() {
      var point = new BMap.Point(119.28739807500521, 29.48115402696838); // 创建点坐标
      this.map.centerAndZoom(point, 16);
      this.map.enableScrollWheelZoom(); // 启用滚轮放大缩小
      var marker = new BMap.Marker(point, {
        enableDragging: true,
      });
      this.map.addOverlay(marker);
      //获取当前位置
      var geolocation = new BMap.Geolocation();
      var vm = this;
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function (r, p) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          console.log(r.point);
          vm.map.panTo(r.point); //设置坐标点位置
          marker.setPosition(r.point); //设置点标记位置
          vm.nowLatlng = r.point;
          vm.setAddressOptions(r.point);
        }
      });
    },
    //设置坐标点名称
    setAddressOptions(latlng) {
      console.log(latlng);
      var geoc = new BMap.Geocoder();
      geoc.getLocation(latlng, (rs) => {
        console.log(rs);
        this.nowAdress = rs.address;
      });
    },
    //计算两个经纬度点之间的距离
    calclatlng(point1, point2, cb) {
      var distance = this.map.getDistance(point1, point2);
      cb(distance);
    },

    //选择会议
    onConfirm(value, index) {
      this.meetingType = value;
      let meetingItem = this.meetingColumns[index];
      this.meetingInfo = meetingItem;
      this.meetingTime = meetingItem.startTime + " - " + meetingItem.endTime;
      this.meetingAdress = meetingItem.address;
      this.showPicker = false;
    },
    //签到提交
    onSign() {
      if (this.nowLatlng.lng === undefined || this.nowLatlng.lng === "") {
        Notify({
          type: "warning",
          message: "未能获取当前位置，请授权获取当前位置信息。",
        });
        return;
      } else if (
        this.meetingInfo.lng === undefined ||
        this.meetingInfo.lng === ""
      ) {
        Notify({
          type: "warning",
          message: "请选择签到会议",
        });
        return;
      }
      console.log(this.nowLatlng.lng);
      var point1 = new BMap.Point(this.meetingInfo.lng, this.meetingInfo.lat);
      var point2 = new BMap.Point(this.nowLatlng.lng, this.nowLatlng.lat);
      console.log(point1, point2);

      this.calclatlng(point1, point2, (twoPlacesDistance) => {
        if (twoPlacesDistance > 200) {
          Notify({ type: "warning", message: "超出签到范围" });
        } else {
          saveSignedMeeting(this.meetingInfo.id).then((result) => {
            Notify({ type: "success", message: "签到成功" });
            this.isDisable = true;
          });
        }
      });
    },
    //获取签到历史信息
    getSignedMeetingList() {
      signedMeetingList().then((res) => {
        this.signHistory = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 30vh;
}
.radius-box {
  height: 100px;
  width: 100px;
  margin: 5px auto;
  text-align: center;

  span {
    display: block;
  }
}
.list-meeting-box {
  height: calc(100% - 51px);
  overflow-y: auto;
}
.list-meeting-item {
  margin-top: 12px;
  label {
    margin-right: 20px;
    color: #909399;
  }
}
.m-btn {
  width: 100%;
  height: 100%;
  background-color: #0188fd;
  border-radius: 50%;
  box-shadow: 0px 0px 12px #0188fd;
  color: #ffffff;
  .m-btn-txt {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
.disable {
  pointer-events: none;
  background-color: #909399;
  box-shadow: 0px 0px 12px #909399;
}
</style>
