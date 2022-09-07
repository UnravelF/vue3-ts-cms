<template>
  <div class="menu">
    <!-- 菜单列表内容 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
// 引入菜单列表的配置信息
import { contentTableConfig } from './config/content-config'

export default defineComponent({
  name: 'gf-menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
