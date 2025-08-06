<docs>
---
title: 插入 text 内容
---

使用组件 Ref 调用 `setText` 方法在光标位置插入 text 内容。
</docs>

<script setup lang="ts">
import { ref } from 'vue';

const senderRef = ref();
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button
        dark
        type="primary"
        plain
        @click="senderRef?.setText('💖 欢迎来到 Element Plus X ')"
      >
        插入text内容
      </el-button>
    </div>
    <EditorSender ref="senderRef" clearable />
  </div>
</template>
