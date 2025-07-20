<docs>
---
title: Long Text Input
---

You can set the minimum and maximum display rows for the input through `autosize`. `autosize` is an object with default value `{ minRows: 1, maxRows: 6 }`. When exceeding the maximum rows, the input will automatically show a scrollbar.
</docs>

<script setup lang="ts">
const longerValue = `💌 Welcome to Element-Plus-X ~`.repeat(30);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Sender :auto-size="{ minRows: 2, maxRows: 5 }" />
    <Sender v-model="longerValue" />
  </div>
</template>
