export default {
  searchShow: false,
  searchMenuSpan: 6,
  column: [{
      label: "乡镇-村社",
      prop: "areaName",
      minWidth: 130,
      row: false,
      search: true,
      type: "tree",
      dicUrl: '/api/area/areaList',
      searchOrder: 10,
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    },
    {
      label: "会议类别",
      prop: "meetingType",
      type: "select",
      search: true,
      minWidth: 100,
      row: true,
      dicData: [{
        label: "村务联席会议",
        value: "村务联席会议"
      }, {
        label: "集中审账会议",
        value: "集中审账会议"
      }, {
        label: "村监会会议",
        value: "村监会会议"
      }, {
        label: "村民代表会议",
        value: "村民代表会议"
      }, {
        label: "网格会议",
        value: "网格会议"
      }, {
        label: "其他",
        value: "其他"
      }]
    },
    {
      label: "会议内容",
      prop: "meetTitle",
      search: true,
      minWidth: 150,
      row: true,
      overHidden: true
    },
    {
      label: "会议开始时间",
      prop: "startTime",
      type: "datetime",
      search: true,
      searchRange: true,
      searchLabelWidth: 100,
      row: true,
      searchSpan: 12,
      minWidth: 150,
    },
    {
      label: "会议结束时间",
      prop: "endTime",
      type: "date",
      row: true,
      minWidth: 150,
    },
    {
      label: "应参会人数",
      prop: "countNum",
      row: true,
      slot: true
    },
    {
      label: "实际参会人数",
      prop: "signNum",
      row: true,
      slot: true
    },
    {
      label: "状态",
      prop: "statusName",
      type: "select",
      search: true,
      searchOrder: 11,
      span: 24,
      row: false,
      dicData: [{
        label: "全部",
        value: ""
      }, {
        label: "未开始",
        value: 0
      }, {
        label: "进行中",
        value: 1
      }, {
        label: "已完成",
        value: 2
      }, {
        label: "已取消",
        value: 3
      }]
    },
    {
      label: "会议纪要上传状态",
      prop: "upload",
      search: true,
      type: "select",
      searchLabelWidth: 130,
      row: true,
      dicData: [{
        label: "已上传",
        value: "已上传"
      }, {
        label: "未上传",
        value: "未上传"
      }]
    },
    {
      label: "会议纪要确认人数",
      prop: "checkNum",
      span: 24,
      row: true,
      slot: true
    },
    {
      label: "会议纪要上传时间",
      prop: "uploadTime",
      span: 24,
      minWidth: 150,
      row: true
    }, {
      label: "创建人",
      prop: "createName",
      span: 24,
      row: true
    },
    {
      label: "创建时间",
      prop: "createTime",
      span: 24,
      minWidth: 150,
      row: true
    }
  ],
  addBtn: false,
  height: 'auto',
  calcHeight: 0,
  index: true,
  indexLabel: '序号',
  border: true,
  align: 'center',
  editBtn: false, //操作栏编辑按钮是否显示
  delBtn: false, //操作栏删除按钮是否显示
  columnBtn: false,
  refreshBtn: false,
  menuWidth: 180,
}
