<docs>
---
title: triggerLoading 异步加载状态
---

通过 `triggerLoading` 属性设置 提及选项列表的加载状态。`triggerLoading` 属性默认为 `false`，即默认不显示加载状态。
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender'

const senderValue = ref('')

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Element-Plus-X', 'HeJiaYue520', 'JsonLee12138', 'lisentowind', 'ZRMYDYCG'],
  '#': ['1.0', '2.0', '3.0', '4.0', '5.0'],
}

const options = ref<MentionOption[]>([])
const triggerLoading = ref(false)

function handleSearch(_: string, prefix: string) {
  triggerLoading.value = true
  setTimeout(() => {
    console.log('handleSearch', _, prefix)

    options.value = (MOCK_DATA[prefix] || []).map(value => ({
      value,
    }))
    triggerLoading.value = false
  }, 1500)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue"
      placeholder="输入 @ 和 # 触发指令弹框"
      clearable
      :options="options"
      :trigger-strings="['@', '#']"
      :trigger-loading="triggerLoading"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
