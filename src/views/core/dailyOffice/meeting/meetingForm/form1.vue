<template>
  <el-form ref="form" :model="form" label-width="140px" :rules="rules"   size="small">
    <el-row gutter="20" >
      <el-col span="12">
        <el-form-item label="会议日期"  >
          <el-input  v-model="form.meetDate" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="6" >
        <el-form-item label="主持人"  label-width="100px"  prop="zcr">
          <el-input v-model="form.zcr"  :disabled="form1Falg"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="记录人" label-width="100px">
          <el-input v-model="form.jlr" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row gutter="20">

      <el-col span="12">
        <el-form-item label="会议地点" >
          <el-input v-model="form.address" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="应到人数" label-width="100px">
          <el-input v-model="form.ydNum" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="实到人数" label-width="100px">
          <el-input v-model="form.sdNum" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="参加人员(签名)" >
      <el-input type="textarea" v-model="form.joinStr" disabled></el-input>
    </el-form-item>
    <el-form-item label="未到人员名单及原因" prop="reson">
      <el-input type="textarea" v-model="form.reson" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item label="研究内容" prop="content">
      <el-input type="textarea" v-model="form.content" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item label="决策过程(逐个表态发言,书记末位表态)" prop="policy">
      <el-input type="textarea" v-model="form.policy" :disabled="form1Falg"> </el-input>
    </el-form-item>
    <el-form-item label="两委商议结果" prop="result">
      <el-input type="textarea" v-model="form.result" :disabled="form1Falg"></el-input>
    </el-form-item>
    <el-form-item style="text-align: center;margin-left: -30px">
      <el-button type="primary" @click="onSubmit" v-if="!form1Falg">立即创建</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveForm1,getByMeetId } from "@/api/dailyOffice/partyMeeting";
// 村务联席会议
export default {
  data() {
    return {
      rules:{
        zcr:[{ required: true, validator: this.validatezcr, trigger: "change" },],
        reson:[{ required: true, validator: this.validatereson, trigger: "change" },],
        content:[{ required: true, validator: this.validatecontent, trigger: "change" },],
        result:[{ required: true, validator: this.validateresult, trigger: "change" },],
        policy:[{ required: true, validator: this.validatepolicy, trigger: "change" },],
      },
      form: {
        meetId:"",
        meetDate: "",
        jlr:"",
        zcr:"",
        address:"",
        ydNum: "",
        sdNum: "",
        joinStr:"",
        reson: "",
        content: "",
        policy: "",
        result: "",
      },
    };
  },
  props:{
    createName:String,
    meetDate:String,
    address:String,
    reson:String,
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
      this.form.address=this.address;
      this.form.joinStr=this.joinStr;
      this.form.sdNum=this.sdNum;
      this.form.ydNum=this.ydNum;
      this.form.reson=this.reson;

    }
  },
  methods: {
    validatezcr(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.zcr === "" || this.form.zcr == undefined) {
          callback(new Error("请输入主持人"));
        } else {
          callback();
        }
      });
    },
    validatereson(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.reson === "" || this.form.reson == undefined) {
          callback(new Error("请输入未到人员名单及原因"));
        } else {
          callback();
        }
      });
    },
    validatecontent(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.content === "" || this.form.content == undefined) {
          callback(new Error("请输入研究内容"));
        } else {
          callback();
        }
      });
    },
    validateresult(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.result === "" || this.form.result == undefined) {
          callback(new Error("请输入两委商议结果"));
        } else {
          callback();
        }
      });
    },
    validatepolicy(rule, value, callback){
      this.$nextTick(() => {
        if (this.form.policy === "" || this.form.policy == undefined) {
          callback(new Error("请输入决策过程"));
        } else {
          callback();
        }
      });
    },
    cancel(){
      this.$emit('clickDownDialog','村务');
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
