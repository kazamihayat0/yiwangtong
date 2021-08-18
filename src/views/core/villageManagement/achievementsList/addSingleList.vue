<template>
  <basic-container class="ele-info" >
    <el-form :rules="rules" ref="Single" label-width="210px"   :model="Single"  size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="季度"  prop="quarter">
            <mark
              class="_mark"
              v-show="showSeason"
              @click.stop="showSeason=false"
            ></mark>
            <el-input placeholder="请选择季度" v-model="Single.quarter" style="width:12.7rem;" @focus="showSeason=true">
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
        <el-col :span="8" >
          <el-form-item label="乡镇-村社" prop="code" >
            <select-tree  style="width: 93%"  :vill="vill"  :disabled="userInfo.level==3" :options="options" v-model="Single.code"  @getAreaCode="getAreaCode"  :props="defaultProps" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招引服务产业项目"  prop="project"  >
            <el-input v-model="Single.project"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="村集体经营性收入（万元）"   prop="incomeUp"  >
            <el-input-number v-model="Single.incomeUp"  style="width: 94%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="农村居民人均可支配收入（元）"  prop="dispIncome" >
            <el-input-number v-model="Single.dispIncome"  style="width: 92%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人居环境"  prop="envir" >
            <el-input v-model="Single.envir"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="数字治理"   prop="digitalGover">
            <el-input v-model="Single.digitalGover"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改革试点"  prop="pilotReform"  >
            <el-input v-model="Single.pilotReform"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标杆进位"  prop="benCarry" >
            <el-select
              multiple
              v-model="Single.benCarry"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in benCarryData"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <!--<el-input v-model="Single.benCarry"  style="width: 92%"   placeholder="请输入"></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市荣誉经验交流"  prop="experCommun"  >
            <el-input v-model="Single.experCommun"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="基础工作"    prop="baseWork">
            <el-input v-model="Single.baseWork"  style="width: 92%"   placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="村级负债（万元）"   prop="debtDown" >
            <el-input-number v-model="Single.debtDown"  style="width: 92%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="误工开支（万元）"  prop="expenDown"   >
            <el-input-number v-model="Single.expenDown"  style="width: 92%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信访上访数（次）" prop="petitionNum"  >
            <el-input-number v-model="Single.petitionNum"  style="width: 92%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排名"   prop="sort" >
            <el-input-number v-model="Single.sort"  style="width: 92%"  :controls="false" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>


      <div style="text-align:center;margin-top: 100px">
        <el-button style="width: 100px" @click="submit" size="medium" type="primary" >提交</el-button>
        <el-button style="width: 100px" @click="handleBack()" size="medium" type="primary">返回</el-button>
      </div>
    </el-form>
  </basic-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import {save,update,detail} from "@/api/dailyOffice/single";
  import { getAreaTree } from "@/api/common/index";
  import SelectTree from '@/views/villagecadre/SelectTree.vue';

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
        benCarryData:[
          {label:"标杆"},
          {label:"进位"}
        ],
        options: [

        ],
        vill:true,//只能选择到村
        defaultProps: {
          parent: 'parentCode',   // 父级唯一标识
          value: 'code',          // 唯一标识
          label: 'name',       // 标签显示
          children: 'children', // 子级
        },

        rules: {
          quarter: [{required: true, validator: this.validateQuarter, trigger: 'change'}],
          code: [{required: true, validator: this.validateCode, trigger: 'change'}],
          project:[{required: true, validator: this.validateProject, trigger: 'change'}],
          incomeUp:[{required: true, validator: this.validateincomeUp, trigger: 'change'}],
          dispIncome:[{required: true, validator: this.validatedispIncome, trigger: 'change'}],
          envir:[{required: true, validator: this.validateenvir, trigger: 'change'}],
          digitalGover:[{required: true, validator: this.validatedigitalGover, trigger: 'change'}],
          pilotReform:[{required: true, validator: this.validatepilotReform, trigger: 'change'}],
          benCarry:[{required: true, validator: this.validatebenCarry, trigger: 'change'}],
          experCommun:[{required: true, validator: this.validateexperCommun, trigger: 'change'}],
          debtDown:[{required: true, validator: this.validatedebtDown, trigger: 'change'}],
          expenDown:[{required: true, validator: this.validateexpenDown, trigger: 'change'}],
          petitionNum:[{required: true, validator: this.validatepetitionNum, trigger: 'change'}],
          sort:[{required: true, validator: this.validateSort, trigger: 'change'}],
          baseWork:[{required: true, validator: this.validatebaseWork, trigger: 'change'}],
        },
        Single:{
          quarter:'',
          code:'',
          project:'',
          incomeUp:undefined,
          dispIncome:undefined,
          envir:'',
          digitalGover:'',
          pilotReform:'',
          benCarry:'',
          baseWork:'',
          experCommun:'',
          debtDown:undefined,
          expenDown:undefined,
          petitionNum:undefined,
          sort:undefined,
        },
        showSeason: false,
        season: '',
        year: new Date().getFullYear(),
      }
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {
      if (this.defaultValue) {
        let value = this.defaultValue
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Single.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    watch: {
      defaultValue: function(value, oldValue) {
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.Single.quarter = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      }
    },
    mounted(){

      let that=this;
      getAreaTree().then(res=>{
        that.options=res.data.data;
        if(this.userInfo.level==3) {
          this.Single.code = this.$route.query.code
        }
        if (that.$route.query.id) {
          detail(that.$route.query.id).then(res => {
            that.Single=res.data.data;

            let benCarryStr = that.Single.benCarry;
            if (benCarryStr) {
              let people = benCarryStr.split(",");
              that.$set(that.Single, "benCarry", people);
            }
          })
        }
      })


    },
    methods: {
      validatebaseWork(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.baseWork === "" || this.Single.baseWork === undefined) {
            callback(new Error("请输入基础工作"));
          } else {
            callback();
          }
        })
      },
      validatepetitionNum(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.petitionNum === "" || this.Single.petitionNum === undefined) {
            callback(new Error("请输入信访上访数"));
          } else {
            callback();
          }
        })
      },
      validateexpenDown(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.expenDown === "" || this.Single.expenDown === undefined) {
            callback(new Error("请输入误工开支降幅"));
          } else {
            callback();
          }
        })
      },
      validatedebtDown(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.debtDown === "" || this.Single.debtDown === undefined) {
            callback(new Error("请输入村级负债降幅"));
          } else {
            callback();
          }
        })
      },
      validateexperCommun(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.experCommun === "" || this.Single.experCommun === undefined) {
            callback(new Error("请输入省市荣誉经验交流"));
          } else {
            callback();
          }
        })
      },
      validatebenCarry(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.benCarry === "" || this.Single.benCarry === undefined) {
            callback(new Error("请输入标杆进位"));
          } else {
            callback();
          }
        })
      },
      validatepilotReform(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.pilotReform === "" || this.Single.pilotReform === undefined) {
            callback(new Error("请输入改革试点"));
          } else {
            callback();
          }
        })
      },
      validatedigitalGover(rule, value, callback){
    this.$nextTick(() => {
      if (this.Single.digitalGover === "" || this.Single.digitalGover === undefined) {
        callback(new Error("请输入数字治理"));
      } else {
        callback();
      }
    })
  },
      validateenvir(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.envir === "" || this.Single.envir === undefined) {
            callback(new Error("请输入人居环境"));
          } else {
            callback();
          }
        })
      },
      validatedispIncome(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.dispIncome === "" || this.Single.dispIncome === undefined) {
            callback(new Error("请输入农村居民人均可支配收入"));
          } else {
            callback();
          }
        })
      },
      validateincomeUp(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.incomeUp === "" || this.Single.incomeUp === undefined) {
            callback(new Error("请输入村集体经营性收入（万元）"));
          } else {
            callback();
          }
        })
      },
      validateProject(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.project === "" || this.Single.project === undefined) {
            callback(new Error("请输入招引服务产业项目"));
          } else {
            callback();
          }
        })
      },
      validateQuarter(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.quarter === "" || this.Single.quarter === undefined) {
            callback(new Error("请输入季度"));
          } else {
            callback();
          }
        })
      },
      validateCode(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.code === "" || this.Single.code === undefined) {
            callback(new Error("请输入乡镇-村社"));
          } else {
            callback();
          }
        })
      },
      validateSort(rule, value, callback){
        this.$nextTick(() => {
          if (this.Single.sort === "" || this.Single.sort === undefined) {
            callback(new Error("请输入排名"));
          } else {
            callback();
          }
        })
      },
      handleBack(){
        this.$router.$avueRouter.closeTag();
        this.$router.push({path: "/core/villageManagement/achievementsList/singleList"});
      },
      submit(){
        let that=this;
        var benCarry = that.Single.benCarry;
        if (benCarry) {
          var benCarryStr = "";
          for (let i = 0; i < benCarry.length; i++) {
            benCarryStr += benCarry[i] + ",";
          }
          that.$set(
            that.Single,
            "benCarry",
            benCarryStr.substring(0, benCarryStr.length - 1)
          );
        }
        this.$refs.Single.validate(function (valid ) {
          if (valid) {
            if (that.$route.query.id) {
              update(that.Single).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/achievementsList/singleList"});
                }
              });
            } else {

              save(that.Single).then((res) => {
                if (res.data.success) {
                  that.$message({
                    type: "success",
                    message: "新增成功!",
                  });
                  that.$router.push({path: "/core/villageManagement/achievementsList/singleList"});
                }
              });
            }
          }
        })
      },
      getAreaCode(areaCode,areaLevel,cityCode,streetCode,villageCode,gridCode){
        this.Single.code=areaCode;
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
        this.Single.year=this.year;
        this.Single.jd=this.season;
        this.Single.quarter = `${this.year}年第${seasonValue}季度`
        console.log(this.Single.quarter)
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
<style>

</style>
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

