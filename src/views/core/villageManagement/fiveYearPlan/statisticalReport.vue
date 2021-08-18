<template>
  <basic-container class="ele-info">
    <el-form class="r-stu" inline     :model="Stat" label-width="70px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="规划期间"   prop="isFinish" >
            <el-select    filterable   v-model="Stat.period" placeholder="请选择" >
              <el-option
                v-for="item in isFinish"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年份"   prop="year" >
            <el-date-picker
              v-model="Stat.year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否完成"   prop="isFinish" >
            <el-select    filterable   v-model="Stat.isFinish" placeholder="请选择" >
              <el-option
                v-for="item in isFinish"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button style="width: 100px"  size="medium" type="primary" >搜索</el-button>
          <el-button style="width: 100px"  size="medium"  >清空</el-button>
        </el-col>
      </el-row>
      <h4>数据看板</h4>
      <el-row>
        <el-col :span="6">完成社区：<b>6</b></el-col>
        <el-col :span="6">未完成社区：<b>6</b></el-col>
      </el-row>
      <div style="line-height: 60px; font-size: 20px"> 计划完成进度明细</div>
      <div>
     <table>
       <tr>
         <td>序号</td>
         <td>规划期间</td>
         <td>年份</td>
         <td>乡镇-村社</td>
         <td>是否完成</td>
       </tr>
       <tr>
         <td>1</td>
         <td>2021-2025</td>
         <td>2025</td>
         <td>新安江街道-丰产村</td>
         <td>是</td>
       </tr>
       <tr>
         <td>2</td>
         <td>2021-2025</td>
         <td>2025</td>
         <td>新安江街道-丰产村</td>
         <td>是</td>
       </tr>
     </table>
      </div>
    </el-form>
    <div style="height: 50px"></div>
   <div style="text-align: center"><el-button style="width: 120px"  size="medium"  >导出Excel</el-button></div>
  </basic-container>
</template>

<script>
  export default {
    data(){
      return {

        Stat:{
          period:'',
          isFinish:'',
          year:''
        }
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style scoped >
 table {
   width: 100%;
   border-width: 1px;
   border-color: #606266;
   border-style: solid;

 }
 table tr th{
   line-height: 30px;
   height: 30px;

 }
 table tr{
   border-width: 0 0 1px 0;
   border-color: #606266;
   border-style: solid;
 }
 table tr td{
   border-width: 0 1px 0 0;
   border-color: #606266;
   border-style: solid;
   line-height: 30px;
   height: 30px;
   text-align: center;
 }

</style>
