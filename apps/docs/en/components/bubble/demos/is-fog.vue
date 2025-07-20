<docs>
---
title: Fog Effect
---

When typing is enabled, it inherits the typewriter's fog property. Enable fog effect rendering mode by setting the `is-fog` property. Compatible with Markdown styles. Note that when fog effect is enabled, the `typing` suffix property will be disabled.

`is-fog` defaults to false, and can be set to `true` or `{ bgColor: '#f5f5f5', width: '80px' }`. Setting the fog background color can better match custom styles.
</docs>

<script setup lang="ts">
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
const content = ref(
  `## 🔥Element-Plus-X \n 🥰 Thank you for using Element-Plus-X! \n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`
);

function changeContent(type: number) {
  content.value = '';

  setTimeout(() => {
    if (type === 1) {
      content.value = `## 🔥Element-Plus-X \n 🥰 Thank you for using Element-Plus-X! \n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`;
    } else if (type === 2) {
      content.value = `🔥Element-Plus-X `.repeat(10);
    }
  }, 80);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <el-button style="width: fit-content" @click="changeContent(1)">
        Fog markdown
      </el-button>
      <el-button style="width: fit-content" @click="changeContent(2)">
        Fog text
      </el-button>
    </div>
    <Bubble
      :content="content"
      :typing="{ step: 3, interval: 80, suffix: '💩' }"
      is-markdown
      :is-fog="{ bgColor: '#f5f5f5' }"
    >
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
