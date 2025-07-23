<docs>
---
title: Github Style
---

There are also many excellent authors in the market who have open-sourced their markdown styles. Here demonstrates a case of integrating and using github styles.

You can directly download the [github-markdown.css](https://cdn.jsdelivr.net/npm/github-markdown-css@latest/github-markdown.min.css) file, or copy the style code to your own css file. Then reference it in your project.

:::warning
However, it's worth noting that generally such file styles are wrapped by the `markdown-body` class name. Just importing the style file is not enough. You may also need to add a class name to `XMarkdown` to make the styles take effect. This class name should be consistent with the outermost class name in the imported style file.
:::
</docs>

<script setup lang="ts">
// (Assuming your style file exists) Import style file
// import "./github-markdown.css"

const markdown = `
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <!-- Set class name here to make github styles take effect -->
    <XMarkdown :markdown="markdown" class="markdown-body" />
  </div>
</template>

<style scoped lang="less"></style>
