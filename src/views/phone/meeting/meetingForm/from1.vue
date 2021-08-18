<template>
  <div>
  <van-form  @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="form.meetDate"
      label="会议日期"
      disabled
    />

    <van-field
      v-model="form.zcr"
      label="主持人"
      :disabled="form1Falg"
      :rules="[{ required: true, message: '请填写主持人' }]"
    />
    <van-field
      v-model="form.jlr"
      label="记录人"
      disabled
    />
    <van-field
      v-model="form.address"
      label="会议地点"
      disabled
    />
    <van-field
      v-model="form.ydNum"
      label="应到人数"
      disabled
    />
    <van-field
      v-model="form.sdNum"
      label="实到人数"
      disabled
    />
    <van-field
      type="textarea"
      v-model="form.joinStr"
      rows="2"
      autosize
      label="参加人员(签名)"
      disabled
    />
    <van-field
      type="textarea"
      v-model="form.reson"
      rows="2"
      autosize
      label="未到人员名单及原因"
      :disabled="form1Falg"
      :rules="[{ required: true, message: '未到人员名单及原因' }]"
    />
    <van-field
      type="textarea"
      v-model="form.content"
      rows="2"
      autosize
      label="研究内容"
      :disabled="form1Falg"
      :rules="[{ required: true, message: '研究内容' }]"
    />
    <van-field
      type="textarea"
      v-model="form.policy"
      rows="2"
      autosize
      :disabled="form1Falg"
      label="决策过程(逐个表态发言,书记末位表态)"
      :rules="[{ required: true, message: '决策过程(逐个表态发言,书记末位表态)' }]"
    />
    <van-field
      type="textarea"
      v-model="form.result"
      rows="2"
      autosize
      label="两委商量结果"
      :disabled="form1Falg"
      :rules="[{ required: true, message: '两委商量结果' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit"   v-if="!form1Falg">提交</van-button>
    </div>
  </van-form>
    <van-button round block  type="info" @click="cancel" v-if="form1Falg">返回</van-button>
  </div>
</template>

<script>
  import { saveForm1,getByMeetId } from "@/api/dailyOffice/partyMeeting";
  import { Notify } from "vant";
export default {
  data() {
    return {
      showCalendar: false,
      form: {
        meetId: "",
        meetDate: "",
        jlr: "",
        zcr: "",
        address: "",
        ydNum: "",
        sdNum: "",
        joinStr: "",
        reson: "",
        content: "",
        policy: "",
        result: "",
      },
    }
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
        cancel() {
          this.$emit('clickDownDialog', '村务');
        },

        onSubmit() {
          saveForm1(this.form).then(res => {
            if (res.data.success) {
              Notify({ type: "success", message: "新增成功" });
              this.form1Falg = true;
            }
          })

        }
      }


};
</script>

<style>
</style>
