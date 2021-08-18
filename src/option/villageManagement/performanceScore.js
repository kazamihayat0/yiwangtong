export default {
  searchMenuSpan: 6,
  column: [{
    label: "季度",
    prop: "quarter",
    search:true,
  },
    {
      label: "姓名",
      prop: "userName",
      search: true,
    },
    {
      label: "职务",
      prop: "postId",
      props:{
        label:"postName",
        value:"id"
      },
      type: "select",
      search: true,
      dicUrl:'/api/blade-system/post/select',
      hide:true
    },
    {
      label: "职务",
      prop: "postName",
      width:250
    },
    {
      label: "乡镇-村社",
      prop: "areaName",
      width:250
    },
    {
      hide:true,
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
    // {
    //   label: "日常运行得分",
    //   prop: "rcscore",
    // },
    {
      label: "村书记评价等级",
      prop: "assessLevel",
    },
    {
      label: "党委评价等级",
      prop: "partyAssessLevel",

    },
    {
      label: "研判得分",
      prop: "judgeScore",
    },
    {
      label: "研判评分",
      prop: "type",
      search:true,
      hide:true,
      type:"select",
      dicData:[
        {
          label:"60分以下",
          value:1
        },
        {
          label:"60-80分",
          value:2
        },
        {
          label:"80分以上",
          value:3
        },
      ]

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
  menuWidth: 180,
}
