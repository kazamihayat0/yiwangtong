<template>
  <div class="content">
    <van-cell-group>
      <van-cell
        title="会议类别"
        :value="statusName"
        :label="meetingForm.meetingType"
      />
      <van-cell
        title="会议起止时间"
        :label="`${meetingForm.startTime}-${meetingForm.endTime}`"
      />
      <van-cell title="会议标题" :label="meetingForm.meetTitle" />
      <van-cell
        title="参会人员"
        :label="peopleName"
        is-link
        center
        @click="setPeopleNameShow(joinPeople, '参会人员')"
      />
      <van-popup
        v-model="peopleNameShow"
        position="right"
        style="width: 60%; height: 100%"
      >
        <van-list>
          <p>{{ listName }}</p>
          <van-cell
            v-for="(item, index) in joinPeopleName"
            :key="item.name + index"
            :title="item.name"
          >
            <template #title>
              <div class="tab-div">
                <img
                  class="tab-img"
                  :src="item.tx"
                  width="33px"
                  height="33px"
                />
                <div class="tab-span">{{ item.name }}</div>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-popup>


      <van-cell title="会议地点" :label="meetingForm.address" />
      <van-cell title="会议提醒" :label="meetingForm.meetRemind" />
      <van-cell title="重大事项决议" :label="meetingForm.isImport" />

      <van-cell title="关联相关会议" :label="meetingForm.meetTypeCon" />
      <van-cell title="相关会议时间" :label="meetingForm.meetTimeCon" />
      <van-cell title="相关会议内容" :label="meetingForm.meetContentCon" />
      <van-cell title="相关会议讨论结果" :label="meetingForm.meetResultCon" />
      <van-cell
        title="签到情况"
        :label="`已签到${signNum}人`"
        is-link
        center
        @click="setPeopleNameShow(signPeople, '已签到人员')"
      />
      <van-popup v-model="cwhyjyShow" position="right"  style="width: 100%; height: 100%" >
         <form1 @clickDownDialog="clickDownDialog('村务')"  :form1Falg="form1.flag"  :id="form1.id" :createName="form1.jlr" :meetDate="form1.meetDate"  :address="form1.address" :ydNum="form1.ydNum" :sdNum="form1.sdNum" :joinStr="form1.joinStr" :reson="form1.reson"></form1>
      </van-popup>
      <van-popup v-model="qthyjyShow" position="right"  style="width: 100%; height: 100%" >
        <form2 @clickDownDialog="clickDownDialog"  :form1Falg="form2.flag"  :id="form2.id" :createName="form2.jlr" :meetDate="form2.meetDate"   :ydNum="form2.ydNum" :sdNum="form2.sdNum" :joinStr="form2.joinStr"></form2>
      </van-popup>
      <van-cell title="会议纪要上传"   is-link @click="sethyjyShow(false,'村务')"  v-if="meetingForm.meetingType=='村务联席会议'&&upFlag">
      </van-cell>
      <van-cell title="会议纪要查看"   is-link @click="sethyjyShow(true,'村务')"   v-if="meetingForm.meetingType=='村务联席会议'&&fjFalg">
      </van-cell>
      <van-cell title="会议纪要上传"   is-link @click="sethyjyShow(false,'其他')"  v-if="meetingForm.meetingType!='村务联席会议'&&upFlag">
      </van-cell>
      <van-cell title="会议纪要查看"   is-link @click="sethyjyShow(true,'其他')"   v-if="meetingForm.meetingType!='村务联席会议'&&fjFalg">
      </van-cell>
        <!--<template #label>-->
          <!--<van-uploader-->
            <!--:after-read="afterRead"-->
            <!--@delete="afterDelete"-->
            <!--@click-preview="clickPreview"-->
            <!--v-model="fileList"-->
            <!--multiple-->
            <!--:max-count="3"-->
          <!--/>-->
        <!--</template>-->

      <van-cell
        title="会议纪要确认情况"
        :label="`应确认${signNum}人，已确认${checkNum}人`"
        is-link
        center
        @click="setPeopleNameShow(checkPeople, '已确认人员')"
      />
    </van-cell-group>
    <!--<van-button type="info" block @click="back"> 返回 </van-button>-->
    <!--<van-button type="info" block @click="onSubmit" v-if="upFlag">-->
      <!--提交会议纪要-->
    <!--</van-button>-->
    <van-button type="info" block @click="onCheck" v-if="checkFlag">
      会议纪要确认
    </van-button>
  </div>
</template>

<script>
import { uploadFile } from "@/api/common/index";
import form1 from "./meetingForm/from1";
import form2 from "./meetingForm/from2";
import {
  editMeeting,
  meetingDetail,
  checkMeet,
} from "@/api/dailyOffice/partyMeeting";
import { Notify } from "vant";
import { judgeFileName } from "@/util/util";

