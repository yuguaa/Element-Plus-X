<docs>
---
title: 自定义 气泡内容
---

通过 `#content` 插槽，自定义气泡内容。

::: info
`#content` 插槽 优先级更高，`content` 属性将失效。 `no-padding` 属性可以禁用气泡内容内边距。
:::
</docs>

<script setup lang="ts">
const avatarSize = '48px'
const avatarAI = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Bubble content="欢迎使用 element-plus-x。" typing :avatar="avatarAI" :avatar-size="avatarSize" no-style>
      <template #content>
        <div class="content-container">
          😊 欢迎使用 element-plus-x，我是自定义气泡
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #header>
        <div class="content-container-header">
          推荐内容 自定义气泡
        </div>
      </template>
      <template #content>
        <div class="content-borderless-container">
          🥤 长时间工作后如何有效休息？
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #content>
        <div class="content-borderless-container">
          💌 保持积极心态的秘诀是什么？
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #content>
        <div class="content-borderless-container">
          🔥 如何在巨大的压力下保持冷静？
        </div>
      </template>
    </Bubble>
  </div>
</template>

<style scoped>
.content-container {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.content-container-header {
  font-size: 12px;
  color: #909399;
}

.content-borderless-container {
  user-select: none;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ebeef5;
  }

}
</style>
