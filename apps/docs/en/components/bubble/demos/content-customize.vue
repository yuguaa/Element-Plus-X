<docs>
---
title: Customize Bubble Content
---

Customize bubble content through `#content` slot.

::: info
`#content` slot has higher priority, `content` property will be disabled. `no-padding` property can disable bubble content padding.
:::
</docs>

<script setup lang="ts">
const avatarSize = '48px';
const avatarAI = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Bubble content="Welcome to element-plus-x." typing :avatar="avatarAI" :avatar-size="avatarSize" no-style>
      <template #content>
        <div class="content-container">
          😊 Welcome to element-plus-x, I'm a custom bubble
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #header>
        <div class="content-container-header">
          Recommended Content Custom Bubble
        </div>
      </template>
      <template #content>
        <div class="content-borderless-container">
          🥤 How to rest effectively after long hours of work?
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #content>
        <div class="content-borderless-container">
          💌 What's the secret to maintaining a positive mindset?
        </div>
      </template>
    </Bubble>

    <Bubble :avatar-size="avatarSize" typing no-style variant="borderless">
      <template #content>
        <div class="content-borderless-container">
          🔥 How to stay calm under tremendous pressure?
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