export default {
  components:{
    form1,form2
  },
  data() {
    return {
      rows: {},
      joinPeopleName: [],
      fileList: [],
      statusName: "",
      listName: "",
      meetingForm: {
        id: "",
        jw: "",
        address: "",
        meetingType: "", //会议类别
        startTime: "", //会议起止时间
        endTime: "", //会议结束时间
        meetTitle: "", //会议标题
        peoples: [], //参会人员
        meetRemind: "", //会议提醒
        isImport: 0, //重点事项决议
        meetTypeCon: "", //关联相关会议
        meetTimeCon: "", //相关会议时间
        meetContentCon: "", //相关会议内容
        meetResultCon: "", //相关会议讨论结果
        fj: "",
        fjName: "",
        fj1: "",
        fj1Name: "",
        fj2: "",
        fj2Name: "",
      },
      signNum: 0,
      checkNum: 0,
      upFlag: false, //会议纪要上传
      fjFalg:false,//会议纪要是否可以查看,
      checkFlag: false, //会议纪要确认
      uploadType: false, //是否正在上传
      peopleNameShow: false, //显示人员名称
      cwhyjyShow:false,//村务会议纪要
      qthyjyShow:false,//其他会议纪要
      joinPeople: [], //参会人员
      signPeople: [], //签到人员
      checkPeople: [], //已确认人员
      form1:{
        id:"",
        jlr:"",
        meetDate:"",
        address:"",
        reson:"",
        ydNum:"",
        sdNum:"",
        joinStr:"",
        flag:false,
      },
      form2:{
        id:"",
        jlr:"",
        meetDate:"",
        ydNum:"",
        sdNum:"",
        joinStr:"",
        flag:false,
      }
    };
  },
  computed: {
    peopleName: function () {
      var str = "";
      console.log("this.joinPeopleName", this.joinPeopleName);
      this.joinPeople.forEach((el, index) => {
        if (index < 4) {
          str += el.name + "、";
        }
      });
      str += `等共${this.joinPeople.length}人`;
      return str;
    },
  },
  created() {
    // var rows = JSON.parse(this.$route.query.rows);
    // this.rows = rows;
   this.init();

  },
  mounted() {
    this.$router.$avueRouter.setTitle("会议详情");
  },
  methods: {
    init(){
      if (this.$route.query.id !== undefined) {
        let id = this.$route.query.id;
        meetingDetail(id).then((res) => {
          let row = res.data.data;
          this.meetingForm.id = row.id;
          this.meetingForm.jw = `${row.lat},${row.lng}`;
          this.meetingForm.address = row.address;
          this.meetingForm.meetingType = row.meetingType; //会议类别
          this.meetingForm.startTime = row.startTime; //会议起止时间
          this.meetingForm.endTime = row.endTime; //会议结束时间
          this.meetingForm.meetTitle = row.meetTitle; //会议标题
          this.meetingForm.peoples = row.peoples; //参会人员
          this.meetingForm.meetRemind = row.meetRemind; //会议提醒
          this.meetingForm.isImport = row.isImport; //重点事项决议
          this.meetingForm.meetTypeCon = row.meetTypeCon; //关联相关会议
          this.meetingForm.meetTimeCon = row.meetTimeCon; //相关会议时间
          this.meetingForm.meetContentCon = row.meetContentCon; //相关会议内容
          this.meetingForm.meetResultCon = row.meetResultCon; //相关会议讨论结果
          this.statusName = row.statusName;
          this.signNum = row.signNum;
          this.checkNum = row.checkNum;
          this.joinPeople = row.joinPeople; //参会人员
          this.signPeople = row.signPeople; //签到人员
          this.checkPeople = row.checkPeople; //已确认人员

          this.meetingForm.fjName = row.fjName;
          this.meetingForm.fj = row.fj;
          this.meetingForm.fj1Name = row.fjName;
          this.meetingForm.fj1 = row.fj1;
          this.meetingForm.fj2Name = row.fjName;
          this.meetingForm.fj2 = row.fj2;
          this.upFlag = row.upFlag;
          this.fjFalg=row.fj?true:false
          this.checkFlag = row.checkFlag;
          console.log(this.upFlag);
          console.log(row.upFlag);


          //form1
          this.form1.id=row.id;
          this.form1.jlr=row.createName;
          this.form1.meetDate=row.startTime+"-"+row.endTime;
          this.form1.address = row.address;
          this.form1.ydNum=row.countNum
          this.form1.sdNum=row.signNum




          let signPeople=row.signPeople;
          let peopleStr="";
          for(let i=0;i<signPeople.length;i++){
            peopleStr+=signPeople[i].name+","
          }
          if(peopleStr!=""){
            peopleStr=peopleStr.substring(0,peopleStr.length-1)
          }
          this.form1.joinStr=peopleStr
          let unSignPeople=row.unSignPeople;
          let resonStr="";
          for(let i=0;i<unSignPeople.length;i++){
            resonStr+=unSignPeople[i].name+","
          }
          if(peopleStr!=""){
            resonStr=resonStr.substring(0,resonStr.length-1)
          }
          this.form1.reson=resonStr;

          //form2
          this.form2.id=row.id;
          this.form2.jlr=row.createName;
          this.form2.meetDate=row.startTime+"-"+row.endTime;
          this.form2.ydNum=row.countNum
          this.form2.sdNum=row.signNum
          this.form2.joinStr=peopleStr

          if (this.meetingForm.fj !== null && this.meetingForm.fj !== "") {
            this.fileList.push({
              name: this.meetingForm.fjName || 111,
              url: this.meetingForm.fj,
            });
          }
          if (this.meetingForm.fj1 !== null && this.meetingForm.fj1 !== "") {
            this.fileList.push({
              name: this.meetingForm.fj1Name,
              url: this.meetingForm.fj1,
            });
          }
          if (this.meetingForm.fj2 !== null && this.meetingForm.fj2 !== "") {
            this.fileList.push({
              name: this.meetingForm.fj2Name,
              url: this.meetingForm.fj2,
            });
          }
        });
      }
    },
    sethyjyShow(flag,type){
      if(type=="村务") {
        this.cwhyjyShow = true;
        if(flag){
          this.form1.flag=flag;
        }
      }
      if(type=="其他") {
        this.qthyjyShow = true;
        if(flag){
          this.form2.flag=flag;
        }
      }
    },
    clickDownDialog(type){
      debugger
      if(type=="村务") {
        this.cwhyjyShow = false;
      }
      if(type=="其他") {
        this.qthyjyShow = false;
      }
      this.init();
    },
    setPeopleNameShow(list, name) {
      this.listName = name;
      this.joinPeopleName = list;
      this.peopleNameShow = true;
    },
    afterRead(file) {
      console.log(file);
      if (file instanceof Array) {
        file.forEach((el) => {
          this.uploadFile(el);
        });
      } else {
        this.uploadFile(file);
      }
    },
    uploadFile(file) {
      this.uploadType = true;
      file.status = "uploading";
      file.message = "上传中...";
      uploadFile(file.file).then((res) => {
        file.url = res.data.data.link;
        file.name = file.file.name;
        file.status = "";
        file.message = "";
        this.setFileUrl();
        this.uploadType = false;
      });
    },
    afterDelete(file) {
      console.log("afterDelete");
      this.setFileUrl();
    },
    clickPreview(file) {
      if (!judgeFileName(file.name)) {
        window.location.href = file.url;
      }
      console.log(file);
    },
    setFileUrl() {
      this.$nextTick(() => {
        let val = this.fileList;
        console.log(val);
        this.meetingForm.fj = "";
        this.meetingForm.fjName = "";
        this.meetingForm.fj1 = "";
        this.meetingForm.fj1Name = "";
        this.meetingForm.fj2 = "";
        this.meetingForm.fj2Name = "";
        val.forEach((el, index) => {
          console.log("index", index, el.url);
          if (index == 0) {
            this.meetingForm.fj = el.url;
            this.meetingForm.fjName = el.name;
          } else if (index == 1) {
            this.meetingForm.fj1 = el.url;
            this.meetingForm.fj1Name = el.name;
          } else if (index == 2) {
            console.log("index2", index);
            console.log(el.url);
            this.meetingForm.fj2 = el.url;
            this.meetingForm.fj2Name = el.name;
            console.log(this.meetingForm.fj2, this.meetingForm.fj2Name);
          }
        });
      });
    },
    onSubmit() {
      if (this.uploadType) {
        this.$message({
          message: "当前图片正在上传，请等待",
          type: "warning",
        });
      } else if (this.meetingForm.fj == "") {
        this.$message({
          message: "当前会议纪要为空，请上传。",
          type: "warning",
        });
      } else {
        editMeeting(this.meetingForm).then((res) => {
          this.$message({
            message: "会议纪要上传成功",
            type: "success",
          });
          this.$router.push({ path: "meetingList" });
        });
      }
    },
    onCheck() {
      checkMeet(this.meetingForm.id).then((res) => {
        this.$message({
          message: "确认成功",
          type: "success",
        });
        this.$router.push({ path: "meetingList" });
      });

    },
    back(){
      this.$router.push({ path: "meetingList" });
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  overflow-y: auto;
}
.tab-div {
  display: flex;
}
</style>
