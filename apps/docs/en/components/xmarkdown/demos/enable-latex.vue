<docs>
---
title: Enable LaTeX Mathematical Formula Rendering
---

Support LaTeX mathematical formula rendering, use the `enableLatex` property to enable, enabled by default.
</docs>

<script setup lang="ts">
const markdown = `
### Inline Formula
$e^{i\\pi} + 1 = 0$

### Block Formula
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$
`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :enable-latex="value1" />
  </div>
</template>

<style module lang="less"></style>
