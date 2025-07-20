<docs>
---
title: Customized Prompts Styles

---

Customize prompts styles through the `style` property.

Customize individual prompt styles through `itemStyle`, `itemHoverStyle`, and `itemActiveStyle` properties.
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '🐛 Prompts Component Title',
    description: 'Description information'.repeat(3),
    itemStyle: { width: 'calc(50% - 6px)', transition: 'background .3s' },
    itemHoverStyle: {
      background:
        'linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)'
    },
    itemActiveStyle: {
      background:
        'linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)'
    }
  },
  {
    key: '2',
    label: '🐛 I am disabled',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)', transition: 'background .3s' },
    itemHoverStyle: {
      background:
        'linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)'
    },
    itemActiveStyle: {
      background:
        'linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)'
    }
  },
  {
    key: '3',
    label: '🐛 Individual disable control is more accurate',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)', transition: 'background .3s' },
    itemHoverStyle: {
      background:
        'linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)'
    },
    itemActiveStyle: {
      background:
        'linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)'
    }
  },
  {
    key: '4',
    label: '🐛 Prompts Component Title',
    itemStyle: { width: 'calc(50% - 6px)', transition: 'background .3s' },
    itemHoverStyle: {
      background:
        'linear-gradient(to bottom right, rgba(223, 59, 61, 0.9), rgba(203, 52, 244, 0.9)'
    },
    itemActiveStyle: {
      background:
        'linear-gradient(to bottom right, rgba(58, 32, 164, 0.9), rgba(254, 166, 223, 0.9)'
    }
  }
]);

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`Clicked ${item.key}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      title="🐵 Prompts Component Title"
      :items="items"
      wrap
      :style="{
        width: '300px',
        padding: '12px',
        borderRadius: '8px',
        background:
          'linear-gradient(to bottom right, rgba(237, 43, 114, 0.9), rgba(223, 67, 62, 0.9)'
      }"
      @item-click="handleItemClick"
    />
  </div>
</template>

<style module lang="less">
:deep(.el-prompts) {
  .el-prompts-title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
