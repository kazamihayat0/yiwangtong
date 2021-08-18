export default {
  searchMenuSpan: 6,
  column: [{
      label: "乡镇-村社",
      prop: "areaName",
      minWidth: 100,
      search: true,
      type:"tree",
      dicUrl:'/api/area/areaList',
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    },
    {
      label: "活动类别",
      prop: "type",
      search: true,
      row: true,

    },
    {
      label: "活动地点",
      prop: "address",
      row: true
    },
    {
      label: "活动详情",
      prop: "detail",
      row: true
    },
    {
      label: "会议开始时间",
      prop: "startTime",
      type: "datetime",
      search: true,
      searchSpan:9,
      searchRange: true,
      searchLabelWidth: 100,
      row: true
    },
    {
      label: "会议结束时间",
      prop: "endTime",
      type: "datetime",
      row: true
    },
    {
      label: "应参会人数",
      prop: "joinNum",
      row: true
    },
    {
      label: "实际签到人数",
      prop: "actualJoin",
      row: true
    },
    {
      label: "参会率（%）",
      prop: "rate",
      row: true
    },
    {
      label: "状态",
      prop: "status",
      type: "select",
      search: true,
      span: 24,
      row: false,
      dicData: [ {
        label: "未开始",
        value: "0"
      }, {
        label: "进行中",
        value: "1"
      }, {
        label: "已完成",
        value: "2"
      }, {
        label: "已取消",
        value: "3"
      }]
    },
    {
      label: "创建人",
      prop: "createName",
      span: 24,
      row: true
    },
    {
      label: "创建时间",
      prop: "createTime",
      span: 24,
      row: true
    }
  ],
  columnBtn:false,
  refreshBtn:false,
  addBtn: false,
  height: 'auto',
  calcHeight: 0,
  index: true,
  indexLabel: '序号',
  border: true,
  align: 'center',
  menuWidth: 120,
  editBtn: false, //操作栏编辑按钮是否显示
  // delBtn: false, //操作栏删除按钮是否显示
}
