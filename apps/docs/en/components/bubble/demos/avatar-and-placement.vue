<docs>
---
title: Support for Position and Avatar, and Spacing Settings
---

Use `#avatar` to set a custom avatar. Use the `placement` property to set position, with options `start` and `end`.

::: tip
😸 Built-in `element-plus` `el-avatar` component. However, to avoid property name conflicts (e.g., `el-avatar` and `Bubble`'s `shape` property), you need to use the following properties:

1. Properties
- `avatar` sets the avatar placeholder image
- `avatar-size` sets the avatar placeholder size 👉 Note that this property is `number type` in `el-avatar component`, but `string type` here for better style customization 😊
- `avatar-gap` sets the distance between avatar and bubble
- `avatar-shape` sets the avatar shape
- `avatar-icon` sets the avatar placeholder icon
- `avatar-src-set` sets the avatar image srcset attribute
- `avatar-alt` sets the avatar image alt attribute
- `avatar-fit` sets the avatar placeholder image's fill mode
2. Events
- `@avatar-error` triggered when avatar fails to load.
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

    <!-- avatar-size sets avatar placeholder space -->
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
