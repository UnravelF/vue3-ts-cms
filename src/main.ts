import { createApp } from 'vue'
// 全局引入element-plus库
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

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
app.use(router)
app.use(store)
// 解决刷新/重新启动后vuex值确实问题 重新获取
setupStore()

// app.use(ElementPlus)
registerApp(app)

app.mount('#app')
