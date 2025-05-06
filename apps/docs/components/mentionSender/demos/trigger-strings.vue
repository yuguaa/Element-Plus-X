<docs>
---
title: triggerStrings 触发字段
---

通过 `triggerStrings` 属性 触发字段。这里和 `Sender` 组价不同，这里的字符串长度必须且只能为 1。类型是 `Array<string>`。

如果需要通过 **多个字符串触发**，可以搭配 `@search` 事件控制显示浮层内容。

::: info
光设置 `options` 属性，不能开启提及功能。需要 `triggerStrings` 属性来开启提及功能。
:::
</docs>

<script setup lang="ts">
import type { MentionOption } from '../types'

const senderValue = ref('')

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Element-Plus-X', 'HeJiaYue520', 'JsonLee12138', 'lisentowind', 'ZRMYDYCG'],
  '#': ['1.0', '2.0', '3.0', '4.0', '5.0'],
}

const options = ref<MentionOption[]>([])

function handleSearch(_: string, prefix: string) {
  console.log('handleSearch', _, prefix)

  options.value = (MOCK_DATA[prefix] || []).map(value => ({
    value,
  }))
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
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
