import { App } from 'vue'
import registerElementplus from './register-elementplus'

export function registerApp(app: App): void {
  app.use(registerElementplus)
}
