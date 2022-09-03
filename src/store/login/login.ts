import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'

import router from '@/router'

// 引入登录的网络请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
// 引入封装的存取token文件
import localCache from '@/utils/cache'

import { IAccount } from '@/service/login/types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      // 存储登录用的信息
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1. 实现登录逻辑
      // accountLoginRequest(payload).then((res) => {
      //   console.log(res)
      // })
      // async/await 来代替网路请求方法的.then输出
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      // 获取token后存到vuex
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 存取登录成功后用户的信息
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户动态菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      // 存取登录成功后用户的权限菜单
      localCache.setCache('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },
    // 重新刷新启动自动获取本地缓存的值
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
