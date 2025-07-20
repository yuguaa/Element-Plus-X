<docs>
---
title: Loading State
---

Set loading state through the `loading` property. Support customizing loading state content display through the `#loading` slot.

::: info
The `#loading` slot has higher priority, and the built-in loading style will be disabled. However, the `loading` property can still control the loading state.
:::
</docs>

<script setup lang="ts">
const loading = ref(true);
const content = ref('hello world !');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <Bubble :content="content" :loading="loading" />

    <Bubble :content="content" :loading="loading">
      <template #loading>
        <div>loading...</div>
      </template>
    </Bubble>

    <Bubble :content="content" :loading="loading">
      <template #loading>
        <div>Thanks for using Element-Plus-X 🌹 Please wait...</div>
      </template>
    </Bubble>

    <div style="display: flex; align-items: center">
      <span>Status: </span>
      <el-switch v-model="loading" />
    </div>
  </div>
</template>
