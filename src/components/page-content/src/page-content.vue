<template>
  <div class="page-content">
    <gf-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          {{ contentTableConfig.handleTitle }}
        </el-button>
        <el-button :icon="RefreshLeft"></el-button>
      </template>

      <!-- 2. 列中固定的插槽 -->
      <!-- 创建时间栏的时间格式进行修改 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <!-- 更新时间栏的时间格式进行修改 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 展示对数据的操作按钮权限栏 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            :icon="Edit"
            size="small"
            link
            type="primary"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            :icon="Delete"
            size="small"
            link
            type="danger"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            删除
          </el-button>
        </div>
      </template>

      <!-- 3. 在page-content中插入动态的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 如果有插槽名才渲染 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </gf-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

// 引入封装的table组件
import GfTable from '@/base-ui/table'

import { Delete, Edit, RefreshLeft } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    GfTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取用户操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听页数及当前页信息的改变重新获取数据
    watch(pageInfo, () => getPageData())

    // 2.将请求的数据参数传入vuex进行获取数据 发送网络请求
    // queryInfo默认没传递时为{}
    const getPageData = (queryInfo: any = {}) => {
      // 判断是否有查询权限
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 3.从vuex中获取网络请求的数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其他的动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    // 编辑  新建操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      // 列表数据
      dataList,
      // 列表数据总数
      dataCount,
      // 发送请求网络数据的参数到vuex中的方法
      getPageData,
      // 页面数据相关信息
      pageInfo,
      // 动态插槽的属性列
      otherPropSlots,
      // 判定操作权限的参数
      isCreate,
      isUpdate,
      isDelete,
      // 权限操作事件
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      // icon图标
      Delete,
      Edit,
      RefreshLeft
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
