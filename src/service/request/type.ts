import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface GFRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface GFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: GFRequestInterceptors<T>
  showLoading?: boolean
}
