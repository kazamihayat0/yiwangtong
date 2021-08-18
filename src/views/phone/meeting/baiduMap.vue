<template>
  <div class="map">
    <div id="container"></div>
    <div id="result">
      <van-picker
        title="地址"
        show-toolbar
        :columns="addressOptions"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
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
      latlngOptions: [],
      lat: "",
      lng: "",
      map: "",
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    console.log("mounted");
    this.map = new BMap.Map("container", { enableMapClick: false }); // 创建Map实例
    this.init();
  },
  activated() {
    console.log("activated");
  },

  methods: {
    init() {
      let j = jdData[this.userInfo.areaCode].j;
      let w = jdData[this.userInfo.areaCode].w;
      var point = new BMap.Point(j, w); // 创建点坐标
      this.map.centerAndZoom(point, 16);
      this.map.enableScrollWheelZoom(); // 启用滚轮放大缩小
      var marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      //获取当前位置
      var geolocation = new BMap.Geolocation();
      this.addressOptions.push("建德市" + jdData[this.userInfo.areaCode].n);
      this.latlngOptions.push(`${j},${w}`);
      // geolocation.getCurrentPosition(function (r) {
      //   console.log(this.getStatus());
      //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //     vm.map.panTo(r.point); //设置坐标点位置
      //     marker.setPosition(r.point); //设置点标记位置

      //     vm.setAddressOptions(r.point);
      //   }
      // });
      //点击地图事件
      // this.map.addEventListener("click", function (e) {
      //   marker.setPosition(e.point);
      //   vm.setAddressOptions(e.point);
      // });
    },
    /**
     * @name: 获取当前经纬度的地址名称
     * @msg:
     * @param {*} latlng:经纬度
     * @return {*}
     */
    setAddressOptions(latlng) {
      console.log(latlng);
      var geoc = new BMap.Geocoder();
      geoc.getLocation(latlng, (rs) => {
        var address = rs.address;
        var surroundingPois = rs.surroundingPois;
        this.addressOptions = [];
        this.latlngOptions = [];
        this.addressOptions.push(address);
        this.latlngOptions.push(`${rs.point.lng},${rs.point.lat}`);
        surroundingPois.forEach((el) => {
          this.addressOptions.push(`${el.address}-${el.title}`);
          this.latlngOptions.push(`${el.point.lng},${el.point.lat}`);
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
    onConfirm(val, index) {
      this.$router.push({
        path: "addmeeting",
        query: {
          address: val,
          latlng: this.latlngOptions[index],
        },
      });
      // this.$emit("mapLatlng", {
      //   address: val,
      //   latlng: this.latlngOptions[index],
      // });
    },
    onCancel() {},
  },
};
</script>
<style lang="scss">
.anchorBL {
  display: none;
}
</style>

<style lang="scss" scoped>
#container {
  overflow: hidden;
  width: 100%;
  margin-top: 5px;
  font-family: "微软雅黑";
  height: 65vh;
}
</style>
