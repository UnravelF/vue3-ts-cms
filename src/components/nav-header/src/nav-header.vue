<template>
  <div class="nav-header">
    <el-icon v-if="isFlod" class="fold-menu" @click="handleFoldClick"
      ><Fold
    /></el-icon>
    <el-icon v-else class="fold-menu" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <div class="content">
      <gf-breadcrumb :breadcrumbs="breadcrumbs" />
      <!-- 头部导航栏右边用户信息 -->
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import GfBreadcrumb from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    GfBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFlod = ref(false)
    const handleFoldClick = () => {
      isFlod.value = !isFlod.value
      // 发送事件， 改变侧边导航栏的展示状态
      emit('foldChange', isFlod.value)
    }

    // 面包屑数据: [{name, path}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      handleFoldClick,
      isFlod,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
