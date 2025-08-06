<docs>
---
title: 自定义输入框样式
---
通过 `customStyle` 方便对输入框的样式控制，你可以设置 `maxHeight` 来限制输入框的高度。这样实现在一定的高度下出现滚动条。
</docs>

<script setup lang="ts"></script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <EditorSender
      variant="updown"
      :custom-style="{
        fontSize: '24px',
        fontWeight: 700,
        maxHeight: '100px'
      }"
      style="
        background-image: linear-gradient(to left, #7fffaa 0%, #00ffff 100%);
        border-radius: 8px;
      "
    />

    <EditorSender
      :custom-style="{
        fontSize: '24px',
        fontWeight: 700,
        maxHeight: '200px',
        minHeight: '100px'
      }"
      style="
        background-image: linear-gradient(
          to top,
          #fdcbf1 0%,
          #fdcbf1 1%,
          #e6dee9 100%
        );
        border-radius: 8px;
      "
    />
  </div>
</template>

<style scoped lang="scss">
.isSelect {
  color: #626aef !important;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}
</style>
