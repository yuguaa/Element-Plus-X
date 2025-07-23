<docs>
---
title: Support Markdown Content Rendering
---

Control whether to enable Markdown rendering mode through the `isMarkdown` attribute.
</docs>

<script setup lang="ts">
const markdownText = ref(
  `#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
);
</script>

<template>
  <ClientOnly>
    <Typewriter :content="markdownText" :is-markdown="true" />
  </ClientOnly>
</template>
