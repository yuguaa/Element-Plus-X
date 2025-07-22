<docs>
---
title: default-theme-mode Property
---

Set code block highlighting through the `default-theme-mode` property, whether the default is highlight theme or dark theme.

:::info
The demonstration here in the documentation may be affected by vitePress styles, please check the effect yourself. If the property is invalid in your project, you can join 👉[Community Group](https://element-plus-x.com/en/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81) to provide feedback.
:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`js
console.log('hello world');
\`\`\`
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" default-theme-mode="light" />
  </div>
</template>

<style scoped lang="less"></style>
