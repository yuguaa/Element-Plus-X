<docs>
---
title: 超长文字输入框
---

可以通过 `autosize` 设置输入框的最小展示行数和最大展示行数。 `autosize` 是一个对象 默认值为 `{ minRows: 1, maxRows: 6 }`。超出最大行数时，输入框会自动出现滚动条。
</docs>

<script setup lang="ts">
const longerValue = `💌 欢迎使用 Element-Plus-X ~`.repeat(30)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Sender :auto-size="{ minRows: 2, maxRows: 5 }" />
    <Sender v-model="longerValue" />
  </div>
</template>
