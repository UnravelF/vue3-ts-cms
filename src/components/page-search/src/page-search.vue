<template>
  <div class="page-search">
    <!-- 搜索框部分 -->
    <g-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </g-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    GForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该由我们的配置文件field来决定
    // 1.优化一：formData中的属性应该动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[`${item.field}`] = ''
    }

    const formData = ref(formOriginData)

    // 2. 当用户点击重置事件
    const handleResetClick = () => {
      formData.value = formOriginData

      emit('resetBtnClick')
    }

    // 3. 优化三：点击搜索按钮事件
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
