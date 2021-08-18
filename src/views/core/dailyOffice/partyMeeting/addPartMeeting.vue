<template>
  <basic-container>
    <el-form label-width="135px" :model="meetingForm" size="small">
      <el-row>
        <el-col span="8">
          <el-form-item label="活动类别" required>
            <el-select v-model="meetingForm.meetingType" clearable>
              <el-option label="村务联席会议" value=""></el-option>
              <el-option label="集中审账会议" value=""></el-option>
              <el-option label="村监会会议" value=""></el-option>
              <el-option label="村民代表会议" value=""></el-option>
              <el-option label="网格会议" value=""></el-option>
              <el-option label="其他" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="16">
          <el-form-item label="会议起止时间" required>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                v-model="meetingForm.startTime"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="12">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="meetingForm.endTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="8">
          <el-form-item label="街道-村社" required>
            <select-tree
              :options="options"
              v-model="meetingForm.userId"
              @getAreaCode="getAreaCode"
              :props="defaultProps"
              style="width: 64%"
            />
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="参会人员" required>
            <el-select
              v-model="meetingForm.userId"
              multiple
              style="width: 100%"
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                v-for="item in nameList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="签到人员">
            <el-select
              v-model="meetingForm.userId"
              multiple
              style="width: 100%"
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                v-for="item in nameList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="会议地点" required>
            <el-input v-model="meetingForm.adress"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="会议状态" required>
            <el-select clearable v-model="meetingForm.meetRemind">
              <el-option label="已完成" value=""></el-option>
              <el-option label="未开始" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="活动详情" required>
          <el-input type="textarea" v-model="meetingForm.meetTitle"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div style="text-align: center">
      <el-button
        style="width: 100px"
        @click="submit"
        size="medium"
        type="primary"
        v-if="!leaveFlag"
        >提交</el-button
      >
      <el-button
        style="width: 100px"
        @click="handleBack()"
        size="medium"
        type="primary"
        >返回</el-button
      >
    </div>
  </basic-container>
</template>

<script>
import { nameList } from "@/api/system/user";
import { getAreaTree } from "@/api/common/index";
import SelectTree from "@/views/villagecadre/SelectTree.vue";
export default {
  components: {
    SelectTree,
  },
  data() {
    return {
      defaultProps: {
        parent: "parentCode", // 父级唯一标识
        value: "code", // 唯一标识
        label: "name", // 标签显示
        children: "children", // 子级
      },
      nameList: [],
      options: [],
      meetingForm: {
        adress: "",
        radio: "",
      },
    };
  },
  methods: {
    getAreaCode(
      areaCode,
      areaLevel,
      cityCode,
      streetCode,
      villageCode,
      gridCode
    ) {},
  },
  mounted() {
    getAreaTree().then((res) => {
      this.options = res.data.data;
    });
    nameList().then((res) => {
      this.nameList = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.el-col .line {
  text-align: center;
}
</style>
