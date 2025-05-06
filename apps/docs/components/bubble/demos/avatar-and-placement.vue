<docs>
---
title: 支持位置和头像，以及间距设置
---

通过 `#avatar` 设置自定义头像。通过 `placement` 属性设置位置，提供了 `start`、`end` 两个选项值。

::: tip
😸 内置 `element-plus` `el-avatar` 组件。但是为避免属性名重复，例如：`el-avatar` 和 `Bubble` 的 `shape` 属性。你需要用以下属性设置

1. 属性
- `avatar` 设置头像占位图片
- `avatar-size` 设置头像占位大小 👉这个属性在 `el-avatar组件` 是 `number类型`，这里注意在此组件上是 `string类型` 以更好自定义样式属性😊
- `avatar-gap` 设置头像和气泡之间的距离
- `avatar-shape` 设置头像形状
- `avatar-icon` 设置头像占位图标
- `avatar-src-set` 设置头像图片 srcset 属性
- `avatar-alt` 设置头像图片的 alt  属性
- `avatar-fit` 设置头像占位图片的填充模式
2. 事件
- `@avatar-error` 当头像加载失败时触发。
:::
</docs>

<script setup lang="ts">
const avatarAI = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <!-- Avatar and Placement 左侧 -->
    <Bubble content="Good morning, how are you?" placement="start" :avatar="avatarAI" avatar-size="48px" />

    <!-- avatar-size 设置头像占位空间 -->
    <Bubble content="What a beautiful day!" placement="start" avatar-size="48px" />

    <!-- Avatar and Placement 右侧 -->
    <Bubble content="Hi, good morning, I'm fine!" placement="end">
      <template #avatar>
        <el-avatar
          :size="32"
          :src="avatarUser"
        />
      </template>
    </Bubble>

    <!-- avatar-gap 属性控制 气泡与头像的距离 -->
    <Bubble content="Hi, good morning, I'm fine! Thank you!" placement="end" avatar-size="0px" avatar-gap="0px" />
  </div>
</template>
