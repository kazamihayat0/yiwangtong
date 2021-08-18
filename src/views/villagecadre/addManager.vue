<template>
  <basic-container class="ele-info">
    <el-form class="r-stu" inline  :rules="rules" ref="user"   :model="user" label-width="140px"  size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名"   prop="realName" >
            <el-input v-model="user.realName"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"  >
          <el-form-item label="手机号码" prop="phone" >
            <el-input v-model="user.phone"   placeholder="请输入"></el-input>
            <br/> <span style="font-size: 12px">手机号码须与钉钉手机号码保持一致</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="乡镇-村社" prop="levelAreaCode" >
            <select-tree  style="width: 93%"  :vill="vill"   :options="options"  v-model="user.levelAreaCode"    @getAreaCode="getAreaCode"  :props="defaultProps" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="职务" prop="post">
            <el-input v-model="user.post"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="user.remark"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row >

    </el-form>
    <div>
      <div  class="r-w1">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary" >提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>

    </div>
  </basic-container>
</template>

<script>
  import { judgeFileName } from "@/util/util";
  import { mapGetters } from "vuex";
  import SelectTree from '@/views/villagecadre/SelectTree.vue';
  import {nation,isHealth,userStatus,peopeType,political,reportType,sexOption,labelData} from '@/util/dataTool';
  import {getPostList} from '@/api/system/post'
  import {eduList} from '@/api/system/edu'
  import {submitManager,updateManager} from "@/api/system/user";
  import { getAreaTree } from "@/api/common/index";
  import {getUser} from "@/api/system/user";
  export default {
    name: "addUserInfo",
    components: {
      SelectTree,
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data(){
      return {
        rules: {
          realName: [{required: true, validator: this.validateRealName, trigger: 'change'}],
          phone:[{required: true, validator: this.validatePhone, trigger: 'change'}],
          levelAreaCode:[{required: true, validator: this.validateLevelAreaCode, trigger: 'change'}],
        },
        options: [
        ],
        token: {
          "Blade-Auth": "",
        },
        // 数据默认字段
        defaultProps: {
          parent: 'parentCode',   // 父级唯一标识
          value: 'code',          // 唯一标识
          label: 'name',       // 标签显示
          children: 'children', // 子级
        },
        vill:false,
        user:{
          id:'',
          realName:'',
          phone:'',
          levelAreaCode:'',
          post:'',
          remark:'',
          level:'',
          cityCode:'',
          townCode:'',
          villageCode:'',
          gridCode:'',
        },
      }
    },
    mounted(){
      this.initData();
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.token["Blade-Auth"] = `bearer ${str.content}`;
    },
    methods:{
      validatePhone(rule, value, callback){
        this.$nextTick(() => {
          if (this.user.phone == "" || this.user.phone == undefined) {
            callback(new Error("请输入手机号码"));
          } else {
            callback();
          }
        })
      },
      validateLevelAreaCode(rule, value, callback){
        this.$nextTick(() => {
          if (this.user.levelAreaCode == "" || this.user.levelAreaCode == undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      validateRealName(rule, value, callback){
        this.$nextTick(() => {
          if (this.user.realName == "" || this.user.realName == undefined) {
            callback(new Error("请输入姓名"));
          } else {
            callback();
          }
        })
      },
      getAreaCode(areaCode,areaLevel,cityCode,streetCode,villageCode,gridCode){
        this.user.levelAreaCode=areaCode;
        this.user.level=areaLevel;
        this.user.cityCode=cityCode;
        this.user.townCode=streetCode;
        this.user.villageCode=villageCode;
        this.user.gridCode=gridCode;
      },
      handleBack(){
        this.$router.push({path: "/system/manager"});
        this.$router.$avueRouter.closeTag();
      },
      submit(){
        let that=this;
        this.$refs.user.validate(function (valid ) {
          if (valid) {
            if (that.$route.query.id) {
              updateManager(that.user).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.push({path: "/system/manager"});
                }
              });
            } else {
              submitManager(that.user).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.push({path: "/system/manager"});
                }
              });
            }
          }
        })
      },
      initData(){
        let that=this;
        getPostList().then(res=>{
          this.postData=res.data.data;
        })
        getAreaTree().then(res=>{
          this.options=res.data.data;
          this.user.levelAreaCode=this.$route.query.code
          this.user.level=this.$route.query.level
          if (that.$route.query.id){
            getUser(that.$route.query.id).then(res=>{
              that.user=res.data.data;
              let postStr=that.user.postId;
              if(postStr){
                let post=postStr.split(",");
                that.$set( that.user,"postIds",post)
                that.postChange(that.user.postIds)
                if(that.DZZSJ&&this.user.resumes.length>0){
                  this.user.resumes[0].startDate=this.user.postDate
                  this.user.resumes[0]["startDateFlag"]=true
                }
              }
              let peopleStr=that.user.peopleType;
              if(peopleStr){
                let people=peopleStr.split(";");
                that.$set( that.user,"peopleTypes",people)
              }

              this.$set(this.user,"levelAreaCode",res.data.data.levelAreaCode)
              let rewards=res.data.data.rewards;
              for(let i=0;i<rewards.length;i++){
                if(this.user.rewards[i].url==''){
                  this.rewards[i].refileList=[]
                }else{
                  let arr=this.user.rewards[i].url.split(',')
                  for(let k=0;k<arr.length;k++){
                    if(k==0){
                      this.user.rewards[i].refileList=[{url:arr[k]}]
                    }else{
                      this.user.rewards[i].refileList.push({url:arr[k]})
                    }
                  }
                }
              }
            })
          }else{
            this.user.status=0
          }
        })
        this.sexOption=sexOption;
        this.peopeTypeData=peopeType;
        this.userStatusData=userStatus;

        eduList().then(res=>{
          this.eduOptionData=res.data.data;
        })

        this.nationData=nation;
        this.isHealthData=isHealth;
        this.political=political;
        this.reportType=reportType;
        this.labelData=labelData;


      },



    }
  }
</script >
<style>
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
<style scoped>
  .r{
    position:fixed;
    height: 60px;
    bottom: 0;
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
  .r-w1{
    width: 230px;
    margin-left: 43%;
  }
  .r-stu{
    margin-bottom: 50px;
  }


</style>
