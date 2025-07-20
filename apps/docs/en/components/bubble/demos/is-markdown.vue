<docs>
---
title: Render Markdown Text Content
---

Enable Markdown text content rendering mode by setting the `is-markdown` property. When updating `content`, if it's a subset of the previous content, it will continue outputting; otherwise, it will restart output.
</docs>

<script setup lang="ts">
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
const content = ref(
  `## 🔥Element-Plus-X \n 🥰 Thank you for using Element-Plus-X! \n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`
);
const num = ref(1);

function changeContent() {
  num.value++;
  content.value = content.value.repeat(num.value);
  if (num.value > 2) {
    num.value = 1;
    content.value = `## 🔥Element-Plus-X \n 🥰 Thank you for using Element-Plus-X! \n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`;
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-button style="width: fit-content" @click="changeContent">
      Set markdown
    </el-button>
    <Bubble :content="content" typing is-markdown>
      <template #avatar>
        <el-avatar :size="32" :src="avatarUser" />
      </template>
    </Bubble>
  </div>
</template>

<style module lang="less">
:deep(.markdown-body) {
  background-color: transparent;
}
</style>
