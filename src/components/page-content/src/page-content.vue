<template>
  <div class="page-content">
    <gf-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
        <el-button :icon="RefreshLeft"></el-button>
      </template>

      <!-- 2. 列中的插槽 -->
      <!-- 用户状态栏的格式的修改 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'primary' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <!-- 创建时间栏的时间格式进行修改 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <!-- 更新时间栏的时间格式进行修改 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 展示对数据的操作按钮权限栏 -->
      <template #handler>
        <div class="handle-btns">
          <el-button :icon="Edit" size="small" link type="primary"
            >编辑</el-button
          >
          <el-button :icon="Delete" size="small" link type="danger"
            >删除</el-button
          >
        </div>
      </template>
    </gf-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

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
  setup(props) {
    const store = useStore()
    // 将请求的数据参数传入vuex进行获取数据
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // 网络请求的数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    return {
      dataList,
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
