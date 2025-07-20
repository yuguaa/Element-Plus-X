<docs>
---
title: Long Text Input Box
---

You can set the minimum and maximum display rows of the input box through `autosize`. `autosize` is an object with a default value of `{ minRows: 1, maxRows: 6 }`. When exceeding the maximum number of rows, the input box will automatically show a scrollbar.
</docs>

<script setup lang="ts">
const longerValue = `💌 Welcome to use Element-Plus-X ~`.repeat(30);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MentionSender :auto-size="{ minRows: 2, maxRows: 5 }" />
    <MentionSender v-model="longerValue" />
  </div>
</template>
