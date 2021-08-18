<template>
  <basic-container class="ele-info">
    <el-form class="r-stu" inline  :rules="rules" ref="UnqualifiedCadre"   :model="UnqualifiedCadre" label-width="80px"  size="small">
      <h4>基本信息</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名"   prop="userId" >
            <div class="el-oneRow">
              <el-select    filterable   v-model="UnqualifiedCadre.userId" placeholder="请选择" style="width: 93%">
                <el-option
                  v-for="item in nameList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <!--<a style="color: #0076F6; width: 100px;margin-left: 2px;font-size: 10px" @click="look">查看全部档案</a>-->
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生年月"   prop="birthday" >
            <el-date-picker
              v-model="UnqualifiedCadre.birthday"
              @change="computeAge"
              type="month"
              disabled
              style="width: 87%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入党时间"   prop="joinDate" >
            <el-date-picker
              v-model="UnqualifiedCadre.joinDate"
              @change="computeAge"
              type="month"
              disabled
              style="width: 87%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <el-col :span="8">
          <el-form-item label="现任职务" prop="postName">
            <el-input v-model="UnqualifiedCadre.postName" disabled    placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历" prop="eduName">
            <el-input v-model="UnqualifiedCadre.eduName" disabled   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任职时间"   prop="workDate">
            <el-date-picker disabled
              v-model="UnqualifiedCadre.workDate"
              type="month"
              style="width: 87%;"
              @change="computeWork"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" >
          <el-form-item label="乡镇-村社" prop="areaName" >
            <el-input v-model="UnqualifiedCadre.areaName"   disabled  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 40px;">
        <el-col :span="1" class="el-row-block">
        </el-col>
        <el-col :span="5" class="el-row-block">
          <div :class="select[0].square"  @click="sure">确定教育</div><div :class="select[0].triangle"></div>
        </el-col>
        <el-col :span="5" class="el-row-block">
          <div :class="select[1].square" @click="anno">宣布教育</div><div id="demo"  :class="select[1].triangle"></div>
        </el-col>
        <el-col :span="5" class="el-row-block">
          <div :class="select[2].square" @click="edUp">教育整改</div><div :class="select[2].triangle"></div>
        </el-col>
        <el-col :span="5" class="el-row-block">
          <div :class="select[3].square" @click="resu">整改结果</div><div :class="select[3].triangle"></div>
        </el-col>
      </el-row>
      <div v-show="select[0].show">
      <el-row>
        <el-col :span="8">
          <el-form-item label="基层党委讨论时间" label-width="135px" prop="discussDate" :required="required1">
            <el-date-picker
              v-model="UnqualifiedCadre.discussDate"
              type="date"
              style="width: 87%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="停职教育期限" label-width="120px" prop="suspeEdu" :required="required1">
            <el-input v-model="UnqualifiedCadre.suspeEdu" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="不合格原因" label-width="125px"  prop="reason" :required="required1">
            <el-input type="textarea" v-model="UnqualifiedCadre.reason" style="width: 610%" :rows="5"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
      <div v-show="select[1].show">
        <el-row>
          <el-col :span="6">
            <el-form-item label="宣布时间" label-width="80px"  prop="declareTime"  :required="required2" >
              <el-date-picker
                v-model="UnqualifiedCadre.declareTime"
                type="date"
                style="width: 68%;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="谈话人" prop="talkName" label-width="70px"   :required="required2" >
              <el-input v-model="UnqualifiedCadre.talkName"   style="width: 78%;"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="谈话时间" label-width="80px" prop="talkTime"   :required="required2">
              <el-date-picker
                v-model="UnqualifiedCadre.talkTime"
                type="date"
                style="width: 68%;"
                @change="computeWork"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="一对一帮教导师" label-width="80px"  prop="tutor"   :required="required2" >
              <el-input v-model="UnqualifiedCadre.tutor"  style="width:77%;"   placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="80px"  label="组织谈话教育情况" prop="orgEdu"   :required="required2" >
              <el-input type="textarea" v-model="UnqualifiedCadre.orgEdu" style="width: 680%" :rows="5"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-show="select[2].show">
        <el-row>
          <el-col :span="8">
            <el-form-item label="教育开始时间" label-width="110px"  prop="startEdu"   :required="required3">
              <el-date-picker
                v-model="UnqualifiedCadre.startEdu"
                type="date"
                style="width: 87%;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="教育结束时间" label-width="110px"  prop="endEdu"  :required="required3">
              <el-date-picker
                v-model="UnqualifiedCadre.endEdu"
                type="date"
                style="width: 87%;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="110px" label="实践表现" prop="practicePerf" :required="required3" >
              <el-input type="textarea" v-model="UnqualifiedCadre.practicePerf" style="width: 600%" :rows="5"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-show="select[3].show">
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="110px" label="基层党委意见" prop="grassrootsComm" :required="required4" >
              <el-input type="textarea" v-model="UnqualifiedCadre.grassrootsComm" style="width: 635%" :rows="5"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="党委书记签名" label-width="110px"  prop="signature"  :required="required4" >
              <el-input v-model="UnqualifiedCadre.signature" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="签名时间" label-width="110px"  prop="signatureTime"  :required="required4" >
              <el-date-picker
                v-model="UnqualifiedCadre.signatureTime"
                type="date"
                style="width: 87%;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="停职教育结果" label-width="110px"  prop="status" :required="required4"  >
              <el-select  @change="statusChange"   v-model="UnqualifiedCadre.status" placeholder="请选择"  style="width: 93%">
                <el-option
                  v-for="item in statusOptionData"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="免职后职务" label-width="110px"  prop="postRemoval"  :required="required4" >
              <el-input v-model="UnqualifiedCadre.postRemoval" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" v-if="mzReasonShow">
            <el-form-item  label="免职原因" label-width="110px"  prop="removalReason" :required="required4"  >
              <el-select   @change="eventTypeChange"    v-model="UnqualifiedCadre.removalReason" placeholder="请选择"  style="width: 93%">
                <el-option
                  v-for="item in reasonOptionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="mzReasonShow&&etyReasonShow">
            <el-form-item label="事件类型"  label-width="110px"  prop="eventType"  :required="required4" >
              <el-select     v-model="UnqualifiedCadre.eventType" placeholder="请选择"  style="width: 93%">
                <el-option
                  v-for="item in eventOptionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row v-if="mzReasonShow&&etyReasonShow">
          <el-col :span="8">
            <el-form-item label="事件发生时间" label-width="110px"  prop="incidentTime"  :required="required4"  >
              <el-date-picker
                v-model="UnqualifiedCadre.incidentTime"
                type="date"
                style="width: 87%;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="事件描述" label-width="110px"  prop="eventDesc"  :required="required4" >
              <el-input v-model="UnqualifiedCadre.eventDesc" style="width: 345%"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>


        </el-row>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button style="width: 100px" @click="submit" size="medium" type="primary" v-if="!leaveFlag">提交</el-button>
      <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
    </div>
  </basic-container>
