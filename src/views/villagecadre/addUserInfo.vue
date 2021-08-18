<template>
  <basic-container class="ele-info">
    <el-form
      class="r-stu"
      inline
      :rules="rules"
      ref="user"
      :model="user"
      label-width="140px"
      size="small"
    >
      <h4>基本信息</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="标签" prop="label">
            <el-select
              @change="labelChange"
              v-model="user.label"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in labelData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="user.realName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乡镇-村社" prop="levelAreaCode">
            <select-tree
              style="width: 93%"
              :vill="vill"
              :disabled="userInfo.level == 3"
              :options="options"
              v-model="user.levelAreaCode"
              @getAreaCode="getAreaCode"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="user.phone" placeholder="请输入"></el-input>
            <br />
            <span style="font-size: 12px"
              >手机号码须与钉钉手机号码保持一致</span
            >
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="user.status"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in userStatusData"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="labelFlag">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="user.sex">
              <el-radio
                :label="item.value"
                v-for="(item, index) in sexOption"
                :key="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="labelFlag">
        <el-col :span="8">
          <el-form-item label="出生年月" prop="birthday">
            <el-date-picker
              v-model="user.birthday"
              @change="computeAge"
              type="month"
              style="width: 87%"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄">
            <el-input
              :disabled="true"
              v-model="user.age"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族" prop="nation">
            <el-select
              v-model="user.nation"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in nationData"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="labelFlag">
        <el-col :span="8">
          <el-form-item label="出生地" prop="birthPlace">
            <el-input v-model="user.birthPlace" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="现任职务" prop="postIds">
            <el-select
              multiple
              @change="postChange"
              v-model="user.postIds"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in postData"
                :key="item.id"
                :label="item.postName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="籍贯" prop="hometown">
            <el-input v-model="user.hometown" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="labelFlag">
        <el-col :span="8">
          <el-form-item label="健康状况" prop="isHealth">
            <el-select
              v-model="user.isHealth"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in isHealthData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="学历" prop="eduId">
            <el-select
              v-model="user.eduId"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in eduOptionData"
                :key="item.id"
                :label="item.eduName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="毕业院校系及专业" prop="school">
            <el-input v-model="user.school" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="DZZSJ && labelFlag">
        <el-col :span="8">
          <el-form-item label="任职开始日期" prop="postDate">
            <el-date-picker
              v-model="user.postDate"
              type="month"
              style="width: 87%"
              value-format="yyyy-MM-dd"
              @change="computeWork"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="任职年限">
            <el-input
              :disabled="true"
              v-model="user.nx"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人员类别" prop="peopleTypes">
            <el-select
              multiple
              v-model="user.peopleTypes"
              placeholder="请选择"
              style="width: 93%"
            >
              <el-option
                v-for="item in peopeTypeData"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="labelFlag">
        <el-col :span="8">
          <el-form-item label="入党时间">
            <el-date-picker
              style="width: 87%"
              v-model="user.joinDate"
              type="month"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭住址" prop="address">
            <el-input v-model="user.address" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="个人近照" prop="avatar">
            <el-upload
              :headers="token"
              :limit="1"
              class="avue-upload-item"
              action="/api/blade-resource/oss/endpoint/put-file"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :file-list="imagelist"
              :class="{ disabled: uploadDisabled }"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <!--<img width="148px" :src="" alt="" :visible.sync="dialogVisible">-->
            <!--<el-dialog >-->

            <!--</el-dialog>-->
          </el-form-item>
        </el-col>
      </el-row>
      <h4 v-if="labelFlag">简历</h4>
      <el-row v-if="labelFlag">
        <el-table :data="user.resumes" size="small">
          <el-table-column label="开始日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.startDate"
                type="month"
                value-format="yyyy-MM-dd"
                :disabled="scope.row.startDateFlag"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.endDate"
                type="month"
                style="width: 90%"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="300">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.workAddress"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="职务" width="300">
            <template slot-scope="scope">
              <el-input v-model="scope.row.job" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteResumeRow(scope.$index, user.resumes)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button
          @click.native.prevent="addResumeRow()"
          type="text"
          size="small"
        >
          +添加简历
        </el-button>
      </el-row>
      <h4 v-if="labelFlag">主要家庭成员及重要社会关系（配偶、子女、父母）</h4>

      <el-row v-if="labelFlag">
        <el-table :data="user.families" size="small">
          <el-table-column label="称谓" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.label"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="出生年月" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.brithDate"
                type="month"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="政治面貌" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.edu" placeholder="请选择">
                <el-option
                  v-for="item in political"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="工作单位及职务" width="300">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.post"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteFamilyRow(scope.$index, user.families)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button
          @click.native.prevent="addFamilyRow()"
          type="text"
          size="small"
        >
          +添加家庭成员
        </el-button>
      </el-row>

      <h4 v-if="labelFlag">教育培训</h4>
      <el-row v-if="labelFlag">
        <el-table size="small" :data="user.edus" style="width: 100%">
          <el-table-column label="开始日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="培训内容" width="400">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.note"
                placeholder="请输入培训内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteEduRow(scope.$index, user.edus)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button @click.native.prevent="addEduRow()" type="text" size="small">
          +添加培训教育经历
        </el-button>
      </el-row>

      <h4 v-if="labelFlag">奖惩信息</h4>
      <el-row v-if="labelFlag">
        <el-table size="small" :data="user.rewards" style="width: 100%">
          <el-table-column label="开始日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.happenDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="奖惩事由" width="400">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.reason"
                placeholder="请输入奖惩事由"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="上传附件" width="100">
            <template slot-scope="scope">
              <el-upload
                :headers="token"
                class="upload-demo"
                action="/api/blade-resource/oss/endpoint/put-file"
                :on-preview="
                  (res, file, fileList) => {
                    handlePreview(res, file, fileList, scope.$index);
                  }
                "
                :on-success="
                  (res, file, fileList) => {
                    handleAvatarSuccess1(res, file, fileList, scope.$index);
                  }
                "
                :on-remove="
                  (res, file, fileList) => {
                    handleRemove1(res, file, scope.$index);
                  }
                "
                :file-list="scope.row.refileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
              <el-dialog :visible.sync="imgDialog" append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteRewardRow(scope.$index, user.rewards)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button
          @click.native.prevent="addRewardRow()"
          type="text"
          size="small"
        >
          +添加奖惩信息
        </el-button>
      </el-row>

      <h4 v-if="labelFlag">重大报告</h4>
      <el-row v-if="labelFlag">
        <el-table size="small" :data="user.reports" style="width: 100%">
          <el-table-column label="事项发生日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.happenDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="事项类型" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.eventType" placeholder="请选择">
                <el-option
                  v-for="item in reportType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="上报日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.reportDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="处理情况" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.note"
                placeholder="请输入处理情况"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="事项内容" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.deal"
                placeholder="请输入事项内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="上传附件" width="100">
            <template slot-scope="scope">
              <el-upload
                :headers="token"
                class="upload-demo"
                action="/api/blade-resource/oss/endpoint/put-file"
                :on-preview="
                  (res, file, fileList) => {
                    handlePreview2(res, file, fileList, scope.$index);
                  }
                "
                :on-success="
                  (res, file, fileList) => {
                    handleAvatarSuccess2(res, file, fileList, scope.$index);
                  }
                "
                :on-remove="
                  (res, file, fileList) => {
                    handleRemove2(res, file, scope.$index);
                  }
                "
                :file-list="scope.row.refileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
              <el-dialog :visible.sync="imgDialog2" append-to-body="true">
                <img width="100%" :src="dialogImageUrl2" alt="" />
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteReportRow(scope.$index, user.reports)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button
          @click.native.prevent="addReportRow()"
          type="text"
          size="small"
        >
          +添加重大报告事项
        </el-button>
      </el-row>

      <h4 v-if="labelFlag">换届得票</h4>
      <el-row v-if="labelFlag">
        <el-table size="small" :data="user.votes" style="width: 100%">
          <el-table-column label="换届日期" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 90%"
                v-model="scope.row.changeDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="得票率（%）" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.voteRate"
                placeholder="请输入得票率"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteVoteRow(scope.$index, user.votes)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="labelFlag">
        <el-button
          @click.native.prevent="addVoteRow()"
          type="text"
          size="small"
        >
          +添加换届得票信息
        </el-button>
      </el-row>
    </el-form>
    <div v-if="labelFlag" style="height: 50px"></div>
    <div class="r" v-if="labelFlag">
      <div class="r-w">
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
    </div>
    <div v-if="!labelFlag">
      <div class="r-w1">
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
    </div>
  </basic-container>
