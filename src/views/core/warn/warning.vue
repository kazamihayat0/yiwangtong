<template>
  <basic-container>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="不能不宜" name="first">
    <nono></nono>
    </el-tab-pane>
    <el-tab-pane label="值坐班" name="second">
     <onduty></onduty>
    </el-tab-pane>
    <el-tab-pane label="村务联席会议" name="three">
      <villaffjoconfer></villaffjoconfer>
    </el-tab-pane>
    <el-tab-pane label="党组织会议/主题党日" name="four">
    <partyorgan></partyorgan>
    </el-tab-pane>
    <el-tab-pane label="集中审账" name="five">
      <centraudit></centraudit>
    </el-tab-pane>
    <el-tab-pane label="村监会运行" name="six">
      <villsupercomm></villsupercomm>
    </el-tab-pane>
    <el-tab-pane label="村民代表会议" name="seven">
      <villrepreconfer></villrepreconfer>
    </el-tab-pane>
    <el-tab-pane label="村民满意度" name="eight">
      <villsatis></villsatis>
    </el-tab-pane>
    <el-tab-pane label="重大事项申报" name="nine">
      <majevedeclar></majevedeclar>
    </el-tab-pane>
    <el-tab-pane label="离职申请" name="ten">
      <resignat></resignat>

    </el-tab-pane>
  </el-tabs>
    <el-card class="box-card"  v-show="xzs">
      <div slot="header" class="clearfix">
        <span>小助手</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="xzs=false">X</el-button>
      </div>
      <div class="text item bold">
        {{title}}
      </div>
      <div class="text item"  v-for="item in contents">
       <div>{{item.content}} </div>
      </div>
    </el-card>
    <div class="warn-info-f" id="df" @click="xzs=true"> <img src="/img/06.gif" height="100px"/></div>
  </basic-container>
</template>

<script>
  import  resignat from './resignat'
  import  majevedeclar from './majevedeclar'
  import villsatis from './villsatis'
  import villrepreconfer from './villrepreconfer'
  import  villsupercomm from "./villsupercomm"
  import  partyorgan from "./partyorgan"
  import  villaffjoconfer from "./villaffjoconfer"
  import nono from "./nono";
  import onduty from "./onduty";
  import centraudit from "./centraudit"
    export default {
        name: "canWarning",
      data() {
        return {
          activeName: 'first',
          xzs:false,
          data:[
            {
              activeName:"first",
              title:'不能不宜预警',
              item:[
                {
                  content:"1.公安：黄赌毒"
                },{
                  content:"2.法检：执行人记录"
                },{
                  content:"3.信访：对村干部本人有信访，本村信访预警在“一肩挑”"
                },{
                  content:"4.纪委：违纪情形,信访记录"
                }
              ]
            },
            {
              activeName:"second",
              title:'值坐班预警',
              item:[
                {
                  content:"1.7天未打卡"
                },{
                  content:"2.村干部在村精力少于2/3（一周至少驻村三天"
                }
              ]
            },
            {
              activeName:"three",
              title:'村务联席会议预警',
              item:[
                {
                  content:"1.2周未开"
                },{
                  content:"2.参加会议人数不足“两委”干部人数的三分之二"
                },{
                  content:"3.第一书记、联村干部一个月未到村里开会"
                }
              ]
            },{
              activeName:"four",
              title:'党组织会议/主题党日预警',
              item:[
                {
                  content:"1.1月未开"
                },{
                  content:"2.西湖先锋每月25日数据导入"
                }
              ]
            },{
              activeName:"five",
              title:'集中审账预警',
              item:[
                {
                  content:"1.1月未审"
                },{
                  content:"2.一年未开展至少1次村务财务监督问询会议"
                },{
                  content:"3.工程项目不规范（数据抓取→清廉乡村）"
                }
              ]
            },{
              activeName:"six",
              title:'村监会运行预警',
              item:[
                {
                  content:"1.每月1次例会未开"
                },{
                  content:"2.半年未向村党组织汇报1次村务监督情况"
                },{
                  content:"3.一年未向村民（代表）会议报告1次工作"
                }
              ]
            },{
              activeName:"seven",
              title:'村民代表会议预警',
              item:[
                {
                  content:"1.每季度未召开一次"
                },{
                  content:"2.参加会议人数不足三分之二"
                }
              ]
            },{
              activeName:"eight",
              title:'村民满意度预警',
              item:[
                {
                  content:"1.有事找村里评价度2星以下"
                },{
                  content:"2.年度测评比换届时得票率（平均得票率）下降\n" +
                  "25%以上；或小于50%"
                }
              ]
            },{
              activeName:"nine",
              title:'重大事项申报预警',
              item:[
                {
                  content:"重大疾病、重大事故、网络舆情信息、酒驾、赌博等违法违纪行为、纪检监察机关留置、检察机关立案侦查、公安部门拘留、因私出国境、承揽工程、宴席等其他重大事项申报"
                }
              ]
            },{
              activeName:"ten",
              title:'离职申请预警',
              item:[
                {
                  content:"离职村干部信息、离职原因、离职日期等"
                }
              ]
            }
          ],
          contents:[],
          title:""
        }
      },
      components:{
        nono,
        onduty,
        villaffjoconfer,
        partyorgan,
        centraudit,
        villsupercomm,
        villrepreconfer,
        villsatis,
        majevedeclar,
        resignat
      },
      mounted(){
        this.change();
        this.dragFunc("df");
      },
      methods:{
        dragFunc(id) {
          var Drag = document.getElementById(id);
          Drag.onmousedown = function (event) {
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX - Drag.offsetLeft;
            var disY = ev.clientY - Drag.offsetTop;
            document.onmousemove = function (event) {
              var ev = event || window.event;
              Drag.style.left = ev.clientX - disX + "px";
              Drag.style.top = ev.clientY - disY + "px";
              Drag.style.cursor = "move";
            };
          };
          Drag.onmouseup = function () {
            document.onmousemove = null;
            this.style.cursor = "default";
          };
        },
          change(){
            this.data.forEach(_=>{
              if(_.activeName==this.activeName){
                this.title=_.title;
                this.contents=_.item;
              }
            })
          },
        handleClick(){
          this.change();
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
