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
      label: "招引服务产业项目",
      prop: "project",
    },
    {
      label: "村集体经营性收入（万元）",
      prop: "incomeUp",

    },
    {
      label: "农村居民人均可支配收入（元）",
      prop: "dispIncome",
    },
    {
      label: "人居环境",
      prop: "envir",
    },
    {
      label: "数字治理",
      prop: "digitalGover",
    },
    {
      label: "改革试点",
      prop: "pilotReform",
    },
    {
      label: "标杆进位",
      prop: "benCarry",
    },
    {
      label: "省市荣誉经验交流",
      prop: "experCommun",
    },
    {
      label: "基础工作",
      prop: "baseWork",
    },
    {
      label: "村级负债降幅（%）",
      prop: "debtDown",
    },
    {
      label: "误工开支降幅（%）",
      prop: "expenDown",
    },
    {
      label: "信访上访数（次）",
      prop: "petitionNum",
    },
    {
      label: "排名",
      prop: "sort",
    },
    {
      label: "创建人",
      prop: "createName",
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
  menuWidth: 180,
}
