<docs>
---
title: Support Fog Effect
---

Control whether to enable fog effect through the `isFog` attribute. Note that this attribute only takes effect when `isTyping` is `true`. It will override the default `typing` suffix attribute.
</docs>

<script setup lang="ts">
const content = ref(
  `#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
);

function setContent(type: number) {
  content.value = '';
  setTimeout(() => {
    content.value =
      type === 1
        ? `#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
        : 'Welcome to Element-Plus-X 💖'.repeat(10);
  }, 800);
}
</script>

<template>
  <ClientOnly>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex; gap: 10px">
        <el-button @click="setContent(1)">
          Fog Markdown
        </el-button>
        <el-button @click="setContent(2)">
          Fog Text
        </el-button>
      </div>

      <Typewriter :content="content" :is-markdown="true" is-fog typing />
    </div>
  </ClientOnly>
</template>
