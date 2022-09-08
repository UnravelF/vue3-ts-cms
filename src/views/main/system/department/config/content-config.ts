export const contentTableConfig = {
  title: '部门列表',
  handleTitle: '新建部门',
  // 自定义列表属性参数
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '权限介绍', minWidth: '100' },
    { prop: 'parentId', label: '上级部门', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '130',
      slotName: 'handler'
    }
  ],
  // 设置是否展示序号 将参数传递到封装的table组件
  showIndexColumn: true,
  // 设置是否展示选择按钮 将参数传递到封装的table组件
  showSelectColumn: true
}
