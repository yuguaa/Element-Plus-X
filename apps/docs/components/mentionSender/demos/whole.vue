<docs>
---
title: whole 整体删除
---

- 将 `whole` 属性设置为 `true`，当您按下退格键时，此处的 `mention` 区域将作为一个整体被删除。

- 设置 `check-is-whole` 属性来自定义检查逻辑。当你需要做多个条件时，你可以使用 `check-is-whole` 属性来自定义检查逻辑。

- check-is-whole 属性不是事件，类型为 (pattern: string, prefix: string) => boolean 返回 `true` 表示匹配成功要被整体删除，返回 `false` 表示匹配失败不会被整体删除。 默认为 `true`
</docs>

<script setup lang="ts">
import type { MentionOption } from '../types'

const senderValue1 = ref('')
const senderValue2 = ref('')

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

function checkIsWhole(pattern: string, prefix: string) {
  console.log('checkIsWhole', pattern, prefix)
  return (MOCK_DATA[prefix] || []).includes(pattern)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="单个指令整体删除：输入 @ 触发指令弹框"
      clearable
      :options="options"
      :trigger-strings="['@']"
      :whole="true"
      @search="handleSearch"
    />

    <MentionSender
      v-model="senderValue2"
      placeholder="多个指令整体删除：输入 @ 和 # 触发指令弹框"
      clearable
      :options="options"
      :trigger-strings="['@', '#']"
      whole
      :check-is-whole="checkIsWhole"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
