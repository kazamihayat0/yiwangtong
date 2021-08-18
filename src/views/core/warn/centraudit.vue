<template>
  <div>
    <div v-for="(item,index) in data">
      <div class="warn-list" v-if="item.eventType==21">
        <div>
          <div class="warn-flex">
            <div><img :src="item.avatar" style="border-radius: 50%"  width="50px" height="50px"/></div>
            <div>
              <div class="warn-flex">
                <div class="warn-ma">{{item.userName  }}</div><div class="warn-ma warn-font warn-gray">{{item.areaName }} </div><div class="warn-ma warn-font warn-gray">{{item.postName}}</div>
              </div>
              <div class="warn-ma warn-gray font-ma">
                {{item.createTime  }}
              </div>
            </div>
          </div>
          <div class="warn-flex warn-line-h"><div class="warn-gray">上月开会</div><div  class="warn-ma">{{item.sychNum  }} 次</div></div>
          <div class="warn-flex warn-line-h"><div class="warn-gray"> 上月参会</div><div  class="warn-ma">{{item.sykhNum  }} 次</div></div>
          <div class="warn-flex warn-line-h"  v-if="item.isPush!=0"><div class="warn-gray">已通知</div><div  class="warn-ma">{{item.pushInfo}}</div><div  class="warn-ma">{{item.postName}}</div></div>
        </div>
        <div style="line-height:150px;height: 150px ">
          <el-button
            :type="item.isAdd?'info':'primary'"
            @click.stop="addComprehensive(item.userId,item.isAdd)"
          >添加至不合格村干部
          </el-button>
          <el-button :type="item.isPush!=0?'info':'primary'"    plain
                     @click.stop="message(item.id,item.isPush!=0)"
          >消息提醒
          </el-button>
        </div>
      </div>
      <div class="warn-list" v-if="item.eventType==12">
        <div>
          <div class="warn-flex">
            <div><img src="/img/cs.png"  width="50px" height="50px"/></div>
            <div>
              <div class="warn-flex">
                <div class="warn-ma">{{item.areaName }} </div>
              </div>
              <div class="warn-ma warn-gray font-ma">
                {{item.createTime}}
              </div>
            </div>
          </div>
          <div class="warn-flex warn-line-h"><div class="warn-gray">去年召开财务监督问询会议</div><div  class="warn-ma">{{item.sykhNum  }}次</div></div>
          <div class="warn-flex warn-line-h" v-if="item.isPush!=0"><div class="warn-gray">已通知</div><div  class="warn-ma">{{item.pushInfo}}</div><div  class="warn-ma">{{item.postName}}</div></div>
        </div>

      </div>
      <div class="warn-list"  v-if="item.eventType==11">
        <div>
          <div class="warn-flex">
            <div><img src="/img/cs.png"  width="50px" height="50px"/></div>
            <div>
              <div class="warn-flex">
                <div class="warn-ma">{{item.areaName }} </div>
              </div>
              <div class="warn-ma warn-gray font-ma">
                {{item.createTime}}
              </div>
            </div>
          </div>
          <div class="warn-flex warn-line-h"><div class="warn-gray">上月开会</div><div  class="warn-ma">{{item.sykhNum  }}次</div></div>
          <div class="warn-flex warn-line-h" v-if="item.isPush!=0"><div class="warn-gray">已通知</div><div  class="warn-ma">{{item.pushInfo}}</div><div  class="warn-ma">{{item.postName}}</div></div>
        </div>

      </div>
      <!--<div class="warn-list">-->
        <!--<div>-->
          <!--<div class="warn-flex">-->
            <!--<div><img src="/img/cs.png"  width="50px" height="50px"/></div>-->
            <!--<div>-->
              <!--<div class="warn-flex">-->
                <!--<div class="warn-ma">新安江街道-丰庆村 </div>-->
              <!--</div>-->
              <!--<div class="warn-ma warn-gray font-ma">-->
                <!--03月02日 08:30  来源-清廉乡村-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="warn-flex warn-line-h"><div class="warn-gray">工程项目不规范</div><div  class="warn-ma">XXXX项目工程不规范操作</div></div>-->
          <!--<div class="warn-flex warn-line-h"><div class="warn-gray">已通知</div><div  class="warn-ma">新安江街道-丰庆村党组织书记</div><div  class="warn-ma">李四</div></div>-->
        <!--</div>-->

      <!--</div>-->
    </div>
    <el-pagination
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
  import {warnPage} from "@/api/dailyOffice/warn";
  export default {
    name: "onduty",
    mounted(){
      this.list()
    },
    data(){
      return {
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        params:{},
        data:[],
      }
    },
    methods:{
      addComprehensive(userId,flag) {
        if(!flag){
          this.$router.push({path: "/cdreM/addUnqCadre",query:{userId:userId}});
        }
      },
      message(id,flag){
        if(!flag) {
          message(id).then(res => {
            console.log(res);
            this.list();
          })
        }
      },
      handleCurrentChange(val) {
        this.page.currentPage=val;
        this.list();
      },
      list(){
        this.params["serachType"]=5
        warnPage(this.page.currentPage,this.page.pageSize,this.params).then(res=>{
          this.data=res.data.data.records;
          this.page.total=res.data.data.total
          console.log(this.data)
        })
      }
    }
  }
</script>

<style scoped>
  .bold{
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card{
    width: 330px;
    height: 230px;
    position: fixed;
    bottom: 90px;
    right: 70px;
    box-shadow: 0 0 10px #00000050;
  }
  .el-card.is-always-shadow{
    -webkit-box-shadow: 0 0 10px #00000050;
    box-shadow: 0 0 10px #00000050!important;

  }
  .warn-info-f{
    position: fixed;
    bottom: 80px;
    z-index: 999;
    right: 50px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
  }
  .font-ma{
    margin-top: 5px;
  }
  .warn-gray{
    color: #7F7F7F;
  }
  .warn-list{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border-bottom:  1px solid #c0c0c030;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .warn-ma{
    margin-left: 20px;
  }
  .warn-font{
    font-size: 12px;
  }
  .warn-line-h{
    line-height:30px;
    height: 30px
  }
  .warn-flex{
    display: flex;
    justify-content: flex-start;
  }
</style>
