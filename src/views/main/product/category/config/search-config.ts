import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      label: 'id',
      type: 'input',
      field: 'id',
      placeholder: '请输入查询id'
    },
    {
      label: '分类名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入用户名'
    }
  ]
}
