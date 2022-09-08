export const contentTableConfig = {
  title: '商品列表',
  handleTitle: '新建商品',
  // 自定义列表属性参数
  propList: [
    { prop: 'name', label: '类别名称', minWidth: '80' },
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
