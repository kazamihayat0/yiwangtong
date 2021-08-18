<template>
  <basic-container class="ele-info">
    <el-form class="r-stu" inline  :rules="rules" ref="FivePlan"   :model="FivePlan" label-width="100px"   size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="规划年度"    prop="startYear" >
            <el-date-picker   :disabled="flag"
              v-model="FivePlan.startYear"
              type="year"
              style="width: 42%"
              placeholder="选择年">
            </el-date-picker>
            -
            <el-date-picker
              v-model="FivePlan.endYear"
              type="year" :disabled="flag"
              style="width: 42%"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否完成"   prop="isFinish" >
              <el-select    filterable  :disabled="flag"  v-model="FivePlan.isFinish" placeholder="请选择" >
                <el-option
                  v-for="item in isFinish"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

          </el-form-item>
        </el-col>

      </el-row>
      <h4>集体经济</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="集体经济收入（万元）"  label-width="210px"  prop="collEconIncome" >
            <el-input-number :disabled="flag" v-model="FivePlan.collEconIncome" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营性收入（万元）"  label-width="210px"  prop="operatingIncome" >
            <el-input-number :disabled="flag" v-model="FivePlan.operatingIncome" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="村级债务（万元）"  label-width="210px"  prop="villageDebt" >
            <el-input-number :disabled="flag" v-model="FivePlan.villageDebt" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="务工支出（万元）"  label-width="210px"  prop="laborExpenditure" >
            <el-input-number  :disabled="flag" v-model="FivePlan.laborExpenditure" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <h4>村民福利</h4>
      <el-row>
        <el-col :span="12">
          <el-form-item label="农民人均可支配收入（万元）"  label-width="210px"  prop="perIncome" >
            <el-input-number :disabled="flag" v-model="FivePlan.perIncome" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实现村民福利达到"  label-width="210px"  prop="villWelfare" >
            <el-input :disabled="flag"  v-model="FivePlan.villWelfare" style="width: 200%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <h4>民风村务</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发展年轻党员数（名）"  label-width="210px"  prop="youngPartyMembers" >
            <el-input-number  :disabled="flag" v-model="FivePlan.youngPartyMembers" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="争创荣誉等级"  label-width="210px"  prop="honorLevel" >
            <el-select filterable :disabled="flag" v-model="FivePlan.honorLevel" placeholder="请选择" style="width: 92%">
              <el-option
                v-for="item in villList"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="争创荣誉次数"  label-width="210px"  prop="honorsStriving" >
            <el-input-number  :disabled="flag" v-model="FivePlan.honorsStriving" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="“十支队”组织数（支）"  label-width="210px"  prop="teamNum" >
            <el-input-number  :disabled="flag"  v-model="FivePlan.teamNum" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="“十支队”队员数（支）"  label-width="210px"  prop="peopleNum" >
            <el-input-number  :disabled="flag"  v-model="FivePlan.peopleNum" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产业试点项目数（个）"  label-width="210px"  prop="projectsNum" >
            <el-input-number  :disabled="flag"  v-model="FivePlan.projectsNum" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>工作计划</h4>
      <el-row>
        <el-col :span="8">项目</el-col>
        <el-col :span="6">计划完成时间</el-col>
        <el-col :span="6">是否完成</el-col>
        <el-col :span="4">责任人</el-col>
      </el-row>
      <el-row v-for="(item,index) in FivePlan.mxList">
        <el-col :span="8">
          <el-form-item label=""  >
            <el-input :disabled="flag" v-model="item.projectName" style="width: 200%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=""  >
            <el-date-picker
            v-model="item.planTime"
            type="month" :disabled="flag"
            placeholder="选择年">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=""  >
            <el-select    filterable  :disabled="flag"  v-model="item.isFinish" placeholder="请选择" >
              <el-option
                v-for="item in isFinish2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col  :span="4" >
          <el-form-item label=""   >
            <el-input  :disabled="flag" v-model="item.responsible"  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="vant-add" @click="addProject">+添加项目</div>

    </el-form>
    <div style="height: 50px"></div>
    <div class="r">
      <div class="r-w">
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>

    </div>
  </basic-container>
