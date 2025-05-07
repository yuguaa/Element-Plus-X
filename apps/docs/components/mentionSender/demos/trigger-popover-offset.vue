<docs>
---
title: trigger-popover-offset 弹出距离窗口偏移
---

通过 `triggerPopoverOffset` 属性可以设置浮层距离窗口的偏移量。默认值 20，表示为 20px。
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
      placeholder="输入 @ 和 / 触发指令弹框 当前偏移量50px"
      clearable
      :options="options"
      :trigger-strings="['@', '/']"
      :whole="true"
      trigger-popover-placement="bottom"
      :trigger-popover-offset="50"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
