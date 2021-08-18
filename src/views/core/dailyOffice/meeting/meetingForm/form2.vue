<template>
  <!--村民会议记录-->
  <el-form ref="form" :model="form" :rules="rules" label-width="200px" size="small" label-position="top">
    <el-row gutter="20">
      <el-col span="8">
        <el-form-item label="会议日期" >
          <el-input v-model="form.meetDate" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="主持人" prop="zcr">
          <el-input v-model="form.zcr" :disabled="form1Falg"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="记录人">
          <el-input v-model="form.jlr" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row gutter="20">
      <el-col span="8">
        <el-form-item label="应到人数">
          <el-input v-model="form.ydNum" disabled></el-input>
        </el-form-item>
      </el-col>

      <el-col span="8">
        <el-form-item label="实到人数">
          <el-input v-model="form.sdNum" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="到会率">
          <el-input v-model="form.rate" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item  prop="content"
      label="一、提交会议表决事项概况(项目效益、经费来源、时间人员等)"
    >
      <el-input type="textarea" v-model="form.content" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item label="二、会议审议表决情况"  prop="policy">
      <el-input type="textarea" v-model="form.policy" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item label="三、村民（代表）会议补充意见" prop="result">
      <el-input type="textarea" v-model="form.result" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item label="四、参会表决同意的村民代表本人签字" prop="param1">
      <el-input type="textarea" v-model="form.param1" :disabled="form1Falg"></el-input>
    </el-form-item>

    <el-form-item style="text-align: center;margin-left: -30px">
      <el-button type="primary" @click="onSubmit" v-if="!form1Falg">立即创建</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { saveForm1,getByMeetId } from "@/api/dailyOffice/partyMeeting";
export default {
  data(){
    return {
      rules:{
        zcr:[{ required: true, validator: this.validatezcr, trigger: "change" },],
        content:[{ required: true, validator: this.validatecontent, trigger: "change" },],
        policy:[{ required: true, validator: this.validatepolicy, trigger: "change" },],
        result:[{ required: true, validator: this.validateresult, trigger: "change" },],
        param1:[{ required: true, validator: this.validateparam1, trigger: "change" },],
      },
      form: {
        meetId:"",
        meetDate: "",
        jlr:"",
        zcr:"",
        ydNum: "",
        sdNum: "",
        joinStr:"",
        content: "",
        policy: "",
        result: "",
        rate:"",
        param1:""
      },
    }
  },
  props:{
    createName:String,
    meetDate:String,
    sdNum:String,
    ydNum:String,
    joinStr:String,
    id:String,
    form1Falg:Boolean, //true：查看  false:新增
  },
  mounted() {
    this.form.meetId=this.id;
    if(this.form1Falg){
      getByMeetId(this.form.meetId).then(res=>{
        this.form=res.data.data;
      })
    }else{
      this.form.jlr=this.createName;
      this.form.meetDate=this.meetDate;
      this.form.joinStr=this.joinStr;
      this.form.sdNum=this.sdNum;
      this.form.ydNum=this.ydNum;

      this.form.rate=this.form.sdNum/this.form.ydNum;
    }
  },
  methods: {
    validateparam1(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.param1 === "" || this.form.param1 == undefined) {
          callback(new Error("请输入参会表决同意的村民代表本人签字"));
        } else {
          callback();
        }
      });
    },
    validateresult(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.result === "" || this.form.result == undefined) {
          callback(new Error("请输入村民（代表）会议补充意见"));
        } else {
          callback();
        }
      });
    },
    validatezcr(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.zcr === "" || this.form.zcr == undefined) {
          callback(new Error("请输入主持人"));
        } else {
          callback();
        }
      });
    },
    validatecontent(rule, value, callback){
      if (this.form.content === "" || this.form.content == undefined) {
        callback(new Error("请输入提交会议表决事项概况"));
      } else {
        callback();
      }
    },
    validatepolicy(rule, value, callback){
      if (this.form.policy === "" || this.form.policy == undefined) {
        callback(new Error("请输入会议审议表决情况"));
      } else {
        callback();
      }
    },
    cancel(){
      this.$emit('clickDownDialog','其他');
    },
    fromSave() {
      saveForm1()
        .then((res) => {})
        .catch((err) => {});
    },
    onSubmit(){
      let that=this;
      this.$refs.form.validate(function (valid) {
        if (valid) {
          saveForm1(that.form).then(res=>{
            if (res.data.success) {
              that.$message({
                type: "success",
                message: "新增成功!",
              });
              that.form1Falg=true;
            }
          })
        }
      })
    }
  },
};
</script>


<style>
</style>
