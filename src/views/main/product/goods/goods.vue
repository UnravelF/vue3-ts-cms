<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <!-- 商品页面加入的动态插槽 -->
      <!-- 图片展示栏 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          hide-on-click-modal
          preview-teleported
        />
      </template>
      <!-- 价格展示栏 -->
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <!-- 商品状态栏 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.status ? 'primary' : 'danger'"
          >{{ scope.row.status ? '库余' : '缺货' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'

// 配置信息
import { contentTableConfig } from './config/content-config'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
