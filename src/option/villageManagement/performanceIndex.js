export default {
  searchMenuSpan: 6,
  column: [{
      label: "年份",
      prop: "year",
      search: true,
    },
    {
      label: "月度",
      prop: "month",
      search: true,
      type: "select",
      dicData: [{
          label: "1月",
          value: 1
        },
        {
          label: "2月",
          value: 2
        },
        {
          label: "3月",
          value: 3
        },
        {
          label: "4月",
          value: 4
        },
        {
          label: "5月",
          value: 5
        },
        {
          label: "6月",
          value: 6
        },
        {
          label: "7月",
          value: 7
        },
        {
          label: "8月",
          value: 8
        },
        {
          label: "9月",
          value: 9
        },
        {
          label: "10月",
          value: 10
        },
        {
          label: "11月",
          value: 11
        },
        {
          label: "12月",
          value: 12
        },

      ]
    },
    {
      label: "姓名",
      prop: "name",
      search: true,
    },
    {

      label: "职务",
      width: 150,
      prop: "postStr",
      props: {
        label: "postName",
        value: "id"
      },
      type: "select",
      search: true,
      dicUrl: '/api/blade-system/post/select',
    },
    {
      label: '乡镇-村社',
      width: 100,
      prop: "areaName"
    },
    {
      hide: true,
      label: "乡镇-村社",
      prop: "areaCode",
      search: true,
      type: "tree",
      dicUrl: '/api/area/areaList',
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    },
    {
      label: "值坐班分数",
      prop: "param1",

    },
    {
      label: "村务联席会议分数",
      prop: "param2",
    },
    {
      label: "主题党日/党组织会议分数",
      prop: "param3",
    },
    {
      label: "集中审账分数",
      prop: "param4",
    },
    {
      label: "村监会运行分数",
      prop: "param5",
    },
    {
      label: "村民代表会议分数",
      prop: "param6",
    },
    {
      label: "村民满意度分数",
      prop: "param7",
    },
    {
      label: "上级研判分数",
      prop: "param9",
    },
    {
      label: "履职指数",
      prop: "param10",
    },
    {
      label: "类型",
      prop: "searchType",
      search: true,
      hide: true,
      type: "select",
      dicData: [{
          label: "值坐班分数",
          value: 1
        },

        {
          label: "村务联席会议分数",
          value: 2
        },
        {
          label: "党组织会议/主题党日分数",
          value: 3
        },
        {
          label: "集中审账分数",
          value: 4
        },
        {
          label: "村监会运行分数",
          value: 5
        },
        {
          label: "村民代表会议分数",
          value: 6
        },
        {
          label: "村民满意度分数",
          value: 7
        },
        {
          label: "上级研判分数",
          value: 9
        },
        {
          label: "履职指数",
          value: 10
        },
      ]
    },
    {
      label: "分值",
      prop: "type",
      search: true,
      hide: true,
      type: "select",
      dicData: [{
          label: "60分以下",
          value: 0
        },
        {
          label: "60-80分",
          value: 1
        },
        {
          label: "80分以上",
          value: 2
        },
      ]

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
