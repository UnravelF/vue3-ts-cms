import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名',
      placeholder: '请输入部门名',
      isHidden: true
    },
    {
      field: 'parentId',
      type: 'input',
      label: '上级部门',
      placeholder: '请输入上级部门'
    },
    {
      field: 'leader',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ],
  colLayout: { span: 24 }
}
