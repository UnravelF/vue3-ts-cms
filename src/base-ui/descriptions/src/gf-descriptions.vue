<template>
  <div class="description">
    <el-descriptions :title="title" :column="column" border size="large">
      <template v-for="(itemData, index) in tableDatas" :key="index">
        <el-descriptions-item width="300px">
          <template #label> {{ itemData.name }} </template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 1
    },
    tableDatas: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.description {
  width: 100%;
  margin-bottom: 20px;
}
</style>
