<template>
  <basic-container class="ele-info">
    <el-form :rules="rules" ref="Perform" label-width="110px" :model="Perform" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="季度" prop="quarter">
            <mark
              class="_mark"
              v-show="showSeason"
              @click.stop="showSeason=false"
            ></mark>
            <el-input placeholder="请选择季度" v-model="Perform.quarter" style="width:96%" @focus="showSeason=true">
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
          <el-form-item label="姓名" prop="userId" label-width="120px">
            <el-select filterable v-model="Perform.userId" placeholder="请选择" style="width: 92%">
              <el-option
                v-for="item in nameList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现任职务" prop="postName">
            <el-input v-model="Perform.postName" disabled style="width: 92%" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="乡镇-村社" prop="areaName">
            <el-input v-model="Perform.areaName" style="width: 96%" disabled placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8" v-if="assessLevelFlag">
          <el-form-item label="村书记评价等级" prop="assessLevel" label-width="120px" :required="assessLevelFlag">
            <el-select filterable v-model="Perform.assessLevel" placeholder="请选择" style="width: 92%">
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
          <el-form-item label="党委评价等级" prop="partyAssessLevel">
            <el-select filterable v-model="Perform.partyAssessLevel"  :disabled="partyassessLevelFlag"  placeholder="请选择" style="width: 92%">
              <el-option
                v-for="item in villList"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <!--<el-col :span="8">-->
          <!--<el-form-item label="研判得分" prop="judgeScore">-->
            <!--<el-input-number v-model="Perform.judgeScore" style="width: 96%" :controls="false"></el-input-number>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>

      <div style="text-align: center ;margin-top: 40px">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary">提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>
    </el-form>
  </basic-container>
</template>

<script>
  import {save, update,detail} from "@/api/dailyOffice/performancescore";
  import {nameList} from '@/api/system/user'

  export default {
    props: {
      valueArr: {
        default: () => {
          return ['01-03', '04-06', '07-09', '10-12']
        },
        type: Array
      },
      getValue: {
        default: () => {
        },
        type: Function
      },
      defaultValue: {
        default: '',
        type: String
      }
    },
    data() {
      return {

        villList: [{label: "优秀"}, {label: "合格"}, {label: "不合格"}],
        rules: {
          userId: [{required: true, validator: this.validateUserId, trigger: 'change'}],
          quarter: [{required: true, validator: this.validateQuarter, trigger: 'change'}],
          assessLevel: [{required: this.assessLevelFlag, validator: this.validateAssessLevel, trigger: 'change'}],
          partyAssessLevel: [{required: true, validator: this.validateAssessScore, trigger: 'change'}],
          judgeScore: [{required: true, validator: this.validateJudgeScore, trigger: 'change'}],

        },
        assessLevelFlag:true,
        nameList: [],
        Perform: {
          quarter: '',
          userId: '',
          postName: '',
          assessLevel: '',
          partyAssessLevel: '',
          judgeScore: undefined

        },
        showSeason: false,
        season: '',
        year: new Date().getFullYear(),
        partyassessLevelFlag:false,
      }
    },
    created() {
      if (this.defaultValue) {
        let value = this.defaultValue
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Perform.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    watch: {
      defaultValue: function (value, oldValue) {
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Perform.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    mounted() {
      nameList().then(res => {
        this.nameList = res.data.data;
      })
      if (this.$route.query.id) {
        this.partyassessLevelFlag=true;
        detail(this.$route.query.id).then(res => {
          this.Perform=res.data.data;
        })
      }else{
        this.partyassessLevelFlag=false
      }
    },
    methods: {

      handleBack(){
        this.$router.push({path: "/core/villageManagement/performanceScore/performanceScore"});
      },
      submit() {
        let that = this;
        this.$refs.Perform.validate(function (valid) {
          if (valid) {
            if (that.$route.query.id) {
              update(that.Perform).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/performanceScore/performanceScore"});
                }
              });
            } else {

              save(that.Perform).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/performanceScore/performanceScore"});
                }
              });
            }
          }
        })
      },

      validateJudgeScore(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.judgeScore === "" || this.Perform.judgeScore === undefined) {
            callback(new Error("请输入研判得分"));
          } else {
            callback();
          }
        })
      },
      validateAssessScore(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.partyAssessLevel === "" || this.Perform.partyAssessLevel == undefined) {
            callback(new Error("请输入党委评价等级"));
          } else {
            callback();
          }
        })
      },

      validateAssessLevel(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.assessLevel === "" || this.Perform.assessLevel == undefined) {
            callback(new Error("请输入村书记评登等级"));
          } else {
            callback();
          }
        })
      },
      validateQuarter(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.quarter === "" || this.Perform.quarter == undefined) {
            callback(new Error("请输入季度"));
          } else {
            callback();
          }
        })
      },
      validateUserId(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.userId === "" || this.Perform.userId == undefined) {
            callback(new Error("请输入姓名"));
          } else {
            debugger
            this.nameList.forEach(_ => {
              if (_.id == this.Perform.userId) {
                this.Perform.postName = _.postName;
                this.Perform.areaName = _.areaName
                if(this.Perform.postName.indexOf("党组织书记")!=-1){
                  this.assessLevelFlag=false;
                }else{
                  this.assessLevelFlag=true;
                }
              }
            })
            callback();
          }
        })
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
        let seasonValue = "";
        if (this.season == 1) {
          seasonValue = "一"
        }
        if (this.season == 2) {
          seasonValue = "二"
        }
        if (this.season == 3) {
          seasonValue = "三"
        }
        if (this.season == 4) {
          seasonValue = "四"
        }
        this.Perform.year = this.year;
        this.Perform.jd = this.season;
        this.Perform.quarter = `${this.year}年第${seasonValue}季度`
        console.log(this.Perform.quarter)
      },
      getLastDay(year, month) {
        var new_year = year //取当前的年份
        var new_month = month++ //取下一个月的第一天，方便计算（最后一天不固定）
        if (month > 12) {
          new_month -= 12//月份减
          new_year++ //年份增
        }
        var new_date = new Date(new_year, new_month, 1) //取当年当月中的第一天
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate() //获取当月最后一天日期
      }
    }
  }
</script>

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
