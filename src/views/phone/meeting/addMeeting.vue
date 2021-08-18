<template>
  <div
    style="overflow-y: auto; height: 100vh; font-size: 16px"
    class="txt-size"
  >
    <van-form @submit="onSubmit" label-width="120" @failed="onFailed">
      <van-field
        readonly
        clickable
        v-model="meet.meetingType"
        label="会议类别"
        required
        placeholder="点击选择会议类型"
        @click="meetingTypeShowPicker = true"
        :rules="[{ required: true, message: '请选择会议类型' }]"
      />
      <van-popup v-model="meetingTypeShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="meetingTypeColumns"
          @confirm="meetingTypeOnConfirm"
          @cancel="meetingTypeShowPicker = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        v-model="meet.startTime"
        label="会议开始时间"
        required
        placeholder="点击选择时间"
        @click="startTimeSowPicker = true"
        :rules="[{ required: true, message: '请填写会议开始时间' }]"
      />
      <van-popup v-model="startTimeSowPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="startTimeonConfirm"
          :min-date="minDate"
          @cancel="startTimeSowPicker = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="endTime"
        v-model="meet.endTime"
        label="会议结束时间"
        required
        placeholder="点击选择时间"
        @click="endTimeSowPicker = true"
        :rules="[
          {
            validator: endTimevalidator,
            message: '会议结束时间要大于会议开始时间',
          },
          { required: true, message: '请填写会议结束时间' },
        ]"
      />
      <van-popup v-model="endTimeSowPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="endTimeonConfirm"
          :min-date="minDate"
          @cancel="endTimeSowPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        v-model="meet.meetTitle"
        label="会议内容"
        required
        placeholder="点击选择会议类型"
        @click="meetTitleShowPicker = true"
        :rules="[{ required: true, message: '请选择会议内容' }]"
      />
      <van-popup v-model="meetTitleShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="meetTitleColumns"
          @confirm="meetTitleOnConfirm"
          @cancel="meetTitleShowPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        v-model="meet.meetPeople"
        label="参会人员"
        placeholder="参会人员"
        @click="clickPeople"
        required
        :rules="[{ required: true, message: '请选择参会人员' }]"
      />
      <van-field
        readonly
        clickable
        v-model="meet.address"
        label="会议地点"
        placeholder="会议地点"
        @click="clickAddress"
        required
        :rules="[{ required: true, message: '请选择会议地点' }]"
      />

      <van-field
        readonly
        clickable
        v-model="meet.meetRemindStr"
        label="会议提醒"
        placeholder="点击选择会议提醒"
        @click="meetRemindShowPicker = true"
        required
        :rules="[{ required: true, message: '请选择会议提醒' }]"
      />

      <van-popup v-model="meetRemindShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="meetRemindColumns"
          @confirm="meetRemindOnConfirm"
          @cancel="meetRemindShowPicker = false"
        />
      </van-popup>
      <van-field name="isImport" label="重大事项决议" required>
        <template #input>
          <van-radio-group
            v-model="meet.isImport"
            direction="horizontal"
            :disabled="isImportDisabled"
          >
            <van-radio :name="1">是</van-radio>
            <van-radio :name="0">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div v-show="meet.isImport == 1">
        <van-field
          v-show="meetTypeConShow === 0"
          readonly
          clickable
          v-model="meet.meetTypeCon"
          label="关联相关会议"
          placeholder="点击选择会议"
          required
        />
        <van-field
          v-show="meetTypeConShow === 1"
          readonly
          clickable
          v-model="meet.meetTypeCon"
          label="关联相关会议"
          placeholder="点击选择会议"
          @click="orgMeetShowPicker = true"
          required
          :rules="[
            {
              required: meet.isImport == 1 && meetTypeConShow === 1,
              message: '请选择会议',
            },
          ]"
        />
        <remote-input
          label="关联相关会议"
          v-show="meetTypeConShow === 2"
          placeholder="请输入关联相关会议"
          :columns="remoteColumns"
          @inputChange="inputChange"
          @onConfirm="onRemoteConfirm"
        ></remote-input>
        <van-popup v-model="orgMeetShowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="orgMeetColumns"
            @confirm="orgMeetOnConfirm"
            @cancel="orgMeetShowPicker = false"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="startTime"
          v-model="meet.meetTimeCon"
          label="相关会议时间"
          placeholder="点击选择时间"
          @click="conTimeShowPicker = true"
          required
          :rules="[
            { required: meet.isImport == 1, message: '请填写相关会议时间' },
          ]"
        />
        <van-popup v-model="conTimeShowPicker" position="bottom">
          <van-datetime-picker
            type="datetime"
            @confirm="conTimeonConfirm"
            @cancel="conTimeShowPicker = false"
          />
        </van-popup>
        <van-field
          name="message"
          v-model="meet.meetContentCon"
          label="相关会议内容"
          type="text"
          placeholder="相关会议内容"
          :readonly="meetTypeConShow == 2"
          required
          :rules="[
            { required: meet.isImport == 1, message: '请填写相关会议内容' },
          ]"
        />

        <van-field label="相关会议讨论结果" required>
          <template #input>
            <van-radio-group
              v-model="meet.meetResultCon"
              direction="horizontal"
            >
              <van-radio name="同意">同意</van-radio>
              <van-radio name="不同意">不同意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div style="color: #c0c4cc">
      <div>说明：</div>
      <div>1.村务联席会议应参会人员：村两委干部、第一书记、联村干部；</div>
      <div>
        2.集中审账会议应参会人员：村两委干部（书记、副书记、党组织成员和村委会主任、副主任、村委会成员）、村监会主任、村监会成员、报账员；
      </div>
      <div>3.村监会会议应参会人员：村两委干部、村监会主任、村监会成员；</div>
      <div>4.村民代表会议应参会人员：所有村干部和所有村民代表</div>
      <div>5.网格会议应参会人员：所有村干部；</div>
      <div>6.村党组织村务监督会议应参会人员：党组织干部和所有村监会成员；</div>
      <div>7.其他会议应参会人员：所有村干部；</div>
      <div>8.会议地点固定为各村社村委会。</div>
    </div>
  </div>
