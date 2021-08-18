export default {
  searchMenuSpan: 6,
  column: [{
      label: "年份",
      prop: "username",
      minWidth: 100,
      searchSpan: 6,
      search: true,
      searchOrder: 9,
    },
    {
      label: "季度",
      prop: "meetingType",
      type: "select",

      row: true,
      dicData: [{
        label: "村务联席会议",
        value: ""
      }, {
        label: "集中审账会议",
        value: ""
      }, {
        label: "村监会会议",
        value: ""
      }, {
        label: "村民代表会议",
        value: ""
      }, {
        label: "网格会议",
        value: ""
      }, {
        label: "其他",
        value: ""
      }]
    },
    {
      label: "村社",
      prop: "meetTitle",
      search: true,
      searchSpan: 8,
      row: true
    },
    {
      label: "值坐班分数",
      prop: "startTime",
      type: "datetime",
      row: true,

    },
    {
      label: "村务联席会议分数",
      prop: "endTime",
      type: "date",
      row: true
    },
    {
      label: "主题党日/党组织会议分数",
      prop: "textarea",
      row: true
    },
    {
      label: "集中审账分数",
      prop: "textarea",
      row: true
    },
    {
      label: "村监会运行分数",
      prop: "status",
      type: "select",
      dicData: [{
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
      label: "村民代表会议分数",
      prop: "textarea",

      type: "select",
      row: true
    },
    {
      label: "村民满意度分数",
      prop: "textarea",
      span: 24,
      row: true
    },
    {
      label: "实绩评分",
      prop: "textarea",
      span: 24,
      row: true
    },
    {
      label: "健康指数",
      prop: "textarea",
      span: 24,
      row: true
    }
  ],
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  height: 'auto',
  calcHeight: 30,
  index: true,
  indexLabel: '序号',
  border: true,
  align: 'center',
  editBtn: false, //操作栏编辑按钮是否显示
  delBtn: false, //操作栏删除按钮是否显示
  menu: false
}
