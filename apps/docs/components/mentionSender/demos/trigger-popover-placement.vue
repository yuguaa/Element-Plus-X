<docs>
---
title: trigger-popover-placement 指令弹框弹出方向
---

通过 `trigger-popover-placement` 设置 弹出方向。默认是 `'top'`, 可以设置为 `'bottom'`。目前只支持 `'top'` 和 `'bottom'` 两种。
</docs>

<script setup lang="ts">
import type { MentionOption } from '../types'

const senderValue1 = ref('')

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Element-Plus-X', 'HeJiaYue520', 'JsonLee12138', 'lisentowind', 'ZRMYDYCG'],
  '#': ['1.0', '2.0', '3.0', '4.0', '5.0'],
}

const options = ref<MentionOption[]>([])

function handleSearch(_: string, prefix: string) {
  options.value = (MOCK_DATA[prefix] || []).map(value => ({
    value,
  }))
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="输入 @ 和 / 触发指令弹框"
      clearable
      :options="options"
      :trigger-strings="['@', '/']"
      :whole="true"
      trigger-popover-placement="bottom"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
