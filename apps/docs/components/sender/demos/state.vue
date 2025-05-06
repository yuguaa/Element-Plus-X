<docs>
---
title: 组件状态
---

可以通过简单属性是，实现组件的状态

::: info
- 通过 `loading` 属性，可以控制输入框是否加载中。
- 通过 `readOnly` 属性，可以控制输入框是否可编辑。
- 通过 `disabled` 属性，可以控制输入框是否禁用。
- 通过 `clearable` 属性，可以控制输入框是否出现删除按钮，实现清空。
- 通过 `inputWidth` 属性，可以控制输入框的宽度。默认为 `100%`。
:::
</docs>

<script setup lang="ts">
const senderReadOnlyValue = ref(`只读：💌 欢迎使用 Element-Plus-X ~`)
const senderClearableValue = ref(`可删除：💌 欢迎使用 Element-Plus-X ~`)

function handleSubmit(value: string) {
  console.log(value)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Sender loading placeholder="加载中..." @submit="handleSubmit" />
    <Sender v-model="senderReadOnlyValue" read-only @submit="handleSubmit" />
    <Sender value="禁用：💌 欢迎使用 Element-Plus-X ~" disabled @submit="handleSubmit" />
    <Sender v-model="senderClearableValue" clearable @submit="handleSubmit" />
    <Sender style="width: fit-content;" value="输入框最大宽度：💌 欢迎使用 Element-Plus-X ~" input-width="150px" @submit="handleSubmit" />
  </div>
</template>