</template>

<script>
  import {save,update,detail} from '@/api/dailyOffice/unqualifiedcadre'
  import {nameList} from '@/api/system/user'
  export default {

    data(){
      return {
        rules: {
          userId: [{required: true, validator: this.validateUserId, trigger: 'change'}],
          discussDate: [{required: this.required1, validator: this.validatediscussDate, trigger: 'change'}],
          suspeEdu: [{required: this.required1, validator: this.validatesuspeEdu, trigger: 'change'}],
          reason: [{required: this.required1, validator: this.validatereason, trigger: 'change'}],
          declareTime: [{required: this.required2, validator: this.validatedeclareTime, trigger: 'change'}],
          talkName: [{required: this.required2, validator: this.validatetalkName, trigger: 'change'}],
          talkTime: [{required: this.required2, validator: this.validatetalkTime, trigger: 'change'}],
          tutor: [{required: this.required2, validator: this.validatetutor, trigger: 'change'}],
          orgEdu: [{required: this.required2, validator: this.validateorgEdu, trigger: 'change'}],
          startEdu: [{required: this.required3, validator: this.validatestartEdu, trigger: 'change'}],
          endEdu: [{required: this.required3, validator: this.validateendEdu, trigger: 'change'}],
          practicePerf: [{required: this.required3, validator: this.validatepracticePerf, trigger: 'change'}],
          grassrootsComm: [{required: this.required4, validator: this.validategrassrootsComm, trigger: 'change'}],
          signature: [{required: this.required4, validator: this.validatesignature, trigger: 'change'}],
          signatureTime: [{required: this.required4, validator: this.validatesignatureTime, trigger: 'change'}],
          status: [{required: this.required4, validator: this.validatestatus, trigger: 'change'}],
          postRemoval: [{required: this.required4, validator: this.validatepostRemoval, trigger: 'change'}],
          removalReason: [{required: this.required4, validator: this.validateremovalReason, trigger: 'change'}],
          eventType: [{required: this.required4, validator: this.validatereventType, trigger: 'change'}],
          incidentTime: [{required: this.required4, validator: this.validaterincidentTime, trigger: 'change'}],
          eventDesc: [{required: this.required4, validator: this.validatereventDesc, trigger: 'change'}],
        },

        select:
          [{ square:'el-square el-choose el-unchoose',triangle:'el-triangle-choose',show:true},
          { square:'el-square el-unchoose',triangle:'el-triangle',show:false},
          { square:'el-square el-unchoose',triangle:'el-triangle' ,show:false},
          { square:'el-square  el-unchoose',triangle:'el-triangle',show:false },
           ],
        UnqualifiedCadre:{
          userId:'',
          birthday:'',
          joinDate:'',
          postName:'',
          eduName:'',
          workDate:'',
          areaName:'',
          discussDate:'',
          suspeEdu:'',
          reason:'',
          declareTime:'',
          talkTime:'',
          talkName:'',
          tutor:'',
          orgEdu:'',
          startEdu:'',
          endEdu:'',
          practicePerf:'',
          grassrootsComm:'',
          signature:'',
          signatureTime:'',
          removalReason:'',
          eventType:'',
          postRemoval:'',
          incidentTime:'',
          eventDesc:'',
          level:0,
        },
        postData:[],
        reasonOptionData:[
          {label:"个人原因请辞" ,value:"个人原因请辞"},
          {label:"不能不宜情形" ,value:"不能不宜情形"},
          {label:"不胜任不称职" ,value:"不胜任不称职"},
          {label:"过世" ,value:"过世"},
        ],
        eventOptionData:[
          {label:"违纪情形（纪委）" ,value:"违纪情形（纪委）"},
          {label:"信访记录（纪委）" ,value:"信访记录（纪委）"},
          {label:"违纪情形（组织部）" ,value:"违纪情形（组织部）"},
          {label:"信访记录（信访局）" ,value:"信访记录（信访局）"},
          {label:"违法记录" ,value:"违法记录"},
          {label:"执行人记录" ,value:"执行人记录"},
        ],
        nameList:[],
        statusOptionData:[
          {label:"合格" ,value:"合格"},
          {label:"免职" ,value:"免职"},
        ],
        mzReasonShow:false,
        etyReasonShow:false,
        one:true,
        two:false,
        three:false,
        four:false
      }
    },
    mounted(){
      let that=this;
      nameList().then(res=>{
        this.nameList=res.data.data;
        if (this.$route.query.id) {
          detail(this.$route.query.id).then(res => {
            that.UnqualifiedCadre=res.data.data;
            if(that.UnqualifiedCadre.level==0){
              that.sure()
            }
            if(that.UnqualifiedCadre.level==1){
              that.anno()
            }
            if(that.UnqualifiedCadre.level==2){
              that.edUp()
            }
            if(that.UnqualifiedCadre.level==3){
              that.resu()
            }
            that.change();
          })
        }
        if (this.$route.query.userId){
          this.UnqualifiedCadre.userId=this.$route.query.userId;
          this.change();
        }

      })
    },
    computed: {
      required1:function () {
        if(this.one||this.UnqualifiedCadre.discussDate||this.UnqualifiedCadre.suspeEdu||this.UnqualifiedCadre.reason){
          this.$set(this,"two",false)
          this.$set(this,"three",false)
          this.$set(this,"four",false)
          return true;
        }else{
          return false;
        }
      },
      required2:function () {
        if(this.two||this.UnqualifiedCadre.declareTime||this.UnqualifiedCadre.talkName||this.UnqualifiedCadre.talkTime||this.UnqualifiedCadre.tutor||this.UnqualifiedCadre.orgEdu){
          this.$set(this,"one",false)
          this.$set(this,"three",false)
          this.$set(this,"four",false)
          return true;
        }else{
          return false;
        }
      },
      required3:function () {
        if(this.three||this.UnqualifiedCadre.startEdu||this.UnqualifiedCadre.endEdu||this.UnqualifiedCadre.practicePerf){
          this.$set(this,"one",false)
          this.$set(this,"two",false)
          this.$set(this,"four",false)
          return true;

        }else{
          return false;
        }
      },
      required4:function () {
        if(this.four||this.UnqualifiedCadre.grassrootsComm||this.UnqualifiedCadre.signature||this.UnqualifiedCadre.signatureTime||this.UnqualifiedCadre.status||this.UnqualifiedCadre.postRemoval){
          this.$set(this,"one",false)
          this.$set(this,"two",false)
          this.$set(this,"three",false)
          return true;
        }else{
          return false;
        }
      },
    },
    methods:{
      eventTypeChange(value){
        if(value=="不能不宜情形"){
          this.etyReasonShow=true;
        }else{
          this.etyReasonShow=false;
        }
      },
      statusChange(value){
        console.log(value)
        if(value=="免职"){
          this.mzReasonShow=true
        }
        if(value=="合格"){
          this.mzReasonShow=false
        }
      },
      look(){
       this.$router.push({path: "/village/user",query:{id:this.UnqualifiedCadre.userId}});
      },
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/cdreManagement/unqualifiedCadre"});
      },
      submit(){
        if(this.required1){
          this.UnqualifiedCadre.level=0
        }
        if(this.required2){
          this.UnqualifiedCadre.level=1
        }
        if(this.required3){
          this.UnqualifiedCadre.level=2
        }
        if(this.required4){
          this.UnqualifiedCadre.level=3
        }
        let that=this;
        this.$refs.UnqualifiedCadre.validate(function (valid ) {
          if (valid) {
            delete that.UnqualifiedCadre.joinDate
            if (that.$route.query.id) {
              update(that.UnqualifiedCadre).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/cdreManagement/unqualifiedCadre"});
                }
              });
            } else {

              save(that.UnqualifiedCadre).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/cdreManagement/unqualifiedCadre"});
                }
              });
            }
          }
        })
      },
      sure(){
        this.select.forEach(_=>{
          _.show=false;
          _.square="el-square el-unchoose";
          _.triangle="el-triangle";
        })
        this.select[0].show=true;
        this.select[0].square="el-square el-choose el-unchoose";
        this.select[0].triangle="el-triangle-choose";
        this.UnqualifiedCadre.level=0
        this.$set(this,"one",true)
      },
      anno(){
        debugger
        this.select.forEach(_=>{
          _.show=false;
          _.square="el-square el-unchoose";
          _.triangle="el-triangle";
        })
        this.select[1].show=true;
        this.select[1].square="el-square el-choose el-unchoose";
        this.select[1].triangle="el-triangle-choose";
        this.UnqualifiedCadre.level=1
        this.$set(this,"two",true)
      },
      edUp(){
        this.select.forEach(_=>{
          _.show=false;
          _.square="el-square el-unchoose";
          _.triangle="el-triangle";
        })
        this.select[2].show=true;
        this.select[2].square="el-square el-choose el-unchoose";
        this.select[2].triangle="el-triangle-choose";
        this.UnqualifiedCadre.level=2;
        this.$set(this,"three",true)
      },
      resu(){
        this.select.forEach(_=>{
          _.show=false;
          _.square="el-square el-unchoose";
          _.triangle="el-triangle";
        })
        this.select[3].show=true;
        this.select[3].square="el-square el-choose el-unchoose";
        this.select[3].triangle="el-triangle-choose";
        this.UnqualifiedCadre.level=3
        this.$set(this,"four",true)
      },
      validatereventDesc(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.eventDesc === "" || this.UnqualifiedCadre.eventDesc === undefined)){
            callback(new Error("请输入事件描述"));
          } else {
            callback();
          }
        })
      },
      validaterincidentTime(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.incidentTime === "" || this.UnqualifiedCadre.incidentTime === undefined)) {
            callback(new Error("请输入事件发生时间"));
          } else {
            callback();
          }
        })
      },
      validatereventType(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.eventType === "" || this.UnqualifiedCadre.eventType === undefined)) {
            callback(new Error("请输入事件类型"));
          } else {
            callback();
          }
        })
      },
      validateremovalReason(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.removalReason === "" || this.UnqualifiedCadre.removalReason === undefined)) {
            callback(new Error("请输入免职原因"));
          } else {
            callback();
          }
        })
      },
      validatepostRemoval(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.status === "" || this.UnqualifiedCadre.status === undefined)) {
            callback(new Error("请输入免职后职务"));
          } else {
            callback();
          }
        })
      },
      validatestatus(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.status === "" || this.UnqualifiedCadre.status === undefined)) {
            callback(new Error("请输入停职教育结果"));
          } else {
            callback();
          }
        })
      },
      validatesignatureTime(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.signatureTime === "" || this.UnqualifiedCadre.signatureTime === undefined)) {
            callback(new Error("请输入签名时间"));
          } else {
            callback();
          }
        })
      },
      validatesignature(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.signature === "" || this.UnqualifiedCadre.signature === undefined)) {
            callback(new Error("请输入党委书记签名"));
          } else {
            callback();
          }
        })
      },
      validategrassrootsComm(rule, value, callback){
        this.$nextTick(() => {
          if (this.required4&&(this.UnqualifiedCadre.grassrootsComm === "" || this.UnqualifiedCadre.grassrootsComm === undefined)) {
            callback(new Error("请输入基层党委意见"));
          } else {
            callback();
          }
        })
      },
      validatepracticePerf(rule, value, callback){
        this.$nextTick(() => {
          if (this.required3&&(this.UnqualifiedCadre.practicePerf === "" || this.UnqualifiedCadre.practicePerf === undefined)) {
            callback(new Error("请输入实践表现"));
          } else {
            callback();
          }
        })
      },
      validateendEdu(rule, value, callback){
        this.$nextTick(() => {
          if (this.required3&&(this.UnqualifiedCadre.endEdu === "" || this.UnqualifiedCadre.endEdu === undefined)) {
            callback(new Error("请输入教育结束时间"));
          } else {
            callback();
          }
        })
      },
      validatestartEdu(rule, value, callback){
        this.$nextTick(() => {
          if (this.required3&&(this.UnqualifiedCadre.startEdu === "" || this.UnqualifiedCadre.startEdu === undefined)) {
            callback(new Error("请输入教育开始时间"));
          } else {
            callback();
          }
        })
      },
      validateorgEdu(rule, value, callback){
        this.$nextTick(() => {
          if (this.required2&&(this.UnqualifiedCadre.orgEdu === "" || this.UnqualifiedCadre.orgEdu === undefined)) {
            callback(new Error("请输入组织谈话教育情况"));
          } else {
            callback();
          }
        })
      },
      validatetutor(rule, value, callback){
        this.$nextTick(() => {
          if (this.required2&&(this.UnqualifiedCadre.tutor === "" || this.UnqualifiedCadre.tutor === undefined)) {
            callback(new Error("请输入一对一帮教导师"));
          } else {
            callback();
          }
        })
      },
      validatetalkTime(rule, value, callback){
        this.$nextTick(() => {
          if (this.required2&&(this.UnqualifiedCadre.talkTime === "" || this.UnqualifiedCadre.talkTime === undefined)) {
            callback(new Error("请输入谈话时间"));
          } else {
            callback();
          }
        })
      },
      validatetalkName(rule, value, callback){
        this.$nextTick(() => {
          if (this.required2&&(this.UnqualifiedCadre.talkName === "" || this.UnqualifiedCadre.talkName === undefined)) {
            callback(new Error("请输入谈话人"));
          } else {
            callback();
          }
        })
      },
      validatedeclareTime(rule, value, callback){
        this.$nextTick(() => {
          if (this.required2&&(this.UnqualifiedCadre.declareTime === "" || this.UnqualifiedCadre.declareTime === undefined)) {
            callback(new Error("请输入宣布时间"));
          } else {
            callback();
          }
        })
      },
      validatereason(rule, value, callback){
        this.$nextTick(() => {
          if (this.required1&&(this.UnqualifiedCadre.reason === "" || this.UnqualifiedCadre.reason === undefined)) {
            callback(new Error("请输入不合格原因"));
          } else {
            callback();
          }
        })
      },
      validatesuspeEdu(rule, value, callback){
        this.$nextTick(() => {
          if (this.required1&&(this.UnqualifiedCadre.suspeEdu === "" || this.UnqualifiedCadre.suspeEdu === undefined)) {
            callback(new Error("请输入停职教育期限"));
          } else {
            callback();
          }
        })
      },
      validatediscussDate(rule, value, callback){
        this.$nextTick(() => {
          debugger
          if (this.required1&&(this.UnqualifiedCadre.discussDate === "" || this.UnqualifiedCadre.discussDate === undefined)) {
            callback(new Error("请输入基层党委讨论时间"));
          } else {
            callback();
          }
        })
      },
      change(){
        this.nameList.forEach(_=>{
          if(_.id==this.UnqualifiedCadre.userId){
            this.UnqualifiedCadre.birthday=_.birthday;
            this.UnqualifiedCadre.joinDate=_.joinDate;
            this.UnqualifiedCadre.postName=_.postName;
            this.UnqualifiedCadre.eduName=_.eduName
            this.UnqualifiedCadre.workDate=_.workDate
            this.UnqualifiedCadre.areaName=_.areaName
          }
        })
      },
      validateUserId(rule, value, callback){
        this.$nextTick(() => {
          if (this.UnqualifiedCadre.userId === "" || this.UnqualifiedCadre.userId === undefined) {
            callback(new Error("请输入姓名"));
          } else {
            this.change()
            callback();
          }
        })
      },
    }
  }
