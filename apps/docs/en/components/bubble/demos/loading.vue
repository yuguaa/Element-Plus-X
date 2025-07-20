<docs>
---
title: Loading State
---

Set loading state through `loading` property. Supports custom loading state content display through `#loading` slot.

::: info
`#loading` slot has higher priority, built-in loading styles will be disabled. But the `loading` property can still control the loading state.
:::
</docs>

<script setup lang="ts">
const loading = ref(true);
const content = ref('hello world !');
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
        <div>Thank you for using Element-Plus-X 🌹 Please wait...</div>
      </template>
    </Bubble>

    <div style="display: flex; align-items: center;">
      <span>State: </span>
      <el-switch v-model="loading" />
    </div>
  </div>
</template>
