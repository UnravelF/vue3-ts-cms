import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElLink
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
