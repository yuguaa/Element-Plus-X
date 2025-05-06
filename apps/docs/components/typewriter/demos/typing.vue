<docs>
---
title: 支持 开启/关闭 打字模式
---

通过 `typing` 属性控制是否启用 打字渲染模式。`typing` 也可以是一个对象，设置 step 属性，控制打字每次吐字，interval 属性控制打字间隔，suffix 属性控制打字添加的后缀。

::: warning

`suffix` 属性只能设置字符串，且在 `isMarkdown` 为 `true` 时失效，因为后缀会受 `markdown` 渲染影响，始终会另起一行进行展示，这一点在 `ant-design-x` 中也会出现。所以我们先暂时决定在 `isMarkdown` 为 `true` 时，不展示后缀，让打字器尽可能美观。

:::
</docs>

<script setup lang="ts">
onMounted(() => {
  setContents('text')
  setContents('markdown')
})

const isTyping = ref(true)
const content = ref('')
const content1 = ref('')
const markdownText = ref('')

function setContents(type: string) {
  if (type === 'text') {
    content.value = ''
    content1.value = ''
    setTimeout(() => {
      content.value = 'typing 属性开启打字效果'
      content1.value = 'typing 属性也可以是对象，来控制打每次打字吐字、每次打字间隔、和打字器后缀'
    }, 800)
  }
  else if (type === 'markdown') {
    markdownText.value = ''
    setTimeout(() => {
      markdownText.value = ` ### 🐒 is-markdown 和 typing 结合使用 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` `
    }, 800)
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div>
      <el-button style="width: fit-content;" @click="setContents('text')">
        重置文本
      </el-button>
      <el-button style="width: fit-content;" type="primary" @click="setContents('markdown')">
        重置 markdown
      </el-button>
    </div>
    <div style="display: flex;  gap: 8px; flex-direction: column;">
      <Typewriter :content="content" :typing="isTyping" />
      <Typewriter :content="content1" :typing="{ step: 2, interval: 100, suffix: '💩' }" />
      <Typewriter :content="markdownText" :typing="isTyping" :is-markdown="true" />
    </div>
  </div>
</template>
