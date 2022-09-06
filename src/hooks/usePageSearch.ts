import { ref } from 'vue'

import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 获取page-content.vue的组件对象
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 处理page-search.vue 传递的重置  搜索事件
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  // TS角度可以当成是元组  JS角度就是数组 但最终TS也会转换成JS  返回对象也行
  return [pageContentRef, handleResetClick, handleQueryClick]
}