</template>

<script>
  import {save, update,detail} from "@/api/dailyOffice/fiveyearplan";
  import {nameList} from '@/api/system/user'
  export default {

    data(){
      return {
        flag:true,
        rules: {
          startYear:[{required: true, validator: this.validatestartYear, trigger: 'change'}],
          isFinish:[{required: true, validator: this.validateisFinish, trigger: 'change'}],
          collEconIncome:[{required: true, validator: this.validatecollEconIncome, trigger: 'change'}],
          operatingIncome:[{required: true, validator: this.validateoperatingIncome, trigger: 'change'}],
          villageDebt:[{required: true, validator: this.validatevillageDebt, trigger: 'change'}],
          perIncome:[{required: true, validator: this.validateperIncome, trigger: 'change'}],
          villWelfare:[{required: true, validator: this.validatevillWelfare, trigger: 'change'}],
          youngPartyMembers:[{required: true, validator: this.validateyoungPartyMembers, trigger: 'change'}],
          honorLevel:[{required: true, validator: this.validatehonorLevel, trigger: 'change'}],
          honorsStriving:[{required: true, validator: this.validatehonorsStriving, trigger: 'change'}],
          teamNum:[{required: true, validator: this.validateteamNum, trigger: 'change'}],
          peopleNum:[{required: true, validator: this.validatepeopleNum, trigger: 'change'}],
          projectsNum:[{required: true, validator: this.validateprojectsNum, trigger: 'change'}],
          laborExpenditure:[{required: true, validator: this.validatelaborExpenditure, trigger: 'change'}],
        },
        FivePlan:{
          startYear:'',
          endYear:'',
          isFinish:'',
          collEconIncome:undefined,
          operatingIncome:undefined,
          villageDebt:undefined,
          laborExpenditure:undefined,
          perIncome:undefined,
          villWelfare:'',
          youngPartyMembers:undefined,
          honorLevel:'',
          honorsStriving:undefined,
          teamNum:undefined,
          peopleNum:undefined,
          projectsNum:undefined,
          mxList:[{
            projectName:'',
            planTime:'',
            isFinish:'',
            responsible:'',
          }],
        },
        isFinish:[
          {label:"否",
          value:"0"},
          {label:"是",
            value:"1"}
        ],
        isFinish2:[
          {label:"否",
            value:0},
          {label:"是",
            value:1}
        ],
        villList:[{label:"浙江省级"},{label:"杭州市级及以上"},{label:"建德市级及以上"}],
        postData:[],
        eduOptionData:[],
        nameList:[]
      }
    },
    mounted(){

      if (this.$route.query.id) {
        detail(this.$route.query.id).then(res => {
          this.FivePlan=res.data.data;
        })
      }
    },

    methods:{

      validateprojectsNum(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.projectsNum === "" || this.FivePlan.projectsNum == undefined) {
            callback(new Error("请输入产业试点项目数"));
          } else {
            callback();
          }
        })
      },
      validatepeopleNum(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.peopleNum === "" || this.FivePlan.peopleNum == undefined) {
            callback(new Error("请输入“十支队”队员数"));
          } else {
            callback();
          }
        })
      },
      validateteamNum(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.teamNum === "" || this.FivePlan.teamNum == undefined) {
            callback(new Error("请输入“十支队”组织数"));
          } else {
            callback();
          }
        })
      },
      validatehonorsStriving(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.honorsStriving === "" || this.FivePlan.honorsStriving == undefined) {
            callback(new Error("请输入争创荣誉次数"));
          } else {
            callback();
          }
        })
      },
      validatehonorLevel(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.honorLevel === "" || this.FivePlan.honorLevel == undefined) {
            callback(new Error("请输入争创荣誉等级"));
          } else {
            callback();
          }
        })
      },
      validateyoungPartyMembers(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.youngPartyMembers === "" || this.FivePlan.youngPartyMembers == undefined) {
            callback(new Error("请输入发展年轻党员数"));
          } else {
            callback();
          }
        })
      },
      validatevillWelfare(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.villWelfare === "" || this.FivePlan.villWelfare == undefined) {
            callback(new Error("请输入实现村民福利达到"));
          } else {
            callback();
          }
        })
      },
      validateperIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.perIncome === "" || this.FivePlan.perIncome == undefined) {
            callback(new Error("请输入农民人均可支配收入"));
          } else {
            callback();
          }
        })
      },
      validatelaborExpenditure(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.laborExpenditure === "" || this.FivePlan.laborExpenditure == undefined) {
            callback(new Error("请输入务工支出"));
          } else {
            callback();
          }
        })
      },
      validatevillageDebt(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.villageDebt === "" || this.FivePlan.villageDebt == undefined) {
            callback(new Error("请输入村级债务"));
          } else {
            callback();
          }
        })
      },
        validateoperatingIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.operatingIncome === "" || this.FivePlan.operatingIncome == undefined) {
            callback(new Error("请输入经营性收入"));
          } else {
            callback();
          }
        })
      },
      validatecollEconIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.collEconIncome === "" || this.FivePlan.collEconIncome == undefined) {
            callback(new Error("请输入集体经济收入"));
          } else {
            callback();
          }
        })
      },
      validateisFinish(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.isFinish === "" || this.FivePlan.isFinish == undefined) {
            callback(new Error("请输入是否完成"));
          } else {
            callback();
          }
        })
      },
      validatestartYear(rule, value, callback){
        this.$nextTick(() => {
          if (this.FivePlan.startYear === "" || this.FivePlan.startYear == undefined) {
            callback(new Error("请输入开始年份"));
          } else {
            callback();
          }
        })
      },
      addProject(){
        this.FivePlan.mxList.push({
          projectName:'',
          planTime:'',
          isFinish:'',
          responsible:'',
        })
      },
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageManagement/fiveYearPlan/fiveYearPlan"});
      },
      submit() {
        let that = this;
        this.$refs.FivePlan.validate(function (valid) {
          if (valid) {
            debugger
            if( typeof  that.FivePlan.startYear!="string") {
              that.FivePlan.startYear = new Date(that.FivePlan.startYear.getTime()).getFullYear()
            }
            if( typeof  that.FivePlan.endYear!="string") {
              that.FivePlan.endYear = new Date(that.FivePlan.endYear.getTime()).getFullYear()
            }

            if (that.$route.query.id) {
              update(that.FivePlan).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/fiveYearPlan/fiveYearPlan"});
                }
              });
            } else {

              save(that.FivePlan).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/fiveYearPlan/fiveYearPlan"});
                }
              });
            }
          }
        })
      },
    }
  }
</script>

<style scoped >
  .vant-add{
    color: #0076F6;
    font-size: 12px;
  }
  .el-comm-{
    font-size: 14px;
    color: #606266;
    margin-right: 10px;
    /*margin-left: 10px;*/
  }
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
    width: 230px;
    height:50px ;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
  }
  .el-triangle-choose{
    width: 0;
    height: 0;
    border: 26px solid;
    border-color:  transparent transparent transparent #0076F6;
    position: relative;
  }

  .el-triangle{
    width: 0;
    height: 0;
    border: 26px solid;
    border-color:  transparent transparent transparent #0076F6;
    position: relative;
  }
  .el-triangle::after{
    content: '';
    position: absolute;
    top: -26px;
    left: -27px;
    border: 26px solid;
    border-color:  transparent transparent transparent #fff;
  }
  .el-oneRow{
    display: flex;
  }
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
  .r-stu{
    margin-bottom: 50px;
  }

</style>
