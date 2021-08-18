<template>
  <el-tooltip :placement="direction" >
    <div  v-if="labelName.indexOf('空缺职位')==-1&&labelName.indexOf('亚健康村社')==-1&&labelName.indexOf('不健康村社')==-1&&labelName.indexOf('书记空缺')==-1" slot="content" style="width: 170px;">
        <div  v-for="item in infoArr" :key="item.uuid">
          <el-row>
            <el-col span="12">{{ item.streetName }}</el-col>
            <el-col span="4">{{ item.num }}</el-col>
            <el-col span="8">{{ item.ratio }}%</el-col>
          </el-row>
        </div>
    </div>
    <div  v-if="userInfo.level==1&&labelName.indexOf('空缺职位')!=-1&&(areaCode.length==0||areaCode.length==1)" slot="content" style="width: 170px;">
      <div  v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="12">{{ item.streetName }}</el-col>
          <el-col span="4">{{ item.num }}</el-col>
          <el-col span="8">{{ item.ratio }}%</el-col>
        </el-row>
      </div>
    </div>
    <div  v-if="userInfo.level==1&&labelName.indexOf('空缺职位')!=-1&&areaCode.length==2" slot="content" style="width: 340px;">
        <div   v-for="item in infoArr" :key="item.uuid">
          <el-row>
            <el-col span="9">{{ item.villageName }}</el-col>
            <el-col span="15">{{ item.postName }}</el-col>
          </el-row>
        </div>
    </div>
    <div  v-if="userInfo.level==2&&labelName.indexOf('空缺职位')!=-1&&(areaCode.length==0||areaCode.length==1)" slot="content" style="width: 340px;">
      <div   v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="9">{{ item.villageName }}</el-col>
          <el-col span="15">{{ item.postName }}</el-col>
        </el-row>
      </div>
    </div>

    <div  v-if="labelName.indexOf('书记空缺')!=-1" slot="content" style="width: 170px;">
      <div   v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="24">{{ item.villageName }}</el-col>
        </el-row>
      </div>
    </div>

    <div  v-if="userInfo.level==1&&(labelName.indexOf('不健康村社')!=-1||labelName.indexOf('亚健康村社')!=-1)&&(areaCode.length==0||areaCode.length==1)" slot="content" style="width: 170px;">
      <div  v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="12">{{ item.streetName }}</el-col>
          <el-col span="4">{{ item.num }}</el-col>
          <el-col span="8">{{ item.ratio }}%</el-col>
        </el-row>
      </div>
    </div>
    <div  v-if="userInfo.level==1&&(labelName.indexOf('亚健康村社')!=-1||labelName.indexOf('不健康村社')!=-1)&&areaCode.length==2" slot="content" style="width: 170px;">
      <div   v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="24">{{ item.streetName }}-{{ labelName.indexOf('不健康村社')!=-1?item.villageStr:item.villageName}}</el-col>
        </el-row>
      </div>
    </div>
    <div  v-if="(labelName.indexOf('亚健康村社')!=-1||labelName.indexOf('不健康村社')!=-1)&&userInfo.level==2" slot="content" style="width: 170px;">
      <div   v-for="item in infoArr" :key="item.uuid">
        <el-row>
          <el-col span="24">{{ item.streetName }}-{{ labelName.indexOf('不健康村社')!=-1?item.villageStr:item.villageName}}</el-col>
        </el-row>
      </div>
    </div>



    <el-button type="text" size="small" style="color: #87c4fc">
      <slot>
        <div style="display: flex">
          <div style="width: 90px; text-align: left">{{ labelName }}</div>
          <div>{{ num }}</div>
        </div>
      </slot>
    </el-button>
  </el-tooltip>
</template>

<script>
  import { mapGetters } from "vuex";
export default {
  props: {
    areaCode:{
      type:Array
    },
    num: {
      type: Number,
    },
    infoArr: {
      type: Array,
    },
    labelName: {
      type: String,
    },
    direction: {
      default: "top",
    },
  },
  watch:{
    areaCode:function() {
      debugger
      console.log("areaCode===="+this.areaCode.length)
      console.log("userInfo.level"+this.userInfo.level)
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  padding: 5px 0;
}
</style>
