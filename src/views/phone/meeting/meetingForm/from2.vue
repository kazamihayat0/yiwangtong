<template>
  <div>
  <van-form @failed="onFailed" @submit="onSubmit">
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
      v-model="form.rate"
      label="到会率"
      disabled
    />
    <van-field
      type="textarea"
      v-model="form.content"
      rows="2"
      autosize
      :disabled="form1Falg"
      label="一、提高会议表决事项概况(项目效益、经费来源、时间人员等)"
      :rules="[{ required: true, message: '请填写参加人员' }]"
    />
    <van-field
      type="textarea"
      v-model="form.policy"
      rows="2"
      autosize
      :disabled="form1Falg"
      label="二、会议审议表决情况"
      :rules="[{ required: true, message: '会议审议表决情况' }]"
    />
    <van-field
      type="textarea"
      v-model="form.result"
      rows="2"
      autosize
      :disabled="form1Falg"
      label="三、村民（代表）会议补充意见"
      :rules="[{ required: true, message: '村民（代表）会议补充意见' }]"
    />
    <van-field
      type="textarea"
      v-model="form.param1"
      rows="2"
      autosize
      :disabled="form1Falg"
      label="四、参会表决同意的村民代表本人签字"
      :rules="[{ required: true, message: '参会表决同意的村民代表本人签字' }]"
    />

    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" v-if="!form1Falg">提交</van-button>
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
    };
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
    cancel() {
      this.$emit('clickDownDialog', '其他');
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
