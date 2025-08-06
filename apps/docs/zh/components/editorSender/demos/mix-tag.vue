<docs>
---
title: 混合标签覆盖写入
---

通过 组件 Ref 实例的 `setMixTags` 方法设置混合标签，混合标签会覆盖写入已有的内容。
</docs>

<script setup lang="ts">
import type { SelectTag } from 'vue-element-plus-x/types/EditorSender';
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
  }
]);

function setMixTags() {
  senderRef.value.setMixTags([
    [
      {
        type: 'gridInput',
        value: '这是第一行，请根据以下文案内容绘制一张图片：'
      },
      {
        type: 'inputTag',
        key: 'content',
        placeholder: '[文案内容]',
        value:
          '太阳由那扇大玻璃窗透入屋内，先是落在墙上，接着映照到桌上，最终，也照到了我那可爱的小床上来咯'
      },
      {
        type: 'gridInput',
        value: '。风格是'
      },
      {
        type: 'selectTag',
        key: 'style',
        value: '1'
      },
      {
        type: 'gridInput',
        value: '，画面内是'
      },
      {
        type: 'inputTag',
        key: 'content',
        placeholder: '[画面内容]',
        value: '光从大落地窗照进房间内，照在墙面、地板、桌子、床上'
      },
      {
        type: 'gridInput',
        value:
          '。画面主体要突出，画面的色彩搭配和整体氛围要贴合文案所围绕的主题。'
      }
    ],
    [
      {
        type: 'gridInput',
        value: '这是第二行。'.repeat(4)
      }
    ],
    [
      {
        type: 'gridInput',
        value: '这是第三行。'.repeat(4)
      },
      {
        type: 'htmlTag',
        value:
          '<img class="img-tag" src="https://cdn.element-plus-x.com/element-plus-x.png" alt="">'
      }
    ]
  ]);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button dark type="primary" plain @click="setMixTags">
        混合标签覆盖写入
      </el-button>
    </div>

    <EditorSender ref="senderRef" clearable :select-list="selectTagsArr" />
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
</style>