</template>

<script>
import {
  addMeeting,
  getUser,
  getMeetingList,
} from "@/api/dailyOffice/partyMeeting";
import { Notify } from "vant";
import remoteInput from "@/components/remoteInput.vue";
import { debounce } from "@/util/util";
export default {
  components: { remoteInput },
  name: "addmeeting",
  data() {
    return {
      timer: null,
      meet: {
        meetingType: "", //会议类别
        startTime: "", //会议起止时间
        endTime: "", //会议结束时间
        jw: "",
        address: "",
        isImport: 0, //重点事项决议
        orgMeet: "",
        meetTitle: "", //会议标题
        meetPeople: "", //参会人员名称
        peoples: [], ////参会人员ID
        meetRemind: "", //会议提醒
        meetRemindStr: "", //会议提醒
        meetTypeCon: "", //关联相关会议
        meetTypeId: "",
        meetTimeCon: "", //相关会议时间
        meetContentCon: "", //相关会议内容
        meetResultCon: "同意", //相关会议讨论结果
      },
      mapShow: false,
      minDate: new Date(),
      orgMeetColumns: [
        "村务联席会议",
        "集中审账会议",
        "村监会会议",
        "村民代表会议",
        "网格会议",
        "党员大会",
        "党委会/支委会",
      ],
      meetingTypeColumns: [
        "村务联席会议",
        "集中审账会议",
        "村监会会议",
        "村民代表会议",
        "网格会议",
        "村党组织村务监督会议",
        "其他",
      ],
      meetTitleColumns: [
        "发展建设规划及年度计划",
        "组织章程及村规民约制定和修订",
        "财务预决算及大额集体资金使用",
        "项目立项、招投标及筹资筹劳",
        "集体资产处置",
        "扶持资金使用及村级收集分配",
        "安置房分配、土地征用、征收补充及失地养老保险政策等",
        "村干部报酬、务工补贴及标准、人员选聘",
        "其他重大事项",
        "发展党员",
        "评优评先、补助慰问"
      ],
      meetRemindColumns: [
        "无提醒",
        "开始时",
        "5分钟前",
        "15分钟前",
        "30分钟前",
        "1个小时前",
        "1天前",
      ],
      remoteColumns: [],
      meetingTypeShowPicker: false,
      meetTypeConShow: 1, //显示哪种关联会议
      isImportDisabled: false, //显示哪种关联会议
      meetTitleShowPicker: false,
      startTimeSowPicker: false,
      endTimeSowPicker: false,
      orgMeetShowPicker: false,
      villMeetShowPicker: false,
      meetWayShowPicker: false,
      meetRemindShowPicker: false,
      conTimeShowPicker: false,
      meetingUserType: 4,
    };
  },
  watch: {
    "meet.meetingType": function (val) {
      console.log(val);
      var meetingType = [
        "村民代表会议",
        "村党组织村务监督会议",
        "村监会会议",
        "其他",
        "村务联席会议",
        "集中审账会议",
      ];
      let index = meetingType.indexOf(val);

      //会议类别等于村务联席会议
      if (index == 4) {
        this.meet.isImport = 1;
        this.meet.meetTypeCon = "党委会/支委会";
        this.meetTypeConShow = 0;
        this.isImportDisabled = true;
      } else if (index == 0) {
        //会议类别等于村民代表会议
        this.meet.isImport = 1;
        this.meet.meetTypeCon = "";
        this.meetTypeConShow = 2;
        this.isImportDisabled = true;
      } else {
        this.meet.isImport = 0;
        this.meet.meetTypeCon = "";
        this.meetTypeConShow = 1;
        this.isImportDisabled = false;
      }

      if (index == -1) {
        this.getUser(4);
        this.meetingUserType = 4;
      } else {
        this.getUser(index + 1);
        this.meetingUserType = index + 1;
      }
    },
  },
  mounted() {
    console.log("mounted");
    this.meet.meetingType = "村务联席会议";
    this.$router.$avueRouter.setTitle("新增会议");
  },
  activated() {
    this.$router.$avueRouter.setTitle("新增会议");
    console.log("activated");
    if (this.$route.query.address !== undefined) {
      this.meet.address = this.$route.query.address;
      this.meet.jw = this.$route.query.latlng;
    }
    if (this.$route.query.name !== undefined) {
      if (this.$route.query.name.length === 1) {
        this.meet.meetPeople = this.$route.query.name[0];
      } else {
        this.meet.meetPeople = `${this.$route.query.name[0]}等,共${this.$route.query.name.length}人`;
      }

      this.meet.peoples = this.$route.query.id;
    }
  },
  methods: {
    onFailed(val) {
      console.log(val);
    },
    onRemoteConfirm(val) {
      console.log(val);
      this.meet.meetTimeCon = val.startTime;
      this.meet.meetContentCon = val.meetTitle;
      this.meet.meetTypeId = val.id;
    },
    inputChange(val) {
      // if (this.timer) {
      //   clearTimeout(this.timer);
      // }
      // this.timer = setTimeout(() => {
      //   getMeetingList(val).then((res) => {
      //     this.remoteColumns = res.data.data;
      //   });
      //   this.timer = null;
      // }, 1000);
    },

    getUser(type) {
      getUser(type).then((res) => {
        let result = res.data.data;
        this.meet.peoples = [];
        if (result.length === 1) {
          this.meet.meetPeople = result[0].name;
        } else {
          this.meet.meetPeople = `${result[0].name}等,共${result.length}人`;
        }
        result.forEach((el) => {
          this.meet.peoples.push(el.id);
        });
      });
    },
    meetWayOnConfirm(value) {
      this.meet.meetWay = value;
      this.meetWayShowPicker = false;
    },
    meetRemindOnConfirm(value, index) {
      var arr = ["0", "5", "15", "30", "60", "1440"];
      this.meet.meetRemindStr = value;
      this.meet.meetRemind = arr[index];
      this.meetRemindShowPicker = false;
    },
    clickPeople() {
      this.$router.push({
        path: "peopleList",
        query: { meetingUserType: this.meetingUserType },
      });
    },
    clickAddress() {
      this.$router.push({ path: "baiduMap" });
    },
    villMeetOnConfirm(value) {
      this.meet.villMeet = value;
      this.villMeetShowPicker = false;
    },
    orgMeetOnConfirm(value) {
      this.meet.meetTypeCon = value;
      this.orgMeetShowPicker = false;
    },
    endTimevalidator() {
      if (new Date(this.meet.startTime) >= new Date(this.meet.endTime)) {
        return false;
      }
      if (new Date(this.meet.startTime) < new Date(this.meet.endTime)) {
        return true;
      }
    },
    meetingTypeOnConfirm(value) {
      this.meet.meetingType = value;
      this.meetingTypeShowPicker = false;
    },
    meetTitleOnConfirm(value) {
      this.meet.meetTitle = value;
      this.meetTitleShowPicker = false;
    },
    startTimeonConfirm(value) {
      this.meet.startTime = new Date(value).format("yyyy-MM-dd hh:mm:ss");
      this.startTimeSowPicker = false;
    },
    conTimeonConfirm(value) {
      this.meet.meetTimeCon = new Date(value).format("yyyy-MM-dd hh:mm:ss");
      this.conTimeShowPicker = false;
    },
    endTimeonConfirm(value) {
      this.meet.endTime = new Date(value).format("yyyy-MM-dd hh:mm:ss");
      this.endTimeSowPicker = false;
    },
    onSubmit() {
      console.log("submit", this.meet);
      addMeeting(this.meet).then((res) => {
        Notify({ type: "success", message: "会议新增成功" });
        this.$router.push({ path: "meetingList" });
      });
    },
  },
};

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
</script>

<style scoped>
.vant-btn {
  margin-left: 15px;
  color: #0076f6;
  line-height: 20px;
  height: 20px;
}
.txt-size {
  font-size: 16px !important;
}
</style>
