<docs>
---
title: 预览 HTML 代码块
---
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`html
<div> 123 </div>
\`\`\`
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" />
  </div>
</template>

<style scoped lang="less"></style>
