<template>
  <div class="healthIndex">
    <el-row>
      <el-col :span="4" v-if="userInfo.level != 3">
        <basic-container block="true">
          <city-list @areaCode="areaCode" />
        </basic-container>
        <!--<div class="box">-->
        <!--<el-scrollbar>-->
        <!--<basic-container>-->
        <!--<avue-tree :option="treeOption"  :data="treeData" @node-click="nodeClick"/>-->
        <!--</basic-container>-->
        <!--</el-scrollbar>-->
        <!--</div>-->
      </el-col>
      <el-col :span="userInfo.level == 3 ? 24 : 20">
        <basic-container block="true" :bodyStyle="bodyStyle">
          <avue-crud
            :option="option"
            :search.sync="search"
            :table-loading="loading"
            :data="data"
            ref="crud"
            v-model="form"
            :permission="permissionList"
            @row-del="rowDel"
            @row-update="rowUpdate"
            @row-save="rowSave"
            :before-open="beforeOpen"
            :page.sync="page"
            @search-change="searchChange"
            @search-reset="searchReset"
            @selection-change="selectionChange"
            @current-change="currentChange"
            @size-change="sizeChange"
            @refresh-change="refreshChange"
            @on-load="onLoad"
          >
            <template slot="menuLeft">
              <!--<el-button type="danger"-->
              <!--size="small"-->
              <!--plain-->
              <!--icon="el-icon-delete"-->
              <!--v-if="permission.user_delete"-->
              <!--@click="handleDelete">删 除-->
              <!--</el-button>-->
              <!--<el-button type="info"-->
              <!--size="small"-->
              <!--plain-->
              <!--v-if="permission.user_role"-->
              <!--icon="el-icon-user"-->
              <!--@click="handleGrant">角色配置-->
              <!--</el-button>-->
              <!--<el-button type="info"-->
              <!--size="small"-->
              <!--plain-->
              <!--v-if="permission.user_reset"-->
              <!--icon="el-icon-refresh"-->
              <!--@click="handleReset">密码重置-->
              <!--</el-button>-->
              <!--<el-button type="info"-->
              <!--size="small"-->
              <!--plain-->
              <!--v-if="userInfo.role_name.includes('admin')"-->
              <!--icon="el-icon-setting"-->
              <!--@click="handlePlatform">平台配置-->
              <!--</el-button>-->
              <el-button
                type="el-button el-button--primary el-button--small"
                size="small"
                @click="addUserInfo"
                icon="el-icon-plus"
              >
                新增
              </el-button>
              <!--// v-if="userInfo.role_name.includes('admin')"-->
              <el-button
                type="success"
                size="small"
                plain
                icon="el-icon-upload2"
                @click="handleImport"
                >导入
              </el-button>
              <el-button
                type="warning"
                size="small"
                plain
                icon="el-icon-download"
                @click="handleExport"
                >导出（Excel）
              </el-button>
              <el-button
                type="info"
                size="small"
                plain
                icon="el-icon-download"
                @click="handleExport"
                >导出（Word）
              </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="handleEdit(scope.row, scope.index)"
                >任职登记备案
              </el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                size="small"
                @click.stop="rowDel(scope.row, scope.index)"
                >删除
              </el-button>
            </template>
            <template slot-scope="{ row }" slot="tenantName">
              <el-tag>{{ row.tenantName }}</el-tag>
            </template>
            <template slot-scope="{ row }" slot="roleName">
              <el-tag>{{ row.roleName }}</el-tag>
            </template>
            <template slot-scope="{ row }" slot="deptName">
              <el-tag>{{ row.deptName }}</el-tag>
            </template>
            <template slot-scope="{ row }" slot="userTypeName">
              <el-tag>{{ row.userTypeName }}</el-tag>
            </template>
          </avue-crud>
          <el-dialog
            title="用户角色配置"
            append-to-body
            :visible.sync="roleBox"
            width="345px"
          >
            <el-tree
              :data="roleGrantList"
              show-checkbox
              check-strictly
              default-expand-all
              node-key="id"
              ref="treeRole"
              :default-checked-keys="roleTreeObj"
              :props="props"
            >
            </el-tree>

            <span slot="footer" class="dialog-footer">
              <el-button @click="roleBox = false">取 消</el-button>
              <el-button type="primary" @click="submitRole">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="用户数据导入"
            append-to-body
            :visible.sync="excelBox"
            width="555px"
          >
            <avue-form
              :option="excelOption"
              v-model="excelForm"
              :upload-after="uploadAfter"
            >
              <template slot="excelTemplate">
                <el-button type="primary" @click="handleTemplate">
                  点击下载<i class="el-icon-download el-icon--right"></i>
                </el-button>
              </template>
            </avue-form>
          </el-dialog>
          <el-dialog
            title="用户平台配置"
            append-to-body
            :visible.sync="platformBox"
          >
            <avue-crud
              :option="platformOption"
              :table-loading="platformLoading"
              :data="platformData"
              ref="platformCrud"
              v-model="platformForm"
              :before-open="platformBeforeOpen"
              :page.sync="platformPage"
              :permission="platformPermissionList"
              @row-update="platformRowUpdate"
              @search-change="platformSearchChange"
              @search-reset="platformSearchReset"
              @selection-change="platformSelectionChange"
              @current-change="platformCurrentChange"
              @size-change="platformSizeChange"
              @refresh-change="platformRefreshChange"
              @on-load="platformOnLoad"
            >
              <template slot-scope="{ row }" slot="tenantName">
                <el-tag>{{ row.tenantName }}</el-tag>
              </template>
              <template slot-scope="{ row }" slot="userTypeName">
                <el-tag>{{ row.userTypeName }}</el-tag>
              </template>
            </avue-crud>
          </el-dialog>
        </basic-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CityList from "@/components/cityList.vue";