</script>

<style scoped >
  .el-form--inline .el-form-item__content{
    width: 200px!important;
  }
  .el-row-block{
    display: flex;
  }
  .el-unchoose{
    color: #0076F6;
    border-color: #0076F6;
    border-width: 1px;
    border-style: solid;
  }
  .el-choose{
    background-color: #0076F6;
    color: #fff;
  }
  .el-square{
     width: 200px;
     height:40px ;
     text-align: center;
     line-height: 40px;
     font-size: 12px;
  }
  .el-triangle-choose{
    width: 0;
    height: 0;
    border: 21px solid;
    border-color:  transparent transparent transparent #0076F6;
    position: relative;
  }

  .el-triangle{
    width: 0;
    height: 0;
    border: 21px solid;
    border-color:  transparent transparent transparent #0076F6;
    position: relative;
   }
  .el-triangle::after{
    content: '';
    position: absolute;
    top: -21px;
    left: -22px;
    border: 21px solid;
    border-color:  transparent transparent transparent #fff;
  }
  .el-oneRow{
    display: flex;
  }
  .r{
    position:fixed;
    height: 60px;
    bottom: 20px;
    width: 82%;
    background-color: #FFFFFF;
    z-index: 9999;
  }
  .r-w{
    position:fixed;
    bottom:0;
    left:50%;
    width: 230px;
    padding-bottom: 10px;
  }
  .r-stu{
    margin-bottom: 50px;
  }

</style>
