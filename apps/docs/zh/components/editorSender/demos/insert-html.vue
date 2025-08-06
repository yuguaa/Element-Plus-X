<docs>
---
title: 插入 html 内容
---

使用组件 Ref 调用 `setHtml` 方法在光标位置插入 html 内容。

:::warning
插入的html标签必须是 行内 或 行内块元素，如果需要块级元素标签 请自行插入行内元素然后修改其css属性为块级元素
:::
</docs>

<script setup lang="ts">
import { ref } from 'vue';

const senderRef = ref();
function setHtml() {
  senderRef.value?.setHtml(
    `<img class="img-tag" src="https://cdn.element-plus-x.com/element-plus-x.png" alt="">`
  );
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button dark type="primary" plain @click="setHtml">
        插入 html 内容
      </el-button>
    </div>
    <EditorSender ref="senderRef" clearable />
  </div>
</template>

<style scoped lang="less">
:deep(.img-tag) {
  width: 24px;
  height: 24px;
  vertical-align: bottom;
  display: inline-block;
}
</style>
