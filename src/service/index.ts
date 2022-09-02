import GFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const gfRequest = new GFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      console.log('请求成功拦截, 类')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败拦截, 类')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功拦截, 类')
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应失败拦截, 类')
      return err
    }
  }
})

export default gfRequest
