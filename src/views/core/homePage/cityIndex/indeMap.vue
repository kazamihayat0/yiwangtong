<template>
  <div id="cityMap" ref="cityMap"></div>
</template>

<script>
import { features } from "@/common/map/centrePoint";
import { styleJson1 } from "@/common/map/custom_map_config";
import { villageHealth, getMapData } from "@/api/homePage/cityIndex";
import { deepClone } from "@/util/util";
import { mapGetters } from "vuex";
import { jd } from "@/common/map/jd";
import Vue from "vue";

export default {
  props: {
    meetRadioVal: {
      //单选按钮
      type: String,
    },
  },
  data() {
    return {
      map: "",
      healthData: {},
      onece: true,
      areaCode:''
    };
  },
  watch: {
    meetRadioVal: function () {
      this.getindeMapByAreaCode(this.areaCode)
      //this.setVillageStyle(Vue.prototype.mapData1, 1);
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.map = new BMap.Map("cityMap");
    console.log(this.userInfo);
    var point = new BMap.Point(119.33, 29.49);
    this.map.centerAndZoom(point, 11); //设置地图中心点
    this.map.enableScrollWheelZoom(true);
    this.map.setMapStyleV2({ styleJson: styleJson1 }); //自定义地图样式
    var lnglat = [];
    jd.forEach((el) => {
      //整个建德市的区域坐标点
      lnglat.push(new BMap.Point(Number(el.latLng.lng), Number(el.latLng.lat)));
    });

    var hole = new BMap.Polygon(lnglat, {
      strokeColor: "#87C4FC",
      fillColor: "#87C4FC",
      fillOpacity: 1,
      strokeWeight: 0.5,
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    this.map.addOverlay(hole);
    this.setPointLabel(119.33, 29.49, "建德市", {
      // 设置label的样式
      color: "#fff",
      fontSize: "18px",
      background: "rgba(0, 0, 0, 0.5)",
      border: "none",
      borderRadius:"3px"
    });
    this.init();
  },

  methods: {
    /**
     * @name: 初始化地图
     * @return {*}
     */
    async init() {
      debugger
      var point = new BMap.Point(119.33, 29.49);
      this.map.centerAndZoom(point, 11); //设置地图中心点
      await villageHealth().then((res) => {
        console.log("villageHealth()", res);
        this.healthData = res.data.data;
      });

      if (Vue.prototype.mapData1.length > 0) {
        this.map.clearOverlays(); //清除当前地图覆盖物
        this.setVillageStyle(Vue.prototype.mapData1, 1);
      } else {
        await getMapData(1).then((res) => {  //查村的点位
          console.log("getMapData(1)", res);
          Vue.prototype.mapData1 = res.data.data;
          console.log(this);
          this.map.clearOverlays();
          this.setVillageStyle(res.data.data, 1);
          // this.$store.commit("SET_MAP1", res.data.data);
          // console.log("this.map1", this.map1);
        });
      }

      if (Vue.prototype.mapData2.length > 0) {
        //有缓存数据时
        this.setVillageStyle(Vue.prototype.mapData2, 2);
        if (Vue.prototype.mapData2.length == 1) {
          //镇的数据只有一条时
          let lnglat = features[Vue.prototype.mapData2[0].code].p;
          let point = new BMap.Point(lnglat[0], lnglat[1]);
          console.log(point);
          this.map.centerAndZoom(point, 13); //设置中心点为镇的中心坐标
        }
      } else {
        await getMapData(2).then((res) => {//查镇的点位
          console.log("getMapData(2)", res);
          Vue.prototype.mapData2 = res.data.data;
          if (Vue.prototype.mapData2.length == 1) {
            let lnglat = features[Vue.prototype.mapData2[0].code].p;
            let point = new BMap.Point(lnglat[0], lnglat[1]);
            console.log(point);
            this.map.centerAndZoom(point, 13);
          }
          this.setVillageStyle(res.data.data, 2);
        });
      }
    },
    //市首页选择镇也显示镇地图
    async getindeMapByAreaCode(areaCode){
      this.areaCode=areaCode;
      debugger
     if((areaCode=="001")||(this.userInfo.level==1&&areaCode=="")){
        this.init();
     }else{
       await villageHealth(areaCode).then((res) => {
         console.log("villageHealth()", res);
         this.healthData = res.data.data;
       });
       await getMapData(1,areaCode).then((res) => {  //查村的点位
         console.log("getMapData(1)", res);

         console.log(this);
         this.map.clearOverlays();
         this.setVillageStyle(res.data.data, 1);
       });
       await getMapData(2,areaCode).then((res) => {//查镇的点位
         console.log("getMapData(2)", res);
           let lnglat = features[res.data.data[0].code].p;
           let point = new BMap.Point(lnglat[0], lnglat[1]);
           console.log(point);
           this.map.centerAndZoom(point, 13);
         this.setVillageStyle(res.data.data, 2);
       });
     }
    },
    //设置村块信息2   type 1：村   type:2镇
    setVillageStyle(jdMapData, type) {
      let lab = "param" + this.meetRadioVal;
      var len = jdMapData.length;
      console.log(len);
      for (let i = 0; i < len; i++) {
        var lnglat = [];
        let datas = jdMapData[i];
        datas.plist.forEach((el, index) => {
          let p = JSON.parse(el);
          //0-392
          //393-576
          //577-764
          //765-869
          if (index >= 0 && index <= 97200) {
            lnglat.push(new BMap.Point(Number(p[0]), Number(p[1])));
          }
        });
        var fillColor = "#87C4FC";
        // var fillColor = "#C1D0E0";
        // var fillColor = "rgba(5, 36, 213, 1)";
        let centerPoint = features[datas.code];
        let params = { areaName: datas.name };
        if (typeof this.healthData[datas.code] === "object") {
          params = deepClone(this.healthData[datas.code]);
          if (params[lab] > 80) {
            fillColor = "#25c0fe";
            // fillColor = "rgba(5, 36, 213, 1)";
            // fillColor = "rgba(30, 144, 255, 1)";
          } else if (params[lab] >= 60) {
            // fillColor = "rgba(255, 140, 0, 1)";
            fillColor = "#ffb926";
          } else if (params[lab] !== null) {
            fillColor = "red";
            // fillColor = "rgba(255, 69, 0, 1)";
          }

          // this.setPointLabel(centerPoint.p[0], centerPoint.p[1], datas.name);
          if (centerPoint == undefined || centerPoint == "undefined") {
            console.log(datas);
          }
          if (params.isBenchmark === 1) {  //标杆村
            var imgUrl = require("@/styles/icon/hongqi.svg");
            this.setMarkIcon(imgUrl, centerPoint.p[0], centerPoint.p[1], 0, 10);
          }
          // console.log(datas.code);
          // console.log(centerPoint);
          // var imgUrl = require("@/styles/icon/xingxing.svg");
          // this.setMarkIcon(imgUrl, centerPoint.p[0], centerPoint.p[1], 0, 0);
          if (params.isCarrypokka === 1) {  //进位村
            var imgUrl = require("@/styles/icon/xingxing.svg");
            this.setMarkIcon(imgUrl, centerPoint.p[0], centerPoint.p[1], 0, 0);
          }
        }
        let options = {
          strokeWeight: 1.5,
          strokeOpacity: 10,
          strokeColor: "rgba(245, 247, 249, 1)",
          clip: false,
        }; //镇的覆盖样式，是线
        console.log(centerPoint);
        if (centerPoint) {
          if (datas.code.length == 6) {
            this.setPointLabel(
              centerPoint.p[0],
              centerPoint.p[1],
              centerPoint.n,
              {
                // 设置label的样式
                color: "#fff",
                fontSize: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "none",
                borderRadius:"3px"
              }
            );
          } else {
            if (len < 200) {
              //设置村名
              this.setPointLabel(
                centerPoint.p[0],
                centerPoint.p[1],
                centerPoint.n,
                {
                  // 设置label的样式
                  color: "#fff",
                  fontSize: "16px",
                  background: "transparent",
                  border: "none",

                }
              );
            }
          }
        }

        if (type === 1) {
          options = {
            strokeColor: "#606266",
            fillColor: fillColor,
            fillOpacity: 1,
            strokeWeight: 0.5,
            strokeOpacity: 1,
            // strokeStyle: "dashed",
            strokeStyle: "solid",
          };

          this.setPolygon(lnglat, params, options);
        } else {
          this.setPolyline(lnglat, params, options);
        }
      }
    },

    //设置地图镂空面
    setPolygon(lnglat, d, options) {
      let hole = new BMap.Polygon(lnglat, options);
      this.map.addOverlay(hole);
      // hole.enableEditing();
      //设置镂空面点击事件
      hole.addEventListener("dblclick", (e) => {
        console.log(d);
        var areaCode = d.areaCode || "";
        let queryObj = JSON.stringify({ areaCode: areaCode });
        if (areaCode == null || areaCode == "") {
          this.$message({
            message: `当前为${d.areaName},不可跳转。`,
            type: "warning",
          });
        } else {
          this.$router.push({
            path: "/villageIndex",
            query: { obj: queryObj },
          });
        }

        // if (e && e.stopPropagation)
        //   //因此它支持W3C的stopPropagation()方法
        //   e.stopPropagation();
        // //否则，我们需要使用IE的方式来取消事件冒泡
        // else window.event.cancelBubble = true;
      });
      hole.addEventListener("click", (e) => {
        console.log(d);
        this.$parent.polygonMouseover(d);
        // this.$emit("polygonMouseover", d);
        if (e && e.stopPropagation)
          //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        //否则，我们需要使用IE的方式来取消事件冒泡
        else window.event.cancelBubble = true;
      });
    },
    //设置地图折线
    setPolyline(lnglat, d, options) {
      var hole = new BMap.Polyline(lnglat, options);
      this.map.addOverlay(hole);
      //设置镂空面点击事件;
      hole.addEventListener("click", (e) => {
        console.log(e);
        console.log(d);
        var areaCode = d.areaCode || "";
        let queryObj = JSON.stringify({ areaCode: areaCode });
        alert(d.areaName);
        // if (e && e.stopPropagation)
        //   //因此它支持W3C的stopPropagation()方法
        //   e.stopPropagation();
        // //否则，我们需要使用IE的方式来取消事件冒泡
        // else window.event.cancelBubble = true;
      });
    },
    //设置标注信息
    setPointLabel(lng, lat, str, options) {
      var point = new BMap.Point(lng, lat);
      var label = new BMap.Label(str, {
        // 创建文本标注
        position: point, // 设置标注的地理位置
        offset: new BMap.Size(0, 0), // 设置标注的偏移量
      });
      this.map.addOverlay(label); // 将标注添加到地图中
      label.setStyle(options);
      // label.setStyle({
      //   // 设置label的样式
      //   color: "#000",
      //   fontSize: "14px",
      //   background: "transparent",
      //   border: "none",
      // });
    },
    //设置自定义图标
    setMarkIcon(imgUrl, lng, lat, anchor1 = 0, anchor2 = 0) {
      // 创建图标
      var myIcon = new BMap.Icon(imgUrl, new BMap.Size(16, 16));
      // 创建Marker标注
      var pt = new BMap.Point(lng, lat);
      var marker = new BMap.Marker(pt, {
        icon: myIcon,
      });
      this.map.addOverlay(marker);
    },
  },
};
</script>

<style lang="scss">
.anchorBL {
  display: none;
}
</style>

<style lang="scss" scoped>
#cityMap {
  height: 100%;
}
</style>
