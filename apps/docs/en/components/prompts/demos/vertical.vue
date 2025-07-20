<docs>
---
title: Vertical Display
---

Use the `vertical` property to control the display direction of `Prompts`. Note that this applies to the entire `Prompts` component, not individual `PromptsItem`.
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '🐛 Prompts Component Title',
    description: 'Description information'.repeat(3)
  },
  {
    key: '2',
    label: '🐛 I am disabled',
    disabled: true
  },
  {
    key: '3',
    label: '🐛 Individual disable control is more accurate',
    disabled: true
  },
  {
    key: '4',
    label: '🐛 Prompts Component Title'
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
      vertical
      @item-click="handleItemClick"
    />
  </div>
</template>

<style module lang="less"></style>
