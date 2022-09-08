<template>
  <div class="department">
    <!-- 部门列表搜索框 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <!-- 部门列表内容 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <!-- 编辑/新建数据的弹框组件 -->
    <page-modal
      :modalConfig="modalConfig"
      pageName="department"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 引入布局组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// 引入组件配置
import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'

// 引用封装的搜索框的搜索功能及重置功能的hooks
import { usePageSearch } from '@/hooks/usePageSearch'

// 引入封装的新建和编辑功能的hooks
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 引用hooks封装好的搜索框部分重置/搜索功能按钮
    const [pageContentRef, handleResetBtnClick, handleQueryClick] =
      usePageSearch()

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'name'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'name'
      )
      passwordItem!.isHidden = true
    }
    // 引入hooks封装的列表部分编辑新建功能函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetBtnClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
