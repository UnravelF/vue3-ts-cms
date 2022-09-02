import { createApp } from 'vue'
// 全局引入element-plus库
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

// 局部引用element-plus库
import { registerApp } from './global'
// 引入css初始化文件
import 'normalize.css'
import './assets/css/index.less'

import gfRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)

// app.use(ElementPlus)
registerApp(app)

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// 网络请求
gfRequest
  .request<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// 测试三类拦截器的处理结果
// gfRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独网络请求的请求拦截')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独网络请求的请求拦截')
//       return res
//     }
//   }
// })

app.mount('#app')
