<docs>
---
title: 组件状态
---

可以通过简单属性是，实现组件的状态

::: info
- 通过 `loading` 属性，可以控制输入框内置按钮加载中。
- 通过 `disabled` 属性，可以控制输入框内置按钮是否禁用。
- 通过 `clearable` 属性，可以控制输入框是否出现删除按钮，实现清空。
:::
</docs>

<script setup lang="ts">
import type { SubmitResult } from 'vue-element-plus-x/types/EditorSender';

function handleSubmit(value: SubmitResult) {
  console.log(value);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <EditorSender loading placeholder="加载中..." @submit="handleSubmit" />
    <EditorSender placeholder="禁用" disabled @submit="handleSubmit" />
    <EditorSender clearable @submit="handleSubmit" />
  </div>
</template>
