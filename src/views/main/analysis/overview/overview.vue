<template>
  <div class="overview">
    <!-- 关于 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关于</span>
        </div>
      </template>
      <div class="text item">
        Vue3+TS 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </el-card>
    <!-- 技术栈 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>技术栈</span>
        </div>
      </template>
      <div class="text item">
        <!-- 技术框架 -->
        <ul v-for="item in technologyStacks" :key="item.title">
          <li>
            <span>{{ item.title }}:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-link href="#" target="_blank" type="info">
              {{ item.desp }}
            </el-link>
          </li>
        </ul>
        <!-- 生产环境依赖 -->
        <gf-descriptions
          title="生产环境依赖"
          :column="2"
          :tableDatas="dependencies"
          class="evnm"
        />
        <!-- 开发环境依赖 -->
        <gf-descriptions
          title="开发环境依赖"
          :column="2"
          :tableDatas="devDependencies"
        />
      </div>
    </el-card>
    <!-- 项目规范 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>项目规范</span>
        </div>
      </template>
      <!-- 文件命名规范 -->
      <gf-descriptions
        title="文件命名规范"
        :column="1"
        :tableDatas="[
          { name: '文件夹', description: '统一小写, 多个单词使用-分割' },
          {
            name: '文件(.ts .vue .json .d.ts)',
            description: '统一小写, 多个单词使用-分割'
          }
        ]"
      />
      <!-- 编写组件规范 -->
      <gf-descriptions
        title="编写组件规范"
        :column="1"
        :tableDatas="[
          { name: '组件的文件', description: '统一小写, 多个单词使用-分割' },
          {
            name: '组件的目录结构',
            description:
              '例如 button 组件：button/src/index.vue, 统一在button/index.ts导出'
          },
          {
            name: '组件导包顺序',
            description:
              '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
          },
          { name: '组件的名称', description: '统一大写开头，驼峰命名' },
          {
            name: '组件属性顺序',
            description: 'name, components, props, emits, setup ...'
          },
          {
            name: 'template标签',
            description: '小写加 - ( 例如：<case-panel/> )'
          },
          {
            name: 'template标签属性顺序',
            description: 'v-if , v-for , ref, class, style, ... ,事件'
          },
          {
            name: '组件的props',
            description: '小写开头，驼峰命名，必须编写类型默认值'
          },
          {
            name: '组件的样式',
            description:
              '作用域：scoped, lang = scss / less  ; 类名：统一小写, 多个单词使用-分割'
          }
        ]"
      />
    </el-card>
    <!-- Git部分 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Git提交规范</span>
        </div>
      </template>
      <!-- Git提交规范 -->
      <gf-descriptions
        :column="1"
        :tableDatas="[
          { name: 'add 操作', description: 'git add ' },
          { name: 'commit 操作', description: 'yarn commit ' },
          { name: 'pull 操作', description: 'git pull ' },
          { name: 'push 操作', description: 'git push ' }
        ]"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 引入封装的组件
import GfDescriptions from '@/base-ui/descriptions'

import { technologyStacks } from './config/technology-stacks'
import { dependencies } from './config/dependencies'
import { devDependencies } from './config/dev-dependencies'

export default defineComponent({
  name: 'overview',
  components: {
    GfDescriptions
  },
  setup() {
    return {
      technologyStacks,
      dependencies,
      devDependencies
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header span {
  font-weight: bold;
}
.text {
  font-size: 14px;
}

.item {
  float: left;
  text-align: left;
  font-size: 16px;
  margin-bottom: 30px;
  el-link {
    color: #909399;
  }
  .evnm {
    margin-top: 30px;
  }
}
</style>
