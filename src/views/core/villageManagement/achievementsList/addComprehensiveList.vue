<template>
  <basic-container class="ele-info" >
    <el-form :rules="rules" ref="Compre" label-width="110px"   :model="Compre"  size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="季度" prop="quarter" >
            <mark
              class="_mark"
              v-show="showSeason"
              @click.stop="showSeason=false"
            ></mark>
            <el-input placeholder="请选择季度" v-model="Compre.quarter" style="width:12.7rem;" @focus="showSeason=true">
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
                >第一季度</el-button>
                <el-button
                  type="text"
                  size="medium"
                  class="_right"
                  @click="selectSeason(1)"
                >第二季度</el-button>
              </div>
              <div class="text item">
                <el-button
                  type="text"
                  size="medium"
                  class="_left"
                  @click="selectSeason(2)"
                >第三季度</el-button>
                <el-button
                  type="text"
                  size="medium"
                  class="_right"
                  @click="selectSeason(3)"
                >第四季度</el-button>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="乡镇-村社" prop="code" >
            <select-tree  style="width: 93%"  :vill="vill"  :options="options" v-model="Compre.code"  @getAreaCode="getAreaCode"  :props="defaultProps" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="乡镇排行"   prop="townSort" >
            <el-input-number v-model="Compre.townSort"  style="width: 96%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市排行"   prop="citySort" >
            <el-input-number v-model="Compre.citySort"  style="width: 96%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>


      <div style="text-align:center;margin-top: 30px">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary" >提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>
    </el-form>
  </basic-container>
</template>

<script>
  import {save,update,detail} from "@/api/dailyOffice/comprensive";
  import { getAreaTree } from "@/api/common/index";
  import SelectTree from '@/views/villagecadre/SelectTree.vue';
  import {nameList} from '@/api/system/user'
  export default {
    components: {
      SelectTree,
    },
    // 数据默认字段

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
    data() {
      return {
        options: [

        ],
        vill:true,
        defaultProps: {
          parent: 'parentCode',   // 父级唯一标识
          value: 'code',          // 唯一标识
          label: 'name',       // 标签显示
          children: 'children', // 子级
        },

        nameList:[],
        rules: {
          quarter: [{required: true, validator: this.validateQuarter, trigger: 'change'}],
          code: [{required: true, validator: this.validateCode, trigger: 'change'}],
          townSort: [{required: true, validator: this.validateTownSort, trigger: 'change'}],
          citySort: [{required: true, validator: this.validateCitySort, trigger: 'change'}],
        },
        Compre:{
          year:'',
          jd:'',
          quarter:'',
          code:'',
          townSort:undefined,
          citySort:undefined
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
        this.Compre.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`

      }
    },
    watch: {
      defaultValue: function(value, oldValue) {
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Compre.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    mounted(){
      nameList().then(res=>{
        this.nameList=res.data.data;
      })
      getAreaTree().then(res=>{
        this.options=res.data.data;
        if (this.$route.query.id) {
          detail(this.$route.query.id).then(res => {
            this.Compre=res.data.data;
          })
        }
      })

    },
    methods: {
      validateTownSort(rule, value, callback){
        this.$nextTick(() => {
          if (this.Compre.townSort == "" || this.Compre.townSort == undefined) {
            callback(new Error("请输入乡镇排行"));
          } else {
            callback();
          }
        })
      },
      validateCitySort(rule, value, callback){
        this.$nextTick(() => {
          if (this.Compre.citySort == "" || this.Compre.citySort == undefined) {
            callback(new Error("请输入市排行"));
          } else {
            callback();
          }
        })
      },
      validateQuarter(rule, value, callback){
        this.$nextTick(() => {
          if (this.Compre.quarter == "" || this.Compre.quarter == undefined) {
            callback(new Error("请输入季度"));
          } else {
            callback();
          }
        })
      },
      validateCode(rule, value, callback){
        this.$nextTick(() => {
          if (this.Compre.code == "" || this.Compre.code == undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageManagement/achievementsList/comprehensiveList"});

      },
      submit(){
        let that=this;
        this.$refs.Compre.validate(function (valid ) {
          if (valid) {
            if (that.$route.query.id) {
              update(that.Compre).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/villageManagement/achievementsList/comprehensiveList"});
                }
              });
            } else {

              save(that.Compre).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.$avueRouter.closeTag();
                  that.$router.push({path: "/core/villageManagement/achievementsList/comprehensiveList"});
                }
              });
            }
          }
        })
      },
      getAreaCode(areaCode,areaLevel,cityCode,streetCode,villageCode,gridCode){
        this.Compre.code=areaCode;
        // this.user.level=areaLevel;
        // this.user.cityCode=cityCode;
        // this.user.townCode=streetCode;
        // this.user.villageCode=villageCode;
        // this.user.gridCode=gridCode;
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
        this.Compre.year=this.year;
        this.Compre.jd=this.season;
        this.Compre.quarter = `${this.year}年第${seasonValue}季度`
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
  }
</script>

<style scoped >
  ._mark {
    position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;
  }
  .yearBtn {
    text-align:center;padding:0
  }
  .box-card {
    width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999;
    box-shadow: 0 0 10px #00000050!important;
  }
  .text.item {
    text-align: center;
  }
  .text.item >>> .el-button{
    width:40%;color: #606266;
  }
  .text.item ._left {
    float: left;
  }
  .text.item ._right {
    float: right;
  }

</style>
