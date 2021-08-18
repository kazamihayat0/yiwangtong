var map = new BMapGL.Map("container"); // 创建Map实例
var point = new BMapGL.Point(); // 创建点坐标
map.centerAndZoom(point, 16);
map.enableScrollWheelZoom(); // 启用滚轮放大缩小
var marker = new BMapGL.Marker(point, {
  enableDragging: true,
});
map.addOverlay(marker);
//获取当前位置
var geolocation = new BMapGL.Geolocation();
geolocation.getCurrentPosition(function (r) {
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    map.panTo(r.point); //设置坐标点位置
    marker.setPosition(r.point); //设置点标记位置
    vm.setAddressOptions(r.point);
  } else {}
});
//点击地图事件
map.addEventListener("click", function (e) {
  marker.setPosition(e.latlng);
  vm.setAddressOptions(e.latlng);
});

function setMapPosition(latlng) {
  map.panTo(r.point); //设置坐标点位置
  marker.setPosition(r.point); //设置点标记位置
}

/**
 * @name: 获取当前经纬度的地址名称
 * @msg:
 * @param {*} latlng:经纬度
 * @return {*}
 */
function setAddressOptions(latlng) {
  var geoc = new BMapGL.Geocoder();
  geoc.getLocation(latlng, (rs) => {
    var address = rs.address;
    var surroundingPois = rs.surroundingPois;
    this.addressOptions = [];
    this.addressOptions.push({
      label: address,
      value: {
        address: address,
        lng: rs.point.lng,
        lat: rs.point.lat,
      },
      keyId: rs.point.lng + rs.point.lng,
    });
    surroundingPois.forEach((el) => {
      this.addressOptions.push({
        label: `${el.address}-${el.title}`,
        value: {
          address: el.title + el.address,
          lng: el.point.lng,
          lat: el.point.lat,
        },
        keyId: el.uid,
      });
    });
  });
};

function getLatlng(adressName, ) {
  //创建地址解析器实例
  var geoc = new BMapGL.Geocoder();
  // 将地址解析结果显示在地图上，并调整地图视
  geoc.getPoint(adressName, function (point) {
    if (point) {
      map.panTo(r.point); //设置坐标点位置
      marker.setPosition(r.point); //设置点标记位置
    } else {
      alert('您选择的地址没有解析到结果！');
    }
  }, '北京市')
};
