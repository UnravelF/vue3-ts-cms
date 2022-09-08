export const contentTableConfig = {
  title: '菜单列表',
  handleTitle: '新建菜单',
  // 自定义列表属性参数
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '菜单类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '120' },
    { prop: 'icon', label: '菜单图标', minWidth: '100' },
    { prop: 'permission', label: '操作权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '130',
      slotName: 'handler'
    }
  ],
  // 设置是否展示序号 将参数传递到封装的table组件
  showIndexColumn: false,
  // 设置是否展示选择按钮 将参数传递到封装的table组件
  showSelectColumn: false,
  // 菜单列表展示二级菜单需要的属性
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  // 不展示底部分页器
  showFooter: false
}
