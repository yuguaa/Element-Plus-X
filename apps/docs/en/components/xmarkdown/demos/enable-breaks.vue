<docs>
---
title: Enable Breaks Rendering
---

Support remark-breaks rendering, use the `enableBreaks` property to enable, enabled by default.

Support hard breaks without requiring spaces or escape characters (converts line breaks to `<br>`). Makes your content rendering more authentic.
</docs>

<script setup lang="ts">
const markdown = `Mars is
the fourth planet`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :enable-breaks="value1" />
  </div>
</template>

<style module lang="less"></style>