import { peopeType, userStatus, userStatus1, labelData } from "@/util/dataTool";
import {
  getList,
  getUser,
  getUserPlatform,
  remove,
  update,
  updatePlatform,
  add,
  grant,
  resetPassword,
  importUser
} from "@/api/system/user";
import { getAreaTree } from "@/api/common/index";
import { getDeptTree, getDeptLazyTree } from "@/api/system/dept";
import { getRoleTree } from "@/api/system/role";
import { getPostList } from "@/api/system/post";
import { mapGetters } from "vuex";
import website from "@/config/website";
import { getToken } from "@/util/auth";

export default {
  components: {
    CityList,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      token: {
        "Blade-Auth": "",
      },
      querys: {},
      form: {},
      search: {},
      roleBox: false,
      excelBox: false,
      platformBox: false,
      initFlag: true,
      selectionList: [],
      query: {},
      loading: true,
      platformLoading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      platformPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      init: {
        roleTree: [],
        deptTree: [],
      },
      props: {
        label: "title",
        value: "key",
      },
      roleGrantList: [],
      roleTreeObj: [],
      levelAreaCode: "",
      areaLevel: "",
      treeData: [],
      treeOption: {
        defaultExpandAll: true,
        nodeKey: "id",
        // lazy: true,
        // treeLoad: function (node, resolve) {
        //   const parentId = (node.level === 0) ? 0 : node.data.id;
        //   getDeptLazyTree(parentId).then(res => {
        //     resolve(res.data.data.map(item => {
        //       return {
        //         ...item,
        //         leaf: !item.hasChildren
        //       }
        //     }))
        //   });
        // },
        addBtn: false,
        menu: false,
        size: "small",
        props: {
          labelText: "标题",
          label: "name",
          value: "code",
          children: "children",
        },
      },
      option: {
        searchShow: false,
        columnBtn: false,
        refreshBtn: false,
        indexLabel: "序号",
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        addBtn: false,
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        menuWidth: 180,
        //dialogType: 'drawer',
        dialogClickModal: false,
        column: [
          {
            label: "标签",
            prop: "label",
            search: true,
            display: false,
            dicData: labelData,
            type: "select",
          },
          {
            label: "姓名",
            prop: "realName",
            search: true,
            display: false,
          },
          {
            label: "性别",
            prop: "sex",
            search: true,
            display: false,
            type: "select",
            width: 50,
            dicData: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 2,
              },
            ],
          },
          {
            label: "年龄",
            prop: "age",
          },
          {
            label: "年龄",
            prop: "ageType",
            search: true,
            display: false,
            hide: true,
            type: "select",
            dicData: [
              {
                label: "小于等于35岁",
                value: 0,
              },
              {
                label: "大于35岁小于60岁",
                value: 1,
              },
              {
                label: "大于等于60岁",
                value: 2,
              },
            ],
          },
          {
            label: "乡镇-村社",
            prop: "areaName",
            display: false,
            width: 180,
          },
          {
            label: "职务",
            prop: "postId",
            dicUrl: "/api/blade-system/post/select1",
            width: 90,
            type: "select",
            props: {
              label: "postName",
              value: "id",
            },
            search: true,
            display: false,
            hide: true,
          },

          {
            label: "职务",
            prop: "postStr",
            width: 180,
            display: false,
            overHidden: true,
          },
          {
            label: "学历",
            prop: "eduName",
            dicUrl: "/api/edu/list",
            props: {
              label: "eduName",
              value: "id",
            },
            searchMultiple: true,
            type: "select",
            search: true,
            display: false,
          },
          {
            label: "入党时间",
            prop: "joinDateStr",
            search: true,
            display: false,
            type: "monthrange",
            searchSpan: 9,
            searchRange: true,
            search: true,
          },
          {
            label: "任职时间",
            prop: "postDateStr",
            search: true,
            display: false,
            type: "monthrange",
            searchSpan: 9,
            searchRange: true,
            search: true,
          },
          {
            label: "任职年限",
            prop: "postYearStr",
            display: false,
            search: true,
          },
          {
            label: "人员类别",
            prop: "peopleType",
            search: true,
            display: false,
            type: "select",
            dicData: peopeType,
            width: 90,
          },

          {
            label: "手机号码",
            prop: "phone",
            display: false,
            width: 100,
          },
          {
            label: "状态",
            prop: "status",
            slot: true,
            type: "select",
            search: true,
            display: false,
            dicData: userStatus1,
          },
          {
            label: "创建人",
            prop: "creater",
            display: false,
          },
          {
            label: "创建时间",
            prop: "createTime",
            display: false,
            width: 140,
          },
          {
            label: "用户平台",
            type: "select",
            dicUrl: "/api/blade-system/dict/dictionary?code=user_type",
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            dataType: "number",
            // search: true,
            hide: true,
            display: false,
            prop: "userType",
            rules: [
              {
                required: true,
                message: "请选择用户平台",
                trigger: "blur",
              },
            ],
          },
        ],
        // group: [
        //   {
        //     label: '基础信息',
        //     prop: 'baseInfo',
        //     icon: 'el-icon-user-solid',
        //     column: [
        //       {
        //         label: "所属租户",
        //         prop: "tenantId",
        //         type: "tree",
        //         dicUrl: "/api/blade-system/tenant/select",
        //         props: {
        //           label: "tenantName",
        //           value: "tenantId"
        //         },
        //         hide: !website.tenantMode,
        //         addDisplay: website.tenantMode,
        //         editDisplay: website.tenantMode,
        //         viewDisplay: website.tenantMode,
        //         rules: [{
        //           required: true,
        //           message: "请输入所属租户",
        //           trigger: "click"
        //         }],
        //         span: 24,
        //       },
        //       {
        //         label: "登录账号",
        //         prop: "account",
        //         rules: [{
        //           required: true,
        //           message: "请输入登录账号",
        //           trigger: "blur"
        //         }],
        //       },
        //       {
        //         label: "用户平台",
        //         type: "select",
        //         dicUrl: "/api/blade-system/dict/dictionary?code=user_type",
        //         props: {
        //           label: "dictValue",
        //           value: "dictKey"
        //         },
        //         dataType: "number",
        //         slot: true,
        //         prop: "userType",
        //         rules: [{
        //           required: true,
        //           message: "请选择用户平台",
        //           trigger: "blur"
        //         }]
        //       },
        //       {
        //         label: '密码',
        //         prop: 'password',
        //         hide: true,
        //         editDisplay: false,
        //         viewDisplay: false,
        //         rules: [{required: true, validator: validatePass, trigger: 'blur'}]
        //       },
        //       {
        //         label: '确认密码',
        //         prop: 'password2',
        //         hide: true,
        //         editDisplay: false,
        //         viewDisplay: false,
        //         rules: [{required: true, validator: validatePass2, trigger: 'blur'}]
        //       },
        //     ]
        //   },
        //   {
        //     label: '详细信息',
        //     prop: 'detailInfo',
        //     icon: 'el-icon-s-order',
        //     column: [
        //       {
        //         label: "用户昵称",
        //         prop: "name",
        //         hide: true,
        //         rules: [{
        //           required: true,
        //           message: "请输入用户昵称",
        //           trigger: "blur"
        //         }]
        //       },
        //       {
        //         label: "用户姓名",
        //         prop: "realName",
        //         rules: [{
        //           required: true,
        //           message: "请输入用户姓名",
        //           trigger: "blur"
        //         }, {
        //           min: 2,
        //           max: 5,
        //           message: '姓名长度在2到5个字符'
        //         }]
        //       },
        //       {
        //         label: "手机号码",
        //         prop: "phone",
        //         overHidden: true
        //       },
        //       {
        //         label: "电子邮箱",
        //         prop: "email",
        //         hide: true,
        //         overHidden: true
        //       },
        //       {
        //         label: "用户性别",
        //         prop: "sex",
        //         type: "select",
        //         dicData: [
        //           {
        //             label: "男",
        //             value: 1
        //           },
        //           {
        //             label: "女",
        //             value: 2
        //           },
        //           {
        //             label: "未知",
        //             value: 3
        //           }
        //         ],
        //         hide: true
        //       },
        //       {
        //         label: "用户生日",
        //         type: "date",
        //         prop: "birthday",
        //         format: "yyyy-MM-dd hh:mm:ss",
        //         valueFormat: "yyyy-MM-dd hh:mm:ss",
        //         hide: true
        //       },
        //       {
        //         label: "账号状态",
        //         prop: "statusName",
        //         hide: true,
        //         display: false
        //       }
        //     ]
        //   },
        //   {
        //     label: '职责信息',
        //     prop: 'dutyInfo',
        //     icon: 'el-icon-s-custom',
        //     column: [
        //       {
        //         label: "用户编号",
        //         prop: "code",
        //       },
        //       {
        //         label: "所属角色",
        //         prop: "roleId",
        //         multiple: true,
        //         type: "tree",
        //         dicData: [],
        //         props: {
        //           label: "title"
        //         },
        //         checkStrictly: true,
        //         slot: true,
        //         rules: [{
        //           required: true,
        //           message: "请选择所属角色",
        //           trigger: "click"
        //         }]
        //       },
        //       {
        //         label: "所属部门",
        //         prop: "deptId",
        //         type: "tree",
        //         multiple: true,
        //         dicData: [],
        //         props: {
        //           label: "title"
        //         },
        //         checkStrictly: true,
        //         slot: true,
        //         rules: [{
        //           required: true,
        //           message: "请选择所属部门",
        //           trigger: "click"
        //         }]
        //       },
        //       {
        //         label: "所属岗位",
        //         prop: "postId",
        //         type: "tree",
        //         multiple: true,
        //         dicData: [],
        //         props: {
        //           label: "postName",
        //           value: "id"
        //         },
        //         rules: [{
        //           required: true,
        //           message: "请选择所属岗位",
        //           trigger: "click"
        //         }],
        //       },
        //     ]
        //   },
        // ]
      },
      data: [],
      platformQuery: {},
      platformSelectionList: [],
      platformData: [],
      platformForm: {},
      platformOption: {
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        dialogClickModal: false,
        menuWidth: 120,
        editBtnText: "配置",
        column: [
          {
            label: "登录账号",
            prop: "account",
            search: true,
            display: false,
          },
          {
            label: "所属租户",
            prop: "tenantName",
            slot: true,
            display: false,
          },
          {
            label: "用户姓名",
            prop: "realName",
            search: true,
            display: false,
          },
          {
            label: "用户平台",
            prop: "userTypeName",
            slot: true,
            display: false,
          },
          {
            label: "用户平台",
            type: "select",
            dicUrl: "/api/blade-system/dict/dictionary?code=user_type",
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            dataType: "number",
            search: true,
            hide: true,
            display: false,
            prop: "userType",
            rules: [
              {
                required: true,
                message: "请选择用户平台",
                trigger: "blur",
              },
            ],
          },
          {
            label: "用户拓展",
            prop: "userExt",
            type: "textarea",
            minRows: 8,
            span: 24,
            overHidden: true,
            row: true,
            hide: true,
          },
        ],
      },
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "模板上传",
            prop: "excelFile",
            type: "upload",
            drag: true,
            loadText: "模板上传中，请稍等",
            span: 24,
            propsHttp: {
              res: "data",
            },
            responseType:"blob",
            tip: "请上传 .xls,.xlsx 标准格式文件",
            action: "/api/blade-user/import-user",
          },
          {
            label: "模板下载",
            prop: "excelTemplate",
            formslot: true,
            span: 24,
          },
        ],
      },
      bodyStyle: {
        height: "100%",
        "box-sizing": "border-box",
        padding: "20px 20px 0px 20px",
      },
    };
  },
  watch: {
    "form.tenantId"() {
      if (this.form.tenantId !== "" && this.initFlag) {
        this.initData(this.form.tenantId);
      }
    },
    "excelForm.isCovered"() {
      if (this.excelForm.isCovered !== "") {
        const column = this.findObject(this.excelOption.column, "excelFile");
        column.action = `/api/blade-user/import-user?isCovered=${this.excelForm.isCovered}`;
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete, false),
        editBtn: this.vaildData(this.permission.user_edit, false),
      };
    },
    platformPermissionList() {
      return {
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: this.vaildData(this.permission.user_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  created() {
    if (this.$route.query.datas) {
      this.query = JSON.parse(this.$route.query.datas);
      console.log();
      console.log(this.query);
    }
  },
  mounted() {
    let str = JSON.parse(localStorage.getItem("saber-token"));
    this.token["Blade-Auth"] = `bearer ${str.content}`;
    // this.onLoad(this.page, querys);
    // 非租户模式默认加载管理组数据
    if (!website.tenantMode) {
      this.initData(website.tenantId);
    }
    getAreaTree().then((res) => {
      this.treeData = res.data.data;
    });
  },
  methods: {
    addUserInfo() {
      if (this.userInfo.level == 3) {
        this.$router.push({
          path: "/village/addUser",
          query: { code: this.userInfo.areaCode, level: this.userInfo.level },
        });
      } else {
        this.$router.push({
          path: "/village/addUser",
          query: { code: this.levelAreaCode, level: this.areaLevel },
        });
      }
    },
    nodeClick(data) {
      this.levelAreaCode = data.code;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    initData(tenantId) {
      getRoleTree(tenantId).then((res) => {
        const column = this.findObject(this.option.group, "roleId");
        column.dicData = res.data.data;
      });
      getDeptTree(tenantId).then((res) => {
        const column = this.findObject(this.option.group, "deptId");
        column.dicData = res.data.data;
      });
      getPostList(tenantId).then((res) => {
        const column = this.findObject(this.option.group, "postId");
        column.dicData = res.data.data;
      });
    },
    submitRole() {
      const roleList = this.$refs.treeRole.getCheckedKeys().join(",");
      grant(this.ids, roleList).then(() => {
        this.roleBox = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
        this.onLoad(this.page);
      });
    },
    rowSave(row, done, loading) {
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
      add(row).then(
        () => {
          this.initFlag = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
      update(row).then(
        () => {
          this.initFlag = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    handleEdit(row) {
      this.$router.push({ path: "/village/editUser", query: { id: row.id } });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    searchReset() {
      console.log("searchReset");
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      console.log("searchChange");
      this.query = params;
      this.page.currentPage = 1;
      if (params.postDateStr) {
        params.postDateStartStr = params.postDateStr[0];
        params.postDateStartStr = params.postDateStr[1];
        delete params.postDateStr;
      }
      if (params.eduName) {
        let eduIds = "";
        for (let i = 0; i < params.eduName.length; i++) {
          eduIds += params.eduName[i] + ",";
        }
        params.eduIds = eduIds.substring(0, eduIds.length - 1);
        delete params.eduName;
      }
      if (params.joinDateStr) {
        params.joinDateStartStr = params.joinDateStr[0];
        params.joinDateEndStr = params.joinDateStr[1];
        delete params.joinDateStr;
      }

      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    handleReset() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择账号密码重置为123456?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return resetPassword(this.ids);
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    handleGrant() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.roleTreeObj = [];
      if (this.selectionList.length === 1) {
        this.roleTreeObj = this.selectionList[0].roleId.split(",");
      }
      getRoleTree().then((res) => {
        this.roleGrantList = res.data.data;
        this.roleBox = true;
      });
    },
    handlePlatform() {
      this.platformBox = true;
    },
    handleImport() {
      this.excelBox = true;
    },

    uploadAfter(res, done, loading, column) {
      window.console.log(column);
      done();
      debugger
      if(res===""||res==="操作成功") {
        this.excelBox = false;
        this.refreshChange();
        this.$message({
          type: "success",
          message: "导入成功!",
        });
      }else{
        window.open(
          `/api/blade-user/export-err-info?${
            this.website.tokenHeader
            }=${getToken()}&type=0`
        );
      }

    },
    handleExport() {
      this.$confirm("是否导出村干部信息数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/blade-user/export-user?${
            this.website.tokenHeader
          }=${getToken()}`
        );

      });
    },
    handleTemplate() {
      window.open(
        `/api/blade-user/export-template?${
          this.website.tokenHeader
        }=${getToken()}`
      );
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getUser(this.form.id).then((res) => {
          this.form = res.data.data;
          if (this.form.hasOwnProperty("deptId")) {
            this.form.deptId = this.form.deptId.split(",");
          }
          if (this.form.hasOwnProperty("roleId")) {
            this.form.roleId = this.form.roleId.split(",");
          }
          if (this.form.hasOwnProperty("postId")) {
            this.form.postId = this.form.postId.split(",");
          }
        });
      }
      this.initFlag = true;
      done();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      console.log(this.query);
      this.query["isAdmin"]=0;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query),
        this.levelAreaCode
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
    platformRowUpdate(row, index, done, loading) {
      updatePlatform(row.id, row.userType, row.userExt).then(
        () => {
          this.platformOnLoad(this.platformPage);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    platformBeforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getUserPlatform(this.platformForm.id).then((res) => {
          this.platformForm = res.data.data;
        });
      }
      done();
    },
    platformSearchReset() {
      this.platformQuery = {};
      this.platformOnLoad(this.platformPage);
    },
    platformSearchChange(params, done) {
      this.platformQuery = params;
      this.platformPage.currentPage = 1;
      this.platformOnLoad(this.platformPage, params);
      done();
    },
    platformSelectionChange(list) {
      this.platformSelectionList = list;
    },
    platformSelectionClear() {
      this.platformSelectionList = [];
      this.$refs.platformCrud.toggleSelection();
    },
    platformCurrentChange(currentPage) {
      this.platformPage.currentPage = currentPage;
    },
    platformSizeChange(pageSize) {
      this.platformPage.pageSize = pageSize;
    },
    platformRefreshChange() {
      this.platformOnLoad(this.platformPage, this.platformQuery);
    },
    areaCode(areaCode, areaLevel) {
      this.levelAreaCode = areaCode;
      this.areaLevel = areaLevel;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    platformOnLoad(page, params = {}) {
      this.platformLoading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query),
        this.levelAreaCode
      ).then((res) => {
        const data = res.data.data;
        this.platformPage.total = data.total;
        this.platformData = data.records;
        this.platformLoading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.healthIndex,
.el-row,
.el-col {
  height: 100%;
  .health-table {
    height: 100%;
    overflow-y: auto;
  }
}
.box {
  height: 800px;
}

.el-scrollbar {
  height: 100%;
}

.box .el-scrollbar__wrap {
  overflow: scroll;
}
.avue-crud__menu .avue-crud__right .is-circle {
  visibility: hidden;
}
</style>
