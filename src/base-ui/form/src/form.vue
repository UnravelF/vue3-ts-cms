<template>
  <div class="gf-form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单搜索的内容 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 判断类型input -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                />
              </template>
              <!-- 判断类型下拉选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <!-- 判断类型为时间选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 底部插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 监听表单内各个输入框绑定的值 来发射事件到user里面
    // 实现双向绑定到user里面对应的表单绑定值,且不是通过子组件直接引用父组件user里面的值进行修改
    // 通过computed 解决用户搜索内容重置时，formData拷贝过来的对应值实现响应式
    // const formData = ref({ ...props.modelValue })

    // watch(formData, (newValue) => emit('update:modelValue', newValue), {
    //   deep: true
    // })

    const handelValueChange = (value: any, field: string) => {
      // modelValue里面可能有些改了有些没改，将没改的通过props.modelValue 与改了的通过[field]: value一同转过去绑定最新值
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      // formData
      handelValueChange
    }
  }
})
</script>

<style scoped lang="less">
.gf-form {
  padding-top: 22px;
}
</style>
