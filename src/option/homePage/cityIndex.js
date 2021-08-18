export const meetRadio = [{
  label: '综合健康指数',
  val: '10'
}, {
  label: '值坐班',
  val: '1'
}, {
  label: '联席会议',
  val: '2'
}, {
  label: '党组织会议/主题党日',
  val: '3'
}, {
  label: '集中审账',
  val: '4'
}, {
  label: '村监会运行',
  val: '5'
}, {
  label: '村民代表会议',
  val: '6'
}, {
  label: '村民满意度',
  val: '7'
}, {
  label: '上级研判',
  val: '9'
},  {
  label: '五年规划-创业承诺项目',
  val: '11'
},
]

export const ageOption = function (val, formatter) {
  return {
    series: [{
      type: "gauge",
      startAngle: -Math.PI / 2,
      endAngle: Math.PI * 1.5,
      arcLineWidth: 8,
      data: [{
        value: val,
        gradient: ["#03c2fd", "#1ed3e5", "#2fded6"],
        lineWidth: 8,
      }, ],
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      pointer: {
        show: false,
      },
      dataItemStyle: {
        lineCap: "round",
      },
      details: {
        show: true,
        formatter: formatter,
        valueToFixed: 2,
        style: {
          fill: "#fff",
          fontSize: 12,
        },
      },
    }, ],
  }
}
