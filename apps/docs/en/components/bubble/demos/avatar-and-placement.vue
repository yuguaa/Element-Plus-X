<docs>
---
title: Support for Position and Avatar, and Spacing Settings
---

Set custom avatar through `#avatar`. Set position through `placement` property, provides `start`, `end` two option values.

::: tip
😸 Built-in `element-plus` `el-avatar` component. But to avoid property name conflicts, for example: `el-avatar` and `Bubble`'s `shape` property. You need to use the following properties to set

1. Properties
- `avatar` Set avatar placeholder image
- `avatar-size` Set avatar placeholder size 👉This property is `number type` in `el-avatar component`, note that in this component it's `string type` for better custom style properties😊
- `avatar-gap` Set distance between avatar and bubble
- `avatar-shape` Set avatar shape
- `avatar-icon` Set avatar placeholder icon
- `avatar-src-set` Set avatar image srcset attribute
- `avatar-alt` Set avatar image alt attribute
- `avatar-fit` Set avatar placeholder image fill mode
2. Events
- `@avatar-error` Triggered when avatar loading fails.
:::
</docs>

<script setup lang="ts">
const avatarAI =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <!-- Avatar and Placement Left -->
    <Bubble
      content="Good morning, how are you?"
      placement="start"
      :avatar="avatarAI"
      avatar-size="48px"
    />

    <!-- avatar-size Set avatar placeholder space -->
    <Bubble
      content="What a beautiful day!"
      placement="start"
      avatar-size="48px"
    />

    <!-- Avatar and Placement Right -->
    <Bubble content="Hi, good morning, I'm fine!" placement="end">
      <template #avatar>
        <el-avatar :size="32" :src="avatarUser" />
      </template>
    </Bubble>

    <!-- avatar-gap property controls distance between bubble and avatar -->
    <Bubble
      content="Hi, good morning, I'm fine! Thank you!"
      placement="end"
      avatar-size="0px"
      avatar-gap="0px"
    />
  </div>
</template>
