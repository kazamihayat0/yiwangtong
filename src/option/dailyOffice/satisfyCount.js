export default {
  searchMenuSpan: 6,
  column: [{
      label: "年份",
      prop: "year",
      search: true,
      type:"year",
      row: false
    },
    {
      label: "乡镇-村社",
      prop: "code",
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
      label: "姓名",
      prop: "name",
      type: "date",
      search: true,
      searchLabelWidth: 100,
      row: true
    },
    {
      label: "参与评价人数",
      prop: "num",
      type: "date",
      row: true
    },
    {
      label: "",
      prop: "satisfy",
      row: true
    },
    {
      label: "最新换届得票率",
      prop: "percent",
      type: "select",
      row: true
    },
    {
      label: "村社排名",
      prop: "sort",
      type: "select",
      span: 24,
      row: false
    },
    {
      label: "创建时间",
      prop: "createTime",
      span: 24,
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
  menu:false
  // editBtn: false, //操作栏编辑按钮是否显示
  // delBtn: false, //操作栏删除按钮是否显示
}
