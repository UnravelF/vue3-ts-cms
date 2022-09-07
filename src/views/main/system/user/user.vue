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
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <!-- 动态插槽列 -->
      <!-- 用户状态栏 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'primary' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <!-- 新建用户表单 -->
    <page-modal
      :modalConfig="modalConfigRef"
      pageName="users"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

// 引入组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// 组件的配置
// 引入用户列表的搜索框配置
import { searchFormConfig } from './config/search-config'
// 引入用户列表的table页数据展示配置
import { contentTableConfig } from './config/content-config'
// 引入新建用户的弹框属性展示配置
import { modalConfig } from './config/modal-config'

// 引用封装的搜索框的搜索功能及重置功能的hooks
import { usePageSearch } from '@/hooks/usePageSearch'
// 引入封装的新建和编辑功能的hooks
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // pageModal相关hook逻辑
    // 1. 处理新建时显示用户密码输入框 编辑时不显示
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2. 动态添加部门和角色列表
    const store = useStore()
    // 解决modalConfig里面的部门和角色的options数据还没异步请求过来  就设定好了  实现响应式更新数据
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })

      return modalConfig
    })

    // departmentItem!.options = store.state.entireDepartment.map(
    //   (item: { name: any; id: any }) => {
    //     return { label: item.name, value: item.id }
    //   }
    // )

    // 3. 调用hook获取公共的变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      // 搜索框的配置
      searchFormConfig,
      // table页的配置
      contentTableConfig,
      // 新建用户弹框的配置
      modalConfigRef,
      // 获取pageContent组件对象
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      // pageContent传递的新建  编辑点击事件
      handleNewData,
      handleEditData,
      // 获取pageModal组件对象
      pageModalRef,
      defaultInfo
      // ...usePageSearch()
    }
  }
})
</script>

<style scoped></style>
