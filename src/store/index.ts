import { createStore, Store, useStore as useVuexStore } from 'vuex'

// 引入各个模块Module
import login from './login/login'
import system from './main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderhgf',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

// dispatch页面刷新重新获取vuex存储的login后的数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
