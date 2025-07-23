<docs>
---
title: Render Markdown Text Content
---

Enable `markdown` text content rendering mode by setting the `is-markdown` property. When updating `content`, if it's a subset of the previous content, it will continue outputting, otherwise it will restart.
</docs>

<script setup lang="ts">
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
const markdownText =
  ref(`#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 \n
\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 \n
\`\`\`
`);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Bubble :content="markdownText" typing is-markdown>
      <template #avatar>
        <el-avatar :size="32" :src="avatarUser" />
      </template>
    </Bubble>
  </div>
</template>

<style scoped lang="less">
:deep(.markdown-body) {
  background-color: transparent;
}
</style>
