<docs>
---
title: 插入 选择标签
---

通过 `selectList` 属性配置选择标签配置数组。

使用组件 Ref 调用 `setSelectTag` 方法在光标位置插入 **选择标签** 内容，这个方法接受两个参数，第一个参数是选择标签的标识，第二个参数是选择标签的选项标识（默认值）。

::: info
你还可以从外部调用 `openSelectDialog` 方法打开选择标签弹窗，这个方法接受一个配置对象，配置对象的类型如下：

```ts
interface SelectDialogOption {
  key: string;
  elm: HTMLElement;
  beforeText?: string;
  afterText?: string;
}
```
:::

:::details 展开查看配置数组类型
```ts
interface SelectTag {
  dialogTitle: string, // 选择标签弹窗标题
  key: string, // 选择标签标识，用于插入选择标签时的标识
  options: SelectItem[] // 选择标签选项数组
}

interface SelectItem {
  id: string, // 选择标签选项标识
  name: string, // 选择标签选项名称
  preview?: string | URL // 选择标签选项预览图片
}
```
:::
</docs>

<script setup lang="ts">
import type {
  SelectDialogOption,
  SelectTag
} from 'vue-element-plus-x/types/EditorSender';
import { ref } from 'vue';

const senderRef = ref();

const selectTagsArr = ref<SelectTag[]>([
  {
    dialogTitle: '风格选择',
    key: 'style',
    options: [
      {
        id: '1',
        name: '人像摄影',
        preview: 'https://www.jianfv.top/style/style1.webp'
      },
      {
        id: '2',
        name: '电影写真',
        preview: 'https://www.jianfv.top/style/style2.webp'
      },
      {
        id: '3',
        name: '中国风',
        preview: 'https://www.jianfv.top/style/style3.webp'
      }
    ]
  },
  {
    dialogTitle: '字体选择',
    key: 'font',
    options: [
      { id: '1', name: '宋体' },
      { id: '2', name: '微软雅黑' },
      { id: '3', name: '楷体' }
    ]
  }
]);

function openSelectDialog() {
  senderRef.value?.openSelectDialog({
    key: 'style',
    elm: document.getElementById('dialogBtn')!,
    beforeText: '[自定义前置内容]',
    afterText: '[自定义后置内容]'
  } as SelectDialogOption);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button
        dark
        type="primary"
        plain
        @click="senderRef?.setSelectTag('style', '1')"
      >
        插入 风格选择标签
      </el-button>
      <el-button
        dark
        type="primary"
        plain
        @click="senderRef?.setSelectTag('font', '2')"
      >
        插入 字体选择标签
      </el-button>
      <el-button
        id="dialogBtn"
        dark
        type="primary"
        plain
        @click="openSelectDialog"
      >
        外部调用选择标签弹窗
      </el-button>
    </div>
    <EditorSender ref="senderRef" :select-list="selectTagsArr" clearable />
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
