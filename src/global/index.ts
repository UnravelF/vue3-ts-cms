import { App } from 'vue'
import registerElementplus from './register-elementplus'
import registerProperties from './register-properties'

export function registerApp(app: App): void {
  app.use(registerElementplus)
  // 注册全局封装的方法
  app.use(registerProperties)
}
