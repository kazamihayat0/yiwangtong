<template>
  <basic-container>
    <el-form
      label-width="135px"
      :model="meetingForm"
      size="small"
      class="addmeet"  :rules="rules1"
      ref="meetingForm"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="会议类别" required>
            <el-select
              v-model="meetingForm.meetingType"
              clearable
              :disabled="disabledType"
            >
              <el-option label="村务联席会议" value="村务联席会议"></el-option>
              <el-option label="集中审账会议" value="集中审账会议"></el-option>
              <el-option label="村监会会议" value="村监会会议"></el-option>
              <el-option label="村民代表会议" value="村民代表会议"></el-option>
              <el-option label="网格会议" value="网格会议"></el-option>
              <el-option
                label="村党组织村务监督会议"
                value="村党组织村务监督会议"
              ></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="会议起止时间" prop="startTime">
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                v-model="meetingForm.startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 100%"
                :disabled="disabledType"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="12">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="meetingForm.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
                :disabled="disabledType"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="会议内容" prop="meetTitle">
        <el-select
          v-model="meetingForm.meetTitle"
          clearable
          :disabled="disabledType"
          style="width: 100%"
        >
          <el-option
            label="发展建设规划及年度计划"
            value="发展建设规划及年度计划"
          ></el-option>
          <el-option
            label="组织章程及村规民约制定和修订"
            value="组织章程及村规民约制定和修订"
          ></el-option>
          <el-option
            label="财务预决算及大额集体资金使用"
            value="财务预决算及大额集体资金使用"
          ></el-option>
          <el-option
            label="项目立项、招投标及筹资筹劳"
            value="项目立项、招投标及筹资筹劳"
          ></el-option>
          <el-option label="集体资产处置" value="集体资产处置"></el-option>
          <el-option
            label="扶持资金使用及村级收集分配"
            value="扶持资金使用及村级收集分配"
          ></el-option>
          <el-option
            label="安置房分配、土地征用、征收补充及失地养老保险政策等"
            value="安置房分配、土地征用、征收补充及失地养老保险政策等"
          ></el-option>
          <el-option
            label="村干部报酬、务工补贴及标准"
            value="村干部报酬、务工补贴及标准"
          ></el-option>
          <el-option label="其他重大事项" value="其他重大事项"></el-option>
        </el-select>
      </el-form-item>

      <el-row>
        <el-col span="12">
          <el-form-item label="参会人员" required>
            <el-select
              v-model="meetingForm.peoples"
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                v-for="item in meetingUserInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                disabled
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="会议地点" prop="address">
            <el-input
              v-model="meetingForm.address"
              :disabled="disabledType"
              suffix-icon="el-icon-location-outline"
              @focus="dialogVisible = true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="12">
          <el-form-item label="会议提醒" prop="meetRemind">
            <el-select
              clearable
              v-model="meetingForm.meetRemind"
              :disabled="disabledType"
            >
              <el-option label="开始时" value="0"></el-option>
              <el-option label="5分钟前" value="5"></el-option>
              <el-option label="15分钟前" value="15"></el-option>
              <el-option label="30分钟前" value="30"></el-option>
              <el-option label="1小时前" value="60"></el-option>
              <el-option label="1天前" value="1440"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <!-- <el-form-item label="提醒方式" required>
            <el-select clearable v-model="meetingForm.remindType">
              <el-option label="应用内" value="1"></el-option>
              <el-option label="短信" value="2"></el-option>
              <el-option label="电话" value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="重大事项决议" required>
            <el-radio
              v-model="meetingForm.isImport"
              :label="1"
              :disabled="disabledType"
            >是</el-radio
            >
            <el-radio
              v-model="meetingForm.isImport"
              :label="0"
              :disabled="disabledType"
            >否</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-show="meetingForm.isImport == 1">
        <el-col span="12">
          <el-form-item
            label="关联相关会议"
            :required="meetingForm.isImport == 1"
          >
            <el-select
              clearable
              v-show="meetTypeConShow"
              v-model="meetingForm.meetTypeCon"
              :disabled="disabledType"
            >
              <el-option label="村务联席会议" value="村务联席会议"></el-option>
              <el-option label="集中审账会议" value="集中审账会议"></el-option>
              <el-option label="村监会会议" value="村监会会议"></el-option>
              <el-option label="村民代表会议" value="村民代表会议"></el-option>
              <el-option label="网格会议" value="网格会议"></el-option>
              <el-option label="党员大会" value="党员大会"></el-option>
              <el-option
                label="党委会/支委会"
                value="党委会/支委会"
              ></el-option>
            </el-select>
            <el-select
              clearable
              v-show="!meetTypeConShow"
              v-model="meetingForm.meetTypeId"
              filterable
              remote
              :disabled="disabledType"
              :remote-method="remoteMethod"
              @change="meetTypeIdChange"
              placeholder="请输入关联会议关键词"
            >
              <el-option
                v-for="item in meetTypeIdOptions"
                :key="item.id"
                :label="item.meetTitle + '-' + item.startTime"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!--<span  v-show="!meetTypeConShow" @click="meetDetail"  style="color:#0076F6;font-size: 10px;text-decoration:underline;cursor: pointer;">会议详情</span>-->
          </el-form-item>


        </el-col>
        <el-col span="12">
          <el-form-item
            label="相关会议时间"
            prop="meetTimeCon"
          >
            <el-date-picker
              v-model="meetingForm.meetTimeCon"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="disabledType"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="meetingForm.isImport == 1">
        <el-col span="12">
          <el-form-item
            label="相关会议内容"
            prop="meetContentCon"
          >
            <el-input
              v-model="meetingForm.meetContentCon"
              :disabled="disabledType"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="相关会议讨论结果"
            prop="meetResultCon"
          >
            <el-select
              clearable
              v-model="meetingForm.meetResultCon"
              :disabled="disabledType"
            >
              <el-option label="同意" value="同意"></el-option>
              <el-option label="不同意" value="不同意"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="type === 1">
        <el-row>
          <el-col span="8">
            <el-form-item label="乡镇/街道-村社">
              <span>{{ areaName }}</span>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="签到人数">
              <span>{{ signNum }}</span>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="会议状态">
              <span>{{ statusName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="会议纪要">
              <!--<el-upload-->
              <!--:headers="token"-->
              <!--class="upload-demo"-->
              <!--action="/api/blade-resource/oss/endpoint/put-file"-->
              <!--:on-preview="handlePreview"-->
              <!--:on-remove="handleRemove"-->
              <!--:before-remove="beforeRemove"-->
              <!--:on-success="uploadSuccess"-->
              <!--multiple-->
              <!--:limit="3"-->
              <!--:on-exceed="handleExceed"-->
              <!--:file-list="fileList"-->
              <!--list-type="picture"-->
              <!--:disabled="!upFlag"-->
              <!--&gt;-->
              <!--<el-button size="small" type="primary" :disabled="!upFlag"-->
              <!--&gt;点击上传</el-button-->
              <!--&gt;-->
              <!--<div slot="tip" class="el-upload__tip"></div>-->
              <!--</el-upload>-->
              <!--<el-dialog :visible.sync="imgDialog" append-to-body="true">-->
              <!--<img width="100%" :src="dialogImageUrl" alt="" />-->
              <!--</el-dialog>-->
              <!--<el-button type="primary" @click="clickUpDialog(false,'村务')" v-if="meetingForm.meetingType=='村务联席会议'&&upFlag">点击上传</el-button>-->

              <!--<el-button type="primary" @click="clickUpDialog(true,'村务')"  v-if="meetingForm.meetingType=='村务联席会议'&&fjFalg">点击查看</el-button>-->

              <!--<el-button type="primary" @click="clickUpDialog(false,'其他')" v-if="meetingForm.meetingType!='村务联席会议'&&upFlag">点击上传</el-button>-->

              <!--<el-button type="primary" @click="clickUpDialog(true,'其他')"  v-if="meetingForm.meetingType!='村务联席会议'&&fjFalg">点击查看</el-button>-->
            </el-form-item>
          </el-col>
          <el-col span="16">
            <el-form-item label="会议纪要确认明细">
              <span>应确认{{ signNum }}人，已确认{{ checkNum }}人</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-form-item style="text-align: center" v-if="type === 0">
        <el-button @click="closeTag">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
      <el-form-item style="text-align: center" v-if="upFlag && type === 1">
        <el-button @click="closeTag">取消</el-button>
        <!--<el-button type="primary" @click="onUpload">上传会议纪要</el-button>-->
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      append-to-body="true"
    >
      <baidu-map @mapLatlng="mapLatlng"></baidu-map>
    </el-dialog>

    <el-dialog
      :visible.sync="look"
      width="60%"
      title="查看会议详情"
      append-to-body="true"

    >

    </el-dialog>

    <!--村务联席会议-->
    <el-dialog
      :visible.sync="hydialogVisible"
      width="60%"
      :title="form1.flag?'查看会议纪要':'上传会议纪要'"
      :close-on-click-modal="false"
      append-to-body="true"
      :show-close="false"
    >
      <form1  @clickDownDialog="clickDownDialog('村务')"  :form1Falg="form1.flag"  :id="form1.id" :createName="form1.jlr" :meetDate="form1.meetDate"  :address="form1.address" :ydNum="form1.ydNum" :sdNum="form1.sdNum" :joinStr="form1.joinStr" :reson="form1.reson"></form1>
    </el-dialog>

    <!--其他会议-->
    <el-dialog
      :visible.sync="qtdialogVisible"
      width="60%"
      :title="form2.flag?'查看会议纪要':'上传会议纪要'"
      :close-on-click-modal="false"
      append-to-body="true"
      :show-close="false"
    >
      <form2  @clickDownDialog="clickDownDialog"  :form1Falg="form2.flag"  :id="form2.id" :createName="form2.jlr" :meetDate="form2.meetDate"   :ydNum="form2.ydNum" :sdNum="form2.sdNum" :joinStr="form2.joinStr" ></form2>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {
    getUser,
    addMeeting,
    cancelMeeting,
    editMeeting,
    meetingDetail,
    checkMeet,
    getMeetingList,
  } from "@/api/dailyOffice/partyMeeting";
  import { judgeFileName } from "@/util/util";
  import baiduMap from "./baiduMap.vue";
  import form1  from "./meetingForm/form1.vue";
  import form2  from "./meetingForm/form2.vue";
  export default {
    components: { baiduMap ,form1,form2},
    data() {
      return {
        rules1:{
          startTime:[{ required: true, validator: this.validatestartTime, trigger: "change" },],
          meetTitle:[{ required: true, validator: this.validatemeetTitle, trigger: "change" },],
          address:[{ required: true, validator: this.validateaddress, trigger: "change" },],
          meetRemind:[{ required: true, validator: this.validatemeetRemind, trigger: "change" },],
          meetTimeCon:[{ required: true, validator: this.validatemeetTimeCon, trigger: "change" },],
          meetContentCon:[{ required: true, validator: this.validatemeetContentCon, trigger: "change" },],
          meetResultCon:[{ required: true, validator: this.validatemeetResultCon, trigger: "change" },],

        },
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
          meetTypeId: "", //关联相关会议2
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
        areaName: "",
        signNum: "",
        statusName: "",
        checkNum: "",
        meetTypeIdOptions: [],
        meetingUserInfo: [],
        dialogVisible: false,
        hydialogVisible:false,
        qtdialogVisible:false,
        look:false,
        meetTypeConShow: true, //显示哪种关联会议
        type: 0, //0代表是新增，1代表上传会议纪要
        disabledType: false,
        imgDialog: false,
        dialogImageUrl: "",
        token: {
          "Blade-Auth": "",
        },
        code: "",
        fileList: [],
        upFlag: false, //会议纪要是否可以上传
        fjFalg:false ,//会议纪要是否可以查看,
        form1:{
          id:"",
          jlr:"",
          meetDate:"",
          address:"",
          reson:"",
          ydNum:"",
          sdNum:"",
          joinStr:"",
          flag:false,//true:可以新增  false：不可以新增
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
    watch: {
      "meetingForm.meetingType": function (val) {
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
          this.meetingForm.isImport = 1;
          this.meetingForm.meetTypeCon = "党委会/支委会";
          this.meetTypeConShow = true;
        } else if (index == 0) {
          //会议类别等于村民代表会议
          this.meetingForm.isImport = 1;
          this.meetingForm.meetTypeCon = "";
          this.meetTypeConShow = false;
        } else {
          this.meetingForm.isImport = 0;
          this.meetingForm.meetTypeCon = "";
          this.meetTypeConShow = true;
        }
        if (index == -1) {
          this.getUser(4, this.code);
        } else {
          this.getUser(index + 1, this.code);
        }
      },
    },
    props:{
      theMeetId:String
    },
    mounted() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.token["Blade-Auth"] = `bearer ${str.content}`;
      // if (this.$route.query.id !== undefined) {
        this.init();
      // } else {
      //   this.meetingForm.meetingType = "村务联席会议"; //会议类别
      // }
    },

    methods: {
      meetDetail(){
        this.look=true;
      },
      validatestartTime(rule, value, callback){
        this.$nextTick(() => {
          if (this.meetingForm.startTime === "" || this.meetingForm.startTime == undefined) {
            callback(new Error("请输入会议起止时间"));
          } else if (this.meetingForm.endTime === "" || this.meetingForm.endTime == undefined){
            callback(new Error("请输入会议起止时间"));
          } else {
            callback();
          }
        });
      },
      validatemeetTitle(rule, value, callback){
        this.$nextTick(() => {
          if (this.meetingForm.meetTitle === "" || this.meetingForm.meetTitle == undefined) {
            callback(new Error("请输入会议内容"));
          } else {
            callback();
          }
        });
      },
      validateaddress(rule, value, callback){
        this.$nextTick(() => {
          if (this.meetingForm.address === "" || this.meetingForm.address == undefined) {
            callback(new Error("请输入会议地点"));
          } else {
            callback();
          }
        });
      },
      validatemeetRemind(rule, value, callback){
        this.$nextTick(() => {
          if (this.meetingForm.meetRemind === "" || this.meetingForm.meetRemind == undefined) {
            callback(new Error("请输入会议提醒"));
          } else {
            callback();
          }
        });
      },
      validatemeetTimeCon(rule, value, callback){
        this.$nextTick(() => {
          debugger
          if ((this.meetingForm.meetTimeCon === "" || this.meetingForm.meetTimeCon == undefined)&&this.meetingForm.isImport==1) {

            callback(new Error("请输入相关会议时间"));
          } else {
            callback();
          }
        });
      },
      validatemeetContentCon(rule, value, callback){
        this.$nextTick(() => {
          if ((this.meetingForm.meetContentCon === "" || this.meetingForm.meetContentCon == undefined)&&this.meetingForm.isImport==1) {
            callback(new Error("请输入相关会议内容"));
          } else {
            callback();
          }
        });
      },
      validatemeetResultCon(rule, value, callback){
        this.$nextTick(() => {
          if ((this.meetingForm.meetResultCon === "" || this.meetingForm.meetResultCon == undefined)&&this.meetingForm.isImport==1) {
            callback(new Error("请输入相关会议讨论结果"));
          } else {
            callback();
          }
        });
      },
      init(){
        let id =this.theMeetId
        this.type = 1;
        this.disabledType = true;
        meetingDetail(id).then((res) => {
          let row = res.data.data;
          this.code = row.code;
          console.log(row.code);
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
          this.meetingForm.meetTypeId = row.meetTypeId;

          this.meetingForm.fjName = row.fjName;
          this.meetingForm.fj = row.fj;
          this.meetingForm.fj1Name = row.fjName;
          this.meetingForm.fj1 = row.fj1;
          this.meetingForm.fj2Name = row.fjName;
          this.meetingForm.fj2 = row.fj2;
          this.areaName = row.areaName;
          this.signNum = row.signNum;
          this.statusName = row.statusName;
          this.checkNum = row.checkNum;
          this.upFlag = row.upFlag;
          this.fjFalg=row.fj?true:false

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

          console.log(this.meetingForm);
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
          if (
            this.meetingForm.meetTypeId != "" &&
            this.meetingForm.meetTypeId != null
          ) {
            meetingDetail(this.meetingForm.meetTypeId).then((res) => {
              this.meetTypeIdOptions = res.data.data;
            });
          }
        });
      },

      clickDownDialog(type){
        debugger
        if(type=="村务") {
          this.hydialogVisible = false;
        }
        if(type=="其他") {
          this.qtdialogVisible = false;
        }
        this.init();
      },
      meetTypeIdChange(val) {
        console.log(val);
        debugger
        if(this.meetingForm.meetTypeId===""){
          this.meetingForm.meetTimeCon=null;
        }else {
          for (let i = 0; i < this.meetTypeIdOptions.length; i++) {
            if (this.meetingForm.meetTypeId == this.meetTypeIdOptions[i].id) {
              debugger
              this.meetingForm.meetTimeCon = this.meetTypeIdOptions[i].startTime
              this.meetingForm.meetContentCon= this.meetTypeIdOptions[i].meetContentCon
            }
          }
          //   meetingDetail(val).then((res) => {
          //   this.meetTimeCon = ""; //相关会议时间
          //   this.meetContentCon = ""; //相关会议内容
          //   this.meetResultCon = ""; //相关会议讨论结果
          // });
        }
      },
      remoteMethod() {
        getMeetingList().then((res) => {
          this.meetTypeIdOptions = res.data.data;
        });
      },
      getUser(type, code) {
        getUser(type, code).then((res) => {
          this.meetingUserInfo = res.data.data;
          this.meetingForm.peoples = [];
          this.meetingUserInfo.forEach((el) => {
            this.meetingForm.peoples.push(el.id);
          });
        });
      },
      addMeeting() {
        console.log(this.meetingForm);
      },
      cancelMeeting() {
        cancelMeeting().then((res) => {});
      },
      clickUpDialog(flag,type){
        if(type=="村务") {
          this.hydialogVisible = true;
          if(flag){
            this.form1.flag=flag;
          }
        }
        if(type=="其他") {
          this.qtdialogVisible = true;
          if(flag){
            this.form2.flag=flag;
          }
        }
      },
      onSubmit() {
        this.$refs.meetingForm.validate((valid) => {
          console.log(valid);
          if (valid) {
            addMeeting(this.meetingForm).then((res) => {
              this.$message({
                message: "会议新增成功",
                type: "success",
              });
              this.closeTag();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //会议纪要上传提交
      onUpload() {
        editMeeting(this.meetingForm).then((res) => {
          this.$message({
            message: "会议纪要上传成功",
            type: "success",
          });
          this.closeTag();
        });
      },
      //文件上传成功
      uploadSuccess(response, file, fileList) {
        this.uploadFiles(fileList);
      },
      //移除上传成功文件
      handleRemove(file, fileList) {
        this.uploadFiles(fileList);
      },
      //点击已上传文件
      handlePreview(file) {
        console.log("file", file);

        if (file.response) {
          this.dialogImageUrl = file.response.data.link;
        } else {
          this.dialogImageUrl = file.url;
        }
        var ext = judgeFileName(this.dialogImageUrl);
        if (ext) {
          this.imgDialog = true;
        } else {
          window.location.href = this.dialogImageUrl;
        }
      },
      uploadFiles(fileList) {
        if (fileList[0] != undefined) {
          this.meetingForm.fj = fileList[0].response.data.link;
          this.meetingForm.fjName = fileList[0].name;
        }
        if (fileList[1] != undefined) {
          this.meetingForm.fj1 = fileList[1].response.data.lin;
          this.meetingForm.fj1Name = fileList[1].name;
        }
        if (fileList[2] != undefined) {
          this.meetingForm.fj2 = fileList[2].response.data.link;
          this.meetingForm.fj1Name = fileList[2].name;
        }
      },
      resetForm() {
        console.log(this.$refs);
        this.$refs.meetingForm.resetFields();
      },
      closeTag() {
        this.resetForm();
        this.$router.$avueRouter.closeTag();
        this.$router.push("/core/dailyOffice/meeting/index");
      },
      mapLatlng(val) {
        this.dialogVisible = false;
        if (val !== undefined) {
          this.meetingForm.address = val.address;
          this.meetingForm.jw = val.jw;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-col .line {
    text-align: center;
  }
  .addmeet .el-col {
    margin-bottom: 0px;
    .el-select {
      width: 100%;
    }
  }
</style>
