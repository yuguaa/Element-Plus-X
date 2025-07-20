<docs>
---
title: Support for Custom Bubble Header and Footer Content
---

Use the `#header` and `#footer` slots to customize the bubble's header and footer content.
</docs>

<script setup lang="ts">
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue';

const content = ref(
  'Hi! Welcome to Element Plus X. Feel free to ask me any questions!'
);
const avatarAI =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
</script>

<template>
  <Bubble :content="content">
    <template #avatar>
      <el-avatar :src="avatarAI" />
    </template>
    <template #header>
      <span>Element Plus X</span>
    </template>
    <template #footer>
      <div class="footer-container">
        <el-button type="info" :icon="Refresh" size="small" circle />
        <el-button type="success" :icon="Search" size="small" circle />
        <el-button type="warning" :icon="Star" size="small" circle />
        <el-button color="#626aef" :icon="DocumentCopy" size="small" circle />
      </div>
    </template>
  </Bubble>
</template>

<style module lang="less">
.footer-container {
  :deep(.el-button + .el-button) {
    margin-left: 8px;
  }
}
</style>
