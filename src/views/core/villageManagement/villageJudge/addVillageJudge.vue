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
          <el-form-item label="乡镇-村社" prop="code">
            <select-tree  style="width: 93%"  :vill="vill"  :disabled="userInfo.level==3" :options="options" v-model="Perform.code"  @getAreaCode="getAreaCode"  :props="defaultProps" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="党委评价等级" prop="partyAssessLevel">
            <el-select filterable v-model="Perform.partyAssessLevel" placeholder="请选择" style="width: 92%">
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

      <!--<el-row>-->

        <!--<el-col :span="8">-->
          <!--<el-form-item label="研判得分" prop="judgeScore">-->
            <!--<el-input-number v-model="Perform.judgeScore" style="width: 96%" :controls="false"></el-input-number>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->

      <div style="text-align: center ;margin-top: 40px">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary">提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>
    </el-form>
  </basic-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { getAreaTree } from "@/api/common/index";
  import {save, update,detail} from "@/api/dailyOffice/villagejudge";
  import {nameList} from '@/api/system/user'
  import SelectTree from '@/views/villagecadre/SelectTree.vue';
  export default {
    components: {
      SelectTree,
    },
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
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data() {
      return {
        villList: [{label: "优秀"}, {label: "合格"}, {label: "不合格"}],
        rules: {
          userId: [{required: true, validator: this.validateUserId, trigger: 'change'}],
          quarter: [{required: true, validator: this.validateQuarter, trigger: 'change'}],
          // assessLevel: [{required: true, validator: this.validateAssessLevel, trigger: 'change'}],
          partyAssessLevel: [{required: true, validator: this.validateAssessScore, trigger: 'change'}],
        //  judgeScore: [{required: true, validator: this.validateJudgeScore, trigger: 'change'}],
          code: [{required: true, validator: this.validateCode, trigger: 'change'}],
        },
        nameList: [],
        Perform: {
          quarter: '',
          userId: '',
          postName: '',
          // assessLevel: '',
          partyAssessLevel: '',
          // judgeScore: undefined,
          code:''
        },
        options: [
        ],
        vill:true,//只能选择到村
        defaultProps: {
          parent: 'parentCode',   // 父级唯一标识
          value: 'code',          // 唯一标识
          label: 'name',       // 标签显示
          children: 'children', // 子级
        },
        showSeason: false,
        season: '',
        year: new Date().getFullYear(),
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
      let that=this;
      getAreaTree().then(res=>{
        this.options=res.data.data;
        this.Perform.code=this.$route.query.code
        if (that.$route.query.id) {
          detail(that.$route.query.id).then(res => {
            that.Perform=res.data.data;
          })
        }
      })

    },
    methods: {
      handleBack(){
        this.$router.push({path: "/core/villageManagement/villageJudge/villageJudge"});
      },
      getAreaCode(areaCode,areaLevel,cityCode,streetCode,villageCode,gridCode){
        this.Perform.code=areaCode;
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
                  that.$router.push({path: "/core/villageManagement/villageJudge/villageJudge"});
                }
              });
            } else {

              save(that.Perform).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/villageJudge/villageJudge"});
                }
              });
            }
          }
        })
      },
      validateCode(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.code === "" || this.Perform.code === undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      // validateJudgeScore(rule, value, callback) {
      //   this.$nextTick(() => {
      //     if (this.Perform.judgeScore === "" || this.Perform.judgeScore === undefined) {
      //       callback(new Error("请输入研判得分"));
      //     } else {
      //       callback();
      //     }
      //   })
      // },
      validateAssessScore(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.partyAssessLevel == "" || this.Perform.partyAssessLevel == undefined) {
            callback(new Error("请输入党委评价等级"));
          } else {
            callback();
          }
        })
      },
      //
      // validateAssessLevel(rule, value, callback) {
      //   this.$nextTick(() => {
      //     if (this.Perform.assessLevel == "" || this.Perform.assessLevel == undefined) {
      //       callback(new Error("请输入村书记评登等级"));
      //     } else {
      //       callback();
      //     }
      //   })
      // },
      validateQuarter(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.quarter == "" || this.Perform.quarter == undefined) {
            callback(new Error("请输入季度"));
          } else {
            callback();
          }
        })
      },
      validateUserId(rule, value, callback) {
        this.$nextTick(() => {
          if (this.Perform.userId == "" || this.Perform.userId == undefined) {
            callback(new Error("请输入姓名"));
          } else {
            debugger
            this.nameList.forEach(_ => {
              if (_.id == this.Perform.userId) {
                this.Perform.postName = _.postName;
                this.Perform.areaName = _.areaName
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
