<template>
  <div>
    <p style="color: #ffffff; margin-top: 0">
      {{ dutiesIndexPopData.name }}履职指数
      <span style="font-size: 14px">{{ dutiesIndexPopData.param10 }}</span
      >分
    </p>
    <el-row style="color: #ffffff">
      <el-col span="18">类型</el-col>
      <el-col span="6">分数</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">值坐班分数</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param1 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">村务联席会议</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param2 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">主题党日/党组织会议</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param3 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">集中审账</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param4 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">村监会运行</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param5 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">村民代表会议</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param6 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">村民满意度</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param7 }}</el-col>
    </el-row>
    <el-row style="color: #87c4fc">
      <el-col span="18">上级研判</el-col>
      <el-col span="6">{{ dutiesIndexPopData.param9 }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    dutiesIndexPopData: {
      type: Object,
    },
  },
};
</script>

<style>
</style>