<template>
<div class="content">

  <div style="position: fixed;top: 0px;left: 0px;width: 100%;z-index: 999">
    <van-search v-model="search"  @search="onSearch"  placeholder="请输入搜索关键词" /></div>
  <div style="margin-top: 40px">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in itemList" :key="item.id">

        <div class="card-info">
          <span><van-checkbox v-model="item.checked"></van-checkbox></span> <img :src="item.tx" width="50px" height="50px"/> <span>{{item.name}}</span>
        </div>

      </van-cell>
    </van-list>
  </div>

  <div style="margin-top:36px;position: fixed;bottom: 0px;right: 0px;left: 0px;background-color: #FFFFFF;"  >
    <van-button  block type="info" native-type="submit" @click="sub" >确定</van-button>
  </div>
</div>
</template>

<script>
  import { getUser } from "@/api/dailyOffice/satisfaction";
    export default {
        name: "choose",

      data() {
        return {
          search: '',
          loading: false,
          finished: true,
          page: 1, //请求第几页
          pageSize: 10, //每页请求的数量
          total: 0, //总共的数据条数
          itemList: [],
          code:'',
          itemList2:[],
          mobile:''
        };
      },
      mounted(){
        this.code=this.$route.query.code;
        this.mobile=this.$route.query.mobile;
        this.onLoad()
      },
      methods:{
        sub(){
          let nameList=[];
          let name="";
          let userId="";
          this.itemList.forEach(_=>{
            if(_.checked){
              name+=_.name+",";
              userId+=_.id+","
            }
          })
          this.$router.push({path: "/phone/addSatisfaction",query:{data:name.substring(0,name.length-1),code:this.code,mobile:this.mobile,userIds:userId.substring(0,userId.length-1),endTime:this.$route.query.endTime,year:this.$route.query.year,startTime:this.$route.query.startTime}});
        },
        onSearch(val){
          if(this.itemList2.length==0){
            this.itemList2=this.itemList
          }
          this.itemList= this.itemList2.filter(_=>{
            return  _.name.indexOf(val)!=-1
          })
        },
        getroadList() {
          let params = {
            code: this.code,
            type:4
          };
          getUser(params).then((result) => {
            var rows = result.data.data;
            this.loading = true;
            console.log(rows);
            // 将新数据与老数据进行合并
            this.itemList = this.itemList.concat(rows);

            //如果列表数据条数>=总条数，不再触发滚动加载
            if (this.itemList.length >= this.total) {
              this.finished = true;
            }
          });
        },
        onLoad() {
          this.getroadList();
        },
      }
    }
</script>

<style scoped>
  .content{
    height: 99vh;
    overflow-y: auto;
  }
.card-info{
  display: flex;
  justify-content: flex-start;
}
  .card-info span{
    margin-left: 20px;
    margin-right: 20px;
    line-height: 50px;
    height: 50px;
    font-size: 15px;
  }
.card-info span .van-checkbox{
  margin-top: 15px;
}
</style>
