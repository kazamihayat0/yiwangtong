<template>
  <div class="performance-index">

        <basic-container block="true" :bodyStyle="bodyStyle">
          <avue-crud
            :option="option"
            :page.sync="page"
            :data="partyMeeting"
            search.sync="true"
            @search-change="searchChange"
            @on-load="onload"
            @search-reset="searchReset"
            class="performance-table"
          >
            <template slot-scope="scope" slot="menuLeft">
              <el-button v-if="!level3_add"
                type="el-button el-button--primary el-button--small"
                size="small"
                @click="addUnqualifiedCadre"
                icon="el-icon-plus"
              >
                新增
              </el-button>
              <!--<el-button-->
                <!--type="success"-->
                <!--icon="el-icon-upload2"-->
                <!--size="small"-->
                <!--plain-->
                <!--@click.stop="addMeeting()"-->
              <!--&gt;导入-->
              <!--</el-button>-->

              <el-button
                type="warning"
                icon="el-icon-download"
                size="small"
                plain
                @click="handleExport"
              >导出(Excel)
              </el-button>

              <el-button type="info"
                         size="small"
                         plain
                         icon="el-icon-download"
                         @click="">导出（Word）
              </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                v-if="!level3_add"

                @click.stop="handleEdit(scope.row, scope.index)"
              >编辑
              </el-button>
              <el-button
                type="text"
                icon="el-icon-view"
                size="small"
                v-if="level3_add"
                @click.stop="handleLook(scope.row, scope.index)"
              >查看
              </el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                size="small"
                @click.stop="rowDel(scope.row, scope.index)"
              >删除
              </el-button>
            </template>

          </avue-crud>
        </basic-container>

  </div>
</template>

