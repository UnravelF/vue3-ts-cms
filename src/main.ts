import { createApp } from 'vue'
// 全局引入element-plus库
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
//main.ts
import * as Icon from '@element-plus/icons-vue'

// 局部引用element-plus库
import { registerApp } from './global'
// 引入css初始化文件
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)
app.use(store)
// 解决刷新/重新启动后vuex值确实问题 重新获取

// 先注册好路由再进行匹配 解决刷新页面跳转匹配到notfound页面
setupStore()
app.use(router)

// app.use(ElementPlus)
// 注册ElementPlus及其他组件封装的方法
registerApp(app)

//在最下面导入全局组件icon
Object.keys(Icon).forEach((key) => {
  app.component(key, Icon[key as keyof typeof Icon])
})

app.mount('#app')
