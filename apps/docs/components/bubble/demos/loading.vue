<docs>
---
title: 加载中状态
---

通过 `loading` 属性设置加载中状态。支持通过 `#loading` 插槽自定义加载中状态内容展示。

::: info
`#loading` 插槽 优先级更高，内置的加载中样式将失效。但 `loading` 属性任然可以控制 加载中状态。
:::
</docs>

<script setup lang="ts">
const loading = ref(true)
const content = ref('hello world !')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <Bubble :content="content" :loading="loading" />

    <Bubble :content="content" :loading="loading">
      <template #loading>
        <div>loading...</div>
      </template>
    </Bubble>

    <Bubble :content="content" :loading="loading">
      <template #loading>
        <div>感谢使用 Element-Plus-X 🌹 请稍后...</div>
      </template>
    </Bubble>

    <div style="display: flex; align-items: center;">
      <span>状态：</span>
      <el-switch v-model="loading" />
    </div>
  </div>
</template>
