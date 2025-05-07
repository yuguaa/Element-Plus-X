<docs>
---
title: solts 各种插槽
---

::: info
- 支持 `#trigger-label` 自定义 标签内容，每条数据的展示
- 支持 `#trigger-loading` 自定义 加载中状态，当 `triggerLoading` 为 true 时，会显示加载中状态
- 支持 `#trigger-header` 自定义 下拉列表顶部的内容
- 支持 `#trigger-footer` 自定义 下拉列表底部的内容
:::
</docs>

<script setup lang="ts">
import type { MentionOption } from '../types'
import { Loading } from '@element-plus/icons-vue'

const senderValue1 = ref('')
const options = ref<MentionOption[]>()
const triggerLoading = ref(false)

function handleSearch() {
  triggerLoading.value = true
  setTimeout(() => {
    options.value = [
      {
        value: 'HeJiaYue520',
        avatar: 'https://avatars.githubusercontent.com/u/76239030',
      },
      {
        value: 'JsonLee12138',
        avatar: 'https://avatars.githubusercontent.com/u/160690954',
      },
      {
        value: 'ageerle',
        avatar: 'https://avatars.githubusercontent.com/u/32251822',
      },
    ]
    triggerLoading.value = false
  }, 1500)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="输入 @ 触发指令弹框"
      :options="options"
      :trigger-strings="['@']"
      :whole="true"
      :trigger-loading="triggerLoading"
      @search="handleSearch"
    >
      <template #trigger-label="{ item }">
        <div style="display: flex; align-items: center">
          <el-avatar :size="24" :src="item.avatar" />
          <span style="margin-left: 6px">{{ item.value }}</span>
        </div>
      </template>

      <template #trigger-loading>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 24px; gap: 12px;">
          这是自定义加载中状态
          <el-icon class="is-loading" style="color: cornflowerblue; font-size: 20px;">
            <Loading />
          </el-icon>
        </div>
      </template>

      <template #trigger-header>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 8px;">
          这是自定义下拉列表顶部的内容
        </div>
      </template>

      <template #trigger-footer>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 8px;">
          这是自定义下拉列表底部的内容
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss">
</style>
