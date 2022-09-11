import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { GFRequestConfig, GFRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class GFRequest {
  instance: AxiosInstance
  interceptors?: GFRequestInterceptors
  showLoading: boolean
  loading?: any

  // 实例化类的拦截器封装
  constructor(config: GFRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 从config中取出的拦截器时对应的实例的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加全局拦截器的封装
    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 是否显示加载中状态
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败， 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        return err
      }
    )
  }

  // 网路请求拦截器的封装
  request<T = any>(config: GFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2. 判断是否需要加loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showloading 设置为true, 不会影响下一次请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将结果resolve返回
          resolve(res)
        })
        .catch((err) => {
          // 将showloading 设置为true, 不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: GFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: GFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: GFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: GFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default GFRequest
