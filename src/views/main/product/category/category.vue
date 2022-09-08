<template>
  <div class="category">
    <!-- 商品类别搜索框 -->
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <!-- 商品类别列表 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="category"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 引入封装组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// 引入配置文件
import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
