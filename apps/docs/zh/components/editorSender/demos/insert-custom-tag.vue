<docs>
---
title: 插入 自定义标签
---

通过 `customTrigger` 属性配置自定义标签配置数组。

使用组件 Ref 调用 `setCustomTag` 方法在光标位置插入 **自定义标签** 内容，这个方法接受两个参数，第一个参数为自定义标签的标识符前缀，第二个参数为插入的标签列表项的 `id`。

:::details 展开查看配置数组类型
```ts
interface CustomTag {
  dialogTitle: string,
  prefix: string,
  tagList: TagInfo[]
}

interface TagInfo {
  id: string,
  name: string,
  pinyin?: string
}
```
:::
</docs>

<script setup lang="ts">
import type { CustomTag } from 'vue-element-plus-x/types/EditorSender';
import { ref } from 'vue';

const senderRef = ref();

const customTagsArr = ref<CustomTag[]>([
  {
    dialogTitle: '话题标签',
    prefix: '#',
    tagList: [
      { id: '1', name: '话题1' },
      { id: '2', name: '话题2' },
      { id: '3', name: '话题3' }
    ]
  },
  {
    dialogTitle: '文件标签',
    prefix: '/',
    tagList: [
      { id: '1', name: '文件1' },
      { id: '2', name: '文件2' },
      { id: '3', name: '文件3' }
    ]
  }
]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button
        dark
        type="primary"
        plain
        @click="senderRef?.setCustomTag('#', '2')"
      >
        插入 自定义话题标签
      </el-button>
    </div>

    <EditorSender
      ref="senderRef"
      :custom-trigger="customTagsArr"
      placeholder="# 符号触话题选择，/ 符号触发文件选择"
      clearable
    />
  </div>
</template>

<style scoped lang="less">
:deep(.at-select) {
  cursor: pointer;

  svg {
    display: inline-block;
  }
}
</style>
