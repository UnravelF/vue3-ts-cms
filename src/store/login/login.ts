import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'

// 引入登录的网络请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
// 引入封装的存取token文件
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import { IAccount } from '@/service/login/types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      // 存储登录用的信息
      userInfo: {},
      userMenus: [],
      permissions: []
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

      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 通过用户菜单 获取用户操作权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登录逻辑
      // accountLoginRequest(payload).then((res) => {
      //   console.log(res)
      // })
      // async/await 来代替网路请求方法的.then输出
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      console.log(token)

      // 获取token后存到vuex
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化获取数据请求（完整的role/department）  解决退出登录再次登陆时该请求发送时  token还没获取 产生bug
      // 在module里面调用根store的方法通过下面这种方式调用
      dispatch('getInitialDataAction', null, { root: true })

      // 2. 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 存取登录成功后用户的信息
      localCache.setCache('userInfo', userInfo)

      // 3.根据用户角色id请求用户动态菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      // 存取登录成功后用户的权限菜单
      localCache.setCache('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },
    // 重新刷新启动自动获取本地缓存的值
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化获取数据请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        console.log(userMenus)

        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
