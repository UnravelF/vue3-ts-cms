export const contentTableConfig = {
  title: '用户列表',
  handleTitle: '新建用户',
  // 自定义列表属性参数
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
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
