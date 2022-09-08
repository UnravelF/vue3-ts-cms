<template>
  <div class="role">
    <!-- 角色列表搜索框 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <!-- 角色列表 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <!-- 按钮功能 -->
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content-config'
import { searchFormConfig } from './config/search-config'
import { modalConfig } from './config/modal-config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { menuMapMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // 处理搜索框部分的重置/模糊搜索角色列表功能
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapMenuLeafKeys(item.menuList)
      // 解决点击编辑后 还没执行该回调函数 editCallback  获取不到elTree绑定的ref对象
      nextTick(() => {
        console.log(elTreeRef.value)

        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 传入给page-modal的新建/编辑时的权限
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      // 搜索框重置/搜索函数
      handleResetClick,
      handleQueryClick,
      // 列表框新建/编辑函数
      handleNewData,
      handleEditData,
      // 完整菜单数据
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 60px;
}
</style>
