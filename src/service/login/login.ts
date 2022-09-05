import gfRequest from '../index'

import { IAccount, ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

// 登录验证网络请求
export function accountLoginRequest(account: IAccount) {
  return gfRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 根据id获取用户信息
export function requestUserInfoById(id: number) {
  return gfRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 根据id获取用户的用户权限菜单
export function requestUserMenuByRoleId(id: number) {
  return gfRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
