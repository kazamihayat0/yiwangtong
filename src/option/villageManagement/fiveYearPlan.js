export default {
  searchMenuSpan: 6,
  column: [

    {
      label: "规划开始年份",
      prop: "startYear",
      search: true,
      searchLabelWidth:100,
    },
    {
      label: "规划结束年份",
      prop: "endYear",
    },
    {
      label: "乡镇-村社",
      prop: "areaName",
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
      label: "五年规划是否完成",
      prop: "isFinish",
      search: true,
      type: "select",
      searchLabelWidth:150,
      dicData: [
        {
          label: "是",
          value: "1"
        },
        {
          label: "否",
          value: "0"
        }
      ]
    },
    {
      label: "创建人",
      prop: "createUser",
    },
    {
      label: "创建时间",
      prop: "createTime",
    },
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
  menu: true,
  menuWidth: 180,
}
