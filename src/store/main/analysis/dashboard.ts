import { Module } from 'vuex'

import { IDashboardState } from './types'
import { IRootState } from '../../types'

// 引入网络请求文件
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsCFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsCount(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDateAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsCFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      const addressCountResult = await getAddressGoodsSale()
      commit('changeAddressGoodsCount', addressCountResult.data)
    }
  }
}

export default dashboardModule
