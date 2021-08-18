<template>
  <basic-container class="ele-info">
    <el-form class="r-stu" inline  :rules="rules" ref="villInfo"   :model="villInfo" label-width="100px"   size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="年份" label-width="190px"   prop="year" >
            <el-date-picker
              v-model="villInfo.year"
              type="year"
              style="width: 93%"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乡镇-村社"  label-width="210px"  prop="code" >
          <select-tree  style="width: 93%"  :vill="vill"  :disabled="userInfo.level==3"  :options="options" v-model="villInfo.code"  @getAreaCode="getAreaCode"  :props="defaultProps" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人口（人）"  label-width="210px"  prop="population" >
            <el-input-number v-model="villInfo.population" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="面积（亩）"  label-width="210px"  prop="area" >
            <el-input-number v-model="villInfo.area" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="村集体经济收入（万元）"  label-width="210px"  prop="incomeUp" >
            <el-input-number v-model="villInfo.incomeUp" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="党员数（人）"  label-width="210px"  prop="partyMembers" >
            <el-input-number v-model="villInfo.partyMembers" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="村（居）民小组数量（个）"  label-width="210px"  prop="villageGroups" >
            <el-input-number v-model="villInfo.villageGroups" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="村（居）民代表数量（人）"  label-width="210px"  prop="villagerRepresentatives" >
            <el-input-number v-model="villInfo.villagerRepresentatives" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营性收入（万元）"  label-width="210px"  prop="operatIncome" >
            <el-input-number v-model="villInfo.operatIncome" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
          <el-col :span="8">
            <el-form-item label="上年农民人均收入（万元）"  label-width="210px"  prop="operatIncome" >
              <el-input-number v-model="villInfo.farmersIncome" style="width: 100%"  :controls="false" ></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="村级负债（万元）"  label-width="210px"  prop="villageDebt" >
            <el-input-number v-model="villInfo.villageDebt" style="width: 100%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要经济来源"  label-width="210px"  prop="mianIncome" >
            <el-input v-model="villInfo.mianIncome" style="width: 200%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>



    </el-form>
    <div style="height: 50px"></div>
    <div >
      <div  style="text-align: center">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary" >提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>

    </div>
  </basic-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { getAreaTree } from "@/api/common/index";
  import SelectTree from '@/views/villagecadre/SelectTree.vue';
  import {save, update,detail} from "@/api/dailyOffice/villageinfo";
  export default {
    components: {
      SelectTree,
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data(){
      return {
        rules: {
          year:[{required: true, validator: this.validateYear, trigger: 'change'}],
          population:[{required: true, validator: this.validateispopulation, trigger: 'change'}],
          area:[{required: true, validator: this.validatearea, trigger: 'change'}],
          incomeUp:[{required: true, validator: this.validateincomeUp, trigger: 'change'}],
          partyMembers:[{required: true, validator: this.validatepartyMembers, trigger: 'change'}],
          villageGroups:[{required: true, validator: this.validatevillageGroups, trigger: 'change'}],
          villagerRepresentatives:[{required: true, validator: this.validatevillagerRepresentatives, trigger: 'change'}],
          operatIncome:[{required: true, validator: this.validateoperatIncome, trigger: 'change'}],
          farmersIncome:[{required: true, validator: this.validatefarmersIncome, trigger: 'change'}],
          villageDebt:[{required: true, validator: this.validatevillageDebt, trigger: 'change'}],
          mianIncome:[{required: true, validator: this.validatemianIncome, trigger: 'change'}],
          code:[{required: true, validator: this.validatecode, trigger: 'change'}],

        },
        vill:true,
        defaultProps: {
          parent: 'parentCode',   // 父级唯一标识
          value: 'code',          // 唯一标识
          label: 'name',       // 标签显示
          children: 'children', // 子级
        },
        options: [

        ],
        villInfo:{
          year:'',
          population:undefined,
          area:undefined,
          incomeUp:undefined,
          partyMembers:undefined,
          villageGroups:undefined,
          villagerRepresentatives:undefined,
          operatIncome:undefined,
          farmersIncome:undefined,
          villageDebt:undefined,
          mianIncome:'',
          code:'',
        },
      }
    },
    mounted(){

      let that=this;
      getAreaTree().then(res=>{
        that.options=res.data.data;
        this.villInfo.code=this.$route.query.code
        if (that.$route.query.id) {
          detail(that.$route.query.id).then(res => {
            that.villInfo=res.data.data;
          })
        }
      })
    },

    methods:{

      validateYear(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.year === "" || this.villInfo.year == undefined) {
            callback(new Error("请输入年份"));
          } else {
            callback();
          }
        })
      },
      validateispopulation(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.population === "" || this.villInfo.population == undefined) {
            callback(new Error("请输入人口"));
          } else {
            callback();
          }
        })
      },
      validatecode(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.code === "" || this.villInfo.code == undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      validatearea(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.area === "" || this.villInfo.area == undefined) {
            callback(new Error("请输入面积（亩）"));
          } else {
            callback();
          }
        })
      },
      validateincomeUp(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.incomeUp === "" || this.villInfo.incomeUp == undefined) {
            callback(new Error("请输入村集体经济收入（万元）"));
          } else {
            callback();
          }
        })
      },
      validatepartyMembers(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.partyMembers === "" || this.villInfo.partyMembers == undefined) {
            callback(new Error("请输入党员数（人）"));
          } else {
            callback();
          }
        })
      },
      validatevillageGroups(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.villageGroups === "" || this.villInfo.villageGroups == undefined) {
            callback(new Error("请输入村（居）民小组数量（个）"));
          } else {
            callback();
          }
        })
      },
      validatevillagerRepresentatives(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.villagerRepresentatives === "" || this.villInfo.villagerRepresentatives == undefined) {
            callback(new Error("请输入村（居）民代表数量（人）"));
          } else {
            callback();
          }
        })
      },
      validateoperatIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.operatIncome === "" || this.villInfo.operatIncome == undefined) {
            callback(new Error("请输入经营性收入（万元）"));
          } else {
            callback();
          }
        })
      },
      validatefarmersIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.farmersIncome === "" || this.villInfo.farmersIncome == undefined) {
            callback(new Error("请输入上年农民人均收入（万元）"));
          } else {
            callback();
          }
        })
      },
      validatevillageDebt(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.villageDebt === "" || this.villInfo.villageDebt == undefined) {
            callback(new Error("请输入村级负债（万元）"));
          } else {
            callback();
          }
        })
      },
      validatemianIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.villInfo.mianIncome === "" || this.villInfo.mianIncome == undefined) {
            callback(new Error("请输入主要经济来源"));
          } else {
            callback();
          }
        })
      },

      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageInfo/villageInfo"});

      },
      getAreaCode(areaCode,areaLevel,cityCode,streetCode,villageCode,gridCode){
        this.villInfo.code=areaCode;
      },
      submit() {
        let that = this;
        this.$refs.villInfo.validate(function (valid) {
          if (valid) {
            debugger
            if( typeof  that.villInfo.year!="string") {
              that.villInfo.year = new Date(that.villInfo.year.getTime()).getFullYear()
            }
            if (that.$route.query.id) {
              update(that.villInfo).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/villageInfo/villageInfo"});
                }
              });
            } else {
              save(that.villInfo).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/villageInfo/villageInfo"});
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
