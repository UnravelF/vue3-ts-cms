// 编写验证规则
export const rules = {
  number: [
    {
      required: true,
      message: '必须输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号必须是11位数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-zA-Z]{4}$/,
      message: '验证码格式错误',
      trigger: 'blur'
    }
  ]
}