</template>

<script>
import { judgeFileName } from "@/util/util";
import { mapGetters } from "vuex";
import SelectTree from "@/views/villagecadre/SelectTree.vue";
import {
  nation,
  isHealth,
  userStatus,
  peopeType,
  political,
  reportType,
  sexOption,
  labelData,
} from "@/util/dataTool";
import { getPostList } from "@/api/system/post";
import { eduList } from "@/api/system/edu";
import { add, update } from "@/api/system/user";
import { getAreaTree } from "@/api/common/index";
import { getUser } from "@/api/system/user";
export default {
  name: "addUserInfo",
  components: {
    SelectTree,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    uploadDisabled: function () {
      return this.imagelist.length > 0;
    },
  },
  data() {
    return {
      rules: {
        label: [
          {
            required: true,
            validator: this.validatelabelName,
            trigger: "change",
          },
        ],
        realName: [
          {
            required: true,
            validator: this.validateRealName,
            trigger: "change",
          },
        ],
        sex: [
          { required: true, validator: this.validateSex, trigger: "change" },
        ],
        birthday: [
          {
            required: true,
            validator: this.validateBirthday,
            trigger: "change",
          },
        ],
        nation: [
          { required: true, validator: this.validateNation, trigger: "change" },
        ],
        hometown: [
          {
            required: true,
            validator: this.validateHometown,
            trigger: "change",
          },
        ],
        levelAreaCode: [
          {
            required: true,
            validator: this.validateLevelAreaCode,
            trigger: "change",
          },
        ],
        birthPlace: [
          {
            required: true,
            validator: this.validateBirthPlace,
            trigger: "change",
          },
        ],
        phone: [
          { required: true, validator: this.validatePhone, trigger: "change" },
        ],
        // joinDate:[{required: true, validator: this.validateJoinDate, trigger: 'change'}],
        postIds: [
          { required: true, validator: this.validatePostId, trigger: "change" },
        ],
        isHealth: [
          {
            required: true,
            validator: this.validateIsHealth,
            trigger: "change",
          },
        ],
        eduId: [
          { required: true, validator: this.validateEduId, trigger: "change" },
        ],
        school: [
          { required: true, validator: this.validateSchool, trigger: "change" },
        ],
        address: [
          {
            required: true,
            validator: this.validateAddress,
            trigger: "change",
          },
        ],
        postDate: [
          {
            required: this.DZZSJ,
            validator: this.validatePostDate,
            trigger: "change",
          },
        ],
        peopleTypes: [
          {
            required: this.DZZSJ,
            validator: this.validatePeopleType,
            trigger: "change",
          },
        ],
        status: [
          { required: true, validator: this.validateStatus, trigger: "change" },
        ],
        avatar: [
          { required: true, validator: this.validateavatar, trigger: "change" },
        ],
      },
      options: [],
      token: {
        "Blade-Auth": "",
      },
      imgDialog: false,
      dialogImageUrl: "",
      imgDialog2: false,
      dialogImageUrl2: "",
      imagelist: [],
      onefileList: [],
      uploadDisabled: false,
      // 数据默认字段
      defaultProps: {
        parent: "parentCode", // 父级唯一标识
        value: "code", // 唯一标识
        label: "name", // 标签显示
        children: "children", // 子级
      },
      sexOption: [],
      reportType: [],
      political: [],
      peopeTypeData: [],
      userStatusData: [],
      eduOptionData: [],
      postData: [],
      nationData: [],
      isHealthData: [],
      labelData: [],
      dialogVisible: false,
      labelFlag: true,
      vill: false,
      user: {
        label: "",
        postDate: "",
        id: "",
        realName: "",
        sex: "",
        birthday: "",
        age: "",
        nation: "",
        hometown: "",
        birthPlace: "",
        levelAreaCode: "",
        phone: "",
        joinDate: "",
        postId: "",
        isHealth: "",
        eduId: "",
        school: "",
        address: "",
        workDate: "",
        nx: "",
        peopleTypes: "",
        peopleType: "",
        status: "",
        avatar: "",
        level: "",
        cityCode: "",
        townCode: "",
        villageCode: "",
        gridCode: "",
        votes: [
          {
            changeDate: "",
            voteRate: "",
          },
        ],
        resumes: [
          {
            startDate: "",
            endDate: "",
            workAddress: "",
            job: "",
          },
        ],
        edus: [
          // {
          //   startDate: '',
          //   endDate: '',
          //   note:''
          // }
        ],
        rewards: [
          // {
          //   happenDate:'',
          //   reason:'',
          //   url:''
          // }
        ],
        reports: [
          //   {
          //   happenDate:'',
          //   eventType:'',
          //   reportDate:'',
          //   note:'',
          //   deal:''
          // }
        ],
        families: [
          {
            label: "",
            name: "",
            brithDate: "",
            edu: "",
            post: "",
          },
        ],
      },
      DZZSJ: false, //党组织书记显示隐藏
    };
  },
  mounted() {
    this.initData();
    let str = JSON.parse(localStorage.getItem("saber-token"));
    this.token["Blade-Auth"] = `bearer ${str.content}`;
    if (this.userInfo.level == 3) {
      this.user.level = this.userInfo.level;
    }
  },
  methods: {
    postChange(value) {
      var flag = false;
      for (let i = 0; i < value.length; i++) {
        this.postData.forEach((_) => {
          if (value[i] == _.id) {
            if (_.postName == "党组织书记") {
              this.$set(this, "DZZSJ", true);
              flag = true;
            }
          }
        });
      }
      if (!flag) {
        this.$set(this, "DZZSJ", false);
      }
    },
    validateavatar(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.avatar === "" || this.user.avatar == undefined) {
          callback(new Error("请上传个人近照"));
        } else {
          callback();
        }
      });
    },
    validateStatus(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.status === "" || this.user.status == undefined) {
          callback(new Error("请输入状态"));
        } else {
          callback();
        }
      });
    },
    validatePeopleType(rule, value, callback) {
      debugger;
      this.$nextTick(() => {
        if (this.user.peopleTypes == "" || this.user.peopleTypes == undefined) {
          callback(new Error("请输入人员类别"));
        } else {
          callback();
        }
      });
    },
    validatePostDate(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.postDate == "" || this.user.postDate == undefined) {
          callback(new Error("请输入任职开始日期"));
        } else {
          this.computeWork();
          callback();
        }
      });
    },
    validateAddress(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.address == "" || this.user.address == undefined) {
          callback(new Error("请输入家庭住址"));
        } else {
          callback();
        }
      });
    },
    validateSchool(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.school == "" || this.user.school == undefined) {
          callback(new Error("请输入毕业院校系及专业"));
        } else {
          callback();
        }
      });
    },
    validateEduId(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.eduId == "" || this.user.eduId == undefined) {
          callback(new Error("请输入学历"));
        } else {
          callback();
        }
      });
    },
    validateIsHealth(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.isHealth === "" || this.user.isHealth == undefined) {
          callback(new Error("请输入健康状况"));
        } else {
          callback();
        }
      });
    },
    validatePostId(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.postIds == "" || this.user.postIds == undefined) {
          callback(new Error("请输入现任职务"));
        } else {
          callback();
        }
      });
    },
    // validateJoinDate(rule, value, callback){
    //   this.$nextTick(() => {
    //     if (this.user.joinDate == "" || this.user.joinDate == undefined) {
    //       callback(new Error("请输入民族"));
    //     } else {
    //       callback();
    //     }
    //   })
    // },
    validatePhone(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.phone == "" || this.user.phone == undefined) {
          callback(new Error("请输入手机号码"));
        } else {
          callback();
        }
      });
    },
    validateBirthPlace(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.birthPlace == "" || this.user.birthPlace == undefined) {
          callback(new Error("请输入出生地"));
        } else {
          callback();
        }
      });
    },
    validateLevelAreaCode(rule, value, callback) {
      this.$nextTick(() => {
        if (
          this.user.levelAreaCode == "" ||
          this.user.levelAreaCode == undefined
        ) {
          callback(new Error("请输入乡镇-村社"));
        } else {
          callback();
        }
      });
    },
    validateHometown(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.hometown == "" || this.user.hometown == undefined) {
          callback(new Error("请输入籍贯"));
        } else {
          callback();
        }
      });
    },
    validateNation(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.nation == "" || this.user.nation == undefined) {
          callback(new Error("请输入民族"));
        } else {
          callback();
        }
      });
    },
    validateBirthday(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.birthday == "" || this.user.birthday == undefined) {
          callback(new Error("请输入出生年月"));
        } else {
          this.computeAge();
          callback();
        }
      });
    },

    validateSex(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.sex === "" || this.user.sex == undefined) {
          callback(new Error("请输入性别"));
        } else {
          callback();
        }
      });
    },
    validatelabelName(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.label === "" || this.user.label === undefined) {
          callback(new Error("请输入标签"));
        } else {
          callback();
        }
      });
    },
    validateRealName(rule, value, callback) {
      this.$nextTick(() => {
        if (this.user.realName == "" || this.user.realName == undefined) {
          callback(new Error("请输入姓名"));
        } else {
          callback();
        }
      });
    },
    getAreaCode(
      areaCode,
      areaLevel,
      cityCode,
      streetCode,
      villageCode,
      gridCode
    ) {
      this.user.levelAreaCode = areaCode;
      this.user.level = areaLevel;
      this.user.cityCode = cityCode;
      this.user.townCode = streetCode;
      this.user.villageCode = villageCode;
      this.user.gridCode = gridCode;
    },
    handleBack() {
      this.$router.$avueRouter.closeTag();
      this.$router.push({ path: "/system/user" });
    },
    submit() {
      let that = this;
      if (this.user.label != 4) {
        this.user.votes = [];
        this.user.resumes = [];
        this.user.edus = [];
        this.user.rewards = [];
        this.user.reports = [];
        this.user.families = [];
      }
      // if(this.user.label==3){
      //   this.user.level=5;
      // }
      this.$refs.user.validate(function (valid) {
        if (valid) {
          var post = that.user.postIds;
          var postStr = "";
          if (post) {
            for (let i = 0; i < post.length; i++) {
              postStr += post[i] + ",";
            }
            that.$set(
              that.user,
              "postId",
              postStr.substring(0, postStr.length - 1)
            );
          }
          var people = that.user.peopleTypes;
          if (people) {
            var peopleStr = "";
            for (let i = 0; i < people.length; i++) {
              peopleStr += people[i] + ";";
            }
            that.$set(
              that.user,
              "peopleType",
              peopleStr.substring(0, peopleStr.length - 1)
            );
          }
          if (that.$route.query.id) {
            update(that.user).then((res) => {
              if (res.data.success) {
                that.$message({
                  type: "success",
                  message: "修改成功!",
                });
                that.$router.$avueRouter.closeTag();
                that.$router.push({ path: "/system/user" });
              }
            });
          } else {
            add(that.user).then((res) => {
              if (res.data.success) {
                that.$message({
                  type: "success",
                  message: "新增成功!",
                });
                that.$router.$avueRouter.closeTag();
                that.$router.push({ path: "/system/user" });
              }
            });
          }
        }
      });
    },
    initData() {
      let that = this;
      getPostList().then((res) => {
        this.postData = res.data.data;
      });
      getAreaTree().then((res) => {
        this.options = res.data.data;
        this.user.levelAreaCode = this.$route.query.code;
        this.user.level = this.$route.query.level;
        if (that.$route.query.id) {
          getUser(that.$route.query.id).then((res) => {
            that.user = res.data.data;
            that.labelChange();
            that.computeWork();
            let postStr = that.user.postId;
            if (postStr) {
              let post = postStr.split(",");
              that.$set(that.user, "postIds", post);
              that.postChange(that.user.postIds);
              if (that.DZZSJ && this.user.resumes.length > 0) {
                this.user.resumes[0].startDate = this.user.postDate;
                this.user.resumes[0]["startDateFlag"] = true;
              }
            }
            let peopleStr = that.user.peopleType;
            if (peopleStr) {
              let people = peopleStr.split(";");
              that.$set(that.user, "peopleTypes", people);
            }
            if (this.user.avatar) {
              this.uploadDisabled = true;
              this.imagelist = [{ url: this.user.avatar }];
            }
            this.$set(this.user, "levelAreaCode", res.data.data.levelAreaCode);
            let rewards = res.data.data.rewards;
            for (let i = 0; i < rewards.length; i++) {
              if (this.user.rewards[i].url == "") {
                this.rewards[i].refileList = [];
              } else {
                let arr = this.user.rewards[i].url.split(",");
                for (let k = 0; k < arr.length; k++) {
                  if (k == 0) {
                    this.user.rewards[i].refileList = [{ url: arr[k] }];
                  } else {
                    this.user.rewards[i].refileList.push({ url: arr[k] });
                  }
                }
              }
            }
          });
        } else {
          this.user.status = 0;
        }
      });
      this.sexOption = sexOption;
      this.peopeTypeData = peopeType;
      this.userStatusData = userStatus;

      eduList().then((res) => {
        this.eduOptionData = res.data.data;
      });

      this.nationData = nation;
      this.isHealthData = isHealth;
      this.political = political;
      this.reportType = reportType;
      this.labelData = labelData;
    },
    deleteFamilyRow(index, rows) {
      rows.splice(index, 1);
    },
    addFamilyRow() {
      this.user.families.push({
        label: "",
        name: "",
        brithDate: "",
        edu: "",
        post: "",
      });
    },
    deleteVoteRow(index, rows) {
      rows.splice(index, 1);
    },
    addVoteRow() {
      this.user.votes.push({
        changeDate: "",
        voteRate: "",
      });
    },
    deleteReportRow(index, rows) {
      rows.splice(index, 1);
    },
    addReportRow() {
      this.user.reports.push({
        happenDate: "",
        eventType: "",
        reportDate: "",
        note: "",
        deal: "",
        refileList: [],
      });
    },
    deleteRewardRow(index, rows) {
      rows.splice(index, 1);
    },
    addRewardRow() {
      this.user.rewards.push({
        happenDate: "",
        reason: "",
        url: "",
        refileList: [],
      });
    },
    deleteEduRow(index, rows) {
      rows.splice(index, 1);
    },
    addEduRow() {
      this.user.edus.push({
        startDate: "",
        endDate: "",
        note: "",
      });
    },
    deleteResumeRow(index, rows) {
      rows.splice(index, 1);
    },
    addResumeRow() {
      this.user.resumes.push({
        startDate: "",
        endDate: "",
        workAddress: "",
        job: "",
      });
      if (this.user.resumes.length > 0) {
        this.user.resumes[0].startDate = this.user.postDate;
        this.user.resumes[0]["startDateFlag"] = true;
      }
    },
    labelChange() {
      if (this.user.label == 3 && this.userInfo.level != 3) {
        this.vill = true;
        //  this.user.levelAreaCode='';
      } else {
        this.vill = false;
      }
      if (this.user.label == 4) {
        this.labelFlag = true;
      } else {
        this.labelFlag = false;
      }
    },
    computeAge() {
      if (!this.user.birthday || this.user.birthday == "") {
        this.$set(this.user, "age", 0);
      } else {
        if (typeof this.user.birthday == "string") {
          let s = this.user.birthday.replace(/-/g, "/");
          var date = new Date(s);
          this.$set(
            this.user,
            "age",
            parseInt((new Date().getTime() - date.getTime()) / 31536000000)
          );
        } else {
          this.$set(
            this.user,
            "age",
            parseInt(
              (new Date().getTime() - this.user.birthday.getTime()) /
                31536000000
            )
          );
        }
      }
    },
    computeWork() {
      if (!this.user.postDate || this.user.postDate == "") {
        this.$set(this.user, "age", 0);
      } else {
        if (this.user.postDate && this.user.resumes.length > 0) {
          this.user.resumes[0].startDate = this.user.postDate;
          this.user.resumes[0]["startDateFlag"] = true;
        }
        if (typeof this.user.postDate == "string") {
          let s = this.user.postDate.replace(/-/g, "/");
          var date = new Date(s);
          this.$set(
            this.user,
            "nx",
            parseInt((new Date().getTime() - date.getTime()) / 31536000000)
          );
        } else {
          this.$set(
            this.user,
            "nx",
            parseInt(
              (new Date().getTime() - this.user.postDate.getTime()) /
                31536000000
            )
          );
        }
      }
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res) {
        this.user.avatar = res.data.link;
        this.imagelist = [{ url: this.user.avatar }];
        this.uploadDisabled = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.uploadDisabled = false;
    },
    handleRemove1(res, file, index) {
      debugger;
      if (res) {
        if (file && file.length > 0) {
          let url = "";
          this.user.rewards[index].refileList = [];
          for (let i = 0; i < file.length; i++) {
            if (this.user.rewards[index].refileList) {
              if (file[i].url) {
                this.user.rewards[index].refileList.push({ url: file[i].url });
                url += file[i].url + ",";
              } else {
                this.user.rewards[index].refileList.push({
                  url: file[i].response.data.link,
                });
                url += file[i].response.data.link + ",";
              }
            } else {
              this.user.rewards[index].refileList = [
                { url: file[i].response.data.link },
              ];
            }
          }
          this.user.rewards[index].url = url.substring(0, url.length - 1);
        } else {
          this.user.rewards[index].url = "";
        }
      }
    },
    handlePreview(res, file, fileList, index) {
      console.log("res", res);
      console.log("file", file);
      console.log("fileList", fileList);
      console.log("index", index);
      if (res.status == "success") {
        if (res.response) {
          this.dialogImageUrl = res.response.data.link;
        } else {
          this.dialogImageUrl = res.url;
        }
        var ext = judgeFileName(this.dialogImageUrl);
        if (ext) {
          debugger;
          this.imgDialog = true;
        } else {
          window.location.href = this.dialogImageUrl;
        }
      }
    },
    handleAvatarSuccess1(res, file, fileList, index) {
      if (res) {
        if (fileList && fileList.length > 0) {
          let url = "";
          this.user.rewards[index].refileList = [];
          for (let i = 0; i < fileList.length; i++) {
            if (this.user.rewards[index].refileList) {
              if (fileList[i].url) {
                this.user.rewards[index].refileList.push({
                  url: fileList[i].url,
                });
                url += fileList[i].url + ",";
              } else {
                this.user.rewards[index].refileList.push({
                  url: fileList[i].response.data.link,
                });
                url += fileList[i].response.data.link + ",";
              }
            } else {
              this.user.rewards[index].refileList = [
                { url: fileList[i].response.data.link },
              ];
            }
          }
          this.user.rewards[index].url = url.substring(0, url.length - 1);
        }
      }
    },

    handleRemove2(res, file, index) {
      if (res) {
        if (file && file.length > 0) {
          let url = "";
          this.user.reportDate[index].refileList = [];
          for (let i = 0; i < file.length; i++) {
            if (this.user.reportDate[index].refileList) {
              if (file[i].url) {
                this.user.reportDate[index].refileList.push({
                  url: file[i].url,
                });
                url += file[i].url + ",";
              } else {
                this.user.reportDate[index].refileList.push({
                  url: file[i].response.data.link,
                });
                url += file[i].response.data.link + ",";
              }
            } else {
              this.user.reportDate[index].refileList = [
                { url: file[i].response.data.link },
              ];
            }
          }
          this.user.reportDate[index].url = url.substring(0, url.length - 1);
        } else {
          this.user.reportDate[index].url = "";
        }
      }
    },
    handlePreview2(res, file, fileList, index) {
      console.log("res", res);
      console.log("file", file);
      console.log("fileList", fileList);
      console.log("index", index);
      if (res.status == "success") {
        if (res.response) {
          this.dialogImageUrl = res.response.data.link;
        } else {
          this.dialogImageUrl = res.url;
        }
        var ext = judgeFileName(this.dialogImageUrl);
        if (ext) {
          debugger;
          this.imgDialog = true;
        } else {
          window.location.href = this.dialogImageUrl;
        }
      }
    },
    handleAvatarSuccess2(res, file, fileList, index) {
      if (res) {
        if (fileList && fileList.length > 0) {
          let url = "";
          this.user.reportDate[index].refileList = [];
          for (let i = 0; i < fileList.length; i++) {
            if (this.user.reportDate[index].refileList) {
              if (fileList[i].url) {
                this.user.reportDate[index].refileList.push({
                  url: fileList[i].url,
                });
                url += fileList[i].url + ",";
              } else {
                this.user.reportDate[index].refileList.push({
                  url: fileList[i].response.data.link,
                });
                url += fileList[i].response.data.link + ",";
              }
            } else {
              this.user.reportDate[index].refileList = [
                { url: fileList[i].response.data.link },
              ];
            }
          }
          this.user.reportDate[index].url = url.substring(0, url.length - 1);
        }
      }
    },
  },
};
</script >
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
<style scoped>
.r {
  position: fixed;
  height: 60px;
  bottom: 0;
  width: 82%;
  background-color: #ffffff;
  z-index: 9999;
}
.r-w {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 230px;
  padding-bottom: 10px;
}
.r-w1 {
  width: 230px;
  margin-left: 43%;
}
.r-stu {
  margin-bottom: 50px;
}
</style>
