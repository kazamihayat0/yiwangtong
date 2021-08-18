<template>
  <div class="map">
    <div id="container"></div>
    <div id="result">
      <el-select
        v-model="addressValue"
        allow-create
        clearable
        filterable
        style="width: 100%"
        @change="selChange"
      >
        <el-option
          v-for="item in addressOptions"
          :key="item.keyId"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="setMaplnglat">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { jdData } from "@/common/map/jdMap";
export default {
  data() {
    return {
      addressValue: "",
      addressOptions: [],
      lat: "",
      lng: "",
      map: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.map = new BMap.Map("container", { enableMapClick: false }); // 创建Map实例

    this.init();
  },
  methods: {
    init() {
      console.log(jdData[this.userInfo.areaCode]);
      let j = jdData[this.userInfo.areaCode].j;
      let w = jdData[this.userInfo.areaCode].w;
      var point = new BMap.Point(j, w); // 创建点坐标
      this.map.centerAndZoom(point, 16);
      this.map.enableScrollWheelZoom(); // 启用滚轮放大缩小
      var marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      //获取当前位置
      //点击地图事件
      // this.setAddressOptions(point);
      this.addressOptions = [];
      this.addressOptions.push({
        label: "建德市" + jdData[this.userInfo.areaCode].n,
        value: `${j},${w},建德市${jdData[this.userInfo.areaCode].n}`,
        keyId: j + w,
      });
      this.addressValue = `${j},${w},建德市${jdData[this.userInfo.areaCode].n}`;
      // this.map.addEventListener("click", function (e) {
      //   console.log(e.point);
      //   marker.setPosition(e.point);
      //   vm.setAddressOptions(e.point);
      // });
    },

    // init() {
    //   console.log(jdData[this.userInfo.areaCode]);
    //   var j = jdData[this.userInfo.areaCode].j;
    //   var j = jdData[this.userInfo.areaCode].w;
    //   var point = new BMap.Point(119.28739807500521, 29.48115402696838); // 创建点坐标
    //   this.map.centerAndZoom(point, 16);
    //   this.map.enableScrollWheelZoom(); // 启用滚轮放大缩小
    //   var marker = new BMap.Marker(point, {
    //     enableDragging: true,
    //   });
    //   this.map.addOverlay(marker);
    //   //获取当前位置
    //   var geolocation = new BMap.Geolocation();
    //   var vm = this;
    //   geolocation.getCurrentPosition(function (r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //       vm.map.panTo(r.point); //设置坐标点位置
    //       marker.setPosition(r.point); //设置点标记位置
    //       vm.setAddressOptions(r.point);
    //     }
    //   });
    //   //点击地图事件
    //   this.map.addEventListener("click", function (e) {
    //     marker.setPosition(e.point);
    //     vm.setAddressOptions(e.point);
    //   });
    // },
    /**
     * @name: 获取当前经纬度的地址名称
     * @msg:
     * @param {*} latlng:经纬度
     * @return {*}
     */
    setAddressOptions(latlng) {
      var geoc = new BMap.Geocoder();
      geoc.getLocation(latlng, (rs) => {
        var address = rs.address;
        var surroundingPois = rs.surroundingPois;
        this.addressOptions = [];
        this.addressOptions.push({
          label: address,
          value: `${rs.point.lng},${rs.point.lat},${address}`,
          keyId: rs.point.lng + rs.point.lng,
        });
        this.addressValue = `${rs.point.lng},${rs.point.lat},${address}`;
        surroundingPois.forEach((el) => {
          this.addressOptions.push({
            label: `${el.address}-${el.title}`,
            value: `${el.point.lng},${el.point.lat},${el.address}-${el.title}`,
            keyId: el.uid,
          });
        });
      });
    },

    getLatlng(adress) {
      //创建地址解析器实例
      var geoc = new BMap.Geocoder();
      geoc.getPoint(
        adress,
        function (point) {
          console.log(point);
          if (point) {
            return point;
          } else {
            alert("您选择的地址没有解析到结果！");
          }
        },
        "建德市"
      );
    },
    setMaplnglat() {
      if (this.addressValue.length > 1) {
        let arr = this.addressValue.split(",");
        this.$emit("mapLatlng", {
          jw: `${arr[0]},${arr[1]}`,
          address: arr[2],
        });
      }
    },
    closeDialog() {
      this.$emit("mapLatlng");
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  overflow: hidden;
  width: 100%;
  margin: 0;
  font-family: "微软雅黑";
  height: 400px;
}
.map {
  position: relative;
}
#result {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0px 7px;
  min-width: 350px;
  line-height: 35px;
  z-index: 99;
}
.dialog-footer {
  margin-top: 12px;
  text-align: center;
}
</style>
