export default {
  searchMenuSpan: 6,
  column: [{
    label: "姓名",
    prop: "name",
    search: true,
  },
    {
      label: "职务",
      prop: "postStr",
      search: true,
      dicUrl:'/api/blade-system/post/select',
      props:{
        label:"postName",
        value:"id"
      },
      type: "select",
    },
    {
      label: "入党时间",
      prop: "joinDate",
      search: true,
      type:'monthrange',
      searchSpan:9,
      searchRange:true,
    },
    {
      label: "任职时间",
      prop: "postDate",
      search: true,
      type:'monthrange',
      searchSpan:9,
      searchRange:true,
    },
    {
      label: "乡镇-村社",
      prop:"areaName"
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
      },
      hide:true
    },
    {
      label: "停职教育期限",
      prop: "suspeEdu",
    },
    {
      label: "谈话教育时间",
      prop: "talkTime",

    },
    {
      label: "免职原因",
      prop: "removalReason",
      search: true,
      type:"select",
      dicData:[
        {
          label:'全部',
          value:''
        },
        {
          label:'个人原因请辞',
          value:'个人原因请辞'
        },{
          label:'不能不宜情形',
          value:'不能不宜情形'
        },{
          label:'不胜任不称职',
          value:'不胜任不称职'
        }
        ,{
          label:'过世',
          value:'过世'
        }
      ]
    },
    {
      label: "事件类型",
      prop: "eventType",
      type:"select",
      search:true,
      dicData:[

        {
          label:'全部',
          value:''
        },
        {
          label:'违纪情形（纪委）',
          value:'违纪情形（纪委）'
        },{
          label:'信访记录（纪委）',
          value:'信访记录（纪委）'
        },{
          label:'信访记录（组织部）',
          value:'信访记录（组织部）'
        }
        ,{
          label:'信访记录（信访局）',
          value:'信访记录（信访局）'
        } ,{
          label:'违法记录',
          value:'违法记录'
        } ,{
          label:'执行人记录',
          value:'执行人记录'
        }
      ]
    },
    {
      label: "整改阶段",
      prop: "statusType",
      search: true,
      type:"select",
      dicData:[
        {
          label:'全部',
          value:''
        },
        {
          label:'确定教育（停职）',
          value:0
        },{
          label:'宣布教育（停职）',
          value:1
        },{
          label:'教育整改（停职）',
          value:2
        },{
          label:'整改结果（合格）',
          value:3
        },{
          label:'整改结果（免职）',
          value:4
        }
      ]

    },
    {
      label: "离职状态",
      prop: "ddStatus",
      search: true,
      type:"select",
      dicData:[
        {
          label:'全部',
          value:''
        },
        {
          label:'已离职',
          value:'已离职'
        },{
          label:'申请中',
          value:'申请中'
        }
      ]
    },
    {
      label: "创建人",
      prop: "createName",
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