<script>
  import { getToken } from "@/util/auth";
  import { mapGetters } from "vuex";
  import {getList,remove} from '@/api/dailyOffice/unqualifiedcadre'
  import option from "@/option/villageManagement/unqualifiedCadre";
  import { getOrgMeet } from "@/api/dailyOffice/partyMeeting";
  import CityList from "@/components/cityList.vue";
  export default {
    components: {
      CityList,
    },
    data() {
      return {
        page: {
          total: '',
          currentPage: 1,
          pageSize: 10,
        },
        level3_add:false,
        partyMeeting: [
        ],
        option: {
          searchMenuSpan: 6,
          column: [
            {
            label: "姓名",
            prop: "name",
            search: true,
          },
            {
              label: "职务",
              prop: "postStr",
              search: true,
              dicUrl:'/api/blade-system/post/select1',
              props:{
                label:"postName",
                value:"id"
              },
              type: "select",
            },
            {
              label: "入党时间",
              prop: "joinDate",
              search: true,
              type:'monthrange',
              searchSpan:9,
              searchRange:true,
            },
            {
              label: "任职时间",
              prop: "postDate",
              search: true,
              type:'monthrange',
              searchSpan:9,
              searchRange:true,
            },
            {
              label: "乡镇-村社",
              prop:"areaName"
            },
            {
              label: "乡镇-村社",
              prop: "code",
              search: true,
              type:"tree",
              dicUrl:'/api/area/areaList',
              props: {
                label: 'name',
                value: 'code',
                children: 'children'
              },
              hide:true
            },
            {
              label: "停职教育期限",
              prop: "suspeEdu",
            },
            {
              label: "谈话教育时间",
              prop: "talkTime",

            },
            {
              label: "免职原因",
              prop: "removalReason",
              search: true,
              type:"select",
              dicData:[
                {
                  label:'全部',
                  value:''
                },
                {
                  label:'个人原因请辞',
                  value:'个人原因请辞'
                },{
                  label:'不能不宜情形',
                  value:'不能不宜情形'
                },{
                  label:'不胜任不称职',
                  value:'不胜任不称职'
                }
                ,{
                  label:'过世',
                  value:'过世'
                }
              ]
            },
            {
              label: "事件类型",
              prop: "eventType",
              type:"select",
              search:true,
              dicData:[

                {
                  label:'全部',
                  value:''
                },
                {
                  label:'违纪情形（纪委）',
                  value:'违纪情形（纪委）'
                },{
                  label:'信访记录（纪委）',
                  value:'信访记录（纪委）'
                },{
                  label:'信访记录（组织部）',
                  value:'信访记录（组织部）'
                }
                ,{
                  label:'信访记录（信访局）',
                  value:'信访记录（信访局）'
                } ,{
                  label:'违法记录',
                  value:'违法记录'
                } ,{
                  label:'执行人记录',
                  value:'执行人记录'
                }
              ]
            },
            {
              label: "整改阶段",
              prop: "statusType",
              search: true,
              type:"select",
              dicData:[
                {
                  label:'全部',
                  value:''
                },
                {
                  label:'确定教育（停职）',
                  value:0
                },{
                  label:'宣布教育（停职）',
                  value:1
                },{
                  label:'教育整改（停职）',
                  value:2
                },{
                  label:'整改结果（合格）',
                  value:3
                },{
                  label:'整改结果（免职）',
                  value:4
                }
              ]

            },
            {
              label: "离职状态",
              prop: "ddStatus",
              search: true,
              type:"select",
              dicData:[
                {
                  label:'全部',
                  value:''
                },
                {
                  label:'已离职',
                  value:'已离职'
                },{
                  label:'申请中',
                  value:'申请中'
                }
              ]
            },
            {
              label: "创建人",
              prop: "createName",
            },
            {
              label: "创建时间",
              prop: "createTime",
            },
          ],
          searchShow:false,
          columnBtn:false,
          refreshBtn:false,
          addBtn: false,
          height: 'auto',
          calcHeight: 0,
          index: true,
          indexLabel: '序号',
          border: true,
          align: 'center',
          editBtn: false, //操作栏编辑按钮是否显示
          delBtn: false, //操作栏删除按钮是否显示
          menu: true,
          menuWidth: 180,
        },
        params: {},
        bodyStyle: {
          height: "100%",
          "box-sizing": "border-box",
          padding: "20px 20px 0px 20px",
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    mounted(){
      if(this.userInfo.level==3){
      let code=  this.findObject(this.option.column,"code")
       this.$set(code,"search",false)
        this.level3_add=true;
      }
    },
    methods: {
      handleExport() {
        this.$confirm("是否导出不合格村干部数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.open(`/api/ygj/unqualifiedcadre/exportUnquaCard?${this.website.tokenHeader}=${getToken()}`);
        });
      },

      handleLook(row){
        this.$router.push({path: "/cdreM/unqCadre",query:{id:row.id}});
      },
      handleEdit(row){
        this.$router.push({path: "/cdreM/addUnqCadre",query:{id:row.id}});
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.getTableDtata();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      addUnqualifiedCadre(){
        debugger
        this.$router.push({path: "/cdreM/addUnqCadre"});
      },
      addMeeting() {
        this.$router.push({ path: "addMeeting" });
      },
      searchChange(params, done) {
        this.params = params;
        if(params.joinDate){
          this.params["joinDateStart"]=params.joinDate[0];
          this.params["joinDateEnd"]=params.joinDate[1];
        }
        if(params.postDate){
          this.params["postDateStart"]=params.postDate[0];
          this.params["postDateEnd"]=params.postDate[1];
        }

        delete this.params.postDate
        delete this.params.joinDate
        this.getTableDtata();
        setTimeout(() => {
          done();
        }, 300);
      },
      searchReset() {
        this.params = {};
        this.onload(this.page);
      },
      onload(page) {
        this.page = page;
        this.getTableDtata();
      },
      getTableDtata() {
        getList(this.page.currentPage, this.page.pageSize, this.params).then(
          (res) => {
            this.partyMeeting = res.data.data.records;
            this.page.total = res.data.data.total;
          }
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .performance-index,
  .el-row,
  .el-col {
    height: 100%;
    .performance-table {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
