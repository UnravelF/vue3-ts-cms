<template>
  <div class="user">
    <!-- 搜索框部分 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- 列表部分 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// 引入用户列表的搜索框配置
import { searchFormConfig } from './config/search-config'
// 引入用户列表的table页数据展示配置
import { contentTableConfig } from './config/content-config'

// 引用封装的搜索框的搜索功能及重置功能的hooks
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      // 搜索框的配置
      searchFormConfig,
      // table页的配置
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
      // ...usePageSearch()
    }
  }
})
</script>

<style scoped></style>
