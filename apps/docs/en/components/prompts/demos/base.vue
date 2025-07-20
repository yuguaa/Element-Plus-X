<docs>
---
title: Basic Usage
---

Quickly create a set of prompts list. By default, overflow will not wrap and scrollbars are hidden.
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
    label: '🐛 Prompts Component Title'
  },
  {
    key: '3',
    label: '🐛 Prompts Component Title'
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
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="less"></style>
