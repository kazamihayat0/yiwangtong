export default {
  searchMenuSpan: 6,
  column: [{
    label: "季度",
    prop: "quarter",
    search: true,
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
      label: "乡镇排名",
      prop: "townSort",

    },
    {
      label: "市排名",
      prop: "citySort",

    },
    {
      label: "创建人",
      prop: "createUser",
    },
    {
      label: "创建时间",
      prop: "createTime",
    }
  ],
  columnBtn:false,
  refreshBtn:false,
  addBtn: false,
  height: 'auto',
  calcHeight: 30,
  index: true,
  indexLabel: '序号',
  border: true,
  align: 'center',
  editBtn: false, //操作栏编辑按钮是否显示
  delBtn: false, //操作栏删除按钮是否显示
}
