<template>
  <basic-container>
    <el-form  :rules="rules" ref="Perform" label-width="110px" :model="Perform" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="季度" prop="quarter">
            <mark
              class="_mark"
              v-show="showSeason"
              @click.stop="showSeason=false"
            ></mark>
            <el-input placeholder="请选择季度" v-model="Perform.quarter" style="width:96%" @focus="showSeason=true" size="small">
              <i slot="prefix" class="el-input__icon el-icon-date"></i>
            </el-input>
            <el-card
              class="box-card"
              v-show="showSeason"
            >
              <div slot="header" class="clearfix yearBtn">
                <button
                  type="button"
                  aria-label="前一年"
                  class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                  @click="prev"
                ></button>
                <span role="button" class="el-date-picker__header-label">{{year}}年</span>
                <button
                  type="button"
                  aria-label="后一年"
                  @click="next"
                  class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
                ></button>
              </div>
              <div class="text item">
                <el-button
                  type="text"
                  size="medium"
                  class="_left"
                  @click="selectSeason(0)"
                >第一季度
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  class="_right"
                  @click="selectSeason(1)"
                >第二季度
                </el-button>
              </div>
              <div class="text item">
                <el-button
                  type="text"
                  size="medium"
                  class="_left"
                  @click="selectSeason(2)"
                >第三季度
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  class="_right"
                  @click="selectSeason(3)"
                >第四季度
                </el-button>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批量评价" >
            <el-radio-group v-model="Perform.status1"  @change="change">
              <el-radio label="优秀">优秀</el-radio>
              <el-radio label="合格">合格</el-radio>
              <el-radio label="不合格">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-table  class="el-judge-table" size="small"
                   :data="Perform.tableData"
                   border
                   style="width: 70%;margin-left: 60px">
          <el-table-column
            prop="areaName"
            label="村社"
            width="250">
          </el-table-column>
          <el-table-column
            prop="partyAssessLevel"
            label="评价等级">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.partyAssessLevel">
                <el-radio label="优秀">优秀</el-radio>
                <el-radio label="合格">合格</el-radio>
                <el-radio label="不合格">不合格</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div style="text-align:center;margin-top: 30px">
      <el-button style="width: 100px" @click="submit" size="medium" type="primary" >提交</el-button>
      <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
    </div>

  </basic-container>
</template>

<script>
  import {getVillageList,saveVillage} from "@/api/dailyOffice/judge";
  export default {
    name: "addVillJudge",
    props: {
      valueArr: {
        default: () => {
          return ['01-03', '04-06', '07-09', '10-12']
        },
        type: Array
      },
      getValue: {
        default: () => {},
        type: Function
      },
      defaultValue: {
        default: '',
        type: String
      }
    },
    data(){
      return {
        showSeason: false,
        season: '',
        Perform:{
          quarter:'',
          status1:undefined,
          tableData: [{
          }]
        },
        year: new Date().getFullYear(),
        rules: {
          quarter: [{required: true, validator: this.validateQuarter, trigger: 'change'}],
          code: [{required: true, validator: this.validateCode, trigger: 'change'}],
        }
      }
    },
    watch: {
      defaultValue: function(value, oldValue) {
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Perform.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    methods:{
      change(){
        this.Perform.tableData.forEach(_=>{
          this.$set(_,"partyAssessLevel",this.Perform.status1)
        })
      },
      validateQuarter(rule, value, callback){
        this.$nextTick(() => {
          if (this.Perform.quarter === "" || this.Perform.quarter == undefined) {
            callback(new Error("请输入季度"));
          } else {
            callback();
          }
        })
      },
      validateCode(rule, value, callback){
        this.$nextTick(() => {
          if (this.Perform.code === "" || this.Perform.code == undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      submit(){
        let that=this;
        let flag=false;
        this.Perform.tableData.forEach(_=>{
          if(!_.partyAssessLevel){
            flag=true;
          }
        })
        if(!flag) {
          this.Perform.villageJudgesAssessList=this.Perform.tableData;
          this.$refs.Perform.validate(function (valid) {
            if (valid) {
              saveVillage(that.Perform).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "评价成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/villageManagement/performanceScore/villJudge"});
                }
              });
            }
          })
        }else{
          that.$message({
            type: "info",
            message: "评价内容需要必填!",
          });
        }
      },
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageManagement/performanceScore/villJudge"});

      },
      one() {
        this.showSeason = false
      },
      prev() {
        this.year = this.year * 1 - 1
      },
      next() {
        this.year = this.year * 1 + 1
      },
      selectSeason(i) {
        let that = this
        that.season = i + 1
        let arr = that.valueArr[i].split('-')
        that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
        that.showSeason = false
        let seasonValue="";
        if(this.season==1){
          seasonValue="一"
        }
        if(this.season==2){
          seasonValue="二"
        }
        if(this.season==3){
          seasonValue="三"
        }
        if(this.season==4){
          seasonValue="四"
        }
        this.Perform.quarter = `${this.year}年第${seasonValue}季度`
      },
      getLastDay(year,month) {
        var new_year = year //取当前的年份
        var new_month = month++ //取下一个月的第一天，方便计算（最后一天不固定）
        if(month>12) {
          new_month -= 12//月份减
          new_year++ //年份增
        }
        var new_date = new Date(new_year,new_month,1) //取当年当月中的第一天
        return (new Date(new_date.getTime()-1000*60*60*24)).getDate() //获取当月最后一天日期
      }
    },
    mounted(){
      getVillageList().then(res=>{
        this.Perform.tableData=res.data.data;
      })
    },

  }
</script>
<style>
  .el-judge-table  .el-table td, .el-table th.is-leaf{
    text-align: center;
  }
  .el-judge-table .el-table__body td{
    text-align: center!important;
  }
</style>
<style scoped>

  ._mark {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
  }

  .yearBtn {
    text-align: center;
    padding: 0
  }

  .box-card {
    width: 322px;
    padding: 0 3px 20px;
    margin-top: 10px;
    position: fixed;
    z-index: 9999;
    box-shadow: 0 0 10px #00000050!important;
  }

  .text.item {
    text-align: center;
  }

  .text.item >>> .el-button {
    width: 40%;
    color: #606266;
  }

  .text.item ._left {
    float: left;
  }

  .text.item ._right {
    float: right;
  }
</style>
