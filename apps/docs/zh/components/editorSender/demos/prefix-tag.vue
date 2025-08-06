<docs>
---
title: 前置提示标签
---

通过 组件 Ref 实例的 `openTipTag` 和 `closeTipTag` 方法打开和关闭前置提示标签。
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
        @click="
          senderRef?.openTipTag({
            tagLabel: '图像生成',
            popoverLabel: '点击退出技能'
          })
        "
      >
        打开前置提示标签
      </el-button>
      <el-button dark type="primary" plain @click="senderRef?.closeTipTag()">
        关闭前置提示标签
      </el-button>
    </div>

    <EditorSender ref="senderRef" clearable />
  </div>
</template>

<style scoped lang="less">
:deep(.at-select) {
  cursor: pointer;

  svg {
    display: inline-block;
  }
}

:deep(.img-tag) {
  width: 24px;
  height: 24px;
  vertical-align: bottom;
  display: inline-block;
}

// 样式穿透处理 (解决前置标签和输入框内容的间距问题)
:deep(.el-editor-sender-content) {
  padding-top: 0 !important;
  .el-editor-sender-chat,
  .chat-tip-wrap,
  .chat-placeholder-wrap,
  .el-editor-sender-action-list-presets {
    padding-top: 12px !important;
  }
}
</style>
