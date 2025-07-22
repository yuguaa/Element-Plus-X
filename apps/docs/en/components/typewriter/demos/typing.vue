<docs>
---
title: Support Enable/Disable Typing Mode
---

Control whether to enable typing rendering mode through the `typing` attribute. `typing` can also be an object, setting the `step` property to control how many characters to type each time, the `interval` property to control typing interval, and the `suffix` property to control the suffix added during typing.

::: warning

The `suffix` attribute can only be set to a string, and it becomes ineffective when `isMarkdown` is `true`, because the suffix will be affected by `markdown` rendering and will always be displayed on a new line, which also occurs in `ant-design-x`. So we temporarily decided not to display the suffix when `isMarkdown` is `true`, to make the typewriter as beautiful as possible.

:::
</docs>

<script setup lang="ts">
onMounted(() => {
  setContents('text');
  setContents('markdown');
});

const isTyping = ref(true);
const content = ref('');
const content1 = ref('');
const markdownText = ref('');

function setContents(type: string) {
  if (type === 'text') {
    content.value = '';
    content1.value = '';
    setTimeout(() => {
      content.value = 'typing attribute enables typing effect';
      content1.value = 'typing attribute can also be an object to control how many characters to type each time, typing interval, and typewriter suffix';
    }, 800);
  }
  else if (type === 'markdown') {
    markdownText.value = '';
    setTimeout(() => {
      markdownText.value = ` ### 🐒 Combining is-markdown and typing \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` `;
    }, 800);
  }
}
</script>

<template>
  <ClientOnly>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>
        <el-button style="width: fit-content;" @click="setContents('text')">
          Reset Text
        </el-button>
        <el-button style="width: fit-content;" type="primary" @click="setContents('markdown')">
          Reset Markdown
        </el-button>
      </div>
      <div style="display: flex;  gap: 8px; flex-direction: column;">
        <Typewriter :content="content" :typing="isTyping" />
        <Typewriter :content="content1" :typing="{ step: 2, interval: 100, suffix: '💩' }" />
        <Typewriter :content="markdownText" :typing="isTyping" :is-markdown="true" />
      </div>
    </div>
  </ClientOnly>
</template>
