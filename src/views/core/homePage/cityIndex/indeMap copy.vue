<template>
  <div id="container"></div>
</template>

<script>
import { jdOrgMapData } from "@/common/map/orgmapdata";
export default {
  mounted() {
    this.init();
  },
  // methods: {
  //   init() {
  //     var map = new BMapGL.Map("container");
  //     var point = new BMapGL.Point(119.33, 29.49);
  //     map.centerAndZoom(point, 11);
  //     map.enableScrollWheelZoom(true);
  //     map.setDisplayOptions({
  //       poiText: false, // 隐藏poi标注
  //       poiIcon: false, // 隐藏poi图标
  //       building: false, // 隐藏楼块
  //     });

  //     var pStart = new BMapGL.Point(118.896, 29.208);
  //     var pEnd = new BMapGL.Point(119.764, 29.773);
  //     var bounds = new BMapGL.Bounds(
  //       new BMapGL.Point(pStart.lng, pEnd.lat),
  //       new BMapGL.Point(pEnd.lng, pStart.lat)
  //     );

  //     // var imgOverlay = new BMapGL.GroundOverlay(bounds, {
  //     //   type: "image",
  //     //   url: "/img/001_103221640_1.png",
  //     // });
  //     // map.addOverlay(imgOverlay);

  //     jdOrgMapData.forEach((el) => {
  //       var lnglat = "";
  //       el.p.forEach((el) => {
  //         lnglat += `${el[0]}, ${el[1]};`;
  //       });
  //       lnglat = lnglat.slice(0, -1);
  //       var hole = new BMapGL.Polygon(lnglat, {
  //         fillColor: "#25c0fe",
  //         fillOpacity: 1,
  //         strokeWeight: 1,
  //         strokeColor: "#fff",
  //       });
  //       map.addOverlay(hole);
  //       hole.addEventListener("click", (e) => {
  //         alert(el.n);
  //       });
  //     });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
#container {
  height: 500px;
}
</style>