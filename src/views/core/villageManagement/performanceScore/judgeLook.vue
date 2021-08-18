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
            <el-input placeholder="请选择季度" disabled  v-model="Perform.quarter" style="width:96%" @focus="showSeason=true" size="small">
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
          <el-form-item label="乡镇-村社" prop="areaName">
            <el-input v-model="Perform.areaName" style="width: 96%" disabled placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-table  class="el-judge-table" size="small"
                   :data="Perform.tableData"
                   border
                   style="width: 80%;margin-left: 50px">
          <el-table-column
            prop="userName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="postName"
            label="职务"
            width="180">
          </el-table-column>
          <el-table-column
            prop="assessLevel"
            label="村书记评价等级">
          </el-table-column>
          <el-table-column
            prop="partyAssessLevel"
            label="党委评价等级">
          </el-table-column>
          <el-table-column
            prop="judgeScore"
            label="研判得分"
            width="180">
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>

    <div style="text-align:center;margin-top: 30px">
      <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
    </div>
  </basic-container>
</template>

<script>
  import {detail} from "@/api/dailyOffice/judge";
  export default {
    name: "judgeLook",
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
          status:undefined,
          tableData: [{

          }],
          areaName:''
        },
        year: new Date().getFullYear(),

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
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageManagement/performanceScore/judge"});

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
    }

    ,
    mounted(){
      detail(this.$route.query.id).then(res=>{
        this.Perform=res.data.data;
        this.Perform.tableData=res.data.data.judgesUserList;
      })
    }
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
