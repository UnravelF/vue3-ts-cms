import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      label: '部门名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入部门名称'
    },
    {
      label: '部门领导',
      type: 'input',
      field: 'leader',
      placeholder: '请输入领导名称'
    }
  ]
}
