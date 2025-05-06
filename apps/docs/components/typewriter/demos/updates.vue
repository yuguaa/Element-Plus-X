<docs>
---
title: 🐵 支持 动态更新 content 内容。
---

🐒 当使用 `typing` 属性时，更新 `content` 如果是之前的子集，则会继续输出，否则会重新输出。
</docs>

<script setup lang="ts">
const content = ref('🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ ')
const num = ref(1)
function setContents() {
  num.value++
  content.value = content.value.repeat(num.value)
  if (num.value > 3) {
    num.value = 1
    content.value = '🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ '
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <el-button style="width: fit-content;" @click="setContents">
      设置 content
    </el-button>
    <Typewriter typing :content="content" />
  </div>
</template>
