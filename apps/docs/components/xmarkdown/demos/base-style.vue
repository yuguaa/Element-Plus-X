<docs>
---
title: 基础用法
---

快速创建一个 欢迎卡片
</docs>

<script setup lang="ts">
const markdown = `
# 快速创建一个 欢迎卡片

<div class="card">
  <div class="card-body">
    <h5 class="card-title">欢迎来到我的博客</h5>
    <p class="card-text">这里是我的博客，欢迎来到我的博客。</p>
    <a href="#" class="btn btn-primary">开始阅读</a>
  </div>
</div>
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" class="markdown-body" />
  </div>
</template>

<style scoped lang="less"></style>
